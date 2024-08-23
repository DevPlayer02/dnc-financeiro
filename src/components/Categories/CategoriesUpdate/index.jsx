"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './style';

export const CategoriesUpdate = ({ categoryId }) => {
    const [ name, setName] = useState('');
    const [ userId, setUserId] = useState('');
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'name') setName(value)
    }

    useEffect(() => {
        const getCategory = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`http://localhost:8080/categories/${ categoryId }`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    } 
                })
                setName(response.data.data.name)
                setUserId(response.data.data.user_id)
            } catch (error) {
                setNotification({
                    open: true,
                    message: error.response.data.message,
                    severity:"error"
                })
            }
        }

        getCategory()
    }, [ categoryId ])

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem('token')
            await axios.put(`http://localhost:8080/categories/${ categoryId }`, { name, user_id: userId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            })
            setNotification({
                open: true,
                message: `Categoria ${ name } atualizada com sucesso!`,
                severity:"success"
            })
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

    return (
        <>
            <S.Form onSubmit={onSubmit}>
                <S.H1>Atualizar categoria</S.H1>
                <S.TextField name="name" onChange={ onChangeValue } label="Name" variant="outlined" value={name} color="primary" fullWidth/>
                <S.Button variant="contained" type="submit"> Enviar </S.Button>
                <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose} >
                    <S.Alert onClose={handleClose} variant='filled' severity={ notification.severity } sx={{ width: '100%' }}>
                        { notification.message }
                    </S.Alert>
                </S.Snackbar>
            </S.Form>
        </>
        
    )
}

export default CategoriesUpdate