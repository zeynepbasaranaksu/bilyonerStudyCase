import React from 'react';
import { motion } from 'framer-motion';
import { TextField, Box, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  searchBar: {
    position: 'relative',
    maxWidth: 500,
    margin: '0 auto',
    '& .MuiOutlinedInput-root': {
      borderRadius: '25px',
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.2)',
        transform: 'translateY(-2px)',
      },
      '&.Mui-focused': {
        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.2)',
        transform: 'translateY(-2px)',
      },
    },
  },
  clearButton: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#e74c3c',
    color: 'white',
    '&:hover': {
      backgroundColor: '#c0392b',
      transform: 'translateY(-50%) scale(1.1)',
    },
  },
}));

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
  const { classes } = useStyles();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box className={classes.searchBar}>
        <TextField
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: '#7f8c8d' }} />,
            endAdornment: value && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <IconButton
                  className={classes.clearButton}
                  onClick={() => onChange('')}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </motion.div>
            ),
          }}
        />
      </Box>
    </motion.div>
  );
};

export default SearchBar;
