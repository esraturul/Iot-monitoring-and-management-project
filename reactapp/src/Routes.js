import Home from './pages/Home';
import Devices from './pages/Device';
import DashList from './pages/Dashboard';
import Layout from './pages/Layout';
import Page404 from './pages/Page404';
import Login from './pages/Auth/Login';
import AuthLayout from './pages/Auth/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import TenantProtectedRoute from './components/TenantProtectedRoute';
import Dashboard from './pages/Dash';
import TenantHome from './pages/Tenant/Home';
import TenantCustomer from './pages/Tenant/Customer';
import TenantDevices from './pages/Tenant/Device';
import TenantDash from './pages/Tenant/Dashboard';
import TenantGosterge from './pages/Tenant/Gosterge';
import AdminHome from './pages/Admin/Home';
import Kutuphane from './pages/Admin/Kutuphane';
import AdminProtectedRoute from './components/AdminProtectedRoute';

/*
<Routes>
    
      <Route path='/' element={<ProtectedRoute><Layout/></ProtectedRoute>}>
          <Route index={true} element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='cihazlar' element={<ProtectedRoute><Devices/></ProtectedRoute>}/>
          <Route path='gostergeler' element={<ProtectedRoute><DashList/></ProtectedRoute>}/>
          <Route path='gostergeler/:cihazName' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>   
       </Route>

      <Route path='/auth' element={<AuthLayout/>}>
        <Route path='login' element={<Login/>}/>
      </Route>
      <Route path='*' element={<Page404/>}/>
    </Routes>
    */
const routes=[
    {
        path:"/",
        element:<Layout/>,
        auth: true,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path:"cihazlar",
                element:<Devices/>
            },
            {
                path:"gostergeler", 
                children:[
                    {
                        index:true,
                        element:<DashList/>,

                    },
                    {
                        path:":cihazName",
                        element:<Dashboard/>
                    }
                ]
            },
          

        ]
    },
    {
        path:"/tenant",
        element:<Layout/>,
        auth:"tenant",
        children:[
            {
                index:true,
                element:<TenantHome/>
            },
            {
                path:'musteriler',
                element:<TenantCustomer/>
            },
            {
                path:'cihazlar',
                element:<TenantDevices/>
            },
            {
                path:'gostergeler',
                children:[
                    {
                        index:true,
                        element:<TenantDash/>
                    },
                    {
                        path:":gostergeID",
                        element:<TenantGosterge/>
                    }
                ]
            }

        ]
    },
    {
        path:"/admin",
        element:<Layout/>,
        auth:"admin",
        children:[
            {
                index:true,
                element:<AdminHome/>
            },
            {
                path:"GostergeKutuphanesi",
                element:<Kutuphane/>
            }
        ]
    },
    {
        path:"/auth",
        element:<AuthLayout/>,
        children:[
            {
                path:"login",
                element:<Login/>
            }
        ]
    },

    {
        path:"*",
        element:<Page404/>
    }


]

const authMap= routes => routes.map(route=>{
    if(route?.auth==="tenant"){
        route.element = <TenantProtectedRoute>{route.element}</TenantProtectedRoute>;
    }
    else if(route?.auth==="admin"){
        route.element= <AdminProtectedRoute>{route.element}</AdminProtectedRoute>;
    }
    else if(route?.auth){
        route.element = <ProtectedRoute>{route.element}</ProtectedRoute>;
    }
    if(route?.children){
        route.children=authMap(route.children);
    }
    return route;
})

export default authMap(routes);