import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';
import axios from 'axios';
import RegisterImg from '../assets/img/register.png';
import environment from '../config/environment';
export default function Register() {
    let [showPassword, setShowPassword] = useState(false);
    let [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState('');
    const history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('userCtx') && localStorage.getItem('token')){
            history.push("/");
        }
     }, [])
    const onSubmit = async e => {
        e.preventDefault();
        setMessage("")
        console.log("email: ",typeof email , ' = ',typeof password)
        if(!email || !password || !name || !confirmPassword){
            setMessage('All fields are mandatory!');
            return;
        }
        if(password !== confirmPassword){
            setMessage('Password are not matching!');
            return;
        }
        try {
          const res = await axios.post(`${environment.BASE_URL}/auth/register`, {email,password, name}, {
            headers: {
              'Content-Type': 'application/json'
            } 
          });
          localStorage.setItem('userCtx',JSON.stringify(res?.data?.data?.user));
          localStorage.setItem('token',JSON.stringify(res?.data?.data?.token));
          history.push("/")
          setMessage(res.data.successMsg);
        } catch (err) {
            console.log(" erorre", err.errorMsg)
            console.log(JSON.stringify(err))
          if (err?.response?.status === 500) {
            setMessage('There was a problem with the server');
          } else if(err?.response?.status === 400) {
            setMessage(err?.response?.data.errorMsg );
          }else{
            setMessage('Something went wrong!');
          }
        }
      };
    return (
        <div>
            <NavBar />
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-8 col-lg-8 col-md-6 d-none d-xl-block d-lg-block d-md-block d-sm-none">
                        <div className="feedbackBlock text-center" style={{ marginTop: '0px' }}>
                            <div>
                                <img src={RegisterImg} alt="Salesbook" className="img-fluid img-fluid-custom" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <h4 className="pb-3"><i className="fas fa-fingerprint"></i> Register Here...</h4>
                        <h6 className="text-center mt-2 mb-2" style={{color: 'orange'}}>{message}</h6>
                        <form onSubmit={onSubmit} className="mt-2">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name*</label>
                                <input 
                                type="text"
                                className="form-control" 
                                id="name" 
                                placeholder="enter name..."
                                name="name" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                 />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email*</label>
                                <input 
                                type="email"
                                className="form-control" 
                                id="email" 
                                placeholder="enter email..."
                                name="email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                 />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password*</label>
                                <div className="input-group">
                                <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control" 
                                id="password" 
                                placeholder="enter password..." 
                                aria-describedby="basic-addon2" 
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                                <span className="input-group-text" id="basic-addon2" onClick={()=>setShowPassword( showPassword = !showPassword)}><i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i></span>
                            </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password*</label>
                                <div className="input-group">
                                <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                className="form-control" 
                                id="confirmPassword" 
                                placeholder="enter confirm password..." 
                                aria-describedby="basic-addon2" 
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                />
                                <span className="input-group-text" id="basic-addon2" onClick={()=>setShowConfirmPassword( showConfirmPassword = !showConfirmPassword)}><i className={showConfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i></span>
                            </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg"><i className="fas fa-user-lock"></i> Register</button>
                            </div>
                            <div className="text-center">
                                <Link to={"/login"} style={{ textDecoration: 'none' }}>Already a member?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
