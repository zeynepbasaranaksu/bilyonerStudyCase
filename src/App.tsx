import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { store } from './store';
import { authService } from './services/auth';
import { useAppDispatch } from './hooks/redux';
import { setUser, setLoading } from './store/slices/userSlice';
import Header from './components/Header/Header';
import BetBulletin from './pages/BetBulletin/BetBulletin';
import BetBasket from './pages/BetBasket/BetBasket';
import Login from './pages/Login/Login';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#10b981',
    },
    secondary: {
      main: '#059669',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
});

function AppContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flex: 1, paddingTop: 0 }}>
          <Routes>
            <Route path="/" element={<BetBulletin />} />
            <Route path="/basket" element={<BetBasket />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
