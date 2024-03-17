import React, {useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import img from '../Assets/pic1.jpg'
import { addtoCartAPI } from '../services/allAPIs';
import { addCartResponseContext } from '../ContextAPI/ContextShare';
import { MDBTooltip } from 'mdb-react-ui-kit';


function AddtoCart() {

const {addCartRes,setaddCartRes}=useContext(addCartResponseContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to hold token

  const [token,setToken]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
  },[])

 //to hold the product details
  const [cartDetails,setcartDetails]=useState({
    brand:"",title:"",price:"",size:"",quantity:"",description:"",cartImage:""
  });
  console.log(cartDetails);
 //to hold image url
  const [preview,setpreview]=useState("")
  console.log(preview);

  useEffect(()=>{
    if(cartDetails.cartImage){
      setpreview(URL.createObjectURL(cartDetails.cartImage))
    }

  },[cartDetails.cartImage])
  console.log(cartDetails);

const cartAdd=async()=>{
      const {brand,title,price,size,quantity,description,cartImage}=cartDetails;
      if(!brand||!title||!price||!size||!quantity||!description||!cartImage){
        alert("Please enter the details")
        // toast.warning("Please enter the details")
      }
      else{
        const reqBody=new FormData()
        reqBody.append("brand",brand)
        reqBody.append("title",title)
        reqBody.append("price",price)
        reqBody.append("size",size)
        reqBody.append("quantity",quantity)
        reqBody.append("description",description)
        reqBody.append("cartImage",cartImage)
        const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
        }
      //api call
      const result=await addtoCartAPI(reqBody,reqHeader)
       console.log(result);
       if(result.status===200){
          alert("Product added successfully")
          // toast.success("Product added successfully")
          console.log(result.data);//successfull
          handleClose()
          setaddCartRes(result.data)
          setcartDetails({
            brand:"",title:"",price:"",size:"",quantity:"",description:"",cartImage:""
          })
          setpreview("")
        }
       else{
        console.log(result.response.data);

       }
  }
}


  return (
    <div>
    
          <form className='w-75'>
            <h2 className='text-center m-3 p-3'>Add Products</h2>
          <div className='row d-flex'>
            <div className='col'>
                    <label style={{marginBottom:'20px'}}>
                        <input type="file" style={{display:'none'}} onChange={(e)=>setcartDetails({...cartDetails,cartImage:e.target.files[0]})}/>
                        <img src={preview?preview:img} width={'250px'} height={'300px'} alt=''/>
                     </label>
            </div>
            <div className='col'>
                <div className='input'>
                <input type="text" value={cartDetails.brand} placeholder='Enter Brand' onChange={(e)=>setcartDetails({...cartDetails,brand:e.target.value})}  className='form-control mb-3'/>
                <input type="text" value={cartDetails.title}  placeholder='Enter Title' onChange={(e)=>setcartDetails({...cartDetails,title:e.target.value})} className='form-control mb-3'/>
                <input type="number" value={cartDetails.price}  placeholder='Enter Price' onChange={(e)=>setcartDetails({...cartDetails,price:e.target.value})} className='form-control mb-3'/>
                <input type="text" value={cartDetails.size}  placeholder='Enter Size' onChange={(e)=>setcartDetails({...cartDetails,size:e.target.value})} className='form-control mb-3'/>
                <input type="number" value={cartDetails.quantity}  placeholder='Enter Quantity' onChange={(e)=>setcartDetails({...cartDetails,quantity:e.target.value})} className='form-control mb-3'/>
                <input type="text" value={cartDetails.description}  placeholder='Enter Description' onChange={(e)=>setcartDetails({...cartDetails,description:e.target.value})} className='form-control mb-3'/>
            </div> 
            </div>
          </div>
          </form>  
          
        
        <Button variant="primary" onClick={cartAdd} className='mt-5 mb-5' style={{marginRight:'150px'}}>
        <MDBTooltip wrapperProps={{ color: '#8FD7C7' }} title='add product'>
          Add
        </MDBTooltip>        
        </Button>
       
       
      <div>
      
      </div>

        
    </div>
  )
}

export default AddtoCart