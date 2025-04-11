'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
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
  Avatar,
  Stack,
  Tooltip,
} from "@mui/material";

import {
  Menu as MenuIcon,
  ChevronLeft,
  Language,
  Notifications,
  Settings,
  AccountBalance,
} from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 280;
const collapsedWidth = 70;

const overviewItems = [
  { icon: <CalendarMonthIcon />, label: "Calander", path: "/calendar" },
  { icon: <EventIcon />, label: "My Reminders", path: "/reminders" },
  { icon: <ChatIcon />, label: "Remi Chat", path: "/chat" },
  { icon: <AccountBalance />, label: "Finance", path: "/finance" },
  { icon: <SettingsIcon />, label: "Settings", path: "/settings" },
];

const RootLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const router = useRouter();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const toggleDrawerOpen = () => setDrawerOpen((prev) => !prev);

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: drawerOpen ? "space-between" : "center",
          px: 2,
        }}
      >
        {drawerOpen ? (
          <>
            <Typography
              color="#4CAF50"
              fontSize={"24px"}
              fontWeight={"bold"}
              noWrap
            >
              Remindly
            </Typography>
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
      <Divider />
      <Typography
        sx={{
          px: drawerOpen ? 2 : 0,
          mt: 3,
          mb: 1,
          color: "text.secondary",
          fontWeight: 700,
          fontSize: "0.75rem",
          textAlign: drawerOpen ? "left" : "center",
        }}
      >
        {drawerOpen ? "OVERVIEW" : " "}
      </Typography>
      <List disablePadding>
        {overviewItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ px: 1 }}>
            <Tooltip title={!drawerOpen ? item.label : ""} placement="right">
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: "8px",
                  mx: 1,
                  py: 1.2,
                  justifyContent: drawerOpen ? "initial" : "center",
                  "&:hover": {
                    backgroundColor: "#E6F7F1",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 2 : "auto",
                    justifyContent: "center",
                  }}
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
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: {
            sm: `calc(100% - ${
              drawerOpen ? drawerWidth : collapsedWidth
            }px)`,
          },
          ml: {
            sm: `${drawerOpen ? drawerWidth : collapsedWidth}px`,
          },
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <Language />
            </IconButton>
            <IconButton>
              <Notifications />
            </IconButton>
            <IconButton>
              <Settings />
            </IconButton>
            <Avatar alt="User" src="https://i.pravatar.cc/300" />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerOpen ? drawerWidth : collapsedWidth } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop mini drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerOpen ? drawerWidth : collapsedWidth,
              boxSizing: "border-box",
              overflowX: "hidden",
              transition: "width 0.3s ease",
              borderRight: "1px solid #e0e0e0",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${
              drawerOpen ? drawerWidth : collapsedWidth
            }px)`,
          },
          background: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default RootLayout;
