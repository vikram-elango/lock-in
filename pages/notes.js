import { useState, useEffect } from "react";
import {supabase} from '../../lib/supabase'
import { useRouter } from "next/router";

export default function Notes(){
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(()=>{
        console.log('Page just loaded!')

        async function checkAuth(){
            
            const {error, data} = await supabase.auth.getUser()

            if(data.user){

                setUser(data.user)
                console.log(`Welcome, ${data.user.email}`)
            }
            else{
                router.push('/login')
            }
        }

        checkAuth()




    }, []) 

    

    return (
        <div>
            <h1>My notes</h1>
        </div>
    )
}