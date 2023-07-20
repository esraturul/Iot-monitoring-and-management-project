import React from 'react';
import { Outlet } from 'react-router-dom';
import MiniDrawer from '../components/MiniDrawer';

function Layout() {
  return (
    <div className="App">
      <MiniDrawer/>
      <Outlet/>
    </div>
  )
}

export default Layout