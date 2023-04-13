/*
 * @Description: 
 * @Author: ywj
 * @Date: 2023-04-12 20:05:11
 */
/*
 * @Description: 
 * @Author: ywj
 * @Date: 2023-04-12 20:05:11
 */
import { lazy } from "react";
import { Navigate } from 'react-router-dom';
import { IndexRouteObject,NonIndexRouteObject } from "react-router-dom";
import HeaderLayout from '../components/headerLayout/index'
// const HomeComponent = lazy(() => import('../views/Home/index'));
// const AllCourse = lazy(() => import('../views/allCourse/index'));
// const ParticalCourse = lazy(() => import('../views/particalCourse/index'));
import HomeComponent from '../views/Home/index';
import AllCourse from '../views/allCourse/index';
import ParticalCourse from '../views/particalCourse/index';
interface ICustomIndexRouteObject extends IndexRouteObject { 
  title?:string,
}
interface ICustomNonIndexRouteObject extends NonIndexRouteObject{
  title?: string,
  children?:IRouteObject[],
}
type IRouteObject = ICustomIndexRouteObject  | ICustomNonIndexRouteObject;
export const routes:IRouteObject[] = [
  {
    path: '/',
    element: <HeaderLayout />,
    children: [
      {
        // index:true,
        path: '/home',
        element: <HomeComponent />,
        title:'首页',

      },
      {
        path: '/allCourse',
        element: <AllCourse/>,
        title:'全部课程',
      },
      {
        path: '/particalCourse',
        element: <ParticalCourse/>,
        title:'实战课程',
      }
    ]
  },
  {
    path: '*',
    element:<Navigate to='/home'/>
  }
]

