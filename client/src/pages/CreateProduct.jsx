import React from 'react'
import { useState } from 'react'
import axios from 'axios'
export default function CreateProduct() {


    let [product, setProduct] = useState({
        title: "",
        description: "",
        price: ""
    })

    function handleChange(key, val) {
        setProduct({
            ...product,
            [key]: val
        })

    }
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(product)

        try {
            let res = await axios.post('http://localhost:3000/api/product/create', product)
            console.log(res.data)
            alert(res.data.message)
        } catch (error) {
            console.log(error.message)
            alert(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>


                <input type="text" onChange={(e) => handleChange(e.target.name, e.target.value)} name="title" placeholder='enter title' />
                <input type="text" onChange={(e) => handleChange(e.target.name, e.target.value)} name="description" placeholder='enter description' />
                <input type="text" onChange={(e) => handleChange(e.target.name, e.target.value)} name="price" placeholder='enter price' />

                <input type="submit" value="Create" />


            </form>
        </div>
    )
}
