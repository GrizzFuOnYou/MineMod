// client/src/components/ModEditor/edges/ModEdge.tsx
import React, { memo } from 'react';
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
} from 'reactflow';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  style = {},
  selected,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Edge color based on connection type
  const determineEdgeColor = () => {
    if (data?.type === 'condition-true') return '#10b981';
    if (data?.type === 'condition-false') return '#ef4444';
    if (sourceX < targetX) return '#8b5cf6'; // Left to right = normal flow
    return '#f59e0b'; // Right to left or other directions
  };

  const edgeColor = determineEdgeColor();

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: edgeColor,
          strokeWidth: selected ? 3 : 2,
          strokeDasharray: data?.dashed ? '5,5' : 'none',
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            display: selected ? 'flex' : 'none',
          }}
          className="nodrag nopan"
        >
          <IconButton
            size="small"
            sx={{
              width: 20,
              height: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
            onClick={() => {
              // This would be handled by the parent component
              if (data?.onDelete) {
                data.onDelete(id);
              }
            }}
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default memo(ModEdge);
