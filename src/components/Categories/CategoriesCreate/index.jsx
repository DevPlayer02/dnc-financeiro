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
        setNotification({ open: false, message: '', severity: '' }); 
        closeModal(false);
    };

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'name') setName(value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8080/categories', { name }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotification({
                open: true,
                message: `Categoria ${name} criada com sucesso!`,
                severity: 'success',
            });
        } catch (err) {
            setNotification({
                open: true,
                message: err.response.data.error || "Erro ao criar categoria",
                severity: 'error',
            });
        }
    };
    

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
                    }}
                >
                    <S.DialogTitle> Nova categoria </S.DialogTitle>
                    <DialogContent>
                        <S.TextField name="name" onChange={ onChangeValue } label="nome" variant="outlined" color="primary" fullWidth/>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" type="submit" onClick={onSubmit}> Salvar </Button>
                    </DialogActions>
                </Dialog>
                <S.Snackbar open={notification.open} autoHideDuration={null} onClose={handleClose} >
                    <S.Alert onClose={handleClose} variant='filled' severity={ notification.severity } sx={{ width: '100%' }}>
                        { notification.message }
                    </S.Alert>
                </S.Snackbar>
        </>
        
    )
}

export default CategoriesCreate