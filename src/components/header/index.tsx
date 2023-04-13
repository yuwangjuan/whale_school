/*
 * @Description: 
 * @Author: ywj
 * @Date: 2023-04-12 20:42:48
 */
import React, { useState } from 'react'
import { Menu } from 'antd';
import { useNavigate,useLocation } from 'react-router';
import { routes } from '../../router';
import './index.scss';

function Header() {

  const location = useLocation();
  console.log(routes,location, 'routes')
  const [current, setCurrent] = useState<string>(location?.pathname||'/home');
  const navigate = useNavigate();
  const handleMenu = (e) => { 
    console.log(e, 'e')
    setCurrent(e.key);
    navigate(e.key);
  }
console.log(current,'current')
  return (
    <div className='header-container'>
      <div className='header-box'>
        <div className="content">
        <Menu
        onClick={handleMenu}
        selectedKeys={[current]}
        mode="horizontal"
        items={routes[0]?.children?.map((item:any) => ({label:item.title,key:item.path}))}
          />
          <div className='login'>
            <span>登录</span>/<span>注册</span>
          </div>
      </div>
     </div>
    </div>
  )
}

export default Header;