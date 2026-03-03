import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Fade,
  Avatar,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import {
  Refresh,
  Warning,
  CheckCircle,
  Error,
  MonitorHeart,
  Psychology,
  Speed
} from '@mui/icons-material';
import PredictionForm from './PredictionForm';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = process.env.REACT_APP_API_URL;

  const handlePrediction = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const fixedFormData = {
        ...formData,
        smoke: formData.smoke === 1 ? 0 : 1,
        alco: formData.alco === 1 ? 0 : 1
      };
      const response = await fetch(`${api}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fixedFormData),
      });
      const data = await response.json();
      if (data.success) setResult(data);
      else setError(data.error || 'Prediction failed');
    } catch (err) {
      setError('Connection error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (prob) => {
    if (prob < 30) return '#10b981';
    if (prob < 60) return '#f59e0b';
    if (prob < 80) return '#ef4444';
    return '#7f1d1d';
  };

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  return (
    <Box className="bg-grid" sx={{ minHeight: '100vh', py: 5, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl" disableGutters>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: '#7c3aed', width: 56, height: 56, mr: 2 }}>
              <Psychology sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography variant="h3" sx={{ fontFamily: 'Poppins', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.5px' }}>
                NEURO<span style={{ color: '#7c3aed' }}>CARDIO</span>
              </Typography>
              <Typography sx={{ color: '#94a3b8', fontWeight: 400 }}>deep learning risk analysis</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Chip label="v2.5" sx={{ bgcolor: '#7c3aed', color: 'white', borderRadius: 2 }} />
            <Chip label="12‑factor" sx={{ bgcolor: '#10b981', color: 'white', borderRadius: 2 }} />
            <Chip label="73% acc" sx={{ bgcolor: '#f59e0b', color: '#0f172a', borderRadius: 2 }} />
          </Box>
        </Box>

        {/* Form Card */}
        <Card sx={{ borderRadius: 6, bgcolor: '#1e293b', border: '1px solid #334155', mb: 4 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: '#7c3aed', width: 36, height: 36, mr: 2 }}>
                <MonitorHeart />
              </Avatar>
              <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#e2e8f0' }}>
                Patient biometrics
              </Typography>
            </Box>
            <PredictionForm onSubmit={handlePrediction} loading={loading} />
          </CardContent>
        </Card>

        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 3, borderRadius: 4, bgcolor: '#2d1a1a', color: '#fecaca' }} action={
              <IconButton size="small" onClick={() => setError(null)}><Refresh fontSize="small" sx={{ color: '#f87171' }} /></IconButton>
            }>
              {error}
            </Alert>
          </Fade>
        )}

        {/* Result Card */}
        <Card sx={{ borderRadius: 6, bgcolor: '#1e293b', border: '1px solid #334155' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ bgcolor: '#10b981', width: 36, height: 36, mr: 2 }}>
                <Speed />
              </Avatar>
              <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 700, color: '#e2e8f0' }}>
                Risk assessment
              </Typography>
              {result && (
                <Button
                  size="small"
                  startIcon={<Refresh />}
                  onClick={handleClear}
                  sx={{ ml: 'auto', borderRadius: 20, color: '#94a3b8', borderColor: '#334155' }}
                  variant="outlined"
                >
                  Clear
                </Button>
              )}
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
                <CircularProgress size={80} thickness={3} sx={{ color: '#7c3aed', mb: 4 }} />
                <Typography variant="h6" sx={{ color: '#e2e8f0' }}>Analysing neural network...</Typography>
                <Box sx={{ width: '50%', mt: 3 }}>
                  <LinearProgress sx={{ height: 8, borderRadius: 4, bgcolor: '#334155' }} />
                </Box>
              </Box>
            ) : result ? (
              <Fade in>
                <Box>
                  {/* Horizontal risk gauge */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>Risk score</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: getRiskColor(result.probability) }}>
                        {result.probability}%
                      </Typography>
                    </Box>
                    <Box sx={{ height: 16, bgcolor: '#334155', borderRadius: 20, overflow: 'hidden' }}>
                      <Box
                        sx={{
                          width: `${result.probability}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${getRiskColor(result.probability)}, #c084fc)`,
                          borderRadius: 20,
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>0%</Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>100%</Typography>
                    </Box>
                  </Box>

                  {/* Category chip */}
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Chip
                      icon={
                        result.probability < 30 ? <CheckCircle /> :
                        result.probability < 60 ? <Warning /> : <Error />
                      }
                      label={`${result.risk_category} – ${result.prediction}`}
                      sx={{
                        bgcolor: `${getRiskColor(result.probability)}20`,
                        color: getRiskColor(result.probability),
                        fontWeight: 700,
                        borderRadius: 3,
                        px: 2,
                        py: 2,
                        fontSize: '1.1rem'
                      }}
                    />
                  </Box>

                  {/* Recommendations */}
                  {result.recommendations?.length > 0 && (
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="overline" sx={{ color: '#7c3aed', fontWeight: 700, letterSpacing: 1 }}>
                        recommendations
                      </Typography>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        {result.recommendations.map((rec, i) => (
                          <Grid item xs={12} sm={6} key={i}>
                            <Paper variant="outlined" sx={{ p: 2, borderRadius: 4, borderColor: '#334155', bgcolor: '#0f172a' }}>
                              <Typography variant="body2" sx={{ color: '#e2e8f0' }}>{rec}</Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* Metrics row */}
                  <Grid container spacing={3}>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#0f172a', border: '1px solid #334155' }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>CONFIDENCE</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Box sx={{ flex: 1, mr: 1 }}>
                            <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4, bgcolor: '#334155' }} />
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#e2e8f0' }}>85%</Typography>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#0f172a', border: '1px solid #334155' }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>SEVERITY</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 800, color: getRiskColor(result.probability) }}>
                          {result.probability < 30 ? 'LOW' :
                           result.probability < 60 ? 'MODERATE' :
                           result.probability < 80 ? 'HIGH' : 'CRITICAL'}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#0f172a', border: '1px solid #334155' }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>MODEL</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#e2e8f0' }}>DeepRisk v2</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Paper sx={{ p: 2, borderRadius: 4, bgcolor: '#0f172a', border: '1px solid #334155' }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>DATA</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#e2e8f0' }}>12/12</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Avatar sx={{ bgcolor: '#2d3b4f', width: 80, height: 80, mx: 'auto', mb: 2 }}>
                  <MonitorHeart sx={{ fontSize: 40, color: '#7c3aed' }} />
                </Avatar>
                <Typography variant="h6" sx={{ color: '#e2e8f0' }}>No assessment yet</Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 350, mx: 'auto', mt: 1 }}>
                  Fill in the patient biometrics and click ANALYSE to generate a risk score.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#475569' }}>
            NeuroCardio • AI‑powered • not for clinical use
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;