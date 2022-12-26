import React, { createContext, useContext, useState, useEffect } from 'react'
// import { toast } from 'react-hot-toast'
import toast, { Toaster } from 'react-hot-toast';

const Context = createContext();
export function StateContext({ children }) {

    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCardItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)
    let foundProduct;
    let index;

    // const notify = () => toast('Here is your toast.');
    const onAdd = (product, quantity) => {
        // notify()
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id)
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCardItems(updatedCartItems)
        } else {
            product.quantity = quantity
            setCardItems([...cartItems, { ...product, date: Date.now() }])
        }
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity)
        toast.success(`${qty} ${product.name} added to the cart.`)
    }

    const toggleCartItemQuantity = (id, value) => {
        let foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        const filteredItems =  cartItems.filter((item) => item._id !== id)

        if(value === "inc"){
            setCardItems([...filteredItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantity => prevTotalQuantity + 1)
        } else if (value === "dec"){
            if(foundProduct.quantity > 1) {
                setCardItems([...filteredItems, {...foundProduct, quantity: foundProduct.quantity -1}])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantity => prevTotalQuantity - 1)
            }
        }
    }

    const removeCartItem = (product) => {
        const foundProduct = cartItems.find((item) => item === product) // i am an object
    
        const filteredCartItems = cartItems.filter((item) => item._id !== product._id) // i am an array
       
        setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantity => prevTotalQuantity - foundProduct.quantity)
        setCardItems(filteredCartItems)
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        })
    }

    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart,
            setQty,
            toggleCartItemQuantity,
            removeCartItem,
            setCardItems,
            setTotalPrice,
            setTotalQuantities
        }}>
            {children}
            <Toaster />
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
