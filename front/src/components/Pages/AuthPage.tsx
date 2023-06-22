import { FC, PropsWithChildren, useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserService from "../../services/UserService";

interface Props extends PropsWithChildren {
    className?: string;
}

const BASE_URL = "http://localhost:3000/api"

const AuthPage: FC<Props> = ({ children, className, ...props }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        console.log(email, password)
        axios.post(BASE_URL + '/auth/login', { email, password })
            .then(response => {
                setErrorMessage('')
                console.log(response);
                const token = response.data.token;
                localStorage.setItem('Authorization', `Bearer ${token}`);
                console.log(token)
                console.log(UserService.isLoggedIn())
                navigate('/');
            })
            .catch(error => {
                setSuccessMessage('')
                console.log(error.response)
                if (error.response && error.response.status === 400) {
                    setErrorMessage('Incorrect email or password');
                } else {
                    setErrorMessage('Failed to login');
                }
            });
    };

    const handleRegister = async () => {
        axios.post(BASE_URL + '/auth/register', { email, password })
            .then(response => {
                setErrorMessage('')
                const message = response.data.message
                setSuccessMessage(message + ' Log in please')
                // Redirect or perform any other actions upon successful registration
            })
            .catch(error => {
                setSuccessMessage('')
                if (error.response && error.response.status === 400) {
                    setErrorMessage('User with such email already exists');
                } else {
                    setErrorMessage('Failed to register');
                }
            });
    };

    return (
        <div>
            <h2>Авторизуйтесь або Зареєструйтесь</h2>
            <div className="d-flex flex-column justify-content-center login-form">

                {errorMessage && <div>{errorMessage}</div>}
                {successMessage && <div>{successMessage}</div>}
                <div className="form-group mb-2">
                    <input className="form-control" type="email" value={email} onChange={handleEmailChange} placeholder="Email" />

                </div>
                <div className="form-group mb-2">
                    <input className="form-control" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />

                </div>
                <button className="btn btn-primary mb-2" onClick={handleLogin}>Ввійти</button>
                <button className="btn btn-primary" onClick={handleRegister}>Зареєструватись</button>
            </div>
        </div>
    );
}

export default AuthPage