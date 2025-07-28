import {useState} from 'react';
import {supabase} from '../../lib/supabase';


export default function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword]=useState('')
    const [loading, setLoading]=useState(false)


    async function handleSignUp(e){
        e.preventDefault();     //stops from reloading the page 


        if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
        setLoading(true)

        try{
        const {error} = await supabase.auth.signUp({
            email: email,
            password: password
        })


        if (error){
            console.error("Signup Error: ", error)
            alert("Error: ", error.message)
        }else{
            alert("Check your email to confirm your account!")
        }}
        finally{
            setLoading(false)
        }
        
    }


return (
    <form onSubmit={handleSignUp}>

        <input 
        type="email"
        value = {email}
        placeholder='example@email.com'
        onChange={(e) => setEmail(e.target.value)}
        required/>

        <input 
        type="password"
        value = {password}
        onChange={(e)=> setPassword(e.target.value)}
        placeholder='Password minimum 6 characters'
        required
        />

        <button type='submit' disabled={loading}>
            {loading ? 'Signing up...': 'Sign Up'}
        </button>
    </form>
)
}