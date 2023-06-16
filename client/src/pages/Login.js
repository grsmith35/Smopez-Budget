import react from 'react';
import { useMutation } from '@apollo/client';
import { ACCOUNT_LOGIN } from '../utils/mutations';
import { useStoreContext } from "../utils/GlobalState";
import auth from '../utils/auth';

export default function Login() {
    const [formState, setFormState] = react.useState({
        email: '',
        password: ''
    });

    const [login, { error }] = useMutation(ACCOUNT_LOGIN)


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({
                variables: {email: formState.email, password: formState.password}
            })
            auth.login(data.login.token, data.login.account._id)
        } catch (e) {
            console.error(error)
        }

        setFormState({
            email: "",
            password: ""
        })
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        })
    };

    return (
        <div className='container'>
            <div className='row'>
                <form className='my-auto' onSubmit={handleLogin} onChange={handleFormChange}>
                    <label htmlFor='email' className='row'>Email</label>
                    <input id='email' name='email' type='text' className='row' value={formState.email}></input>
                    <label htmlFor='password' className='row'>Password</label>
                    <input id='password' name='password' type='password' className='row' value={formState.password}></input>
                    <button className='btn btn-primary'>Login</button>
                    {error && <div>Login Failed</div>}
                </form>
            </div>
        </div>
    )
};