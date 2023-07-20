import React from 'react'
import { useParams } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from 'react';
import TableGösterge from '../components/TableGosterge';

const Search = styled('div')(({ theme }) => ({
  display:'flex',
  
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginTop:-35,
  marginRight: theme.spacing(2),
  marginLeft: 110,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft:110,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  marginLeft:110,
  border:'1px solid #ccc',
  borderRadius:8,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



function Dashboard() {
  const [search,setSearch]=useState();

  return (
    <div>
      <div className='Device'></div>
        <div className='Icons'> 
        <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{color: "#595959"}} />
            </SearchIconWrapper>
            <StyledInputBase
            sx={{color: "#595959"}}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearch(e.target.value)}    
            />
          </Search>
        </div>
        <TableGösterge parametre={search}/>
    </div>
  )
}

export default Dashboard