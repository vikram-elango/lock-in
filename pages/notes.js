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

            if (data.user){

                setUser(data.user)
                console.log(`Welcome, ${data.user.email}`)

                const {data: notesData, error: notesError} = await supabase.from('notes').select('*').eq('user_id', data.user.id)
                if (notesData && !notesError){
                    setNotes(notesData)
                
                }

                
            }
            else{
                router.push('/login')
            }
        }

        checkAuth()




    }, []) 

    async function handleSubmit(e){
        e.preventDefault()

        const today = new Date().toISOString().split('T')[0]
        const {data, error} = await supabase.from('notes').insert({
            user_id: user.id,
            created_at: today,
            title:title, 
            content: content

        }).select()

        if (data && !error){
            setTitle('')
            setContent('')
            setNotes([data[0], ...notes])
        }


    }

    

    return (
        <div>
            <form
            onSubmit={handleSubmit}
            >

            <h1>My notes</h1>
            {notes.map((note, index)=>(
                <div key={note.id}>
                    <div>{index+1}. {note.title}</div>
                    <div>{note.content}</div>
                    </div>
            ))}

            <div>

            <input
            value = {title}
            placeholder="Enter Title"
            onChange={(e)=> setTitle(e.target.value)}
            />
            </div>
            <div>
            <textarea
            value= {content}
            placeholder = "Write your notes here..."
            onChange={(e)=> setContent(e.target.value)}
            />
            </div>
            <button
            type="submit"
            >Submit</button>
            </form>
        </div>
    )
}