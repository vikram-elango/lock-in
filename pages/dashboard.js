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
    console.log('completed: ', completed)
    const completedCount = completed.filter(Boolean).length 
    const totalGoals = goals.length
    const completionPercentage = Math.round((completedCount/totalGoals)*100)

    function getBrutalMessage(percentage){

        if (percentage==100) return "Perfect day. Don't get cocky."
        if (percentage>=75) return "Good, but not great. 100% or nothing."
        if (percentage>=50) return "Half-assing it again. Mediocrity is comfortable, isn't it?"
        if (percentage>=25) return "Pathetic effort. You planned these goals and failed most."
        return "Zero progress. Others are winning while you make excuses"

    }


    useEffect(()=>{

        

        async function checkAuth(){

            const {error, data} = await supabase.auth.getUser()
            

            if (data.user){
                setUser(data.user)
                loadTodaysCheckin(data.user)

            }
            else{
                router.push('/login')
            }
        }
        checkAuth()

    }, [])

        async function loadTodaysCheckin(userData){
            const today = new Date().toISOString().split('T')[0]
            const {data, error} = await supabase.from('daily_checkins').select('*').eq('user_id', userData.id).eq('date', today)
            console.log('Loading for user:' , userData.id)
            console.log('Today: ', today)
            
            console.log("query results: ", data)
            console.log("errors query : ", error)
            if (data && data.length && !error){
            setCompleted(data[0].completed_goals)
        }
        }

            async function saveCheckin(updateCompleted){
            const today = new Date().toISOString().split('T')[0]
            console.log('savecheckin date', updateCompleted)
            const {error} = await supabase.from('daily_checkins').upsert({
                user_id: user.id,
                date: today, 
                completed_goals: updateCompleted
            }, {
                onConflict: 'user_id,date'
            })

            if (error){
                console.log("Error: ", error)
            }


        }

    return (
    <div>
        <div>Welcome, {user?.email}</div>
        <button onClick={handleLogout}>Logout</button>
        <div>Progress {completedCount}/{totalGoals} goals ({completionPercentage})</div>
        <div style={
            {
                width:'200px', 
                height:'20px',
                backgroundColor: 'gray',
                borderRadius: '10px'
            }
        }>

            <div style={{
                width: `${completionPercentage}%`,
                height: '20px',
                backgroundColor: 'lightgreen',
                borderRadius: '10px'
            }}>

            </div>
        </div>
        {getBrutalMessage(completionPercentage)}

        {goals.map((goal, index)=> (
            <div key={index}>
            <input type='checkbox'
            checked={completed[index]}
            onChange={()=> 
            {
                const newChecked = [...completed]
                newChecked[index] = !newChecked[index]
                setCompleted(newChecked)
                saveCheckin(newChecked)
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