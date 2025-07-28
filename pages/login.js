import {useState} from 'react'
import { supabase } from '../../lib/supabase'

export default function LogIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin(e){
        e.preventDefault()

        setLoading(true)

        try{
            const{error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if (error){
                console.error("Login Error: ", error)
                alert("Error", error.message)
            }
            else{
                console.log("Login Successful!")
                alert("Logged in successfully!")
            }}
            finally{
            setLoading(false)

            }
        }









    return (
        <form onSubmit= {handleLogin}>
            <input         
            type = "email"
            value = {email}
            placeholder='example@email.com'
            onChange={(e)=> setEmail(e.target.value)}   
            required
            />

            <input 
            type = "password"
            value = {password}
            placeholder='Password minimum 6 characters'
            onChange={(e) => setPassword(e.target.value)}
            required
            />

            <button type='submit' disabled={loading}>
                {loading ? 'Logging in...': 'Login'}
            </button>
        </form>
    )
}