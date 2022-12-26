import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useStateContext } from '../context/StateContext'
import { starsConfetti } from '../lib/utils'

export default function Success() {
    //save to local storage,
    // able to save items to pay later
    // able to signup and login
    // able to save address and save payment information so that the customer can pay with just 1 click

    const { setCardItems, setTotalPrice, setTotalQuantities } = useStateContext();
    useEffect(() => {
        localStorage.clear();
        setCardItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        starsConfetti();
    }, [])

    return (
        <div className='success-wrapper'>
            <div className='success'>
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order</h2>
                <p className='email-msg'>Check your email inbos for the receipt</p>
                <p className='description'>If you have anyquestiongs, please email
                    <a className='email' href='mailto:janeliang@bc.com'>janeliang@bc.com</a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className='btn'>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    )
}
