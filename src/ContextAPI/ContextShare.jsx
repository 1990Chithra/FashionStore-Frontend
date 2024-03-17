import React, { createContext, useState } from 'react'

export const addCartResponseContext=createContext()
export const editCartResponseContext=createContext()
export const addProfileResponseContext=createContext()


function ContextShare({children}) {

    const [addCartRes,setaddCartRes]=useState("")
    const [editCartRes,seteditCartRes]=useState("")
    const [addProfileRes,setaddProfileRes]=useState("")

  return (
    <div>
        <addCartResponseContext.Provider value={{addCartRes,setaddCartRes}}>
          <editCartResponseContext.Provider value={{editCartRes,seteditCartRes}}>
            <addProfileResponseContext.Provider value={{addProfileRes,setaddProfileRes}}>
            {children}
            </addProfileResponseContext.Provider>
            </editCartResponseContext.Provider>   
        </addCartResponseContext.Provider>
    </div>
  )
}

export default ContextShare