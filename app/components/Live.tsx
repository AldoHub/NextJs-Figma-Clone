import LiveCursors from "./cursor/LiveCursors";
import { useOthers, useMyPresence } from "@/liveblocks.config";
import { useCallback, useState, useEffect } from "react";
import CursorChat from "./cursor/CursorChat";
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/type";
import ReactionSelector from "./reaction/ReactionButton";
import FlyingReaction from "./reaction/FlyingReaction";
import useInterval from "@/hooks/useInterval";
import { useBroadcastEvent, useEventListener } from "@liveblocks/react";


const Live = () => {
  const others = useOthers();
  const [{cursor}, updateMyPresence] = useMyPresence() as any;

  //cursor chat state
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  })

  //reactions state
  const [reactions, setReactions] = useState<Reaction[]>([]);

  //broadcast reactions
  const broadcast = useBroadcastEvent();

  //custom interval hook to remove hidden reactions
  useInterval(() => {
    setReactions((prevReactions) => prevReactions.filter((reaction) => reaction.timestamp > Date.now() - 1000));
  }, 1000);

  //custon useInterval hook to show reactions
  useInterval(() => {
    //check if we are doing a reaction and mouse is pressed
    if(cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      setReactions((prevReactions) => [
        ...prevReactions,
        {
          timestamp: Date.now(),
          value: cursorState.reaction,
          point: { x: cursor?.x, y: cursor?.y },
        },
      ]);

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      })
    } 
  }, 100);

  //listen for reactions broadcasted by other users
  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    setReactions((prevReactions) => [
      ...prevReactions,
      {
        timestamp: Date.now(),
        value: event.value,
        point: { x: event.x, y: event.y },
      },
    ]);
  })

  //wont recreate the function on every render, only when tis dependencies change
  const handlePointerMove = useCallback((ev: React.PointerEvent) => {
    ev.preventDefault();
    
    if(cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      //get the current position of the mouse
      const x = ev.clientX - ev.currentTarget.getBoundingClientRect().x;
      const y = ev.clientY - ev.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });
    }
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
    setCursorState((state: CursorState) => 
      cursorState.mode === CursorMode.Reaction ? 
      {...state, isPressed: true } : state
    );
  }, [cursorState.mode, setCursorState])


  const handlePointerUp = useCallback((ev: React.PointerEvent) => {
    setCursorState((state: CursorState) => 
      cursorState.mode === CursorMode.Reaction ? 
      {...state, isPressed: true } : state
    );
  }, [cursorState.mode, setCursorState])


  //reactions
  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false })
  }, [setCursorState]);



  useEffect(() => {

    const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Backspace") {
            setCursorState({ mode: CursorMode.Chat, message: "", previousMessage: null });
        }else if (e.key === "Escape") {
            updateMyPresence({ message: "" });
            setCursorState({ mode: CursorMode.Hidden });
        }else if(e.key === "e") { 
            setCursorState({ mode: CursorMode.ReactionSelector });
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
    onPointerUp={handlePointerUp}
    className="flex h-[100vh] w-full items-center justify-center">
      
    
      <h1 className="text-5xl font-bold font-sans">Hello world</h1>
     
      {reactions.map((reaction) => 
        <FlyingReaction
          key={reaction.timestamp.toString()}
          x={reaction.point.x}
          y={reaction.point.y}
          timestamp={reaction.timestamp}
          value={reaction.value}
        />
      )}

      {cursor && <CursorChat
        cursor={cursor}
        cursorState={cursorState}
        setCursorState={setCursorState}
        updateMyPresence={updateMyPresence}
      />}


      {cursorState.mode === CursorMode.ReactionSelector && 
        <ReactionSelector setReaction={setReaction} />
      }
      
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;