"use client"

import { useState } from 'react';
import axios from 'axios';
import * as S from './style';
import { useRouter } from 'next/navigation';


export const RegisterForm = () => {
    const router = useRouter()
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ name, setName] = useState('');
    const [ notification, setNotification] = useState(false);
    const [ showPassword, setShowPassword] = useState(false);

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
            if (name === 'password') setPassword(value)
                if (name === 'name') setName(value)
                }
            
            const onSubmit = async (e) => {
                e.preventDefault()
                
                try {
                    const response = await axios.post('http://localhost:8080/auth/register', { email, password, name })
                    localStorage.setItem('token', response.data.data.token)
                    setNotification({
                        open: true,
                        message: `Usuário ${ email } cadaastrado com sucesso !`,
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
            <S.Typography variant="h2" color="dark" ><b> Crie sua conta </b></S.Typography>
                <S.TextField name="name" onChange={ onChangeValue } label="Nome" variant="outlined" color="primary" fullWidth/>
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
                <S.Button variant="contained" type="submit" fullWidth> Cadastrar </S.Button>
                <S.P> ou faça login </S.P>
                <S.P> Já possui uma conta? <S.Link href="/login"> Faça login aqui. </S.Link></S.P>
            </S.Form>
            <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose} >
                <S.Alert onClose={handleClose} variant='filled' severity={notification.severity} sx={{ width: '100%' }}>
                    { notification.message }
                </S.Alert>
            </S.Snackbar>
        </>
        
    )
}