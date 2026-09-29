import CursorSVG from "@/public/assets/CursorSVG";
import { CursorChatProps } from "@/types/type";
import { CursorMode } from "@/types/type";

const CursorChat = ({cursor, cursorState, setCursorState, updateMyPresence}: CursorChatProps) => {
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log("CHANGE: ", e.target.value);
        updateMyPresence({ message: e.target.value });
        setCursorState({ mode: CursorMode.Chat, message: e.target.value, previousMessage:null });
        
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setCursorState({ mode: CursorMode.Chat, message: "", previousMessage: cursorState.message });
        }else if(e.key === "Escape"){
            setCursorState({ mode: CursorMode.Hidden, message: "", previousMessage: null });
        }
    }
  
    return (
    <div className="absolute top-0 left-0"
    style={{
      transform: `translate(${cursor.x}px, ${cursor.y}px)`,
    }}>
      {cursorState.mode === CursorMode.Chat && 
      (<>
        <CursorSVG color="#000" />
        <div className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]">
            {cursorState.previousMessage && (
              <p className="text-sm leading-relaxed text-white">
              {cursorState.previousMessage}
              </p>)
            }
            <input
              type="text"
              className="z-10 w-60 bg-transparent text-white outline-none placeholder-blue-300 outline-none"
              autoFocus={true}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={cursorState.previousMessage ? "" : "Type your message..."}
              value={cursorState.message}
              maxLength={50}
            />
        </div>
      </>)
      }
    </div>
  );
};

export default CursorChat;