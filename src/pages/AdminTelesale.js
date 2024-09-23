import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminTelesale = () => {

    const navigate = useNavigate();

    const onClickButtonLogout = () => {
        localStorage.setItem('access_token', '');
        navigate('*');
    }
    
    return (
        <div>
            <h2>AdminTelesale Page</h2>
            <p>Welcome to your profile!</p>
            <button onClick={() => { localStorage.setItem('access_token', ''); navigate('*'); }}>
                Logout
            </button>
        </div>
    );
};

export default AdminTelesale;