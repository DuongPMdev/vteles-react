// src/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [customLoginID, setCustomLoginID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken !== null && accessToken !== '') {
            sendRequestGetAccount(accessToken);
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
                else if (position === 'admin_telesale') {
                    navigate('/admin_telesale');
                }
                else if (position === 'sale') {
                    navigate('/sale');
                }
                else if (position === 'telesale') {
                    navigate('/telesale');
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    const onClickButtonLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/account/login', {
                'custom_login_id' : customLoginID.toLowerCase(),
                'password' : password,
            });
            const is_valid_account = response.data.is_valid_account;
            if (is_valid_account === true) {
                const token = response.data.access_token;
                localStorage.setItem('access_token', token);
                setError(null);
                sendRequestGetAccount(token);
            }
            else {
                setError('Tên đăng nhập không tồn tại!');
            }
        }
        catch (error) {
            setError('Đăng nhập không thành công!');
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit = { onClickButtonLogin }>
                <h1>Đăng nhập</h1>
                <input
                    type='text'
                    placeholder='Tài khoản'
                    value={customLoginID}
                    onChange={(e) => setCustomLoginID(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Mật khẩu'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p>{error}</p>}
                <button type='submit'>Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
