/*
 * @Description: 
 * @Author: ywj
 * @Date: 2023-04-12 20:05:59
 */
import React, { useEffect} from 'react';
import { Carousel } from 'antd';
import fetchApi  from '../../fetch/fetchApi';
import './index.scss';

const HomeComponent: any = () => {
  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const tabList = [
    {title:'最新资源',id:1},
    {title:'热门资源',id:2},
    {title:'免费资源',id:3},
  ]
  useEffect(() => { 
    fetchApi.get('http://www.xxx', {id: '1'})
  },[])
  return (
    <div className='home-container'>
      <div className="banner">
        banner
      </div>
      <div className="coursel-box">
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
      <div className="content">
        <div className="tabs-box">
          {tabList && tabList?.map(item => { 
            return (
              <div className="item-box">
                { item.title}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeComponent;