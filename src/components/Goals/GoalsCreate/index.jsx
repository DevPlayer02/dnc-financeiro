"use client"

import { useState } from 'react';
import axios from 'axios';
import * as S from './style';

export const GoalsCreate = () => {
    const [ description, setDescription] = useState('');
    const [ value, setValue] = useState('');
    const [ dateGoal, setDateGoal] = useState('');
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'description') setDescription(value)
        if (name === 'value') setValue(value)
        if (name === 'dateGoal') setDateGoal(value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem('token')
            await axios.post('http://localhost:8080/goals', { description, value, date: dateGoal }, {
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            })
            setNotification({
                open: true,
                message: `Meta ${ description } criada com sucesso!`,
                severity:"success"
            })
        } catch (err) {
            setNotification({
                open: true,
                message: err.response.data.err,
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
                <S.H1>Criar meta</S.H1>
                <S.TextField name="description" onChange={ onChangeValue } label="Description" variant="outlined" color="primary" fullWidth/>
                <S.TextField name="value" onChange={ onChangeValue } label="Value" variant="outlined" color="primary" fullWidth/>
                <S.TextField name="dateGoal" onChange={ onChangeValue } label="Date" variant="outlined" color="primary" fullWidth/>
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

export default GoalsCreate