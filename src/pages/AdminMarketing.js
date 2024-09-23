// src/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles

const AdminMarketing = () => {

    const navigate = useNavigate();
    const [showDigitalMarketingManage, setShowDigitalMarketingManage] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [displayName, setDisplayName] = useState('');

    const [startDate, setStartDate] = useState(new Date());

    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token !== null && token !== '') {
            sendRequestGetAccount(token);
        }
        else {
            navigate('/');
        }
    }, [navigate]);

    const toggleSection = (section) => {
        setShowDigitalMarketingManage(false);
        setShowChangePassword(false);

        if (section === 'digital-marketing-manage') {
            setShowDigitalMarketingManage(true);
        }
        else if (section === 'change-password') {
            setShowChangePassword(true);
        }
    };

    const sendRequestGetAccount = async(accessToken) => {
        try {
            const response = axios.get('http://localhost:4000/account/account', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            response.then(response => {
                setDisplayName(response.data.account.display_name);
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

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked); // Update state based on checkbox status
      };

    return (
        <div className='container'>
            <div className='sidebar'>
                <h3>Xin chào, {displayName}</h3>
                <ul style={listStyles}>
                    <li>
                        <button className="sidebar-button" onClick={() => toggleSection('digital-marketing-manage')}>
                            Quản lý Digital Marketing
                        </button>
                    </li>
                    <li>
                        <button className="sidebar-button" onClick={() => toggleSection('change-password')}>
                            Đổi mật khẩu
                        </button>
                    </li>
                    <li>
                        <button className="logout-button" onClick={() => onClickButtonLogout()}>
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </div>
            <div className='content'>
                {showDigitalMarketingManage && (
                    <div>
                        <h1 className='title'>Quản lý Digital Marketing</h1>
                        <div className='sub-content'>
                            <div>
                                <h>Theo ngày chạy quảng cáo</h>
                                <div>
                                    <h>Từ ngày</h>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"/>
                                    <h>đến ngày</h>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"/>
                                </div>
                            </div>
                            <div>
                                <h>Theo lần tương tác cuối</h>
                                <div>
                                    <h>Từ ngày</h>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"/>
                                    <h>đến ngày</h>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"/>
                                </div>
                            </div>
                            <div>
                                <h>Theo tình trạng khách</h>
                            </div>
                            <label>
                                <input
                                type="checkbox"
                                checked={isChecked} // Control checkbox state
                                onChange={handleCheckboxChange} // Handle change event
                                />
                                Theo vị trí
                            </label>
                        </div>
                    </div>
                )}
                {showChangePassword && (
                    <div>
                        <h1>Đổi mật khẩu</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

const listStyles = {
    listStyleType: 'none',
    padding: 0,
};

export default AdminMarketing;
