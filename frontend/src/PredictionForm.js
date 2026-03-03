import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  Calculate,
  RestartAlt,
  Height,
  FitnessCenter,
  Bloodtype,
  SmokingRooms,
  LocalDrink,
  DirectionsRun,
  MonitorHeart,
  Opacity,
  Female,
  Male
} from '@mui/icons-material';
import './App.css';

const PredictionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    gender: 2,
    height: 170,
    weight: 70,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: 1,
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 1,
    age: 50,
  });

  const [bmi, setBmi] = useState(24.22);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => {
      const newData = { ...prev, [field]: Number(value) };
      if (field === 'height' || field === 'weight') {
        const heightM = newData.height / 100;
        setBmi((newData.weight / (heightM * heightM)).toFixed(2));
      }
      return newData;
    });
  };

  const handleSliderChange = (field) => (_, newValue) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: newValue };
      if (field === 'height' || field === 'weight') {
        const heightM = newData.height / 100;
        setBmi((newData.weight / (heightM * heightM)).toFixed(2));
      }
      return newData;
    });
  };

  const handleSwitch = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.checked ? 1 : 0 }));
  };

  const handleReset = () => {
    setFormData({
      gender: 2,
      height: 170,
      weight: 70,
      ap_hi: 120,
      ap_lo: 80,
      cholesterol: 1,
      gluc: 1,
      smoke: 0,
      alco: 0,
      active: 1,
      age: 50,
    });
    setBmi(24.22);
  };

  const getBMICategory = (b) => {
    if (b < 18.5) return 'Underweight';
    if (b < 25) return 'Normal';
    if (b < 30) return 'Overweight';
    if (b < 35) return 'Obese I';
    if (b < 40) return 'Obese II';
    return 'Obese III';
  };

  const bmiCat = getBMICategory(bmi);
  const bmiColor = bmiCat === 'Normal' ? '#10b981' : bmiCat.includes('Overweight') ? '#f59e0b' : '#ef4444';

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#0f172a', border: '1px solid #334155', height: '100%' }}>
            <Typography variant="subtitle2" sx={{ color: '#7c3aed', fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#7c3aed', width: 24, height: 24, mr: 1, fontSize: 14 }}>1</Avatar>
              Demographics & physical
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled" sx={{ '& .MuiFilledInput-root': { bgcolor: '#1e293b', borderRadius: 3, border: '1px solid #334155' } }}>
                  <InputLabel>Gender</InputLabel>
                  <Select value={formData.gender} onChange={handleChange('gender')}>
                    <MenuItem value={1}><Box sx={{ display: 'flex', alignItems: 'center' }}><Female sx={{ mr: 1 }} /> Female</Box></MenuItem>
                    <MenuItem value={2}><Box sx={{ display: 'flex', alignItems: 'center' }}><Male sx={{ mr: 1 }} /> Male</Box></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>Age: {formData.age}</Typography>
                <Slider value={formData.age} onChange={handleSliderChange('age')} min={18} max={100} sx={{ color: '#7c3aed' }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  value={formData.height}
                  onChange={handleChange('height')}
                  variant="filled"
                  InputProps={{ startAdornment: <Height sx={{ color: '#94a3b8', mr: 1 }} /> }}
                  sx={{ '& .MuiFilledInput-root': { bgcolor: '#1e293b', borderRadius: 3 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange('weight')}
                  variant="filled"
                  InputProps={{ startAdornment: <FitnessCenter sx={{ color: '#94a3b8', mr: 1 }} /> }}
                  sx={{ '& .MuiFilledInput-root': { bgcolor: '#1e293b', borderRadius: 3 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: '#1e293b', borderRadius: 4, border: '1px solid #334155' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>BMI</Typography>
                    <Chip label={`${bmi} (${bmiCat})`} size="small" sx={{ bgcolor: `${bmiColor}20`, color: bmiColor, fontWeight: 600 }} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 4, bgcolor: '#0f172a', border: '1px solid #334155', height: '100%' }}>
            <Typography variant="subtitle2" sx={{ color: '#7c3aed', fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#7c3aed', width: 24, height: 24, mr: 1, fontSize: 14 }}>2</Avatar>
              Vitals & lifestyle
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>Systolic: {formData.ap_hi}</Typography>
                <Slider value={formData.ap_hi} onChange={handleSliderChange('ap_hi')} min={80} max={200} sx={{ color: '#7c3aed' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>Diastolic: {formData.ap_lo}</Typography>
                <Slider value={formData.ap_lo} onChange={handleSliderChange('ap_lo')} min={50} max={120} sx={{ color: '#7c3aed' }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="filled" sx={{ '& .MuiFilledInput-root': { bgcolor: '#1e293b', borderRadius: 3 } }}>
                  <InputLabel>Cholesterol</InputLabel>
                  <Select value={formData.cholesterol} onChange={handleChange('cholesterol')}>
                    <MenuItem value={1}>Normal</MenuItem>
                    <MenuItem value={2}>Elevated</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="filled" sx={{ '& .MuiFilledInput-root': { bgcolor: '#1e293b', borderRadius: 3 } }}>
                  <InputLabel>Glucose</InputLabel>
                  <Select value={formData.gluc} onChange={handleChange('gluc')}>
                    <MenuItem value={1}>Normal</MenuItem>
                    <MenuItem value={2}>Elevated</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ borderColor: '#334155', my: 1 }} />
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: formData.smoke ? '#2d1a1a' : '#1e293b', borderRadius: 4, border: '1px solid #334155' }}>
                      <FormControlLabel
                        control={<Switch checked={formData.smoke === 1} onChange={handleSwitch('smoke')} color="warning" />}
                        label={<Box><SmokingRooms sx={{ fontSize: 28, color: formData.smoke ? '#f59e0b' : '#64748b' }} /><Typography variant="caption" display="block">Smoke</Typography></Box>}
                        labelPlacement="bottom"
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: formData.alco ? '#2d1a1a' : '#1e293b', borderRadius: 4, border: '1px solid #334155' }}>
                      <FormControlLabel
                        control={<Switch checked={formData.alco === 1} onChange={handleSwitch('alco')} color="warning" />}
                        label={<Box><LocalDrink sx={{ fontSize: 28, color: formData.alco ? '#f59e0b' : '#64748b' }} /><Typography variant="caption" display="block">Alcohol</Typography></Box>}
                        labelPlacement="bottom"
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: formData.active ? '#1a2e2a' : '#1e293b', borderRadius: 4, border: '1px solid #334155' }}>
                      <FormControlLabel
                        control={<Switch checked={formData.active === 1} onChange={handleSwitch('active')} color="success" />}
                        label={<Box><DirectionsRun sx={{ fontSize: 28, color: formData.active ? '#10b981' : '#64748b' }} /><Typography variant="caption" display="block">Active</Typography></Box>}
                        labelPlacement="bottom"
                        sx={{ m: 0 }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Action bar */}
      <Paper sx={{ mt: 4, p: 3, borderRadius: 4, bgcolor: '#0f172a', border: '1px solid #334155' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              <Bloodtype sx={{ verticalAlign: 'middle', mr: 1, fontSize: 20, color: '#7c3aed' }} />
              All 12 parameters are ready. Click Analyse to run deep learning model.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button variant="outlined" startIcon={<RestartAlt />} onClick={handleReset} disabled={loading} sx={{ borderRadius: 40, borderColor: '#334155', color: '#e2e8f0' }}>
                Reset
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                startIcon={<Calculate />}
                loading={loading}
                loadingPosition="start"
                className="cyber-button"
                onClick={() => onSubmit(formData)}
              >
                Analyse
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PredictionForm;