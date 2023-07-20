import Box from '@mui/material/Box';
import Modal from '../../components/tenant/Modal';
import {Search,SearchIconWrapper,StyledInputBase} from '../../components/Search';
import React, { useState } from 'react';


function Device() {
  const [search,setSearch]=useState();
  return (
    <Box component='div' className='home' >
        <div className='baslik'>
            Cihazlar
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
           
           <Modal baslik={"CİHAZ"}/>
        </div>
        
        <Table parametre={search}/>
      
    </Box>
  )
}

export default Device