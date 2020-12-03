import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App.js'

function Cart() {

    const [prods, setProds] = useState([])
    const { state, dispatch } = useContext(UserContext)

    //get the products from the cart
    const getCart = () => {
        fetch('http://localhost:5000/getCart', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            method: 'get'
        })
            .then((res) => res.json())
            .then(res => setProds(res))
    }

    const removeFromCart = (id) => {
        fetch('http://localhost:5000/removefromcart', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({
                "productId": id
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log("removed successfully from cart")
                getCart()
            })
            .catch(error => console.log(error))

    }

    const cardstyle = {
        margin: '8px',
        borderRadius: '20px',
        maxWidth: "200px",
        maxHeight: 'inherit',
        textAlign: 'center',
    }

    useEffect(() => {
        getCart()
    }, [])

    const grandTotal = () => {
        let sum = 0;
        prods.map(item => sum += parseInt(item.price))
        return sum
    }
    //////////////////////////////////////////
    // const checkoutCart = () => {
    //     //     emptyCart
    //     //     removeprods
    //     //     addtoSold (?) optional
    // }

    const emptyCart = () => {
        fetch('http://localhost:5000/emptyCart', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            method: 'put',

        })
            .then(res => res.json())
            .then(res => {
                console.log("emptied cart");
                getCart()
            })
            .catch(error => console.log(error))
    }

    const purchase = () => {
        fetch('http://localhost:5000/purchaseAll', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            method: 'put',
        })
            .then(res => res.json())
            .then(res => {
                setProds([])
                alert("Purchased All Items");
                console.log(res)
            })
            .catch(error => console.log(error))

    }

    ///////////////////////////

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: "white", }}>Cart:</h2>
            <h4 style={{ color: "white" }}>Your cart total: Rs. {grandTotal()}</h4>
            <hr style={{ height: "2px", borderWidth: "0px", backgroundColor: '#777' }} />
            <button onClick={() => emptyCart()}>empty Cart</button>
            <button onClick={() => purchase()}>Purchase All</button>

            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>

                {prods.map((p) => {
                    return (!p.isPurchased) ? (
                        <div className="card" style={cardstyle} key={p._id}>
                            <div className="card-image">
                                <img src={p.photo} />
                            </div>
                            <h5>{p.name}</h5>
                            <div className="card-content" style={{ paddingTop: '0px' }}>
                                <div onClick={() => removeFromCart(p._id)} className="btn-floating halfway-fab waves-effect waves-light #e53935 red darken-1 "><i className="material-icons">delete</i></div>
                                <h6>{p.description}</h6>
                                <h6>{'Rs. ' + p.price}</h6>
                            </div>
                        </div>) : (<></>)
                })}
            </div>

            <div>
                <h4 style={{ color: "white" }}>GrandTotal is Rs. {grandTotal()}</h4>
            </div>
            <br />
            <hr style={{ height: "2px", borderWidth: "0px", backgroundColor: '#08000E' }} />

        </div>
    )
}

export default Cart