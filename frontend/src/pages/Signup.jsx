import React,{useState} from 'react';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);
const SignupPage = ()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    const createUser = async ()=>{
        try{
            
            await createUserWithEmailAndPassword(auth,email,password);
            navigate('/');
        }catch(error){
            console.log(error);
        }
    }
    return(
        <div className='signup-page'>
            <label>Email</label>
            <input onChange={e=> setEmail(e.target.value)} value={email} type="email" required placeholder='Email' />
            <label>Password</label>
            <input onChange={e=> setPassword(e.target.value)} value={password} type="password" required placeholder='password' />
            <button onClick={createUser}>Sign Up</button>
        </div>
    )
}
export default SignupPage;