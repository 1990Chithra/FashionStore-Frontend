import React, { useEffect, useState } from 'react'
import { getAllProductAPI } from '../services/allAPIs';
import Header from '../Components/Header';
import AddtoProfile from '../Components/AddtoProfile';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import ViewCart from '../Components/ViewCart';
import AddtoCart from '../Components/AddtoCart';
import UserCart from '../Components/UserCart';
import DeletetoCart from '../Components/DeletetoCart';

function UserDashboard() {
  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value: string) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

 const [searchKey,setsearchKey]=useState("")
 console.log(searchKey);

  const [allProduct,setAllProduct] = useState([])
  //api call
  const allProducts=async()=>{
    const token = sessionStorage.getItem("token")
    if(token){

      const reqHeader={
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      };
      try{
        const result = await getAllProductAPI(searchKey,reqHeader)
        console.log(result);
        if(result.status===200){
          setAllProduct(result.data);
          console.log(allProduct);
        }
        else{
          alert("Failed to retrieve Product")
        }
        
      
      }catch(error){
        alert("Failed to retrieve Product")
      }
   
    }};
  useEffect(()=>{
    allProducts();

  },[searchKey]);


  return (
    <div>
      <Header/>
      <div className='text-start p-4' style={{height:'100px',backgroundColor:'#40E0D0'}}>
          <h4>User Dashboard</h4>
      </div>
      <div>
      <MDBRow className='p-5'>
        <MDBCol size='3'>
          <MDBTabs className='flex-column'>
          <h5 className='m-2 p-2'>User Links</h5>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'} style={{color:'blue'}}>
                My Cart
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'} style={{color:'blue'}}>
                Add Products
              </MDBTabsLink>
            </MDBTabsItem> 
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'} style={{color:'blue'}}>
                Edit Products
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab4')} active={verticalActive === 'tab4'} style={{color:'blue'}}>
                Delete Products
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab5')} active={verticalActive === 'tab5'} style={{color:'blue'}}>
                Add Profile
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === 'tab1'}><ViewCart/></MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'tab2'}><AddtoCart/></MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'tab3'}><UserCart/></MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'tab4'}><DeletetoCart/></MDBTabsPane>   
            <MDBTabsPane open={verticalActive === 'tab5'}><AddtoProfile/></MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
      
      </div>

      
    </div>
  );
}

export default UserDashboard