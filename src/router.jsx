import {createBrowserRouter} from 'react-router-dom'
import App from './pages/App'


import Login from './pages/Login';


import Student from './pages/Student';
import Admin from './pages/Admin';
import Sign from './pages/Sign';
const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/signup',
        element: <Sign/> 
    },{
        path:'/student',
        element:<Student/>
    },{
        path:'/admin',
        element:<Admin/>
    }
]);

export default router;