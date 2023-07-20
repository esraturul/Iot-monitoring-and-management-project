import React,{useState} from 'react'
import Table from '../../components/tenant/Table';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '../../components/tenant/Modal';



import {Search,SearchIconWrapper,StyledInputBase} from '../../components/Search';
import { Button } from '@mui/material';



function Dashboard() {
    const [search,setSearch]=useState();
  return (
    <Box component='div' className='home' >
        <div className='baslik'>
            Gösterge Panelleri
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
          
          <Modal baslik={'GÖSTERGE'}/>
            
      
          
         
         
          
                
        </div>
        
        <Table parametre={search}/>
      
    </Box>
  )
}

export default Dashboard