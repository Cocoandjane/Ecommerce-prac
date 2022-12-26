import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

export default function HeroBanner({ heroBanner }) {
  return (
    <div className='hero-banner-container'>
      <div>
        <p style={{ position: 'relative',zIndex:1}} className='beats-solo'>{heroBanner.smallText}</p>
        <h3 style={{ position: 'relative',zIndex:1}} >{heroBanner.midText}</h3>
        <h1 style={{ position: 'relative',zIndex:1}}>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="a image of the product" className="hero-banner-image" />
        <div></div>
        <Link href={`/product/${heroBanner.product}`}>
          <button type="button" style={{ position: 'relative',zIndex:1}}>
            {heroBanner.buttonText}
          </button>
        </Link>
        <div className='desc'>
          <h5>Description</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>

    </div>
  )
}
