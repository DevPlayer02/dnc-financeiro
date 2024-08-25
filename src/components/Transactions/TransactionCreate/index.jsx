"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './style';

export const TransactionCreate = () => {
    const [ description, setDescription] = useState('');
    const [ value, setValue] = useState('');
    const [ dateTransaction, setDateTransaction] = useState('');
    const [ type, setType] = useState('');
    const [ category, setCategory] = useState('');
    const [ categories, setCategories] = useState([]);
    const [ notification, setNotification] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'description') setDescription(value)
        if (name === 'value') setValue(value)
        if (name === 'dateTransaction') setDateTransaction(value)
        if (name === 'type') setType(value)
        if (name === 'category') setCategory(value)
    }

    useEffect(() => {
        const getCategories = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/categories/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    } 
                })
                setCategories(response.data.data)
            } catch (error) {
                setNotification({
                    open: true,
                    message: error.response.data.message,
                    severity:"error"
                })
            }
        }

        getCategories()
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem('token')
            await axios.post('http://localhost:8080/transactions', { description, value, date: dateTransaction, type, category_id: category }, {
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            })
            setNotification({
                open: true,
                message: `Transação ${ description } criada com sucesso!`,
                severity:"success"
            })
        } catch (error) {
            console.log(error)
            setNotification({
                open: true,
                message: error.response.data.error,
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
                <S.H1>Criar transação</S.H1>
                <S.TextField name="description" onChange={ onChangeValue } label="Name" variant="outlined" color="primary" fullWidth/>
                <S.TextField name="value" onChange={ onChangeValue } label="Value" variant="outlined" color="primary" fullWidth/>
                <S.TextField name="dateTransaction" onChange={ onChangeValue } label="Date" variant="outlined" color="primary" fullWidth/>
                <S.FormControl fullWidth>
                    <S.InputLabel id="type"> Type </S.InputLabel>
                    <S.Select
                        labelId="type"
                        id="type_select"
                        name="type"
                        value={ type }
                        label="Typo"
                        onChange={onChangeValue}
                    >
                    <S.MenuItem value=" Despesa "> Despesa </S.MenuItem>
                    <S.MenuItem value=" Receita "> Receita </S.MenuItem>
                    </S.Select>
                </S.FormControl>
                <S.FormControl fullWidth>
                    <S.InputLabel id="Category"> Category </S.InputLabel>
                    <S.Select
                        labelId="category"
                        id="category_select"
                        name="category"
                        value={ category }
                        label="Category"
                        onChange={onChangeValue}
                    >
                    { categories.length && categories.map(category => 
                        <S.MenuItem key={ category.id} value={ category.id}> { category.name } </S.MenuItem>)}
                    </S.Select>
                </S.FormControl>
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

export default TransactionCreate