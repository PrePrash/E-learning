"use client";

import { Box, Typography, Link, Stack, IconButton, Container } from "@mui/material";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  School,
  Email,
  Phone,
  LocationOn
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
        }
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 20%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 20%)
          `,
          zIndex: 0
        }}
      />
      
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          {/* Logo and description */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <School sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold">
              E-Learning Platform
            </Typography>
          </Stack>
          
          <Typography variant="body1" sx={{ maxWidth: 500, textAlign: 'center', opacity: 0.9 }}>
            Empowering learners worldwide with high-quality education and innovative learning solutions.
          </Typography>
          
          {/* Links and contact info */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 3, sm: 6 }}
            alignItems="center"
          >
            {/* Quick links */}
            <Stack spacing={1} alignItems="center">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Links
              </Typography>
              <Stack direction={{ xs: 'row', sm: 'column' }} spacing={{ xs: 2, sm: 1 }}>
                <Link 
                  href="/About" 
                  underline="none" 
                  color="inherit"
                  sx={{
                    opacity: 0.8,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  About
                </Link>
                <Link 
                  href="/Course" 
                  underline="none" 
                  color="inherit"
                  sx={{
                    opacity: 0.8,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  Courses
                </Link>
                <Link 
                  href="/Contact" 
                  underline="none" 
                  color="inherit"
                  sx={{
                    opacity: 0.8,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  Contact
                </Link>
                <Link 
                  href="/privacy" 
                  underline="none" 
                  color="inherit"
                  sx={{
                    opacity: 0.8,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  Privacy Policy
                </Link>
              </Stack>
            </Stack>
            
            {/* Contact info */}
            <Stack spacing={1} alignItems="center">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Us
              </Typography>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Email sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    support@elearning.com
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Phone sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    +1 (555) 123-4567
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOn sx={{ fontSize: 18 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Education Street 123, Learning City
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          
          {/* Social media */}
          <Stack spacing={2} alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                sx={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                sx={{
                  color: 'white',
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-3px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <LinkedIn />
              </IconButton>
            </Stack>
          </Stack>
          
          {/* Copyright */}
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3, width: '100%' }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} E-Learning Platform. All rights reserved.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}