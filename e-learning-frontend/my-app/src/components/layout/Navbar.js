"use client";

import { AppBar, Toolbar, Typography, Button, Stack, Box, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import Link from "next/link";
import useStore from "../../lib/store";
import { useEffect, useState } from "react";
import { 
  Menu as MenuIcon,
  AccountCircle,
  School,
  Dashboard,
  ExitToApp
} from "@mui/icons-material";
import { useAuth } from "@/context/authContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile ] = useState(null);
  const [dashbaord, setDashboard] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  useEffect(()=>{
    const role = localStorage.getItem("role");
    if(role == "student")
    {
      setProfile("/student/profile");
    }
    else{
      setProfile("/instructor/profile");
    }
  },[])
  return (
    <AppBar 
      position="sticky" 
      elevation={4}
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between",
        py: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <School sx={{ mr: 1, fontSize: 28 }} />
          <Typography 
            variant="h6" 
            component={Link} 
            href="/" 
            sx={{ 
              color: "white", 
              textDecoration: "none",
              fontWeight: 700,
              fontSize: '1.5rem',
              background: 'linear-gradient(45deg, #fff, #e0e7ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease'
              }
            }}
          >
            E-Learning
          </Typography>
        </Box>
        
        {!user && (
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            <Button 
              color="inherit" 
              component={Link} 
              href="/Course"
              sx={{
                fontWeight: 500,
                '&:hover': {
                  color: '#e0e7ff'
                },
                transition: 'color 0.3s ease'
              }}
            >
              Courses
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              href="/Features"
              sx={{
                fontWeight: 500,
                '&:hover': {
                  color: '#e0e7ff'
                },
                transition: 'color 0.3s ease'
              }}
            >
              Features
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              href="/Contact"
              sx={{
                fontWeight: 500,
                '&:hover': {
                  color: '#e0e7ff'
                },
                transition: 'color 0.3s ease'
              }}
            >
              Contact
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              href="/About"
              sx={{
                fontWeight: 500,
                '&:hover': {
                  color: '#e0e7ff'
                },
                transition: 'color 0.3s ease'
              }}
            >
              About
            </Button>
          </Box>
        )}
        
        <Stack direction="row" spacing={2} alignItems="center">
          {!user ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                href="/auth/login"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                href="/auth/register"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                href={user.role == "student" ? "/student" : "/instructor/dashboard"}
                startIcon={<Dashboard />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 0.3s ease',
                  display: { xs: 'none', sm: 'flex' }
                }}
              >
            {user.role == "student" ? "Browse-Courses" : "My-Courses"}
              </Button>
              
              <IconButton
                onClick={handleMenu}
                sx={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {"https://avatar.iran.liara.run/public/7" ? (
                  <Avatar src={"https://avatar.iran.liara.run/public/7"} sx={{ width: 32, height: 32 }} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    mt: 1.5,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    minWidth: 180,
                    '& .MuiMenuItem-root': {
                      py: 1.5,
                      px: 2,
                      '&:hover': {
                        background: 'rgba(103, 126, 234, 0.1)'
                      }
                    }
                  }
                }}
              >
                <MenuItem onClick={handleClose} component={Link} href={profile}>
                  <AccountCircle sx={{ mr: 1.5, color: 'text.secondary' }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} href={user.role == "student" ? "/student/dashboard" : "/instructor/dashboard"}>
                  <Dashboard sx={{ mr: 1.5, color: 'text.secondary' }} />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1.5, color: 'text.secondary' }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}