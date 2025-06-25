/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext()


export const AppContextProvider = (props) => {

  // now we can declare any function here and pass into the value object and we can also pass the state variables

  axios.defaults.withCredentials = true

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [isLoggedIn,setIsloggedIn] = useState(false)
  const [userData,setUserData] = useState(false)


  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth')

      if(data.success){
        setIsloggedIn(true)
        getUserData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getUserData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/data')
      data.success ? setUserData(data.userData) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAuthState()
  },[])

  const value = {
    backendUrl,
    isLoggedIn,setIsloggedIn,
    userData,setUserData,getUserData
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}


// in the context folder , a context file that stores all the states and function 

// in this value object we can pass any state variables and functions , so that we that we can access them throughout our app




