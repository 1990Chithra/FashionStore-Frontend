import React, { useState } from 'react'
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {Link, useNavigate} from 'react-router-dom';
import { registerAPI } from '../services/allAPIs';
import { loginAPI } from '../services/allAPIs';
import '../Pages/Auth.css';
import { MDBTooltip } from 'mdb-react-ui-kit';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon
} from 'mdb-react-ui-kit'


function Auth({register}) {
  const [openNav, setOpenNav] = useState(false);

  const location=useNavigate()

  const isRegisterForm=register?true : false

  // state creation
  const [userData,setUserData]=useState({
    username:"",
    email:"",
    password:"",
    
  })
  const registerData=async()=>{
    const {username,email,password}=userData
    if(!username || !email || !password){

      alert("Please enter valid details")
    }
    else{
      //api call
      const result=await registerAPI(userData)
      console.log(result);//user registration successful
      if(result.status===200){
        alert(`${result.data}`)
        location('/admin/login')
      }
      else{
        alert(`${result.response.data}`)//user already registered

      }

    }

  }
  const loginData=async()=>{

    const {email,password}=userData;
    if(!email || !password){
      alert("Please enter valid details")
    }
    else{
      const result=await loginAPI(userData)
      console.log(result);
      if(result.status === 200){
        alert("Login successful")
        // //set user object into session storage
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
        sessionStorage.setItem("token",result.data.token)
      location('/admin/AdminDashboard')
      }
      else{
        alert("Please enter valid details")
      }
      
    }
  }
  return (
   <div>
    <div>
      <MDBNavbar expand='lg' light style={{backgroundColor:'skyblue'}}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'><h2 style={{color:'#FC92C4'}}>Luxe Threads</h2>
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <MDBNavbarLink href='/user/login'>User</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <MDBNavbarLink href='/admin/login'>Admin</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
     </div>
     <div className='loginimg p-3 m-3'>
      <MDBRow className='d-flex'>
        <MDBCol> 
            <div className='m-4 p-4 mt-1'>
                <img src="https://www.freeiconspng.com/thumbs/login-icon/login-icon-png-20.png" alt="" style={{height:'600px',width:'80%'}}/>
            </div>

        </MDBCol>
        <MDBCol size='6' md='4' style={{marginTop:'50px'}}> 
        <div className='m-4 p-4' style={{backgroundColor:'skyblue',height:'430px'}}>
              <h3 className='text-center'>Fashion Store</h3>
              <h5 className='text-center m-3' style={{color:'yellow'}}>
              {
                isRegisterForm?'register here': 'login here'
              }
              </h5>
              <form>
                {
                  isRegisterForm &&

                      <input type="text" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} placeholder='Enter Name' className='form-control mb-3'/>
                  
                }
                 
                  <input type="text"  value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} placeholder='Enter Email' className='form-control mb-3'/>
                  <input type="password"  value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} placeholder='Enter Password' className='form-control mb-3'/>

              </form>
                {
                  isRegisterForm?
                  <div className='text-center m-3 text-warning'>
                    <button onClick={registerData} className='btn' style={{backgroundColor:'#CCCCFF',padding:'15px 40px',border:'2px',borderRadius:'25px'}}>
                      <MDBTooltip wrapperProps={{ color: '#CCCCFF' }} title='Register'>
                      Register
                      </MDBTooltip>
                    </button>
                    <Link to={'/admin/login'} style={{textDecoration:'none',color:'wheat'}}>
                      <p className='m-3'>Already register?Please login from here</p>
                    </Link>
                  </div>
                  :
                  <div className='text-center m-3 text-warning'>
                    <button onClick={loginData} className='btn' style={{backgroundColor:'#8FD7C7',padding:'15px 40px',border:'2px',borderRadius:'25px'}}>
                    <MDBTooltip wrapperProps={{ color: '#8FD7C7' }} title='Login'>
                      Login
                    </MDBTooltip>
                    </button>
                    <Link to={'/admin/register'} style={{textDecoration:'none',color:'wheat'}}>
                      <p className='m-3'>New to here?Please Register...</p>
                    </Link>
                  </div>                
                }

        </div>     
        </MDBCol>
      </MDBRow>
    </div>

   </div>
  )
}

export default Auth