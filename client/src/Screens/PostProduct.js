import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function PostProduct() {

    const history = useHistory()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')

    const clicked = () => {
        fetch('/postProduct', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                name, description: desc, price, photo: url
            })
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                history.push('/')
            })
            .catch(err => console.log(err))
    }

    const style = {
        textAlign: 'center',
        margin: '40px auto',
        maxWidth: '600px',
        borderRadius: '10px',
        padding: '30px',
        textAlign: 'left',
        backgroundColor: '#080004',
        color: 'white'
    }
    return (
        <div>
            <div className='card' style={style}>
                <h2 style={{ textAlign: "center", color: "#12BDA6" }}>Sell your Product!</h2>
                <h5>Enter product details below</h5>
                <input type="text" placeholder=' Name' value={name} onChange={(e) => { setName(e.target.value) }}></input>
                <input type="text" placeholder='Detailed Description' value={desc} onChange={(e) => { setDesc(e.target.value) }}></input>
                <input type="text" placeholder='Price in Rupees' value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
                <input type="text" placeholder='Valid Image URL' value={url} onChange={(e) => { setUrl(e.target.value) }}></input><br /><br />
                <button onClick={() => clicked()} className="waves-effect waves-light btn">Sell!</button><br /><br />
                {/* <Link to='/signup'>Don't have an account? Click to Sign Up</Link> */}
            </div>
        </div>
    )
}

export default PostProduct
