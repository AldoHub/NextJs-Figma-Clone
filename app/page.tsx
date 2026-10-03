"use client";

import Room from "./Room";
import { CollaborativeApp } from "./CollaborativeApp";
import Live from "./components/Live";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      
      <section className="flex h-full flex-row">
        <Live />
      </section>

      
    </main>
  );
}


//https://jsmastery.com/video-kit/066c3e16-084c-4d70-898a-e5d7086f3d13
// 1:42:00 https://www.youtube.com/watch?v=oKIThIihv60&t=75s