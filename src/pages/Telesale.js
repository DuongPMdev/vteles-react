import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Telesale = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token !== null && token !== '') {
            sendRequestGetAccount(token);
        }
        else {
            navigate('/');
        }
    }, [navigate]);

    const sendRequestGetAccount = async(accessToken) => {
        try {
            const response = axios.get('http://localhost:4000/account/account', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            response.then(response => {
                const position = response.data.account.position.toLowerCase();
                if (position === 'admin_marketing') {
                    navigate('/admin_marketing');
                }
                if (position === 'admin_telesale') {
                    navigate('/admin_telesale');
                }
                if (position === 'sale') {
                    navigate('/sale');
                }
                if (position === 'telesale') {
                    navigate('/telesale');
                }
            });
        }
        catch (error) {
            navigate('/');
            console.log(error);
        }
    }

    const onClickButtonLogout = () => {
        localStorage.setItem('access_token', '');
        navigate('*');
    }

    return (
        <div>
            <h2>Telesale Page</h2>
            <p>Welcome to your profile!</p>
            <button onClick={() => onClickButtonLogout()}>
                Logout
            </button>
        </div>
    );
};

export default Telesale;