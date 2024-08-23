'use client'

import axios from "axios"
import { useEffect, useState } from "react";
// import { CategoriesCreate } from '@/components/Categories/CategoriesCreate'
// import { CategoriesUpdate } from '@/components/Categories/CategoriesUpdate'
// import { GoalsCreate } from "@/components/Goals/GoalsCreate";
import { GoalsUpdate } from "@/components/Goals/GoalsUpdate";

export const DashboardPage = () => {
    const [ user, setUser ] = useState({
        id: null
    })

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
        <div>
            <h1>Dashboard</h1>
            < GoalsUpdate goalId={ 1 }/>
        </div>
    )
}

export default DashboardPage;