import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const commonTmp = { api: "https://testback-tau.vercel.app" }
axios.defaults.withCredentials = true;

const dataGet = async () => await axios.get(`${commonTmp.api}/test`, {
    headers: {
        'Content-Type': 'application/json'
    },
});
const dataPost = async () => {
    //initial call to server to get token
    await axios.get(`${commonTmp.api}/token`, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    //token is passed to the next request header
    return await dataGet()
}

export const WithAxios = () => {
    const [data, setData] = useState('');

    useEffect(() => dataPost().then(setData), [])
    return (
        <>
            <h1>WithAxios</h1>
            <div>{JSON.stringify(data.data, null, 2)}</div>
            <Link to="/home">Home</Link>
        </>
    )
}
export default WithAxios;
