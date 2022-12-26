import React from 'react'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useState } from 'react'
import { useStateContext } from '../../context/StateContext'
import getStripe from '../../lib/getStripe'
import toast from 'react-hot-toast'

export default function productDetails({ product, products }) {
    const [index, setIndex] = useState(0);

    const { image, name, details, price } = product
    const { decQty, incQty, qty , onAdd} = useStateContext()

    async function handleBuyNow(){
        const newProduct = { ...product, quantity: qty}
        const stripe = await getStripe()
        const response = await fetch('/api/stripe', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([newProduct])
        })
        if (response.statusCode === 500) return
        const data = await response.json()
        toast.loading('Redirectiong...')
        stripe.redirectToCheckout({ sessionId: data.id })
    }

    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container' >
                        <img src={urlFor(image && image[index])} style={{ width: "500px", marginRight: "80px" }}
                            className="product-detail-image"
                        />
                    </div>
                    <div className='small-images-container'>
                        {image?.map((item, i) =>
                            <img src={urlFor(item)}
                                key={i}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        )}
                    </div>
                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>
                        Details:
                    </h4>
                    <p>{details}</p>
                    <p className='price'>${price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                        </p>

                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={()=>onAdd(product, qty)}>
                            Add to Cart
                        </button>
                        <button type='button' className='buy-now' onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div className='maylike-products-wrapper'>
                <h2>you may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products.map((item) =>
                            <Product key={item._id} product={item} />
                        )}

                        {products.map((item) =>
                            <Product key={item._id + "1"} product={item} />
                        )}

                    </div>

                </div>
            </div>

        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
        slug {
            current
        }
    }`;

    const products = await client.fetch(query)

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}


export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`
    const productQuery = `*[_type == "product"]`
    const product = await client.fetch(query)
    const products = await client.fetch(productQuery)

    return {
        props: {
            product,
            products
        }
    }
}