"use client"

import * as S from './style'
import { useEffect, useState } from 'react';
import { compareAsc, format } from 'date-fns'; 
import axios from 'axios'
import Paper from '@mui/material/Paper';

export const TransactionsList = () => {

    const [ transactions, setTransactions ] = useState([])
    const [ categories, setCategories] = useState([]);

    // function createData(descricao, transacao, data, situacao, valor) {
    //     return { descricao, transacao, data, situacao, valor };
    //   }

    useEffect (() => {
        const getTransactions = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/transactions/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    } 
                })
                setTransactions(response.data.data)
            } catch (error) {
                setNotification({
                    open: true,
                    message: error.response.data.message,
                    severity:"error"
                })
            }
        }
        getTransactions()
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy'); // Formato de data brasileiro (ou personalize conforme necessário)
    };

    //   const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   ];

    return (
        <S.TableContainer component={Paper}>
            <S.Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <S.TableHead>
                    <S.TableRow>
                        <S.TableCell> Descrição </S.TableCell>
                        <S.TableCell align="right"> Transação </S.TableCell>
                        <S.TableCell align="right"> Data </S.TableCell>
                        <S.TableCell align="right"> Situação </S.TableCell>
                        <S.TableCell align="right"> Valor </S.TableCell>
                    </S.TableRow>
                </S.TableHead>
                <S.TableBody>
                    {transactions.map((transaction) => (
                        <S.TableRow
                        key={transaction.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <S.TableCell component="th" scope="row">
                                {transaction.description}
                            </S.TableCell>
                            <S.TableCell align="right">{transaction.type}</S.TableCell>
                            <S.TableCell align="right">{formatDate(transaction.date)}</S.TableCell>
                            <S.TableCell align="right">{compareAsc(new Date(), new Date(transaction.date)) === 1 ? 'Realizada' : 'Planejada'}</S.TableCell>
                            <S.TableCell align="right">{transaction.value / 100}</S.TableCell>
                        </S.TableRow>
                    ))}
                </S.TableBody>
            </S.Table> 
        </S.TableContainer>
  );
};

export default TransactionsList;