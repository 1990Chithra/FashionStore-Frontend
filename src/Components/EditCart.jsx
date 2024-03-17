import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../Assets/pic1.jpg'
import { editUserProductAPI } from '../services/allAPIs';
import { editCartResponseContext } from '../ContextAPI/ContextShare';
import { MDBTooltip } from 'mdb-react-ui-kit';




function EditCart({product}) {

  const {editCartRes,seteditCartRes}= useContext(editCartResponseContext)
    
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //to hold the product details
  const [cartDetails,setcartDetails]=useState({
    id:product._id,brand:product.brand,title:product.title,price:product.price,size:product.size,quantity:product.quantity,description:product.description,cartImage:""

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
  const updateProduct=async()=>{
    const {id,brand,title,price,size,quantity,description,cartImage}=cartDetails
      const reqBody=new FormData()
      reqBody.append("brand",brand)
      reqBody.append("title",title)
      reqBody.append("price",price)
      reqBody.append("size",size)
      reqBody.append("quantity",quantity)
      reqBody.append("description",description)
      preview?reqBody.append("cartImage",cartImage):reqBody.append("cartImage",product.cartImage)
      
      const token = sessionStorage.getItem("token")
      console.log(token);
      if(preview){
        const reqHeader={
          "Content-Type": "multipart/form-data",//request contain a file upload content
          "Authorization" :`Bearer ${token}`//req contain a token for backend
      }
        //api call
        const result=await editUserProductAPI(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
            console.log(result.data);
            seteditCartRes(result.data)
            alert("Product updated successfully")
            // toast.success("Product updated successfully")
            handleClose()

        }
        else{
          console.log(result.response.data);
          seteditCartRes(result.response.data)

        }

      }
     else{
        const reqHeader={
          "Content-Type": "multipart/form-data",//request contain a file upload content
          "Authorization" :`Bearer ${token}`//req contain a token for backend
        }
        //api call
        const result=await editUserProductAPI(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          console.log(result.data)
          seteditCartRes(result.data)
          alert("Product updated successfully")
          // toast.success("Product updated successfully")

          handleClose()
        }
        else{
          console.log(result.response.data);
          seteditCartRes(result.response.data)

        }
      }
  
}

  return (
      <div>
      <Button onClick={handleShow} style={{backgroundColor:'#2196F3'}}><i className='fa-solid fa-pen'></i></Button>
      
      <Modal show={show} onHide={handleClose} backdrop="static"keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
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
                <input type="text" value={cartDetails.price}  placeholder='Enter Price' onChange={(e)=>setcartDetails({...cartDetails,price:e.target.value})} className='form-control mb-3'/>
                <input type="text" value={cartDetails.size}  placeholder='Enter Size' onChange={(e)=>setcartDetails({...cartDetails,size:e.target.value})} className='form-control mb-3'/>
                <input type="text" value={cartDetails.quantity}  placeholder='Enter Quantity' onChange={(e)=>setcartDetails({...cartDetails,quantity:e.target.value})} className='form-control mb-3'/>
                <input type="text" value={cartDetails.description}  placeholder='Enter Description' onChange={(e)=>setcartDetails({...cartDetails,description:e.target.value})} className='form-control mb-3'/>
            </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={updateProduct}>
        <MDBTooltip wrapperProps={{ color: '#8FD7C7' }} title='update product'>
            Update
        </MDBTooltip>
        </Button>
        
        </Modal.Footer>
      </Modal>
      <div>
      
      </div>
    </div>
  )
}

export default EditCart