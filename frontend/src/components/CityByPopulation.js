import React, { Fragment, useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import NoDataFound from '../../src/assets/img/noDataFound.png';
import environment from '../config/environment';
import Swal from 'sweetalert2'

export default function CityByPopulation() {
    const [cityList, setCityList] = useState([]);
    const [sortBy, setSortBy] = useState(-1);
    const [fetchCount, setFetchCount] = useState(10);
    function getCitiesByPopulations(){
        axios.get(`${environment.BASE_URL}/city/ordered-cities-populations?sortBy=${sortBy}&fetchCount=${fetchCount}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(function (response) {
                setCityList(response.data.data);
            })
            .catch(function (error) {
                Swal.fire({
                    title: 'Error!',
                    text: `${error?.response?.data?.errorMsg ? error?.response?.data?.errorMsg : 'Something went wrong'}`,
                    icon: 'error',
                    confirmButtonText: 'Oh, close now!'
                  })
            })
    }
    useEffect(() => {
        getCitiesByPopulations();
    }, [])

    return (
        <Fragment>
            <NavBar />
            <div className="container-fluid">
                <div className="row shadow">
                    <div className="col headingHeader">
                        City wise population [Top/Bottom]
                    </div>
                </div>
                <div className="row">
                        <div className="col shadow text-center">
                                <form>
                                <div className="d-flex justify-content-center">
                                <div style={{margin: "10px 10px"}}>
                                    <select className="form-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                                        <option value="">Sort Type</option>
                                        <option value="-1">Top</option>
                                        <option value="1">Bottom</option>
                                    </select>
                                </div>
                                <div style={{margin: "10px 10px"}}>
                                    <select className="form-select" value={fetchCount} onChange={(e)=>setFetchCount(e.target.value)}>
                                        <option value="">Fetch Count</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                                <div style={{margin: "10px 10px"}}>
                                <button className="btn btn-primary button-city" onClick={(e) =>{e.preventDefault(); getCitiesByPopulations()} }><i className="fas fa-table"></i> Get Data</button>
                                </div>
                                </div>

                                </form>
                    </div>
                </div>
                <div className="row" style={{ maxHeight: `calc(100vh - 200px)`, overflowY: 'auto' }}>
                    <div className="col paddingOneRem">
                        {
                            cityList && cityList.length ?
                                <table className="table" >
                                    <thead>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">City</th>
                                            <th scope="col">State</th>
                                            <th scope="col">Population</th>
                                            <th scope="col">Geo Coordinates</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cityList.map((item, index) => {
                                            return (
                                                <tr key={index + 1}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.city}</td>
                                                    <td>{item.state}</td>
                                                    <td>{item.pop}</td>
                                                    <td>{item.loc[0]} | {item.loc[1]}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table> :
                                <div className="text-center p-3">
                                    <div>
                                        <img src={NoDataFound} className="img-fluid" style={{ maxHeight: '50vh' }} alt="No Data found!" />
                                    </div>
                                    <div>No Data Found!</div>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </Fragment>

    )
}
