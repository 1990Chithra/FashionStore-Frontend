import React, { useState } from 'react'
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import UserCart from '../Components/UserCart';
import AddtoCart from '../Components/AddtoCart';
import DeletetoCart from '../Components/DeletetoCart';
import DeletetoProfile from '../Components/DeletetoProfile';
import UserProfile from '../Components/UserProfile';
import Header from '../Components/Header';

function AdminDashboard() {
  const [verticalActive, setVerticalActive] = useState('tab1');
  const handleVerticalClick = (value: string) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  return (
    <div>
      <Header/>
      <div className='text-start p-4' style={{height:'100px',backgroundColor:'#40E0D0'}}>
          <h4>Admin Dashboard</h4>
      </div>
       <div>
       <MDBRow className='p-5'>
        <MDBCol size='3'>
          <MDBTabs className='flex-column'>
            <h5 className='m-2 p-2'>Admin Links</h5>   
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'} style={{color:'blue'}}>
                Manage Profiles
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'} style={{color:'blue'}}>
                Delete Profiles
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === 'tab1'}><UserProfile/></MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'tab2'}><DeletetoProfile/></MDBTabsPane>
         </MDBTabsContent>
        </MDBCol>
      </MDBRow>

       </div>

    </div>
  )
}


export default AdminDashboard