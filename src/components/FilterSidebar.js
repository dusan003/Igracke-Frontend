import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import { Typography, Button, Divider, FormControlLabel, Radio } from '@mui/material';

const FilterSidebar = ({ onFilter }) => {
  const [filters, setFilters] = React.useState({
    searchTerm: '',
    category: '',
    priceRange: '',
    sort: '', // 'asc' or 'desc' for sorting
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
    onFilter({ ...filters, [name]: value });
  };

  const handleSortChange = (event) => {
    setFilters({ ...filters, sort: event.target.value });
    onFilter({ ...filters, sort: event.target.value });
  };

  const applyFilters = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <Box sx={{ width: 300, padding: 2, borderRight: '3px solid #ccc' }}>
      <TextField
        label="Pretraga"
        name="searchTerm"
        value={filters.searchTerm}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Kategorija</InputLabel>
        <Select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <MenuItem value="">Sve kategorije</MenuItem>
          <MenuItem value="igracke">Igračke</MenuItem>
          <MenuItem value="cegeri">Cegeri</MenuItem>
          <MenuItem value="ostalo">Ostalo</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Cenovni opseg</InputLabel>
        <Select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleChange}
        >
          <MenuItem value="">Sve cene</MenuItem>
          <MenuItem value="0-1000">0-1000 RSD</MenuItem>
          <MenuItem value="1001-3000">1001-3000 RSD</MenuItem>
          <MenuItem value="3001-10000">3001-10000 RSD</MenuItem>
        </Select>
      </FormControl>

      {/* Sortiranje po ceni */}
      <Typography variant="subtitle1" sx={{ marginTop: 3 }}>
        Sortiranje po ceni
      </Typography>
      <RadioGroup
        name="sort"
        value={filters.sort}
        onChange={handleSortChange}
        sx={{ marginBottom: 2 }}
      >
        <FormControlLabel value="asc" control={<Radio />} label="Rastuće" />
        <FormControlLabel value="desc" control={<Radio />} label="Opadajuće" />
      </RadioGroup>

      <Divider sx={{ marginY: 2 }} />

      <Button variant="contained" color="primary" onClick={applyFilters} fullWidth>
        Primeni filtere
      </Button>
    </Box>
  );
};

export default FilterSidebar;
