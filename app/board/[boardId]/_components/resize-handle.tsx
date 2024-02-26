import { Side, XYWH } from '@/types/canvas';

interface HandleProps {
  x: number;
  y: number;
  bounds: XYWH;
  cursor: string;
  side: Side;
  onPointerDown: (corner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDTH = 8;

const Handle = ({ x, y, bounds, cursor, side, onPointerDown }: HandleProps) => {
  const handleStyles = {
    width: `${HANDLE_WIDTH}px`,
    height: `${HANDLE_WIDTH}px`,
    cursor,
  };

  return (
    <rect
      className="fill-white stroke-1 stroke-blue-500"
      x={0}
      y={0}
      style={{
        ...handleStyles,
        transform: `translate(${x}px, ${y}px)`,
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown(side, bounds);
      }}
    />
  );
};

export default Handle;
