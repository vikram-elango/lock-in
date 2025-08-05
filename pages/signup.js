import { useState } from 'react'
import {supabase} from '../../lib/supabase'
export default function SignUp(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        setError('')

        const {data, error} = await supabase.auth.signUp(
            {
                email: email, 
                password: password
            }
        )

        if (error){
            
            console.log("Error: ", error)
            setError(error.message)
        }else {
            console.log("Success, check your email!")
        }

        setLoading(false)
    }


    return (
        <form onSubmit={handleSubmit}>

            <div>
            <h2>Sign Up</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input
            type="email"
            placeholder = "Enter your email"
            value = {email}
            onChange={(e)=> setEmail(e.target.value)}
            />

            <input 
            type = "password"
            placeholder = "Enter your password"
            value = {password}
            onChange={(e)=> setPassword(e.target.value)}
            />

            </div>

            <button type='Submit' disabled={loading}>{loading? 'Creating account...':'Sign Up'}</button>
            
        </form>


    )
}