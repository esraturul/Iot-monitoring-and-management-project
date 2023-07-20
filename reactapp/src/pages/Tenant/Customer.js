import React ,{useState} from 'react'
import Table from '../../components/tenant/TableMüşteri';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Modal from '../../components/tenant/Modal';
import {Search,SearchIconWrapper,StyledInputBase} from '../../components/Search';


function Customer() {const [search,setSearch]=useState();
  return (
    <Box component='div' className='home' >
        <div className='baslik'>
            Kullanıcılar
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
           
           <Modal baslik={"KULLANICI"}/>
        </div>
        
        <Table parametre={search}/>
      
    </Box>
  )
}

export default Customer