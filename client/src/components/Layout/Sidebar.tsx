// client/src/components/Layout/Sidebar.tsx
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Toolbar,
  Tooltip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ExtensionIcon from '@mui/icons-material/Extension';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ForumIcon from '@mui/icons-material/Forum';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          top: '64px',
          height: 'calc(100% - 64px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', p: 1 }}>
        <List>
          <ListItem
            button
            component={RouterLink}
            to="/"
            selected={isActive('/')}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(80, 200, 120, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(80, 200, 120, 0.2)',
                },
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon color={isActive('/') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          
          <ListItem
            button
            component={RouterLink}
            to="/servers"
            selected={isActive('/servers')}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(80, 200, 120, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(80, 200, 120, 0.2)',
                },
              },
            }}
          >
            <ListItemIcon>
              <StorageIcon color={isActive('/servers') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Servers" />
          </ListItem>
          
          <ListItem
            button
            component={RouterLink}
            to="/mod-editor"
            selected={isActive('/mod-editor')}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(80, 200, 120, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(80, 200, 120, 0.2)',
                },
              },
            }}
          >
            <ListItemIcon>
              <CodeIcon color={isActive('/mod-editor') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Mod Editor" />
          </ListItem>
          
          <ListItem
            button
            component={RouterLink}
            to="/ai-generator"
            selected={isActive('/ai-generator')}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(80, 200, 120, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(80, 200, 120, 0.2)',
                },
              },
            }}
          >
            <ListItemIcon>
              <SmartToyIcon color={isActive('/ai-generator') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="AI Generator" />
          </ListItem>
          
          <Tooltip title="Coming Soon" placement="right">
            <ListItem
              button
              disabled
              sx={{
                borderRadius: 2,
                mb: 0.5,
                opacity: 0.6,
              }}
            >
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary="Mod Marketplace" />
            </ListItem>
          </Tooltip>
        </List>
        
        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <List>
          <Tooltip title="Coming Soon" placement="right">
            <ListItem
              button
              disabled
              sx={{
                borderRadius: 2,
                mb: 0.5,
                opacity: 0.6,
              }}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Community" />
            </ListItem>
          </Tooltip>
          
          <Tooltip title="Coming Soon" placement="right">
            <ListItem
              button
              disabled
              sx={{
                borderRadius: 2,
                mb: 0.5,
                opacity: 0.6,
              }}
            >
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary="Forums" />
            </ListItem>
          </Tooltip>
          
          <ListItem
            button
            component={RouterLink}
            to="/settings"
            selected={isActive('/settings')}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(80, 200, 120, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(80, 200, 120, 0.2)',
                },
              },
            }}
          >
            <ListItemIcon>
              <SettingsIcon color={isActive('/settings') ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          
          <Tooltip title="Coming Soon" placement="right">
            <ListItem
              button
              disabled
              sx={{
                borderRadius: 2,
                mb: 0.5,
                opacity: 0.6,
              }}
            >
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Help & Support" />
            </ListItem>
          </Tooltip>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;