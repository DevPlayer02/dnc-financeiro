"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './style';

export const GoalsUpdate = ({ goalId }) => {
    const [ description, setDescription] = useState('');
    const [ value, setValue] = useState('');
    const [ dateGoal, setDateGoal] = useState('');
    const [ userId, setUserId] = useState('');
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
    };

    useEffect(() => {
        const getGoal = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(`http://localhost:8080/goals/${ goalId }`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    } 
                })
                setDescription(response.data.data.description)
                setValue(response.data.data.value)
                setDateGoal(response.data.data.date)
                setUserId(response.data.data.user_id)
            } catch (error) {
                setNotification({
                    open: true,
                    message: error.response.data.message,
                    severity:"error"
                })
            }
        }

        getGoal()
    }, [ goalId ]);


    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem('token')
            await axios.put(`http://localhost:8080/goals/${ goalId }`, { description, value, date: dateGoal, user_id: userId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            })
            setNotification({
                open: true,
                message: `Meta ${ description } atualizada com sucesso!`,
                severity:"success"
            })
        } catch (err) {
            console.log(err)
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
                <S.H1>Atualizar meta</S.H1>
                <S.TextField name="description" onChange={ onChangeValue } label="Description" variant="outlined" value={description} color="primary" fullWidth/>
                <S.TextField name="value" onChange={ onChangeValue } label="Value" variant="outlined" value={value} color="primary" fullWidth/>
                <S.TextField name="dateGoal" onChange={ onChangeValue } label="Date" variant="outlined" value={dateGoal} color="primary" fullWidth/>
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

export default GoalsUpdate