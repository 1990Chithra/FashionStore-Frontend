import React, { useContext, useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteUserProfileAPI, getAllProfileAPI, getUserProfileAPI } from '../services/allAPIs';
import {addProfileResponseContext} from '../ContextAPI/ContextShare'


function UserProfile() {
  const {addProfileRes,setaddProfileRes}=useContext(addProfileResponseContext);
  const existingUser=JSON.parse(sessionStorage.getItem("existingUser"))
  console.log(existingUser);
  
  const [allUserProfile,setAllUserProfile]=useState([])
  //api call

  const allUserProfiles=async()=>{
    const token = sessionStorage.getItem("token")
    console.log(token);
    if(token){
      const reqHeader={
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try{
        const result=await getAllProfileAPI(reqHeader)
        console.log(result);
        if(result.status===200){
          setAllUserProfile(result.data)
          console.log(allUserProfile);
        }
      else{
        alert("failed to retrieve project")
        // toast.error("failed to retrieve profile")
          }

      }catch(error){
        console.error('Error fetching profiles:', error);
        alert('Failed to retrieve profile');
        // toast.error("Failed to retrieve profile")
      }
    } 
  };
  useEffect(()=>{
    allUserProfiles()
  },[addProfileRes]);
 


  return (
    <div className='container'>    
       <div className='text-center'>
      
        <div className='d-flex'>
             <h2 className='text-center' style={{marginLeft:'380px'}}>View Profiles</h2>
             <div style={{marginTop:'10px',marginLeft:'230px'}}>
             </div>
        </div>
        <div className='text-center m-3 p-3'>        
        <Row>
          <Col>
              <MDBTable align='middle'>
              <MDBTableHead>
              <tr>
                  
                  <th scope='col'>Username</th> 
                  <th scope='col'>Address</th>                                 
                  <th scope='col'>Pincode</th>
                  <th scope='col'>Phonenumber</th>
                  <th scope='col'>Reviews</th>


            </tr>
              </MDBTableHead>
                <MDBTableBody>

               {
                allUserProfile.length>0?allUserProfile.map((item)=>(
                  <tr>
                        <td>
                              <p className='fw-normal mb-1'>{item.name}</p>
                        </td>
                        <td>
                              <p className='fw-normal mb-1'>{item.address}</p>
                        </td>
                        <td>
                          <p className='fw-normal mb-1'>{item.pincode}</p>

                        </td>
                        <td>
                        <p className='fw-normal mb-1'>{item.phonenumber}</p>
                        </td>
                        <td>
                        <p className='fw-normal mb-1'>{item.reviews}</p>

                        </td>

                       
                        
          
                  </tr>

                )):"emptycart"
               }
        
            </MDBTableBody>
            </MDBTable>
          
          </Col>   
        </Row>  
        </div>
        
       </div>
     
    </div>
    
  )
}

export default UserProfile