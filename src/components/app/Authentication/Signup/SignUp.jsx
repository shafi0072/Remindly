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
  CheckCircle,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import MailSharpIcon from "@mui/icons-material/MailSharp";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import { css, keyframes } from "@emotion/react";
import { signUp } from "aws-amplify/auth";
import { Bounce, toast } from "react-toastify";

const fadeSlide = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const inputGlassStyle = css`
  label {
    color: #fff !important;
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
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.08);
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const SignUp = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    credentials.fullName &&
    credentials.email &&
    credentials.password.length >= 6 &&
    credentials.password === credentials.confirmPassword;

  const handleSignup = async () => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: credentials.email,
        password: credentials.password,
        options: {
          userAttributes: {
            email: credentials.email,
            name: credentials.fullName,
          },
        },
      });

      if (nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
        toast.success("Sign up successful, please verify your email.", {
          position: "top-right",
          autoClose: 5000,
          transition: Bounce,
        });

        router.push({
          pathname: "/auth/verify",
          query: { authId: credentials.email },
        });
      }
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
          Create Account
        </Typography>

        <TextField
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          value={credentials.fullName}
          onChange={handleCredentialsChange}
          fullWidth
          variant="outlined"
          margin="normal"
          css={inputGlassStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonSharpIcon sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Email"
          name="email"
          placeholder="email@example.com"
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

        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
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

        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          value={credentials.confirmPassword}
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
                {credentials.confirmPassword &&
                credentials.password === credentials.confirmPassword ? (
                  <CheckCircle color="success" />
                ) : (
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    edge="end"
                    sx={{ color: "#fff" }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={!isFormValid}
          onClick={handleSignup}
          sx={{
            mt: 3,
            mb: 1,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: 2,
            backgroundColor: "#fff",
            color: "#000",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#eaeaea",
              transform: "translateY(-1px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            },
          }}
        >
          Sign Up
        </Button>

        <Typography variant="body2" textAlign="center" mt={2} sx={{ color: "rgba(255,255,255,0.6)" }}>
          Already have an account?{" "}
          <Typography
            component="span"
            sx={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
            onClick={() => router.push("/auth/signin")}
          >
            Sign In
          </Typography>
        </Typography>

        <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.15)" }}>or</Divider>

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
          Sign Up with Google
        </Button>

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
          Sign Up with Facebook
        </Button>
      </Paper>
    </Box>
  );
};

export default SignUp;
