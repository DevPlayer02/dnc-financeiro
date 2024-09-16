"use client"

import { useState, useEffect, forwardRef  } from 'react';
import axios from 'axios';
import * as S from './style';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers';


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
            decimalSeparator=","
            valueIsNumericString
            prefix="R$ "
        />
    );
});

export const TransactionsCreate = ({ openModal, closeModal }) => {
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
            await axios.post('http://localhost:8080/transactions', { description, value: value * 100, date: dateTransaction, type, category_id: category }, {
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
            <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose} >
                <S.Alert onClose={handleClose} variant='filled' severity={ notification.severity } sx={{ width: '100%' }}>
                    { notification.message }
                </S.Alert>
            </S.Snackbar>

            <Dialog
                open={open}
                onClose={handleCloseModal}
                PaperProps={{
                    component: 'form',
                }}
            >
                <S.DialogTitle> Nova transação </S.DialogTitle>
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
                        label="Value"
                        name="value"
                        value={value}
                        onChange={onChangeValue}
                        InputProps={{
                            inputComponent: NumericFormatCustom,
                        }}
                        variant="outlined"
                        fullWidth
                    />
                    <S.FormControl fullWidth>
                        <S.InputLabel id="type"> Tipo </S.InputLabel>
                        <S.Select
                            labelId="type"
                            id="type_select"
                            name="type"
                            value={ type }
                            label="Tipo"
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker value={ dateTransaction }  onChange={(newValue) => setDateTransaction(newValue)}/>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" type="submit" onClick={onSubmit}> Enviar </Button>
                </DialogActions>
            </Dialog>
        </>
        
    )
}

export default TransactionsCreate;