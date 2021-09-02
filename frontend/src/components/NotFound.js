import React from 'react'
import { Link } from 'react-router-dom'
import notFoundImg from '../../src/assets/img/notFound.png'
export default function NotFound() {
    return (
        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div>
                    <div style={{fontSize:'4rem', fontWeight: 'bolder'}}>404_</div>
                    <div style={{fontSize:'2rem'}}>You're beyond the borders 🥸 </div>
                    </div>
                    <div>
                    <img src={notFoundImg} className="img-fluid" style={{maxHeight:'50vh'}} alt="Page not found!" />
                    </div>
                    <div>
                    <button className="btn btn-primary">
                        <Link to={"/"} style={{ textDecoration: 'none', color: '#fff' }}>Go Back to 🏠 </Link>
                    </button>
                    </div>
                </div>               
            </div>
        </div>
    )
}
