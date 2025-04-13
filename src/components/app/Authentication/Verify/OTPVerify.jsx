/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Stack,
} from "@mui/material";
import { css, keyframes } from "@emotion/react";
import { useRouter } from "next/router";
import { confirmSignUp } from "aws-amplify/auth";
import { Bounce, toast } from "react-toastify";

// Fade in animation
const fadeSlide = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// OTP input box style
const otpInputStyle = css`
  input {
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 12px;
  }

  .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    transition: all 0.25s ease;
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

  label {
    color: #fff;
  }
`;

const OTPVerify = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const { authId } = router.query;

  const handleChange = (element, index) => {
    const value = element.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    if (!value) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    try {
      const fullOtp = otp.join("");
      await confirmSignUp({
        username: authId,
        confirmationCode: fullOtp,
      });

      toast.success("Verification Successful", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });

      router.push("/auth/signin");
    } catch (err) {
      toast.error(err?.message || "Verification failed", {
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
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Verify OTP
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.7)" }}
          textAlign="center"
          mb={3}
        >
          Please enter the 6-digit code sent to your email.
        </Typography>

        <Stack direction="row" spacing={1} justifyContent="center" mb={3}>
          {otp.map((data, index) => (
            <TextField
              key={index}
              inputRef={(ref) => (inputsRef.current[index] = ref)}
              value={data}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              variant="outlined"
              css={otpInputStyle}
              inputProps={{ maxLength: 1 }}
              sx={{ width: 50 }}
            />
          ))}
        </Stack>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={otp.join("").length !== 6}
          sx={{
            mt: 1,
            py: 1.4,
            fontWeight: 600,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            color: "#000",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              backgroundColor: "#eaeaea",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            },
          }}
        >
          Verify
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          mt={3}
          sx={{ color: "rgba(255,255,255,0.7)" }}
        >
          Didn’t receive the code?{" "}
          <Typography
            component="span"
            sx={{ color: "#fff", fontWeight: 500, cursor: "pointer" }}
          >
            Resend
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default OTPVerify;
