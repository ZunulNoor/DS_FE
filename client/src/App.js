import React, { useContext, useState } from 'react'
import { GlobalContext } from './Context/context'
import { decodeToken } from 'react-jwt'
import Admin from './components/Admin/index'
import Login from './Login/Login'


export const AppRoute = '/'

const ComponentbyRole = {
  'admin': Admin,
  'login': Login,
}

const getUserRole = (params) => ComponentbyRole[params] || ComponentbyRole['login']

export const App = () => {

  const { state, dispatch } = useContext(GlobalContext)

  const decodeUser = (token) => {
    if (!token) {
      return undefined
    }
    else {
      const res = decodeToken(token)
      return res?.role
    }
  }
  const currentToken = decodeUser(state.token)
  const CurrentUser = getUserRole(currentToken)

  return (

    <CurrentUser />
  )
}