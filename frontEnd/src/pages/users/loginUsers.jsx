import * as React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import { loginUser } from '../../../requests_api/users';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const LoginUser = () => {
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await loginUser(formData);
            const data = response;
            setIsSubmitting(true);
            formData
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data));

            config.headers['Authorization'] = `Bearer ${data.accessToken}`;

            notifySuccess();
            navigate('/')
            window.location.reload()

        } catch (error) {
            console.error('Erro ao chamar a API:', error.message);
            notifyFail()
        }
    };

    const notifySuccess = () => {
        toast.success('Logged in!', {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => navigate("/")
          });
      };
    
      const notifyFail = () => {
        toast.error('Something went wrong!', {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => window.location.reload()
          });
      };

    return (
        <>

            <div className="flex items-center justify-center" style={{ height: "70vh" }} >
                <div className="w-full max-w-lg p-4 bg-gray-800 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-white text-center">Sign in Library</h5>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">email address</label>
                            <input type="text" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ricardo Blue" required />
                        </div>

                        <div className=''>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </div>
                        </div>




                        <button className="w-full bg-green-600 text-white hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isSubmitting} >
                            login to your account
                        </button>
                        <div className="text-sm font-medium text-white">
                            Not registered? <a href="/users/new" className="text-black hover:underline">Create account</a>
                        </div>
                    </form>
                </div >
            </div >

        </>
    );
};

export default LoginUser;