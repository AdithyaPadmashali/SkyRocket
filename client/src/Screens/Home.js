import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App'

function Home() {

    const { state, dispatch } = useContext(UserContext)

    const [prods, setProds] = useState([]) //hooks used
    const [search, setSearch] = useState('')
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')

    useEffect(() => {

        fetch('/allProducts', {
            method: 'get',
        })
            .then((res) => res.json())
            .then(res => {
                setProds(res)
            })
    }, [])

    const addToCart = (id) => {
        fetch('/addtocart', {
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
                alert("Added successfully to Cart")
            })
            .catch(error => console.log(error))
    }

    const cardstyle = {
        borderRadius: '2px',
        width: "300px",
        maxHeight: "inherit",
        textAlign: 'center',
        margin: "15px",
        border: "490px"

    }

    // const imgStyle = {
    //     maxWidth: "150px",
    //     maxHeight: "150px",
    //     marginLeft: "auto",
    //     marginRight: "auto",
    //     padding: "30px"
    // }

    const imgStyle = {
        maxWidth: "150px",
        maxHeight: "150px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "30px"
    }

    const searchedProds = search ? prods.filter(prod => {
        return (prod.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    }) : prods;

    const filteredProds = searchedProds.filter(prod => {
        return (parseInt(prod.price) >= (min ? parseInt(min) : 0) && parseInt(prod.price) <= (max ? parseInt(max) : 99999999))
    })

    return (
        <div>
            <div style={{ display: 'flex', maxWidth: "400px", margin: "5px auto", textAlign: 'center' }}>
                <input type="search" placeholder='Search For products' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <i className="small material-icons" style={{ marginTop: '10px', color: "white" }}>search</i>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input style={{ maxWidth: '200px', margin: '5px' }} type="text" placeholder='Min Price (Rupees)' value={min} onChange={(e) => setMin(e.target.value)}></input>
                <input style={{ maxWidth: '200px', margin: '5px' }} type="text" placeholder='Max Price (Rupees)' value={max} onChange={(e) => setMax(e.target.value)}></input>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {filteredProds.map((p) => {
                    return (!p.inCart && !p.isPurchased && (p.postedBy.name != JSON.parse(localStorage.getItem('user')).name)) ? (
                        <div className="card" style={cardstyle} key={p._id}>
                            <div className="card-image">
                                <img src={p.photo} />
                            </div>
                            <h5><b>{p.name}</b></h5>
                            <div className="card-content" style={{ paddingTop: '0px', textAlign: 'left' }}>
                                <h6><br />{p.description}</h6>
                                <div onClick={() => addToCart(p._id)} className="btn-floating halfway-fab waves-effect waves-light blue "><i className="material-icons">add_shopping_cart</i></div>
                            </div>
                            <div className="card-content" style={{ textAlign: 'right' }}>
                                <h6> Seller: <b>    {p.postedBy.name} </b></h6>
                                <h6>Price:   <b>{' Rs. ' + p.price}</b></h6>
                            </div>
                        </div>) : (<></>)
                })}


            </div>
            <hr style={{ height: "2px", borderWidth: "0px", backgroundColor: '#777' }} />

        </div>
    )
}

export default Home
