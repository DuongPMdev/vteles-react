import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css"; // Ensure this is correctly imported

const Sale = () => {
    const navigate = useNavigate();
    const [sectionsVisibility, setSectionsVisibility] = useState([true, false, false, false, false]);

    const toggleSection = (index) => {
        const newVisibility = [false, false, false, false, false];
        newVisibility[index] = true;
        setSectionsVisibility(newVisibility);
    };

  
    const [displayName, setDisplayName] = useState('');

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

    return (
        <div className="app">
            <div className="main-content">
                <aside className="sidebar">
                <h1 className="title">Xin chào, {displayName}</h1>
                <div className="buttons">
                    <button className={`section-button ${sectionsVisibility[0] === true ? "active" : ''}`} onClick={() => toggleSection(0)}>Quản lý Telesale</button>
                    <button className={`section-button ${sectionsVisibility[1] === true ? "active" : ""}`} onClick={() => toggleSection(1)}>Quản lý Dự án</button>
                    <button className={`section-button ${sectionsVisibility[2] === true ? "active" : ""}`} onClick={() => toggleSection(2)}>Quản lý Data</button>
                    <button className={`section-button ${sectionsVisibility[3] === true ? "active" : ""}`} onClick={() => toggleSection(3)}>Quản lý Hoạt động</button>
                    <button className={`section-button ${sectionsVisibility[4] === true ? "active" : ""}`} onClick={() => toggleSection(4)}>Hỗ trợ Marketing</button>
                    <button className='section-button' onClick={() => {}}>Đổi mật khẩu</button>
                </div>
                <button className="logout-button" onClick={onClickButtonLogout}>Đăng xuất</button>
                </aside>
                <div className="content">
                <h1 className="title">Page Title</h1>
                { sectionsVisibility[0] && <div className="sections">
                    <div className="section">Section 01</div>
                    <div className="section">Section 02</div>
                </div>}
                { sectionsVisibility[1] && <div className="sections">
                    <div className="section">Section 11</div>
                    <div className="section">Section 12</div>
                </div>}
                { sectionsVisibility[2] && <div className="sections">
                    <div className="section">Section 21</div>
                    <div className="section">Section 22</div>
                </div>}
                { sectionsVisibility[3] && <div className="sections">
                    <div className="section">Section 31</div>
                    <div className="section">Section 32</div>
                </div>}
                { sectionsVisibility[4] && <div className="sections">
                    <div className="section">Section 41</div>
                    <div className="section">Section 42</div>
                </div>}
                </div>
            </div>
        </div>
    );
};

export default Sale;
