import React, { Fragment,useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import axios from 'axios';
import LoginImg from '../assets/img/login.png';
import environment from '../config/environment';
export default function Login() {
    let [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        if(!email || !password){
            setMessage('Email/Password both are mandatory!');
            return;
        }
        try {
          const res = await axios.post(`${environment.BASE_URL}/auth/login`, {email,password}, {
            headers: {
              'Content-Type': 'application/json'
            } 
          });
          localStorage.setItem('userCtx',JSON.stringify(res?.data?.data?.user));
          localStorage.setItem('token',JSON.stringify(res?.data?.data?.token));
          history.push("/")
          setMessage(res.data.successMsg);
        } catch (err) {
            console.log(err)
          if (err?.response?.status === 500) {
            setMessage('There was a problem with the server');
          } else if(err?.response?.status === 400) {
            setMessage(err?.response?.data?.errorMsg);
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
                                <img src={LoginImg} alt="Salesbook" className="img-fluid img-fluid-custom" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <h4 className="pb-3"><i className="fas fa-fingerprint"></i> Login Here...</h4>
                        <h6 className="text-center mt-2 mb-2" style={{color: 'orange'}}>{message}</h6>
                        <form onSubmit={onSubmit} className="mt-2">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email*</label>
                                <input 
                                type="email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                placeholder="enter email..."
                                name="email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                 />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password*</label>
                                <div className="input-group">
                                <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control" 
                                id="exampleInputPassword1" 
                                placeholder="enter password..." 
                                aria-describedby="basic-addon2" 
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                                <span className="input-group-text" id="basic-addon2" onClick={()=>setShowPassword( showPassword = !showPassword)}><i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i></span>
                            </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg"><i className="fas fa-user-lock"></i> Login</button>
                            </div>
                            <div className="text-center">
                                <Link to={"/register"} style={{ textDecoration: 'none' }}>Become a member?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    )
}
