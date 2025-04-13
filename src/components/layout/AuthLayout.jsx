/** @jsxImportSource @emotion/react */
import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import { css, keyframes } from "@emotion/react";

// Animated background gradient
const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Fade-in + slide-up animation
const fadeSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AuthLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      css={css`
        min-height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
        background: linear-gradient(
          -45deg,
          #1e3c72,
          #2a5298,
          #6a11cb,
          #2575fc
        );
        background-size: 400% 400%;
        animation: ${animatedGradient} 15s ease infinite;
        color: ${theme.palette.text.primary};
      `}
    >
      <Box
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(6px);
          background-color: rgba(255, 255, 255, 0.05);
          z-index: 0;
        `}
      />
      <Container
        maxWidth="lg"
        sx={{
          zIndex: 2,
          animation: `${fadeSlideUp} 1s ease-out`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Left Panel */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pr: { md: 6 },
              pb: { xs: 4, md: 0 },
              gap: 3,
              color: "white",
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="white">
              Remindly
            </Typography>

            {[
              {
                title: "⚡ Blazing Fast",
                text:
                  "Speed and simplicity built right in. Everything just works — instantly.",
              },
              {
                title: "🎯 Focused UX",
                text:
                  "Minimal clicks, maximum results. Tailored for productivity lovers.",
              },
              {
                title: "💡 Intelligent Features",
                text:
                  "From reminders to routines, Remindly adapts with AI-assisted logic.",
              },
              {
                title: "🛡️ Secure & Scalable",
                text:
                  "Enterprise-level infrastructure to keep your data safe and private.",
              },
            ].map(({ title, text }, i) => (
              <Stack key={i}>
                <Typography fontWeight="bold" variant="subtitle1" color="white">
                  {title}
                </Typography>
                <Typography color="rgba(255,255,255,0.75)">{text}</Typography>
              </Stack>
            ))}
          </Box>

          {/* Right Panel (Form Slot) */}
          <Box
            sx={{
              
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              mt: { xs: 4, md: 0 },
            }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
