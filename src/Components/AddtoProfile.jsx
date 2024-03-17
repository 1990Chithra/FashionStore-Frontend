import React, { useContext, useEffect, useState } from 'react'
import { addtoProfileAPI, addtoUserProfileAPI } from '../services/allAPIs';
import Button from 'react-bootstrap/Button';
import {addProfileResponseContext} from '../ContextAPI/ContextShare'
import { MDBTooltip } from 'mdb-react-ui-kit';
function AddtoProfile() {
  //to hold token
 const {addProfileRes,setaddProfileRes}=useContext(addProfileResponseContext)
 
  const [token,setToken]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
  },[])
  const [profileData,setprofileData]=useState({
    name:"",
    address:"",
    pincode:"",
    phonenumber:"",
    reviews:""
  })
  const addProfile=async()=>{
    const {name,address,pincode,phonenumber,reviews}=profileData;
    if(!name||!address||!pincode||!phonenumber||!reviews){
      alert("Please enter the details")
    }
    else{
     //api call
      const reqBody=new FormData()
      reqBody.append("name",name)
      reqBody.append("address",address)
      reqBody.append("pincode",pincode)
      reqBody.append("phonenumber",phonenumber)
      reqBody.append("reviews",reviews)
      const reqHeader={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
      }
    //api call
    const result=await addtoUserProfileAPI(reqBody,reqHeader)
     console.log(result.data);
    //  sessionStorage.setItem("existingProfile",JSON.stringify(result.data.address))
     sessionStorage.setItem("ProfileData",JSON.stringify(result.data))
    //  const existingProfile=JSON.parse(sessionStorage.getItem('result'));
     

     if(result.status===200){
        alert("Profile added successfully")
        console.log(result.data);//successfull
        setaddProfileRes(result.data)     
        setprofileData({
          name:"",address:"",pincode:"",phonenumber:"",reviews:""
        })
      }
     else{
      console.log(result.response.data);
      setaddProfileRes(result.response.data)

     }
}
}
  return (
      <div>
      <form className='w-75' style={{marginLeft:'20px'}}>
      <h2 className='text-center mb-5'>Add Profile</h2>
      <input type="text" value={profileData.name} placeholder='Enter Name' onChange={(e)=>setprofileData({...profileData,name:e.target.value})}  className='form-control mb-3'/>
      <input type="text" value={profileData.address} placeholder='Enter Address' onChange={(e)=>setprofileData({...profileData,address:e.target.value})}  className='form-control mb-3'/>
      <input type="text" value={profileData.pincode} placeholder='Enter Pincode' onChange={(e)=>setprofileData({...profileData,pincode:e.target.value})}  className='form-control mb-3'/>
      <input type="text" value={profileData.phonenumber} placeholder='Enter Phonenumber' onChange={(e)=>setprofileData({...profileData,phonenumber:e.target.value})}  className='form-control mb-3'/>
      <input type="text" value={profileData.reviews} placeholder='Enter Reviews' onChange={(e)=>setprofileData({...profileData,reviews:e.target.value})}  className='form-control mb-3'/> 
      </form>
      
      <Button variant="primary" onClick={addProfile} className='mt-5 mb-5' style={{marginRight:'150px'}}>
      <MDBTooltip wrapperProps={{ color: '#8FD7C7' }} title='add profile'>
        Add
      </MDBTooltip>
      </Button>

    </div>

    
  )
}

export default AddtoProfile