/*
 * @Description: 
 * @Author: ywj
 * @Date: 2023-04-12 20:49:14
 */
import React from 'react'
import { Outlet } from 'react-router'
import Header from '../header';
import Footer from '../footer';
function HeaderLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default HeaderLayout