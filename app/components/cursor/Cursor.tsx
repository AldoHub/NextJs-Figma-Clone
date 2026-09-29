import CursorSVG from "@/public/assets/CursorSVG";

type Props = {
  color: string;
  x: number;
  y: number;
  message: string;
};

const Cursor = ({ color, x, y, message }: Props) => {
  return (
    <div className="pointer-events-none absolute top-0 left-0"
    style={{
      transform: `translate(${x}px, ${y}px)`,
    }}>
      <CursorSVG color={color} />
      {/** Cursor message */}
      {message && <div className="absolute left-2 top-5  px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]"
      style={{backgroundColor: color}}>
        {message}
      </div>} 
    </div>
  );
};

export default Cursor;