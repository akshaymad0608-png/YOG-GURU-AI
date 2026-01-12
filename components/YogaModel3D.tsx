import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, Grid, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface JointProps {
  poseId: string;
}

const getPoseData = (poseId: string) => {
  const defaultPose = {
    hips: [0, 1, 0] as [number, number, number],
    spine: [0, 0, 0] as [number, number, number],
    head: [0, 0, 0] as [number, number, number],
    leftArm: [0, 0, 1.2] as [number, number, number],
    rightArm: [0, 0, -1.2] as [number, number, number],
    leftLeg: [0, 0, 0.1] as [number, number, number],
    rightLeg: [0, 0, -0.1] as [number, number, number],
  };

  const poses: Record<string, typeof defaultPose> = {
    tadasana: { ...defaultPose, leftArm: [0,0,0.1], rightArm: [0,0,-0.1], hips: [0,1.2,0] },
    vrikshasana: { ...defaultPose, leftLeg: [0,0,0.5], rightLeg: [0.3,0,2.2], leftArm: [0,0,2.8], rightArm: [0,0,-2.8], hips: [0,1.3,0] },
    virabhadrasana: { ...defaultPose, hips: [0,0.9,0], leftLeg: [0.5,0,0.8], rightLeg: [-0.5,0,-1.1], leftArm: [0,0,1.57], rightArm: [0,0,-1.57] },
    bhujangasana: { ...defaultPose, hips: [0,0.2,0], spine: [-0.8,0,0], leftLeg: [0,0,0.1], rightLeg: [0,0,-0.1], leftArm: [0.5,0,0.2], rightArm: [0.5,0,-0.2] },
    'adho-mukha-svanasana': { ...defaultPose, hips: [0,1.5,0], spine: [1.2,0,0], leftLeg: [0.8,0,0.1], rightLeg: [0.8,0,-0.1], leftArm: [2.5,0,0.2], rightArm: [2.5,0,-0.2] },
    balasana: { ...defaultPose, hips: [0,0.3,0], spine: [1.5,0,0], leftLeg: [2.8,0,0], rightLeg: [2.8,0,0], leftArm: [3.1,0,0], rightArm: [3.1,0,0] },
    trikonasana: { ...defaultPose, hips: [0,1.1,0], spine: [0,0,1.2], leftLeg: [0,0,0.4], rightLeg: [0,0,-0.4], leftArm: [0,0,1.57], rightArm: [0,0,-1.57] },
    ustrasana: { ...defaultPose, hips: [0,0.6,0], spine: [-0.6,0,0], leftLeg: [1.57,0,0.2], rightLeg: [1.57,0,-0.2], leftArm: [-1.2,0,0.5], rightArm: [-1.2,0,-0.5] },
    phalakasana: { ...defaultPose, hips: [0,0.8,0], spine: [0,0,0], leftLeg: [0,0,0.1], rightLeg: [0,0,-0.1], leftArm: [1.57,0,0.1], rightArm: [1.57,0,-0.1] }
  };

  return poses[poseId] || defaultPose;
};

const Humanoid: React.FC<JointProps> = ({ poseId }) => {
  const pose = useMemo(() => getPoseData(poseId), [poseId]);
  
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: "#2f4e34", 
    roughness: 0.1, 
    metalness: 0.5,
    emissive: "#2f4e34",
    emissiveIntensity: 0.2
  });

  const jointMaterial = new THREE.MeshStandardMaterial({ 
    color: "#D4AF37",
    emissive: "#D4AF37",
    emissiveIntensity: 0.8
  });

  return (
    <group position={pose.hips}>
      <mesh material={bodyMaterial} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
      </mesh>

      <group rotation={pose.spine as any}>
        <mesh position={[0, 0.35, 0]} material={bodyMaterial}>
          <capsuleGeometry args={[0.16, 0.45, 12, 24]} />
        </mesh>
        
        <group position={[0, 0.75, 0]} rotation={pose.head as any}>
          <mesh material={bodyMaterial}>
            <sphereGeometry args={[0.16, 32, 32]} />
          </mesh>
        </group>

        <group position={[-0.22, 0.5, 0]} rotation={pose.leftArm as any}>
          <mesh position={[0, -0.22, 0]} material={bodyMaterial}>
            <capsuleGeometry args={[0.07, 0.4, 6, 16]} />
          </mesh>
          <mesh material={jointMaterial}>
             <sphereGeometry args={[0.08, 12, 12]} />
          </mesh>
        </group>

        <group position={[0.22, 0.5, 0]} rotation={pose.rightArm as any}>
          <mesh position={[0, -0.22, 0]} material={bodyMaterial}>
            <capsuleGeometry args={[0.07, 0.4, 6, 16]} />
          </mesh>
          <mesh material={jointMaterial}>
             <sphereGeometry args={[0.08, 12, 12]} />
          </mesh>
        </group>
      </group>

      <group position={[-0.14, -0.05, 0]} rotation={pose.leftLeg as any}>
        <mesh position={[0, -0.45, 0]} material={bodyMaterial}>
          <capsuleGeometry args={[0.1, 0.7, 6, 16]} />
        </mesh>
        <mesh material={jointMaterial}>
             <sphereGeometry args={[0.11, 12, 12]} />
          </mesh>
      </group>

      <group position={[0.14, -0.05, 0]} rotation={pose.rightLeg as any}>
        <mesh position={[0, -0.45, 0]} material={bodyMaterial}>
          <capsuleGeometry args={[0.1, 0.7, 6, 16]} />
        </mesh>
        <mesh material={jointMaterial}>
             <sphereGeometry args={[0.11, 12, 12]} />
          </mesh>
      </group>
    </group>
  );
};

const YogaModel3D: React.FC<{ poseId: string }> = ({ poseId }) => {
  return (
    <div className="w-full h-full min-h-[400px] bg-white dark:bg-brand-950 rounded-[3.5rem] overflow-hidden shadow-inner ring-1 ring-brand-100 dark:ring-brand-900 relative group border-[8px] border-white dark:border-brand-900">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, position: [4, 3, 6] }}>
        <Suspense fallback={null}>
          <Stage environment="studio" intensity={0.5} adjustCamera={false}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
              <Humanoid poseId={poseId} />
            </Float>
          </Stage>
        </Suspense>
        <OrbitControls makeDefault enablePan={false} minDistance={4} maxDistance={10} autoRotate autoRotateSpeed={0.3} />
        <Grid 
          infiniteGrid 
          fadeDistance={20} 
          fadeStrength={5} 
          sectionSize={1} 
          cellSize={0.5} 
          sectionColor="#4b7a51" 
          cellColor="#e1ede1" 
          opacity={0.1}
        />
      </Canvas>
      
      <div className="absolute top-8 left-8 flex flex-col space-y-3 pointer-events-none">
         <div className="glass px-5 py-2.5 rounded-2xl flex items-center space-x-3 text-brand-700 shadow-xl">
            <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black italic">Perfect Form Manifest</span>
         </div>
      </div>
    </div>
  );
};

export default YogaModel3D;