'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  TextField,
  Typography,
} from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { IconCheck } from '@tabler/icons-react';
import BlankCard from '../../core/shared/BlankCard';
import Events from '../../../../pages/api/calendar/EventData';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';

moment.locale('en-gb');
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [calevents, setCalEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [slot, setSlot] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [color, setColor] = useState('default');
  const [update, setUpdate] = useState();

  useEffect(() => {
    setCalEvents(Events);
  }, []);

  const ColorVariation = [
    { id: 1, eColor: '#1a97f5', value: 'default' },
    { id: 2, eColor: '#39b69a', value: 'green' },
    { id: 3, eColor: '#fc4b6c', value: 'red' },
    { id: 4, eColor: '#615dff', value: 'azure' },
    { id: 5, eColor: '#fdd43f', value: 'warning' },
  ];

  const colorMap = {
    default: '#1a97f5',
    green: '#39b69a',
    red: '#fc4b6c',
    azure: '#615dff',
    warning: '#fdd43f',
  };

  const addNewEventAlert = (slotInfo) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const editEvent = (event) => {
    setOpen(true);
    const found = calevents.find((e) => e.title === event.title);
    setTitle(found.title);
    setColor(found.color);
    setStart(found.start);
    setEnd(found.end);
    setUpdate(event);
  };

  const updateEvent = (e) => {
    e.preventDefault();
    const updated = calevents.map((item) =>
      item.title === update.title ? { ...item, title, start, end, color } : item
    );
    setCalEvents(updated);
    resetForm();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setCalEvents([...calevents, { title, start, end, color }]);
    resetForm();
  };

  const deleteHandler = (event) => {
    setCalEvents(calevents.filter((item) => item.title !== event.title));
    resetForm();
  };

  const resetForm = () => {
    setOpen(false);
    setTitle('');
    setColor('default');
    setStart('');
    setEnd('');
    setUpdate(null);
  };

  const eventColors = (event) => {
    const baseColors = {
      default: '#1a97f5',
      green: '#39b69a',
      red: '#fc4b6c',
      azure: '#615dff',
      warning: '#fdd43f',
    };
  
    const bgHex = baseColors[event.color] || baseColors.default;
  
    // Convert HEX to RGBA with alpha
    const hexToRgba = (hex, alpha = 0.2) => {
      const bigint = parseInt(hex.replace('#', ''), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
  
    const bg = hexToRgba(bgHex, 0.2); // 20% opacity
    const textColor = event.color === 'warning' ? 'black' : baseColors[event.color] || '#1a97f5';
  
    return {
      style: {
        backgroundColor: bg,
        color: textColor,
        padding: '4px 6px',
        borderRadius: '6px',
        fontWeight: 600,
      },
    };
  };
  

  return (
    <>
      <BlankCard>
        <CardContent>
          <Calendar
            selectable
            events={calevents}
            defaultView="month"
            localizer={localizer}
            style={{ height: 'calc(100vh - 300px)' }}
            onSelectEvent={editEvent}
            onSelectSlot={addNewEventAlert}
            eventPropGetter={eventColors}
          />
        </CardContent>
      </BlankCard>

      <Dialog open={open} onClose={resetForm} fullWidth maxWidth="xs">
        <form onSubmit={update ? updateEvent : submitHandler}>
          <DialogContent>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {update ? 'Update Event' : 'Add Event'}
            </Typography>
            <Typography mb={3} variant="subtitle2">
              {!update
                ? 'To add Event kindly fill up the title and choose the event color and press the add button'
                : 'To edit/update event kindly change the title and choose the event color and press the update button'}
            </Typography>

            <TextField
              label="Event Title"
              fullWidth
              variant="outlined"
              value={title}
              sx={{ mb: 3 }}
              onChange={(e) => setTitle(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={start}
                onChange={(val) => setStart(val)}
                slotProps={{ textField: { fullWidth: true, sx: { mb: 3 } } }}
              />
              <DatePicker
                label="End Date"
                value={end}
                onChange={(val) => setEnd(val)}
                slotProps={{ textField: { fullWidth: true, sx: { mb: 3 } } }}
              />
            </LocalizationProvider>

            <Typography variant="h6" fontWeight={600} my={2}>
              Select Event Color
            </Typography>

            {ColorVariation.map((mcolor) => (
              <Fab
                key={mcolor.id}
                color="primary"
                size="small"
                style={{ backgroundColor: mcolor.eColor }}
                sx={{
                  marginRight: 1,
                  transition: '0.1s ease-in',
                  scale: mcolor.value === color ? '0.9' : '0.7',
                }}
                onClick={() => setColor(mcolor.value)}
              >
                {mcolor.value === color ? <IconCheck width={16} /> : ''}
              </Fab>
            ))}
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button onClick={resetForm}>Cancel</Button>
            {update && (
              <Button type="button" color="error" variant="contained" onClick={() => deleteHandler(update)}>
                Delete
              </Button>
            )}
            <Button type="submit" disabled={!title} variant="contained">
              {update ? 'Update Event' : 'Add Event'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default BigCalendar;
