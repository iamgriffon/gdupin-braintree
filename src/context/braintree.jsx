import { createContext, useContext, useState } from "react"

export const BraintreeContext = createContext();

export function BraintreeProvider({children}){
  const [clientToken, setClientToken] = useState('');

  function saveToken(data){
    setClientToken(data)
  }

  return (
    <BraintreeContext.Provider value={{clientToken, saveToken}}>

      {children}
      
    </BraintreeContext.Provider>
  )
}

export const useBraintree = () => useContext(BraintreeContext)
