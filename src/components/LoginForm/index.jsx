"use client"

import { useState } from 'react';
import axios from 'axios';
import * as S from './style';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
    const router = useRouter()
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ notification, setNotification] = useState(false);
    const [ showPassword, setShowPassword] = useState(false);

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:8080/auth/login', { email, password })
            localStorage.setItem('token', response.data.data.token)
            setNotification({
                open: true,
                message: `Bem vindo ${ email } !`,
                severity:"success"
            })
            router.push('/dashboard')
        } catch (err) {
            setNotification({
                open: true,
                message: err.response.data.error,
                severity:"error"
            })
        }
    }

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotification({
            open: false,
            message: '',
            severity: ''
        })
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
        
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    

    return (
        <>
            <S.Form onSubmit={onSubmit}>
            <S.Typography variant="h1" color="primary">YOUR<S.Span>finance.</S.Span>IO</S.Typography>
                <S.TextField name="email" onChange={ onChangeValue } label="E-mail" variant="outlined" color="primary" fullWidth/>
                <S.FormControl variant="outlined" fullWidth>
                    <S.InputLabel htmlFor="outlined-adornment-password"> Senha </S.InputLabel>
                    <S.OutlinedInput 
                        id="outlined-adornment-password"
                        name="password"
                        onChange={ onChangeValue }
                        type={showPassword ? 'text' : 'password'}  
                        endAdornment={
                            <S.InputAdornment position="end">
                                <S.IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <S.VisibilityOff /> : <S.Visibility />}
                                </S.IconButton>
                            </S.InputAdornment>
                        } label="Password" 
                    />
                </S.FormControl>
                <S.Button variant="contained" color='primary' type="submit" fullWidth> Enviar </S.Button>
                <S.Link href="/register" > Criar uma conta </S.Link>
            </S.Form>
            <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose} >
                <S.Alert onClose={handleClose} variant='filled' severity={ notification.severity } sx={{ width: '100%' }}>
                    { notification.message }
                </S.Alert>
            </S.Snackbar>
        </>
        
    )
}

export default LoginForm