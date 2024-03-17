
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
  

function Header() {
  const [openNav, setOpenNav] = useState(false);


  const location=useNavigate()
  const logOut=()=>{
    sessionStorage.clear();
    location('/')
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
        <button onClick={logOut} className='btn btn-danger'><i class="fa-solid fa-right-from-bracket"></i></button>
      </MDBContainer>
    </MDBNavbar>
     </div>
      
    </div>

  )
}

export default Header