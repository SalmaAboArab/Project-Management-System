import React from 'react'
import styles from './NotFound.module.css'
export default function NotFound() {
  return (
    <div className={`${styles.NotFound} vh-100 text-center row align-items-center gx-0`}>
      <div className='w-50 p-5 mx-auto shadow'>
      <h1 className='fw-bold mb-2'>Oops.</h1>
      <h1>Error 404!</h1>
      <h1 className='mt-2'>Page not found </h1>
      <h1 className="mb-4">...</h1>
      <h4 className='mt-4'>This Page doesn’t exist or was removed!</h4>
      <h4 className='mt-2'>We suggest you back.</h4>
      </div>
    </div>
  )
}
