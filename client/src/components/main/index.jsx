import React from 'react'
import styles from './styles.module.css'

const Main = () => {
    const user = JSON.parse(localStorage.getItem('token'))

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload();
    }

  return (
    <div className={styles.main_container}>
        <nav className={styles.navbar}>
            <h1>LolMedia</h1>
            {user && <h4>Hello, {`${user?.user?.firstName} ${user?.user?.lastName}`}</h4>}
            <button className={styles.white_btn} onClick = {handleLogout}>
                Logout
            </button>
        </nav>
    </div>
  )
}

export default Main