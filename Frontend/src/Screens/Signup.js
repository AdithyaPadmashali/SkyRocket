import React, { useState } from 'react'
import '../App.css';
import { Link, useHistory } from 'react-router-dom'

function Signup() {

    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const clicked = () => {
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                }
                else {
                    console.log('signed up successfully')
                    history.push('/signin')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const style = {
        textAlign: 'center',
        maxWidth: '400px',
        marginLeft: '20px',
        borderRadius: '10px',
        padding: '30px',
        backgroundColor: '#080004',
        color: 'white'
    }
    return (
        <div style={{ display: 'flex', margin: '10px auto', justifyContent: 'center' }}>
            <div className="card" style={{
                textAlign: 'center',
                maxWidth: '800px',
                borderRadius: "10px",
                backgroundColor: '#222',
                color: 'white'
            }}>
                <div className="card-image">
                    <img src="https://q3p9g6n2.rocketcdn.me/wp-content/ml-loads/2018/07/rocket-rockets-blast-off-shutterstock_566814361-800x450.jpg" style={{ borderRadius: '10px', height: "600px" }} />
                    <span className="card-title">Welcome To SkyRocket!</span>
                </div>
            </div>
            <div className='card' style={style}>
                <h2>SkyRocket</h2>
                <h4>Sign up</h4>
                <input type="text" placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)}></input>
                <input type="text" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="text" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)}></input><br /><br />
                <button className="waves-effect waves-light btn" onClick={() => clicked()}>Register</button><br /><br />
                Already have an account?
                <br></br>
                <Link to='/signin'> Click here to Sign In</Link>
            </div>
        </div>
    )
}

export default Signup
