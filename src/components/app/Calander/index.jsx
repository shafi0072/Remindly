'use client';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const GoogleCalendarModern = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [events, setEvents] = useState([
    { title: 'Client Meeting', start: '2025-04-11' },
    { title: 'Design Review', start: '2025-04-15' },
  ]);

  const theme = useTheme();

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setOpen(true);
  };

  const handleAddEvent = () => {
    if (newTitle) {
      setEvents([...events, { title: newTitle, start: selectedDate }]);
      setOpen(false);
      setNewTitle('');
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Remindly Calendar
      </Typography>
      <Paper elevation={4} sx={{  p: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          height="80vh"
          initialView="dayGridMonth"
          events={events}
          selectable={true}
          editable={true}
          dateClick={handleDateClick}
        />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Title"
            fullWidth
            variant="outlined"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEvent}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GoogleCalendarModern;
