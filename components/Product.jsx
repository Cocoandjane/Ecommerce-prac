import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { useStateContext } from '../context/StateContext'

export default function Product({ product: { image, name, slug, price } }) {
  const { setQty } = useStateContext()
  return (
    <div onClick={()=>setQty(1)}>
      <Link href={`/product/${slug.current}`} >
        <div className='product-card'>
          <img src={urlFor(image && image[0])} alt={name}
            width={250}
            height='auto'
            className='product-image'
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}
