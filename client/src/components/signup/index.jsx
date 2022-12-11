import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");


    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
            e.preventDefault();
            try {
                const url = "/api/users/signup";
                const { data : res } = await axios.post(url, data)
                setMsg(res.message)
            } catch (error) {
                if(error.response && error.response.status >= 400 && error.response.status < 500) {
                    setError(error.response.data.message);
                }

            }
        }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Authentication</h1>
                    <Link to = '/login'>  
                        <button type='button' className={styles.white_btn}>
                            Login
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit = {handleSubmit}>
                        <h1>Create Account</h1>
                        <input 
                            type="text" 
                            placeholder='First Name'
                            name="firstName"
                            value = {data.firstName}
                            required
                            className={styles.input}
                            onChange = {handleChange}
                        />
                        <input 
                            type="text" 
                            placeholder='Last Name'
                            name="lastName"
                            value = {data.lastName}
                            required
                            className={styles.input}
                            onChange = {handleChange}
                        />
                        <input 
                            type="email" 
                            placeholder='Email'
                            name="email"
                            value = {data.email}
                            required
                            className={styles.input}
                            onChange = {handleChange}
                        />
                        <input 
                            type="password" 
                            placeholder='Password'
                            name="password"
                            value = {data.password}
                            required
                            className={styles.input}
                            onChange = {handleChange}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                        <button type='submit' className={styles.green_btn}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup; 