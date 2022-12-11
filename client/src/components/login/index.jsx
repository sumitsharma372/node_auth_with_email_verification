import styles from './styles.module.css';
import { Link  } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [error, setError] = useState("");

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
            e.preventDefault();
            try {
                const url = "/api/users/login";
                const { data : res } = await axios.post(url, data)
                localStorage.setItem("token", JSON.stringify(res));
                window.location.href = "/";
            } catch (error) {
                if(error.response && error.response.status >= 400 && error.response.status < 500) {
                    setError(error.response.data.message);
                }

            }
        }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit = {handleSubmit}>
                        <h1>Login</h1>
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
                        <button type='submit' className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Don't have an account ?</h1>
                    <Link to = '/signup'>  
                        <button type='button' className={styles.white_btn}>
                            Sign up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login; 