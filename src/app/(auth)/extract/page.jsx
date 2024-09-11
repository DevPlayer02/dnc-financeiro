'use client'

import axios from 'axios';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { CategoriesCreate } from '@/components/Categories/CategoriesCreate'
import { GoalsCreate } from '@/components/Goals/GoalsCreate'

export const ExtractPage = () => {
    const [ user, setUser ] = useState({
        id: null
    });

    const [openModalCategory, setOpenModalCategory] = useState(false);
    const [openModalGoal, setOpenModalGoal] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }

        axios.get('http://localhost:8080/users/me', {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        }).then( response => {
            console.log(response.data.data)
        }
        ).catch( error => {
            window.location.href = '/login';
        })
    }, [])

    return (
        <>
            <div style={{ display: 'flex', gap: '15px'}}>
                <Button variant='contained' type='submit'> Nova Transação </Button>
                <Button variant='contained' type='submit' onClick={() => setOpenModalCategory(true)}> Nova Categoria </Button>
                <Button variant='contained' type='submit' onClick={() => setOpenModalGoal(true)}> Nova Meta </Button>
            </div>
            <CategoriesCreate openModal={openModalCategory} closeModal={setOpenModalCategory}/>
            <GoalsCreate openModal={openModalGoal} closeModal={setOpenModalGoal}/>
        </>
    )
};

export default ExtractPage;