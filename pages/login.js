import {useState} from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/router'

export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    async function handleLogin(e){
        e.preventDefault()
        setError('')
        setLoading(true)
        const {error, data} = await supabase.auth.signInWithPassword(
            {
                email: email, 
                password: password
            }
        )
        

        if (error){
            setError(error.message)

        }
        else{
            console.log('You have successfully logged in!')
            router.push('/dashboard')
        }
        setLoading(false)
    }


    return (
            <form onSubmit={handleLogin}>
                <div>
                <h2>Login</h2>
                <input 
                type='email'
                placeholder= 'Enter your email'
                value = {email}
                onChange={ (e)=> setEmail(e.target.value)}
                />
                <input
                type = 'password'
                placeholder = 'Enter your password'
                value = {password}
                onChange={(e)=> setPassword(e.target.value)}
                />
               </div>
                {error && <p style={{color: 'red'}}>{error}</p>}


            <button type='submit' disabled={loading}>{loading ? 'Logging in...': 'LoginIn'}</button>


            </form>

    )
}