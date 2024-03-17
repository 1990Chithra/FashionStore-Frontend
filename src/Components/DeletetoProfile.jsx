import React, { useContext, useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteUserProfileAPI, getAllProfileAPI} from '../services/allAPIs';
import {addProfileResponseContext} from '../ContextAPI/ContextShare'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function DeletetoProfile() {
  const {addProfileRes,setaddProfileRes}=useContext(addProfileResponseContext);


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
        // alert("failed to retrieve project")
        toast.error("failed to retrieve profile")
          }

      }catch(error){
        console.error('Error fetching profiles:', error);
        // alert('Failed to retrieve profile');
        toast.error("Failed to retrieve profile")
      }
    } 
  };
  useEffect(()=>{
    allUserProfiles()
  },[addProfileRes]);
  const deleteProfile = async (psid) => {
    const token = sessionStorage.getItem("token")
    console.log(token);
    if(token){
      const reqHeader = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await deleteUserProfileAPI(psid,reqHeader)
      console.log(result);
      allUserProfiles()
      // alert("Product deleted successfully")
      toast.error("Product deleted successfully")

      
    }
}

  return (
    <div>
        <div className='container'>    
       <div className='text-center'>
      
        <div className='d-flex'>
             <h2 className='text-center' style={{marginLeft:'450px'}}>Delete Profiles</h2>
             <div style={{marginTop:'10px',marginLeft:'230px'}}>
             </div>
        </div>
        <div className='text-center m-3 p-3'>        
        <Row>
          <Col>
              <MDBTable align='middle'>
              <MDBTableHead>
              <tr>
                  <th scope='col'>Phonenumber</th>         
                  <th scope='col'>Action</th>
            </tr>
              </MDBTableHead>
                <MDBTableBody>

               {
                allUserProfile.length>0?allUserProfile.map((item)=>(
                  <tr>
          
                        <td>
                              <p className='fw-normal mb-1'>{item.phonenumber}</p>
                        </td>
                       
                        <td>
                            <button className='btn'onClick={()=>deleteProfile((item?._id))}><i className='fa-solid fa-trash'></i></button>

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
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        
    </div>
  )
}

export default DeletetoProfile