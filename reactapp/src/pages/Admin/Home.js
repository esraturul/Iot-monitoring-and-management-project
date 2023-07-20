import React ,{useState} from 'react'
import Table from '../../components/admin/Table';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Modal from '../../components/admin/Modal';
import {Search,SearchIconWrapper,StyledInputBase} from '../../components/Search';
import { useAdmin } from '../../Context/AdminContext';

function Home() {
    const [search,setSearch]=useState();

  
    return (
        <Box component='div' className='home' >
            <div className='baslik'>
                Tenantlar
            </div>
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
               
               <Modal/>
            </div>
            
            <Table parametre={search}/>
          
        </Box>
      )
  
}

export default Home
