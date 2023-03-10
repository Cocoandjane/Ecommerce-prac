import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

export default function FooterBanner({ footerBanner:{discount, largeText1, largeText2, desc, saleTime, smallText, midText, product, buttonText, image} }) {

  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>
            {largeText1}
          </h3>
          <h3 style={{zIndex:1}}>
            {largeText2}
          </h3>
        </div>
        <div className='right' style={{ position: 'relative',zIndex:1}}>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">
              {buttonText}
            </button>
          </Link>
        </div>
        
        <img 
        src={urlFor(image)}
        className="footer-banner-image"/>
      </div>
    </div>
  )
}
