import { useState } from "react"
import Header from "../components/Header"
import React from "react"

const AddPages = () =>{
    const [isRefresh, setIsRefresh] = useState(true)
    
    const setRefresh = (status) => {
      setIsRefresh(status);
  };
    return(
        <Header setRefresh={setRefresh} isRefresh={isRefresh}/>
    )
}

export default AddPages
