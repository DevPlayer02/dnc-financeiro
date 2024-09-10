'use client'

import axios from 'axios';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { CategoriesCreate } from '@/components/Categories/CategoriesCreate'

export const ExtractPage = () => {
    const [ user, setUser ] = useState({
        id: null
    });

    const [openModal, setOpenModal] = useState(false);

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
                <Button variant='contained' color='success' type='submit'> Nova Transação </Button>
                <Button variant='contained' color='success' type='submit' onClick={() => setOpenModal(true)}> Nova Categoria </Button>
                <Button variant='contained' color='success' type='submit'> Nova Meta </Button>
            </div>
            <CategoriesCreate openModal={openModal} closeModal={setOpenModal}/>
        </>
    )
};

export default ExtractPage;