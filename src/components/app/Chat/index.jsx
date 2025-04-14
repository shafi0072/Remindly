'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  Stack,
  InputAdornment,
  useTheme,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import MicIcon from '@mui/icons-material/Mic';
import ImageIcon from '@mui/icons-material/Image';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import BlankCard from '../../core/shared/BlankCard';

const ChatScreen = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I assist you today?', time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleSend = () => {
    if (!input.trim() && !image) return;

    const newMsg = {
      sender: 'user',
      text: input || transcript,
      time: new Date(),
      image: image,
    };

    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Thanks for your message!',
          time: new Date(),
        },
      ]);
    }, 800);

    setInput('');
    setImage(null);
    resetTranscript();
  };

  const handleVoiceToggle = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support voice recognition.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setInput(transcript);
    } else {
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <BlankCard
      
    >
      <Box
        sx={{
          width: '100%',
        
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backdropFilter: 'blur(14px)',
          background: 'rgba(121, 47, 210, 0.2)', // Remindly purple with opacity
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backdropFilter: 'blur(6px)',
            background: 'rgba(121, 47, 210, 0.5)',
            color: '#fff',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          <Avatar sx={{ bgcolor: '#A2DBDF' }}>
            <SmartToyIcon />
          </Avatar>
          <Typography variant="h6" fontWeight={600}>
            Remi – AI Assistant
          </Typography>
        </Box>

        {/* Chat Area */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            background: 'transparent',
          }}
        >
          {messages.map((msg, i) => (
            <Stack
              key={i}
              direction={msg.sender === 'user' ? 'row-reverse' : 'row'}
              alignItems="flex-start"
              spacing={1.5}
            >
              <Avatar
                sx={{
                  bgcolor: msg.sender === 'user' ? '#792FD2' : '#A2DBDF',
                }}
              >
                {msg.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
              </Avatar>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: '16px',
                  maxWidth: '70%',
                  background: msg.sender === 'user' ? '#ECE3F0' : '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                {msg.image && (
                  <Box mb={1}>
                    <img
                      src={msg.image}
                      alt="attachment"
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </Box>
                )}
                <Typography variant="body1" fontWeight={500}>
                  {msg.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}
                >
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Paper>
            </Stack>
          ))}
        </Box>

        {/* Input */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <TextField
            fullWidth
            placeholder={listening ? 'Listening...' : 'Type a message'}
            value={input || transcript}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: '#FAFAFA',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <input
                    accept="image/*"
                    id="chat-image-upload"
                    type="file"
                    hidden
                    onChange={handleImageChange}
                  />
                  <label htmlFor="chat-image-upload">
                    <IconButton component="span" color="primary">
                      <ImageIcon />
                    </IconButton>
                  </label>
                  <IconButton
                    onClick={handleVoiceToggle}
                    color={listening ? 'error' : 'primary'}
                  >
                    <MicIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            onClick={handleSend}
            sx={{
              ml: 1,
              bgcolor: '#792FD2',
              color: '#fff',
              '&:hover': {
                bgcolor: '#5a23a9',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </BlankCard>
  );
};

export default ChatScreen;
