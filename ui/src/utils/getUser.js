const getUser = async () => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        // body: JSON.stringify({})
    }

    const res = await fetch('https://stevsoza.com/api/login', requestOptions)

    let obj = await res.json()

    return obj?.user
}

export default getUser;