import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App.js'

function Profile() {

    const [prods, setProds] = useState([])
    const [search, setSearch] = useState('')
    const [purchasedprods, setPurchasedProds] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const getProducts = () => {
        fetch('http://localhost:5000/myProducts', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then((res) => res.json())
            .then(res => setProds(res.prods))
            .catch(err => console.log('error' + err))
    }

    const getPurchasedProds = () => {
        fetch('http://localhost:5000/getPurchased', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then((res) => res.json())
            .then(res => setPurchasedProds(res))
            .catch(err => console.log('error' + err))
    }

    const cardstyle = {
        margin: '8px',
        borderRadius: '20px',
        maxWidth: "200px",
        maxHeight: 'inherit',
        textAlign: 'center',
    }

    useEffect(() => {
        getProducts()
        getPurchasedProds()
    }, [])

    const deleteit = (id) => {
        fetch('http://localhost:5000/deleteProd', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                "id": id
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                getProducts()
            })
            .catch(err => console.log(err))
    }

    const searchedProds = prods.filter(prod => {
        return prod.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: "white" }}>Welcome, {state ? state.name : 'loading'}!</h1>
            <hr style={{ height: "2px", borderWidth: "0px", backgroundColor: '#777' }} />
            <h5 style={{ color: "white" }}>You are selling: </h5>
            <div style={{ display: 'flex', maxWidth: "400px", margin: "5px auto", textAlign: 'center' }}>
                <input type="search" placeholder='Search for your products' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <i className="small material-icons" style={{ marginTop: '10px', color: "white" }}>search</i>
            </div>
            {/* Products user is SELLING */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {searchedProds.map((p) => {
                    return (
                        <div className="card" style={cardstyle} key={p._id}>
                            <div className="card-image">
                                <img src={p.photo} />
                            </div>
                            <h5>{p.name}</h5>
                            <div className="card-content" style={{ paddingTop: '0px' }}>
                                <div onClick={() => deleteit(p._id)} className="btn-floating halfway-fab waves-effect waves-light #e53935 red darken-1 "><i className="material-icons">delete</i></div>
                                <h6>{p.description}</h6>
                                {/* <h6> {'Posted By:' + p.postedBy.name}</h6> */}
                                <h6><b>{'Rs. ' + p.price}</b></h6>
                            </div>
                        </div>)
                })}
            </div>
            <br />
            <hr style={{ height: "2px", borderWidth: "0px", backgroundColor: '#777' }} />


            {/* Products BOUGHT by user */}
            <h5 style={{ color: "white" }}>Already purchased by you: </h5>


            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {purchasedprods.map((p) => {
                    return (
                        <div className="card" style={cardstyle} key={p._id}>
                            <div className="card-image">
                                <img src={p.photo} />
                            </div>
                            <h5>{p.name}</h5>
                            <div className="card-content" style={{ paddingTop: '0px' }}>
                                <h6>{p.description}</h6>
                                {/* <h6> {'Posted By: ' + p.postedBy.name}</h6> */}
                                <h6><b>{'Rs. ' + p.price}</b></h6>
                            </div>
                        </div>)
                })}
            </div>
            <hr style={{ height: "2px", borderWidth: "0px", backgroundColor: '#08000E' }} />

        </div>
    )
}

export default Profile


/*
things pending:
profile page
cart page
cart backend logic
purchase logic
purchased products display in profile page
*/