import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
  const [books, setBooks] = useState({
      titl: "",
      desc: "",
      price: null,
      title: "",
  })

  const navigate = useNavigate()
  const location = useLocation()
  const bookId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBooks((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.put("http://localhost:8800/books/" + bookId, books)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  console.log(books)

  return (
    <div className='form'>
      <h1>Update the book</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title' />
      <input type="text"  placeholder='desc' onChange={handleChange} name='desc' />
      <input type="number" placeholder='price' onChange={handleChange} name='price' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update