import './App.css';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import {Routes,Route} from 'react-router-dom';
import Auth from './Pages/Auth';
import AdminDashboard from './Pages/AdminDashboard';
import PageNotFound from './Pages/PageNotFound';
import Headers from './Components/Header'
import UserDashboard from './Pages/UserDashboard';
import UserAuth from './Pages/UserAuth';


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/login' element={<UserAuth/>}/>
        <Route path='/user/register' element={<UserAuth register/>}/>
        <Route path='/user/UserDashboard' element={<UserDashboard/>}/>
        <Route path='/admin/login' element={<Auth/>}/>
        <Route path='/admin/register' element={<Auth register/>}/>
        <Route path='/admin/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
