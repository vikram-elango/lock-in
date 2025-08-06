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

    const goals = [
        'Wake up at 5:30 am',
        '1 hour of workout',
        'Journal',
        '1 hour of deep work'
    ]

    const [completed, setCompleted] = useState(Array(goals.length).fill(false))


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


        {goals.map((goal, index)=> (
            <div key={index}>
            <input type='checkbox'
            checked={completed[index]}
            onChange={()=> 
            {
                const newChecked = [...completed]
                newChecked[index] = !newChecked[index]
                setCompleted(newChecked)
            }
            }
            />
            {goal}
            </div>
        ))
        }





    </div>
    
)
}