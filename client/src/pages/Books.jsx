import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fechAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:3000/books")
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fechAllBooks()
    }, [])
    return (
        <div>Books</div>
    )
}

export default Books