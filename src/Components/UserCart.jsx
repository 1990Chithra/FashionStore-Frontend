import React, {useContext, useEffect, useState } from 'react'
import AddtoCart from './AddtoCart'
import { deleteUserProductAPI, getAllProductAPI, getUserProductAPI } from '../services/allAPIs';
import { Row,Col } from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { addCartResponseContext } from '../ContextAPI/ContextShare';
import EditCart from './EditCart';
import { editCartResponseContext } from '../ContextAPI/ContextShare';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserCart() {
  const {addCartRes,setaddCartRes}=useContext(addCartResponseContext)
  const {editCartRes,seteditCartRes}= useContext(editCartResponseContext)
  



  const [allUserProduct,setAllUserProduct]=useState([])
  //api call

  const allUserProducts=async()=>{
    const token = sessionStorage.getItem("token")
    console.log(token);
    if(token){
      const reqHeader={
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try{
        const result=await getUserProductAPI(reqHeader)
        console.log(result);
        if(result.status===200){
          setAllUserProduct(result.data)
          console.log(allUserProduct);
        }
      else{
        // alert("failed to retrieve project")
        toast.error("failed to retrieve project")
          }

      }catch(error){
        console.error('Error fetching projects:', error);
        alert('Failed to retrieve project');
        toast.error("Failed to retrieve project")
      }
    } 
  };
  useEffect(()=>{
    allUserProducts()
  },[addCartRes,editCartRes]);

  const deleteProduct = async (pid) => {
    const token = sessionStorage.getItem("token")
    console.log(token);
    if(token){
      const reqHeader = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await deleteUserProductAPI(pid,reqHeader)
      console.log(result);
      allUserProducts()
      // alert("Product deleted successfully")
      toast.error("Product deleted successfully")

      
    }
}

  return (
    <div className='container'>    
       <div className='text-center'>
      
        <div className='d-flex'>
             <h2 className='text-center' style={{marginLeft:'400px'}}>Edit Products</h2>
             <div style={{marginTop:'10px',marginLeft:'230px'}}>
                {/* <AddtoCart/> */}
             </div>
        </div>
        <div className='text-center m-3 p-3'>        
        <Row>
          <Col>
              <MDBTable align='middle'>
              <MDBTableHead>
              <tr>
                  <th scope='col'>Brand</th>         
                  <th scope='col'>Action</th>
                  {/* <th scope='col'>Action2</th> */}
            </tr>
              </MDBTableHead>
                <MDBTableBody>

               {
                allUserProduct.length>0?allUserProduct.map((item)=>(
                  <tr>
          
                        <td>
                              <p className='fw-normal mb-1'>{item.brand}</p>
                        </td>
                        <td>
                            <button className='btn'><EditCart product={item}/></button>
                        </td>
                        {/* <td>
                            <button className='btn'onClick={()=>deleteProduct((item?._id))}><i className='fa-solid fa-trash'></i></button>

                      </td> */}
          
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

export default UserCart