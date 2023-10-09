import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import common from './Common.jsx';

// const commonTmp = { api: "https://testback-tau.vercel.app" }

const dataGetWithFetch = async () => await fetch(`${common.api}/test`, { credentials: 'include' }).then(res => res.json());
const dataPostWithFetch = async () => {
    //initial call to server to get token
    await fetch(`${common.api}/token`, { credentials: 'include' }).then(res => res.json());
    //token is passed to the next request header
    return await dataGetWithFetch()
}

export const WithFetch = () => {
    const [data, setData] = useState('');

    useEffect(() => dataPostWithFetch().then(setData), [])

    return (
        <>
            <h1>WithFetch</h1>
            <div>{JSON.stringify(data, null, 2)}</div>
            <Link to="/home">Home</Link>
        </>
    )
}
export default WithFetch;
