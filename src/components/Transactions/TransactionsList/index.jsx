"use client"

import * as S from './style'
import { useEffect, useState } from 'react';
import { compareAsc, format } from 'date-fns'; 
import axios from 'axios'
import Paper from '@mui/material/Paper';
import { MenuItem, Select } from '@mui/material';

export const TransactionsList = () => {

    const [ transactions, setTransactions ] = useState([])
    const [ type, setType] = useState('')
    const [ filteredTransactions, setFilteredTransactions ] = useState([])
    const [year, setYear] = useState("Todos");
    const [ selectYear, setSelectYear] = useState([])

    useEffect(() => {
        const getTransactions = async () => {
          try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:8080/transactions/', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            setTransactions(response.data.data)

            const dataArray = response.data.data;
            const yearsArray = [...new Set(dataArray.map(obj => obj.date.slice(0, 4)))];
            setSelectYear(yearsArray);

          } catch (error) {
            setNotification({
              open: true,
              message: error.response.data.message,
              severity: "error"
            })
          }
        }
        getTransactions()
      }, [])

      useEffect(() => {
        if (!year.length) {

            if (type === 'Todas') {
                setFilteredTransactions(transactions)
            }
            if (type === 'Receita') {
            const receita = transactions.filter(transaction => transaction.type === 'Receita' && new Date(transaction.date).getFullYear() === Number(year))
            setFilteredTransactions(receita)
            }
            if (type === 'Despesa') {
            const despesa = transactions.filter(transaction => transaction.type === 'Despesa' && new Date(transaction.date).getFullYear() === Number(year))
            setFilteredTransactions(despesa)
            }
        
        } else {
            if (type === 'Todas') {
                const todas = transactions.filter(transaction =>  new Date(transaction.date).getFullYear() === Number(year))
                setFilteredTransactions(transactions)
            }
            if (type === 'Receita') {
              const receita = transactions.filter(transaction => transaction.type === 'Receita' && new Date(transaction.date).getFullYear() === Number(year))
              setFilteredTransactions(receita)
            }
            if (type === 'Despesa') {
              const despesa = transactions.filter(transaction => transaction.type === 'Despesa' && new Date(transaction.date).getFullYear() === Number(year))
              setFilteredTransactions(despesa)
            }
        }
      }, [ type, transactions, year ])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy'); 
    };

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'year') setYear(value)

    }

    return (
        <>  
            <Select
                labelId="year"
                id="id_year"
                name="year"
                value={year}
                label="Anos"
                onChange={onChangeValue}
                >
                    <MenuItem value="Todos" > Todos </MenuItem>
                    {selectYear.map(year => (
                        <MenuItem key={year} value={year} >
                            {year}
                        </MenuItem>
                    ))}
            </Select>
            <div style={{ display: 'flex', gap: '20px', margin: '30px 0', cursor: 'pointer'}}>
                    <div onClick={() => setType('Todas')}>Todas</div>
                    <div onClick={() => setType('Receita')}>Receita</div>
                    <div onClick={() => setType('Despesa')}>Despesa</div>
            </div>
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
                        {filteredTransactions.map((transaction) => (
                            <S.TableRow
                            key={transaction.description}
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
        </>
  );
};

export default TransactionsList;