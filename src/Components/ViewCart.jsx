import React, { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap';
import CartCard from '../Components/CartCard';
import { getAllProductAPI } from '../services/allAPIs';
function ViewCart() {
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
        <div className='p-3'>
            <div className='d-flex' style={{marginLeft:'40%'}}>
                <h2 className='text-center'>New Arrivals</h2>
            </div>
        <div className='d-flex justify-content-center m-3 p-3'>
          <div className='d-flex border border-4 rounded bg-white'style={{width:'100%'}}>
            <input type="text" className='form-control' placeholder='Search by brand' onClick={e=>setsearchKey(e.target.value)}/>
            <i class="fa-solid fa-magnifying-glass text-dark fs-3 p-2"></i>
          </div>
        </div>
        <div className='m-3 p-3'>
          <Row>
            {
            allProduct.length>0?
            (allProduct.map((item,index)=>(
              <Col key={index}>
              <CartCard product={item}/>
              </Col>
            ))
        )  :  (
          <div>No Products Found</div>
          )}
                        
        </Row>
        </div>
      </div>
        
    </div>
  )
}

export default ViewCart