import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//1.register api call-post-body
export const registerAPI=async(user)=>{
    return await commonAPI("post",`${baseUrl}/admin/register`,user,"")
}
//2.login api call-post-body
export const loginAPI=async(user)=>{
    return await commonAPI("post",`${baseUrl}/admin/login`,user,"")
}
export const userregisterAPI=async(user)=>{
    return await commonAPI("post",`${baseUrl}/user/register`,user,"")
}
export const userloginAPI=async(user)=>{
    return await commonAPI("post",`${baseUrl}/user/login`,user,"")
}
//add product api all-post-body+header
export const addtoCartAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/product/add`,reqBody,reqHeader)
}
//get homeproduct apicall get-
export const getHomeProductAPI=async()=>{
    return await commonAPI("get",`${baseUrl}/product/home-products`,"","")

}
//get allproduct api -call
export const getAllProductAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/product/all-products?search=${searchKey}`,"",reqHeader)
}
//get all user product
export const getUserProductAPI=async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/product/all-user-products`,"",reqHeader)
}
export const editUserProductAPI=async(productId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/product/update-product/${productId}`,reqBody,reqHeader)

}
export const deleteUserProductAPI=async(productId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/product/delete-product/${productId}`,{},reqHeader)
}
export const addtoUserProfileAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/profile/add`,reqBody,reqHeader)
}

//add profile api all-post-body+header
export const getUserProfileAPI=async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/profile/all-user-profiles`,"",reqHeader)
}
export const editUserProfileAPI=async(profileId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/profile/update-profile/${profileId}`,reqBody,reqHeader)
}
export const deleteUserProfileAPI=async(profileId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/profile/delete-profile/${profileId}`,{},reqHeader)
}
export const getAllProfileAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/profile/all-profiles`,"",reqHeader)
}