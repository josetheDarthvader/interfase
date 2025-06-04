"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'; // For placeholder

const ThreeDeeView: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c1a3d); // Dark Blue to match new theme (hsl(220, 70%, 15%))

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 3); // Adjusted for typical motor size view

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.target.set(0, 0.5, 0); // Assuming motor is centered around y=0.5

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Increased intensity for dark background
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increased intensity
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8); // Additional light from another angle
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);


    // FBX Loader
    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      '/models/VFD_and_AC_Motor_Disp_0527021942_texture.fbx', // User needs to place their motor.fbx here
      (object) => {
        // Scale and position the model as needed
        object.scale.set(0.01, 0.01, 0.01); // Example scale, adjust to your model
        object.position.set(0, 0, 0);
         // Center the model
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center); // Center the model
        scene.add(object);
        setIsLoading(false);
      },
      undefined, // onProgress callback (optional)
      (errorEvent) => {
        console.error('Error loading FBX model: /models/VFD_and_AC_Motor_Disp_0527021942_texture.fbx', errorEvent);
        setError('Failed to load 3D model. Displaying placeholder. Ensure motor.fbx is in /public/models/');
        // Fallback: Add a simple cube if FBX fails
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x3498db }); // Primary blue
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0.5, 0);
        scene.add(cube);
        setIsLoading(false);
      }
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
         currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <Card className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">3D Motor Simulation</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0 relative min-h-[300px] md:min-h-0">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <p>Loading 3D Model...</p>
          </div>
        )}
        {error && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10 p-4 text-center">
             <Image src="https://placehold.co/400x300.png?text=Motor+3D+View" alt="Motor 3D View Placeholder" width={400} height={300} data-ai-hint="electric motor gears" className="opacity-50 mb-4"/>
            <p className="text-destructive">{error}</p>
          </div>
        )}
        <div ref={mountRef} className="w-full h-full" />
      </CardContent>
    </Card>
  );
};

export default ThreeDeeView;
