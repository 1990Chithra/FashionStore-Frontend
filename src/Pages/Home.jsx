import React, { useEffect, useState } from 'react'
import CartCard from '../Components/CartCard'
import {Row,Col} from 'react-bootstrap'
import './Home.css'
import { getHomeProductAPI } from '../services/allAPIs';
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
} from 'mdb-react-ui-kit';


function Home() {
  const [openNav, setOpenNav] = useState(false);

// api call to get home project details
const [homeProduct,setHomeProduct]= useState([])//to hold home project details

const getHomeProduct=async()=>{
    const result = await getHomeProductAPI()
    console.log(result);
    if(result.status===200){
        setHomeProduct(result.data)
        console.log(homeProduct);
    }
    else{
        console.log("Api fetching project details failed");
    }
}
  useEffect(()=>{
    getHomeProduct()
  },[])
  

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
         <div>
           <img src="https://png.pngtree.com/thumb_back/fw800/background/20231228/pngtree-vibrant-horizontal-web-banner-dive-into-our-summer-sale-and-discount-image_13880938.png" alt="" width={'100%'} height={'650px'}/>
         </div>
         
          <div className='head'>
                <div className='darkfire'>
                <h1 className='Blazing' contenteditable="true">Happiness is not in money but in shopping</h1>
                </div>
          </div>
      <div className='row2 d-flex mt-5'>
        <div className='col-4'>
          <div className='card auto shadow m-3 p-3'>
            <img src="https://i.pinimg.com/736x/89/a2/67/89a2673aad590b446a7a022fe917ccfd.jpg" alt="" />
          </div>

        </div>
        <div className='col-6'>
        <div className='card auto shadow m-3 p-3' style={{width:'950px',height:'820px'}}>
                <div className='container'>
                   <Row className='d-flex'>    
                        {
                           homeProduct.length>0?homeProduct.map((item)=>(

                            <Col>
                                <CartCard product={item}/>
                            </Col>

                          )):"empty"
                        }    
           
                    </Row> 
                </div>
        </div> 
        </div>
      </div> 

</div> 
                     
  )
}

export default Home