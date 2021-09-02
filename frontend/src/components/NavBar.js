import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import FloatButton from './FloatButton';
const NavBar = () => {
    const [userData, setUserData] = useState({});
    const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('userCtx')) {
            setUserData(JSON.parse(localStorage.getItem('userCtx')))
        }
    }, []);
    function logout(){
        localStorage.removeItem('userCtx');
        localStorage.removeItem('token');
        history.push("/");

    }
    return (
        <>
            <div>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="container-fluid">
                        <div style={{ display: 'flex'}}>
                            <div style={{ display: 'flex', lineHeight: '45px', paddingLeft: '1rem' }}>
                                {userData && Object.keys(userData).length ?
                                    <div style={{ fontSize: '1.5rem', color: '#fff', cursor: 'pointer' }}>
                                        <i className="fas fa-bars" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"></i>
                                    </div> :
                                    null}
                                <div style={{ fontSize: '1rem', paddingLeft: '1rem' }}>
                                    <a className="navbar-brand" href="/">Crowd Pouch</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {userData && Object.keys(userData).length ?
                    <FloatButton />
                    :
                    null}
            </div>
            <div>
                <div className="offcanvas offcanvas-start w-2" tabIndex="-1" id="offcanvas" data-bs-keyboard="true" data-bs-backdrop="true" style={{ maxWidth: '275px' }}>

                    <div className="offcanvas-header">
                        <div className="offcanvas-body px-0 py-0">
                            <div className="paddingOneRem" style={{ display: 'flex' }}>
                                <div className="text-center" style={{ width: '40px', height: '40px', backgroundColor: '#232c40', color: '#fff', borderRadius: '40px', lineHeight: '40px', fontSize: '20px', fontWeight: 'bold' }}>{userData?.name?.substring(0,1)}</div>
                                <div style={{ paddingLeft: "0.5rem" }}>
                                    <div style={{ fontSize: "16px" }}>{userData?.name}</div>
                                    <div style={{ fontSize: "12px" }}>Edit Profile</div>
                                </div>
                            </div>
                            <div className="accordion" id="accordionExample" style={{height: `calc(100vh - 120px)`}}>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            <i className="fas fa-users"></i><span style={{ paddingLeft: '0.5rem' }}>Population View</span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body cursor">
                                            <Link to={"/city-view"} style={{ textDecoration: 'none' }}>City Wise View</Link>
                                        </div>
                                        <div className="accordion-body cursor" >
                                            <Link to={"/city-by-population"} style={{ textDecoration: 'none' }}>
                                                City By Population View
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <i className="fas fa-user-tie"></i><span style={{ paddingLeft: '0.5rem' }}> File Management</span>
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body cursor">
                                            <Link to={"/upload-video"} style={{ textDecoration: 'none' }}>Upload Video</Link>
                                        </div>
                                        <div className="accordion-body cursor">
                                            <Link to={"/video-library"} style={{ textDecoration: 'none' }}>Video Library</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{padding: '10px', cursor: 'pointer'}} onClick={()=>{logout()}}>
                                <span style={{fontSize: '20px',margin: '1rem'}}><i class="fas fa-sign-out-alt"></i> Logout Here!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NavBar;