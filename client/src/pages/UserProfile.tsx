// client/src/pages/UserProfile.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Card,
  CardContent,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';
import ExtensionIcon from '@mui/icons-material/Extension';
import CodeIcon from '@mui/icons-material/Code';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useAuth } from '../contexts/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              src={user?.avatarUrl}
              alt={user?.username}
              sx={{ width: 120, height: 120, mb: 2 }}
            >
              {user?.username?.charAt(0)}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {user?.username}
            </Typography>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/settings"
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Username"
                    secondary={user?.username}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={user?.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DateRangeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Member Since"
                    secondary={new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                  />
                </ListItem>
              </List>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">3</Typography>
                    <Typography variant="body2">Servers</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary">12</Typography>
                    <Typography variant="body2">Mods</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main">278</Typography>
                    <Typography variant="body2">Downloads</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="profile tabs"
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Servers" icon={<StorageIcon />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="Mods" icon={<ExtensionIcon />} iconPosition="start" {...a11yProps(1)} />
            <Tab label="Activity" icon={<EventIcon />} iconPosition="start" {...a11yProps(2)} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom>Survival Server</Typography>
                    <Chip label="Online" color="success" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Vanilla • v1.19.2
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    Players: 12/20
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={RouterLink}
                      to="/servers?id=1"
                    >
                      Manage
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom>Creative Build</Typography>
                    <Chip label="Offline" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Forge • v1.18.2
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    Players: 0/10
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={RouterLink}
                      to="/servers?id=2"
                    >
                      Manage
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <Button
                    variant="outlined"
                    startIcon={<StorageIcon />}
                    component={RouterLink}
                    to="/servers"
                  >
                    Create New Server
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom>Custom Weapons</Typography>
                    <Chip label="Published" color="success" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    v1.0.2 • MC v1.19.2
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    Downloads: 156
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={RouterLink}
                      to="/mod-editor?id=1"
                    >
                      Edit
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom>Advanced Farming</Typography>
                    <Chip label="Draft" color="warning" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    v0.9.5 • MC v1.18.2
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">
                    Downloads: 0
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={RouterLink}
                      to="/mod-editor?id=2"
                    >
                      Edit
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <Button
                    variant="outlined"
                    startIcon={<CodeIcon />}
                    component={RouterLink}
                    to="/mod-editor"
                  >
                    Create New Mod
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <List>
            <ListItem divider>
              <ListItemText
                primary="Started server 'Survival Server'"
                secondary="Today, 10:45 AM"
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Updated mod 'Custom Weapons' to v1.0.2"
                secondary="Today, 09:30 AM"
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Created mod 'Advanced Farming'"
                secondary="Yesterday, 3:45 PM"
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Stopped server 'Creative Build'"
                secondary="Yesterday, 2:20 PM"
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Published mod 'Custom Weapons' v1.0.1"
                secondary="3 days ago"
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Created server 'Modded Adventure'"
                secondary="1 week ago"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Joined MineMod Platform"
                secondary={new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              />
            </ListItem>
          </List>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default UserProfile;
