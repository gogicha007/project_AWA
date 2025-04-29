'use client'
import { createContext, useContext } from "react"

export const AuthContet = createContext<{
    currentUser: null
}>
const auth = () => {
  return (
    <div>auth</div>
  )
}

