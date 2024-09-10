"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './style';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export const CategoriesCreate = ({ openModal, closeModal }) => {
    const [ name, setName] = useState('');
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(openModal) {
            setOpen(true)
        };
    },[openModal]);

    const handleCloseModal = () => {
        setOpen(false);
        closeModal(false);
    };

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'name') setName(value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem('token')
            await axios.post('http://localhost:8080/categories', { name }, {
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            })
            setNotification({
                open: true,
                message: `Categoria ${ name } criada com sucesso!`,
                severity:"success"
            })
        } catch (err) {
            setNotification({
                open: true,
                message: err.response.data.error,
                severity:"error"
            })
        }
        handleCloseModal()
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
                <Dialog
                    open={open}
                    onClose={handleCloseModal}
                    PaperProps={{
                    component: 'form',
                    // onSubmit: (event) => {
                    //     event.preventDefault();
                    //     const formData = new FormData(event.currentTarget);
                    //     const formJson = Object.fromEntries(formData.entries());
                    //     const email = formJson.email;
                    //     console.log(email);
                    //     handleCloseModal();
                    // },
                    }}
                >
                    <S.DialogTitle> Criar categoria </S.DialogTitle>
                    <DialogContent>
                        <S.TextField name="nome" onChange={ onChangeValue } label="nome" variant="outlined" color="primary" fullWidth/>
                        <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose} >
                            <S.Alert onClose={handleClose} variant='filled' severity={ notification.severity } sx={{ width: '100%' }}>
                                { notification.message }
                            </S.Alert>
                        </S.Snackbar>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" type="submit" onClick={onSubmit}> Save </Button>
                    </DialogActions>
                </Dialog>
        </>
        
    )
}

export default CategoriesCreate