'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  Language,
  Notifications,
  Settings,
  Logout,
  AccountBalance,
  CalendarMonth,
  Event,
  Chat,
  Brightness4,
  Brightness7,
  Apps,
  Email,
} from '@mui/icons-material';
import {IconCalendarWeek, IconCalendarCheck, IconMessage2, IconCoins, IconSettings} from "@tabler/icons-react"
const drawerWidth = 260;
const collapsedWidth = 70;

const overviewItems = [
  { icon: <IconCalendarWeek />, label: 'Calendar', path: '/calendar' },
  { icon: <IconCalendarCheck />, label: 'My Reminders', path: '/reminders' },
  { icon: <IconMessage2 />, label: 'Remi Chat', path: '/chat' },
  { icon: <IconCoins />, label: 'Finance', path: '/finance' },
  { icon: <IconSettings />, label: 'Settings', path: '/settings' },
];

const RootLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const toggleDrawerOpen = () => setDrawerOpen((prev) => !prev);

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      <Toolbar sx={{ justifyContent: drawerOpen ? 'space-between' : 'center', px: 2 }}>
        {drawerOpen ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 20 }} color='primary'>Remindly</Typography>
              <Box sx={{
                backgroundColor: '#792FD2',
                color: '#fff',
                borderRadius: 2,
                fontSize: 10,
                px: 0.7,
                ml: 1,
              }}>New</Box>
            </Box>
            <IconButton size="small" onClick={toggleDrawerOpen}>
              <ChevronLeft />
            </IconButton>
          </>
        ) : (
          <IconButton size="small" onClick={toggleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      <List disablePadding sx={{ mt: 2 }}>
        {overviewItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Tooltip title={!drawerOpen ? item.label : ''} placement="right">
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mx: 1.5,
                  my: 0.5,
                  py: 1.2,
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.light}22`,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, mr: drawerOpen ? 2 : 'auto', justifyContent: 'center' }}
                >
                  {item.icon}
                </ListItemIcon>
                {drawerOpen && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Bottom Profile Card */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: theme.palette.grey[100],
            p: 1.5,
            borderRadius: 2,
          }}
        >
          <Avatar src="https://i.pravatar.cc/300" />
          {drawerOpen && (
            <Box>
              <Typography fontWeight={600} fontSize={14}>
                Mathew
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                Designer
              </Typography>
            </Box>
          )}
        </Box>
        <ListItemButton
          onClick={() => console.log('Logout')}
          sx={{
            borderRadius: 2,
            mt: 2,
            color: theme.palette.error.main,
            '&:hover': { backgroundColor: '#FDECEA' },
          }}
        >
          <ListItemIcon sx={{ color: theme.palette.error.main }}>
            <Logout />
          </ListItemIcon>
          {drawerOpen && (
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
            />
          )}
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: theme.palette.grey[50] }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: {
            sm: `calc(100% - ${drawerOpen ? drawerWidth : collapsedWidth}px)`,
          },
          ml: {
            sm: `${drawerOpen ? drawerWidth : collapsedWidth}px`,
          },
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(6px)',
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {lgDown && (
            <IconButton edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Menu Items */}
          <Stack direction="row" spacing={3} alignItems="center" sx={{ ml: 2 }}>
            <Button color="inherit" startIcon={<Apps />}>Apps</Button>
            <Button color="inherit">Chat</Button>
            <Button color="inherit">Calendar</Button>
            <Button color="inherit" startIcon={<Email />}>Email</Button>
          </Stack>

          {/* Right Side */}
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton><Language /></IconButton>
            <IconButton>
              <Badge color="error" variant="dot">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Avatar src="https://i.pravatar.cc/300" />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer Navigation */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerOpen ? drawerWidth : collapsedWidth }, flexShrink: 0 }}
        aria-label="sidebar"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerOpen ? drawerWidth : collapsedWidth,
              transition: 'width 0.3s',
              overflowX: 'hidden',
              boxSizing: 'border-box',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 10,
          backgroundColor: theme.palette.grey[50],
          width: {
            sm: `calc(100% - ${drawerOpen ? drawerWidth : collapsedWidth}px)`,
          },
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default RootLayout;
