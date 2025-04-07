// client/src/components/ModEditor/NodePalette.tsx
import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';
import { IconButton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DiamondIcon from '@mui/icons-material/Diamond';
import EventIcon from '@mui/icons-material/Event';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import HelpIcon from '@mui/icons-material/Help';
import OutputIcon from '@mui/icons-material/Output';

// Node types
const nodeTypes = [
  {
    type: 'entityNode',
    label: 'Entity',
    description: 'Add a custom entity or mob',
    icon: <PeopleIcon />,
    color: '#1e3a8a',
  },
  {
    type: 'itemNode',
    label: 'Item',
    description: 'Add a custom item',
    icon: <DiamondIcon />,
    color: '#9d174d',
  },
  {
    type: 'eventNode',
    label: 'Event',
    description: 'Handle game events',
    icon: <EventIcon />,
    color: '#92400e',
  },
  {
    type: 'actionNode',
    label: 'Action',
    description: 'Perform an action',
    icon: <PlayArrowIcon />,
    color: '#065f46',
  },
  {
    type: 'conditionNode',
    label: 'Condition',
    description: 'Add conditional logic',
    icon: <DeveloperBoardIcon />,
    color: '#5b21b6',
  },
  {
    type: 'outputNode',
    label: 'Output',
    description: 'Define mod output',
    icon: <OutputIcon />,
    color: '#1f2937',
  },
];

const NodePalette: React.FC = () => {
  // Handle drag start to create a new node
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box>
      {nodeTypes.map((node) => (
        <Paper
          key={node.type}
          sx={{
            mb: 2,
            p: 1.5,
            cursor: 'grab',
            borderLeft: `4px solid ${node.color}`,
            '&:hover': {
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s ease-in-out',
            },
          }}
          elevation={2}
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                backgroundColor: node.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                width: 32,
                height: 32,
                mr: 1.5,
                color: 'white',
              }}
            >
              {node.icon}
            </Box>
            <Box>
              <Typography variant="subtitle2">{node.label}</Typography>
              <Typography variant="caption" color="textSecondary">
                {node.description}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}

      <Divider sx={{ my: 2 }} />
      
      <Typography variant="caption" color="textSecondary" paragraph sx={{ px: 1 }}>
        Drag nodes from this palette to the editor area to create your mod. Connect nodes to define behavior.
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton size="small" color="primary">
          <HelpIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NodePalette;
