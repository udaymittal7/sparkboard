'use client';

import { memo } from 'react';

import ResizeHandle from './resize-handle';

import { LayerType, Side, XYWH } from '@/types/canvas';
import { useSelf, useStorage } from '@/liveblocks.config';
import { useSelectionBounds } from '@/hooks/use-selection-bounds';

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();

    if (!bounds) {
      return null;
    }

    const resizeHandlers = [
      {
        x: bounds.x - HANDLE_WIDTH / 2,
        y: bounds.y - HANDLE_WIDTH / 2,
        side: Side.Top + Side.Left,
        cursor: 'nwse-resize',
      },
      {
        x: bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2,
        y: bounds.y - HANDLE_WIDTH / 2,
        side: Side.Top,
        cursor: 'ns-resize',
      },
      {
        x: bounds.x - HANDLE_WIDTH / 2 + bounds.width,
        y: bounds.y - HANDLE_WIDTH / 2,
        side: Side.Top + Side.Right,
        cursor: 'nesw-resize',
      },
      {
        x: bounds.x - HANDLE_WIDTH / 2 + bounds.width,
        y: bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2,
        side: Side.Right,
        cursor: 'ew-resize',
      },
      {
        x: bounds.x - HANDLE_WIDTH / 2 + bounds.width,
        y: bounds.y - HANDLE_WIDTH / 2 + bounds.height,
        side: Side.Bottom + Side.Right,
        cursor: 'nwse-resize',
      },
      {
        x: bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2,
        y: bounds.y - HANDLE_WIDTH / 2 + bounds.height,
        side: Side.Bottom,
        cursor: 'ns-resize',
      },
      {
        x: bounds.x - HANDLE_WIDTH / 2,
        y: bounds.y - HANDLE_WIDTH / 2 + bounds.height,
        side: Side.Bottom + Side.Left,
        cursor: 'nesw-resize',
      },
      {
        x: bounds.x - HANDLE_WIDTH / 2,
        y: bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2,
        side: Side.Left,
        cursor: 'ew-resize',
      },
    ];

    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
          }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            {resizeHandlers.map((handle) => (
              <ResizeHandle
                key={handle.side}
                {...handle}
                bounds={bounds}
                onPointerDown={onResizeHandlePointerDown}
              />
            ))}
          </>
        )}
      </>
    );
  }
);

SelectionBox.displayName = 'SelectionBox';
