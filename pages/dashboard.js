import {supabase} from '../../lib/supabase'
import {react, useEffect, useState} from 'react'
import {useRouter} from 'next/router'

//supabase returns a nested object

// {
//   data: {
//     user: { id: '...', email: '...' },  // 👈 The user object we want
//     session: { ... }
//   },
//   error: null
// }

// useState checks if user exists
// useeffect runs check when page loads
//userouter handle page redirects 

export default function Dashboard(){
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    

    useEffect(()=>{
        const checkAuth = async() => {
            const response = await supabase.auth.getUser()
            
            console.log('full response:', response)

            if (response.error){
                setError('Session authentication failed')
                console.log("Auth check failed: ", response.error)
                router.push('/login')
            }

            if (response.data.user){
                console.log('User found ', response.data.user)
                setUser(response.data.user)
            }
            else{
                console.log("No active session found")
                router.push('/login')
            }
        }
        checkAuth()

        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (event)=>{
                if(event == "SIGNED_OUT"){
                    router.push('/login')
                }
            }
        )

        return () => {
            if (subscription){
                console.log('Unsubscribing from auth changes')
                subscription.unsubscribe()
            }
        }
    }, [router])

    if (!user){
        return <div>Loading...</div>
    }

    return (
        <div className='dashboard'>
            {error && <div className='error-banner'>{error}</div>}
            <h1>Welcome, {user.email}</h1>

            <button onClick={async ()=> {
                const {error} = await supabase.auth.signOut()
                if (!error) router.push('/login')
            }}
            className='Logout Button'>Logout</button>
        </div>
    )

}



