"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import type { Group, Mesh } from "three";

const MARK_PATH =
  "M19.0628 13.0205C16.4909 13.0058 14.0327 12.1522 12.0109 10.7353C8.26913 8.11671 6.60466 4.61014 6.47098 -0.0390625C5.01471 0.00275568 3.43305 -0.0562818 0 -0.0218432V22.9757H6.3858C6.3858 20.2551 6.43194 17.6082 6.43194 14.7609C10.1832 18.0153 14.2586 19.6512 19.0959 19.6868C19.0959 17.4483 19.1018 15.2369 19.1018 13.0488H25.3492V7.51158H19.0427L19.0628 13.0205Z";

function useMarkGeometry() {
  return useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 26 24"><path d="${MARK_PATH}"/></svg>`;
    const data = new SVGLoader().parse(svg);
    const shapes: THREE.Shape[] = [];
    for (const path of data.paths) {
      shapes.push(...SVGLoader.createShapes(path));
    }
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 7,
      bevelEnabled: true,
      bevelThickness: 0.9,
      bevelSize: 0.6,
      bevelSegments: 6,
      curveSegments: 32,
    });
    geo.center();
    geo.scale(1, -1, 1); // SVG y-axis points down → flip upright
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function LogoMark({ reduced }: { reduced: boolean }) {
  const geometry = useMarkGeometry();
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (reduced || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.9) * 0.6;
    const targetX = -state.pointer.y * 0.15;
    const targetY = state.pointer.x * 0.2;
    mesh.current!.rotation.x += (targetX - mesh.current!.rotation.x) * Math.min(1, delta * 3);
    mesh.current!.rotation.z += (targetY - mesh.current!.rotation.z) * Math.min(1, delta * 3);
  });

  return (
    <group ref={group}>
      <Center>
        <mesh ref={mesh} geometry={geometry} castShadow>
          <meshStandardMaterial
            color="#4f8bff"
            metalness={0.90}
            roughness={0.20}
            emissive="#1a2d6e"
            emissiveIntensity={0.5}
            envMapIntensity={1.5}
          />
        </mesh>
      </Center>
    </group>
  );
}

export function HeroLogo3D() {
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Pause the render loop while off-screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 34], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ touchAction: "none", cursor: "grab" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[8, 10, 12]} intensity={2.4} color="#eaf0ff" />
        <pointLight position={[-12, -6, 8]} intensity={260} color="#a5b4fc" />
        <pointLight position={[10, -8, -6]} intensity={180} color="#557bff" />

        <LogoMark reduced={reduced} />

        <Environment resolution={256}>
          <Lightformer intensity={2.4} position={[0, 4, -6]} scale={[12, 12, 1]} color="#557bff" />
          <Lightformer intensity={1.4} position={[-6, 2, 4]} scale={[8, 8, 1]} color="#a5b4fc" />
          <Lightformer intensity={1.1} position={[6, -3, 3]} scale={[8, 6, 1]} color="#ffffff" />
          <Lightformer intensity={0.8} position={[0, -6, -3]} scale={[10, 4, 1]} color="#3f5fd6" />
        </Environment>

        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          autoRotate={!reduced && visible}
          autoRotateSpeed={1.1}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.9}
          minPolarAngle={Math.PI * 0.18}
          maxPolarAngle={Math.PI * 0.82}
        />
      </Canvas>
    </div>
  );
}
