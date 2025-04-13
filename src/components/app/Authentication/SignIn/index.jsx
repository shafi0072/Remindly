/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import {
  Google,
  Facebook,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import { useRouter } from "next/router";
import { css, keyframes } from "@emotion/react";
import { signIn } from "aws-amplify/auth";
import { Bounce, toast } from "react-toastify";

const fadeSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const inputGlassStyle = css`
  label {
    color: #fff !important; /* Always bright white */
    font-weight: 500;
  }

  input {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 12px;
  }

  .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    transition: 0.3s;
    color: #fff;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.4);
    }

    &.Mui-focused {
      border-color: transparent;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.3); /* soft white glow */
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
`;


const SignIn = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = credentials.email && credentials.password.length >= 6;

  const handleSignin = async () => {
    try {
      const response = await signIn({
        username: credentials.email,
        password: credentials.password,
      });

      toast.success("Signed in successfully", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });

      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        css={css`
          animation: ${fadeSlide} 0.6s ease-out;
        `}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Welcome Back
        </Typography>

        <Typography variant="body2" textAlign="center" mb={3} sx={{ color: "rgba(255,255,255,0.7)" }}>
          Sign in to continue using Remindly
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          placeholder="email@example.com"
          name="email"
          value={credentials.email}
          onChange={handleCredentialsChange}
          fullWidth
          variant="outlined"
          margin="normal"
          css={inputGlassStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailSharpIcon sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          placeholder="••••••••"
          name="password"
          type={showPassword ? "text" : "password"}
          value={credentials.password}
          onChange={handleCredentialsChange}
          fullWidth
          variant="outlined"
          margin="normal"
          css={inputGlassStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeySharpIcon sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  sx={{ color: "#fff" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Forgot Password */}
        <Typography
          variant="body2"
          textAlign="right"
          mt={1}
          sx={{ color: "rgba(255,255,255,0.6)", cursor: "pointer" }}
        >
          Forgot Password?
        </Typography>

        {/* Sign In Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={!isFormValid}
          onClick={handleSignin}
          sx={{
            mt: 3,
            mb: 1,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: 2,
            backgroundColor: "#ffffff",
            color: "#000",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#eaeaea",
              transform: "translateY(-1px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            },
          }}
        >
          Sign In
        </Button>

        {/* Redirect to Sign Up */}
        <Typography variant="body2" textAlign="center" mt={2} sx={{ color: "rgba(255,255,255,0.6)" }}>
          Don’t have an account?{" "}
          <Typography
            component="span"
            sx={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </Typography>
        </Typography>

        {/* Divider */}
        <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.15)" }}>or</Divider>

        {/* Google Sign In */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          sx={{
            mb: 1.5,
            py: 1.3,
            fontWeight: 500,
            borderRadius: 2,
            color: "#fff",
            borderColor: "rgba(255, 255, 255, 0.2)",
            "&:hover": {
              transform: "scale(1.01)",
              borderColor: "#fff",
            },
          }}
        >
          Sign In with Google
        </Button>

        {/* Facebook Sign In */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Facebook />}
          sx={{
            py: 1.3,
            fontWeight: 500,
            borderRadius: 2,
            color: "#fff",
            borderColor: "rgba(255, 255, 255, 0.2)",
            "&:hover": {
              transform: "scale(1.01)",
              borderColor: "#fff",
            },
          }}
        >
          Sign In with Facebook
        </Button>
      </Paper>
    </Box>
  );
};

export default SignIn;
