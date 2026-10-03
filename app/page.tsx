"use client";

import Room from "./Room";
import { CollaborativeApp } from "./CollaborativeApp";
import Live from "./components/Live";
import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import { useRef, useEffect, useState } from "react";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";
import { Canvas, Object, Rect } from 'fabric'
import { ActiveElement } from "@/types/type";


export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<Object | null>(null); // reference to the shape object
  const selectedShapeRef = useRef<string| null>('rectangle'); // reference to the selected shape object

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  })
  
  const handleActiveElement = (element: ActiveElement) => {
    setActiveElement(element);
    selectedShapeRef.current = element?.value;
  }


  //init fabric
  useEffect(() => {
   // 1. Guard against missing element or multiple initializations
   if (!canvasRef.current || fabricRef.current) return;
   //init fabric
   const canvas = initializeFabric({fabricRef, canvasRef});
   
   canvas.on("mouse:down", (options) => {
     handleCanvasMouseDown({
      options, 
      canvas,
      isDrawing,
      shapeRef,
      selectedShapeRef,
     });

     window.addEventListener("resize", () => {
      handleResize({fabricRef});
     });
     
     
   });

  }, []);

  return (
    <main className="h-screen overflow-hidden">
      <Navbar activeElement={activeElement} handleActiveElement={handleActiveElement} />
      
      <section className="flex h-full flex-row">
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>

      
    </main>
  );
}


//https://jsmastery.com/video-kit/066c3e16-084c-4d70-898a-e5d7086f3d13
// 2:09:00 https://www.youtube.com/watch?v=oKIThIihv60&t=75s