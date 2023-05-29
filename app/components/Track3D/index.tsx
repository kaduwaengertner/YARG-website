"use client";

import styles from './Track3D.module.css';
import { Canvas } from '@react-three/fiber';
import { useFBX, OrbitControls } from '@react-three/drei';


const Track3D: React.FC = () => {

  const fbx = useFBX("FiveFretTrack.fbx");

  return (<div className={styles.track}>
    <Canvas>
      <OrbitControls />
      <primitive object={fbx} scale={0.010} />

    </Canvas>
  </div>);
}

export default Track3D;