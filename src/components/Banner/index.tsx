import React from 'react';
import { Image } from '@chakra-ui/react';
import OwlCarousel from 'react-owl-carousel';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import './Banner.styles.scss';

export default function Banner() {
  return (
    <div>
      <OwlCarousel
        className='owl-theme'
        items={1}
        autoPlay={true}
        rewind={true}
        loop={true}>
        <div className='item'>
          <Image src={require('../../assets/image/banner1.jpg')} />
        </div>
        <div className='item'>
          <Image src={require('../../assets/image/banner2.jpg')} />
        </div>
        <div className='item'>
          <Image src={require('../../assets/image/banner3.png')} />
        </div>
      </OwlCarousel>
    </div>
  );
}
