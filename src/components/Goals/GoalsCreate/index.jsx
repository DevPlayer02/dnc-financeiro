"use client"

import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import * as S from './style';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { NumericFormat } from 'react-number-format';

const NumericFormatCustom = forwardRef(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator="."
            decimalSeparator=','
            valueIsNumericString
            prefix="R$ "
        />
    );
});

export const GoalsCreate = ({ openModal, closeModal }) => {
    const [ description, setDescription] = useState('');
    const [ value, setValue] = useState('');
    const [ dateGoal, setDateGoal] = useState('');
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(openModal) {
            setOpen(true);
        }
    }, [openModal]);

    const handleCloseModal = () => {
        setOpen(false);
        setNotification({ open: false, message: '', severity: '' }); 
        closeModal(false);
    };

    const onChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'description') setDescription(value);
        if (name === 'value') setValue(value);
        if (name === 'dateGoal') setDateGoal(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8080/goals', { description, value: value * 100, date: dateGoal }, {
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            });
            setNotification({
                open: true,
                message: `Meta ${ description } criada com sucesso!`,
                severity: "success"
            });
        } catch (err) {
            setNotification({
                open: true,
                message: err.response.data.err,
                severity: "error"
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
        });
    };

    return (
        <>  
            <Dialog
                open={open}
                onClose={handleCloseModal}
                PaperProps={{
                    component: 'form',
                }}
            >
                <S.DialogTitle> Nova meta </S.DialogTitle>
                <DialogContent>
                    <S.TextField 
                        name="description" 
                        onChange={onChangeValue} 
                        label="Description" 
                        variant="outlined" 
                        color="primary" 
                        fullWidth
                    />
                    <S.TextField 
                        name="dateGoal" 
                        onChange={onChangeValue} 
                        label="Date" 
                        variant="outlined" 
                        color="primary" 
                        fullWidth
                    />
                    <S.TextField
                        label="Valor"
                        name="value"
                        onChange={onChangeValue}
                        InputProps={{
                            inputComponent: NumericFormatCustom,
                        }}
                        variant="outlined"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" type="submit" onClick={onSubmit}> Enviar </Button>
                </DialogActions>
            </Dialog>
            <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose}>
                <S.Alert onClose={handleClose} variant='filled' severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </S.Alert>
            </S.Snackbar>
        </>
    );
};

export default GoalsCreate;
