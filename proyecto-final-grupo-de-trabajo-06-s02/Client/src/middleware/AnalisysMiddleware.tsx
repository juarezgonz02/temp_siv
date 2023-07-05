import React from 'react'
import { Outlet } from 'react-router-dom'
import Context from '../utils/EventsContext'
import NavBar from '../components/global/navBar'

function AnalisysMiddleware() {
  return (
    <Context>
      <NavBar showNavigationWeb={true} showTitle={true}></NavBar>
      <Outlet />
      </Context>
  )
}

export default AnalisysMiddleware