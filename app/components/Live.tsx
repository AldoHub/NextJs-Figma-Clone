import LiveCursors from "./cursor/LiveCursors";
import { useOthers, useMyPresence } from "@/liveblocks.config";
import { useCallback, useState, useEffect } from "react";
import CursorChat from "./cursor/CursorChat";
import { CursorMode } from "@/types/type";


const Live = () => {
  const others = useOthers();
  const [{cursor}, updateMyPresence] = useMyPresence() as any;

  //cursor chat state
  const [cursorState, setCursorState] = useState({
    mode: CursorMode.Hidden,
  })


  //wont recreate the function on every render, only when tis dependencies change
  const handlePointerMove = useCallback((ev: React.PointerEvent) => {
    ev.preventDefault();
    
    //get the current position of the mouse
    const x = ev.clientX - ev.currentTarget.getBoundingClientRect().x;
    const y = ev.clientY - ev.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });

  }, []);


  const handlePointerLeave = useCallback((ev: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });

  }, []);

  const handlePointerDown = useCallback((ev: React.PointerEvent) => {
    
    //get the current position of the mouse
    const x = ev.clientX - ev.currentTarget.getBoundingClientRect().x;
    const y = ev.clientY - ev.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });

  }, [])


  useEffect(() => {

    const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Backspace") {
            setCursorState({ mode: CursorMode.Chat, message: "", previousMessage: null });
        }else if (e.key === "Escape") {
            updateMyPresence({ message: "" });
            setCursorState({ mode: CursorMode.Hidden });
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Backspace") {
           e.preventDefault();
        }
    }

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
    return () => {
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);


  return (
    <div 
    onPointerMove={handlePointerMove}
    onPointerLeave={handlePointerLeave}
    onPointerDown={handlePointerDown}
    className="flex h-[100vh] w-full items-center justify-center">
      
    
      <h1 className="text-5xl font-bold font-sans">Hello world</h1>
     

      {cursor && <CursorChat
        cursor={cursor}
        cursorState={cursorState}
        setCursorState={setCursorState}
        updateMyPresence={updateMyPresence}
      />}
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;