import {supabase} from '../../lib/supabase'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard(){
    const router = useRouter()
    const [user, setUser] = useState(null)

    async function handleLogout(){
            const {error} = await supabase.auth.signOut()

            if (!error){
                router.push('/login')
            }

        }


    useEffect(()=>{

        

        async function checkAuth(){

            const {error, data} = await supabase.auth.getUser()
            

            if (data.user){
                setUser(data.user)
            }
            else{
                router.push('/login')
            }
        }



        checkAuth()

        

    }, [])

    

    

    return (
    <div>
        <div>Welcome, {user?.email}</div>
        <button onClick={handleLogout}>Logout</button>
    </div>
    
)
}