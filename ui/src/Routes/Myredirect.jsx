import { Oval } from 'react-loader-spinner'
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'


//component
const Myredirect = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    let path = searchParams.get('path')

    // console.(path)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigate(path)
        }, 1000)
    }, [loading])

    return (
        <>
            {loading ? (<Oval
                height={80}
                width={80}
                color="#fff0ad"
                wrapperStyle={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#fff0ad60"
                strokeWidth={2}
                strokeWidthSecondary={2} />
            ) : (<div></div>)
            }
        </>)

}

export default Myredirect;