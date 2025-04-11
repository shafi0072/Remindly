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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import MicIcon from '@mui/icons-material/Mic';
import ImageIcon from '@mui/icons-material/Image';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ChatScreen = () => {
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

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Thanks for your message!',
          time: new Date(),
        },
      ]);
    }, 1000);

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
    <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', bgcolor: '#f0f2f5' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#075E54', color: 'white', p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: '#25D366', mr: 2 }}>
          <SmartToyIcon />
        </Avatar>
        <Typography variant="h6">Remi (AI Assistant)</Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, i) => (
          <Stack key={i} direction={msg.sender === 'user' ? 'row-reverse' : 'row'} spacing={1} mb={2}>
            <Avatar sx={{ bgcolor: msg.sender === 'user' ? '#128C7E' : '#25D366' }}>
              {msg.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
            </Avatar>
            <Paper elevation={3} sx={{ p: 1.5, bgcolor: msg.sender === 'user' ? '#dcf8c6' : 'white', maxWidth: '70%' }}>
              {msg.image && (
                <Box mb={1}>
                  <img src={msg.image} alt="attachment" style={{ width: '100%', borderRadius: 8 }} />
                </Box>
              )}
              <Typography variant="body1">{msg.text}</Typography>
              <Typography variant="caption" color="gray">
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
          borderTop: '1px solid #ccc',
          bgcolor: 'white',
        }}
      >
        <TextField
          fullWidth
          placeholder={listening ? 'Listening...' : 'Type a message'}
          value={input || transcript}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <label htmlFor="icon-button-file">
                  <IconButton component="span" color="primary">
                    <ImageIcon />
                  </IconButton>
                </label>
                <IconButton onClick={handleVoiceToggle} color={listening ? 'error' : 'primary'}>
                  <MicIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton onClick={handleSend} color="primary" sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatScreen;
