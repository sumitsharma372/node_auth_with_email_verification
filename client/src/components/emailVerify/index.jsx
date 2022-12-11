import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import success from '../../images/success.svg'
import styles from './styles.module.css'

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false)
    const params = useParams()

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `/api/users/${params.id}/verify/${params.token}`
                const { data } = await axios.get(url)
                console.log(data)
                setValidUrl(true)
            } catch (error) {
                console.log(error)
            }
        }

        verifyEmailUrl()
    }, [params])

  return (
    <>
        {validUrl ? (
            <div className={styles.container}>
                <img src={success} alt="success_img" className={styles.success_img}/>
                <Link to='/login'>
                    <button className={styles.green_btn}>
                        Login
                    </button>
                </Link>
            </div>
        ) : (
            <h1>404 not found</h1>
        )}
    </>
  )
}

export default EmailVerify