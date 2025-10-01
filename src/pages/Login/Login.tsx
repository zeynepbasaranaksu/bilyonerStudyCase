import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { authService } from '../../services/auth';
import { setUser, setError } from '../../store/slices/userSlice';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Container
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  loginPage: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  loginContainer: {
    width: '100%',
    maxWidth: 400,
  },
  loginCard: {
    background: 'white',
    borderRadius: 20,
    padding: theme.spacing(3),
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  logo: {
    fontSize: '2.5rem',
    marginBottom: theme.spacing(0.5),
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  title: {
    fontSize: '1.8rem',
    color: '#2c3e50',
    marginBottom: theme.spacing(0.5),
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#7f8c8d',
    marginBottom: theme.spacing(2),
    lineHeight: 1.5,
  },
  form: {
    textAlign: 'left',
  },
  formGroup: {
    marginBottom: theme.spacing(1.5),
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: theme.spacing(1),
    borderRadius: 10,
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    '&:hover': {
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
      transform: 'translateY(-2px)',
    },
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
  footer: {
    textAlign: 'center',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#10b981',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: 'inherit',
    '&:hover': {
      color: '#059669',
    },
  },
  errorMessage: {
    marginBottom: theme.spacing(1.5),
  },
}));

const Login = () => {
  const { classes } = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setError(null));

    try {
      let user;
      if (isLogin) {
        user = await authService.signIn(email, password);
      } else {
        user = await authService.signUp(email, password);
      }

      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
        
        navigate('/');
      }
    } catch (error: unknown) {
      dispatch(setError(error instanceof Error ? error.message : 'Authentication failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={classes.loginPage}>
      <Container maxWidth="sm" className={classes.loginContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className={classes.loginCard}>
            <CardContent>
              <Typography variant="h3" className={classes.logo}>
                Spor Bahisleri
              </Typography>
              <Typography variant="h4" className={classes.title}>
                {isLogin ? 'Tekrar Hoş Geldiniz' : 'Hesap Oluştur'}
              </Typography>
              <Typography variant="body1" className={classes.subtitle}>
                {isLogin
                  ? 'Favori sporlarınıza bahis yapmak için giriş yapın'
                  : 'Bize katılın ve bahis yolculuğunuza başlayın'}
              </Typography>

              <Box component="form" onSubmit={handleSubmit} className={classes.form}>
                <Box className={classes.formGroup}>
                  <TextField
                    fullWidth
                    type="email"
                    label="E-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="E-postanızı girin"
                    variant="outlined"
                  />
                </Box>

                <Box className={classes.formGroup}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Şifrenizi girin"
                    inputProps={{ minLength: 6 }}
                    variant="outlined"
                  />
                </Box>

                {error && (
                  <Alert severity="error" className={classes.errorMessage}>
                    {error}
                  </Alert>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className={classes.submitButton}
                    disabled={loading}
                    fullWidth
                    variant="contained"
                  >
                    {loading ? 'Lütfen bekleyin...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
                  </Button>
                </motion.div>
              </Box>

              <Box className={classes.footer}>
                <Typography variant="body2">
                  {isLogin ? "Hesabınız yok mu? " : 'Zaten hesabınız var mı? '}
                  <button
                    className={classes.toggleButton}
                    onClick={() => setIsLogin(!isLogin)}
                    type="button"
                  >
                    {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
                  </button>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;
