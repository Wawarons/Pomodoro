import React from 'react'
import Image from 'next/image';
import style from '@/app/styles/not-found.module.css'

const NotFound = () => {
  return (
    <div className={style['not_found-container']}>
      <h1>Error 404 - page not found</h1>
      <h3>You're not supposed to see that !</h3>
      <h2>Go back !</h2>
      <Image src='/images/crazy-fox.gif' alt='crazy fox' width={150} height={150} priority/>
    </div>
  )
}

export default NotFound;