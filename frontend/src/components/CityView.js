/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import Swal from 'sweetalert2'
import NoDataFound from '../../src/assets/img/noDataFound.png';
import environment from '../config/environment';
import Loader from './Loader';
import './CityView.scss'
export default function CityView() {
    const [isLoading, setIsLoading] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [filterCityList, setFilterCityList] = useState([]);
    const [filterStateList, setFilterStateList] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("");
    const [limit, setLimit] = useState(0);
    const [citySelectedList, setCitySelectedList] = useState([]);
    const [stateSelectedList, setStateSelectedList] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [pages, setPages] = useState();
    const [pageNo, setPageNo] = useState(0);
    var tempCitySelectedList = JSON.parse(JSON.stringify(citySelectedList))
    var tempStateSelectedList = JSON.parse(JSON.stringify(stateSelectedList))
    let tempPageNo = 0;
    function goToNextPage() {
        if (pageNo < pages) {
            tempPageNo = pageNo + 1;
            setPageNo(tempPageNo);
            getCitiesView();

        }

    }

    function goToPreviousPage() {
        if (pageNo > 0) {
            tempPageNo = pageNo - 1;
            setPageNo(tempPageNo);
            getCitiesView();

        }

    }

    function getCitiesView() {
        setIsLoading(true);
        console.log(pageNo, " = ", limit)
        axios.get(`${environment.BASE_URL}/city/city-info?sortBy=${sortBy}&limit=${limit}&pageNo=${tempPageNo}&sortType=${sortType}&stateSelectedList=${stateSelectedList}&citySelectedList=${citySelectedList}&searchString=${searchString}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(function (response) {
                console.log('data ', response.data.data)
                setLimit(response.data.limit)
                setTotalRecords(response.data.total);
                setCityList(response.data.data.citiesData);
                setFilterCityList(response.data.data.filterData.city)
                setFilterStateList(response.data.data.filterData.state)
                setPages(Math.round(response.data.total / response.data.limit));
                // setPageNo(0)
                setIsLoading(false);
            })
            .catch(function (error) {
                setIsLoading(false);
                Swal.fire({
                    title: 'Error!',
                    text: `${error?.response?.data?.errorMsg ? error?.response?.data?.errorMsg : 'Something went wrong'}`,
                    icon: 'error',
                    confirmButtonText: 'Oh, close now!'
                  })
            })
    }
    useEffect(() => {
        getCitiesView();
    }, [])
    function addToSelectedList(value, type) {
        if (type === 'city') {
            if (tempCitySelectedList.includes(value)) {
                tempCitySelectedList = tempCitySelectedList.filter(item => item !== value)
            } else {
                tempCitySelectedList.push(value)
            }
            setCitySelectedList(tempCitySelectedList)
        } else {
            if (tempStateSelectedList.includes(value)) {
                tempStateSelectedList = tempStateSelectedList.filter(item => item !== value)
            } else {
                tempStateSelectedList.push(value)
            }
            setStateSelectedList(tempStateSelectedList)
        }
    }
    return (
        <Fragment>
            <NavBar />
            <div className="container-fluid">
                <div className="row shadow">
                    <div className="col headingHeader">
                        City View
                    </div>
                </div>
                {!isLoading ?
                    <>
                        <div className="row">
                            <div className="col shadow text-center">
                                <form>
                                    <div className="d-flex justify-content-center">
                                        <div className="d-flex justify-content-center" style={{ margin: "0px 10px" }}>
                                            <div style={{ margin: "10px 10px" }}>
                                                <div className="dropdown" style={{ backgroundColor: '#fff !important' }}>
                                                    <button className="btn dropdown-toggle btn-custom-dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {tempCitySelectedList.length ? "City " + tempCitySelectedList.length : "Select City"}
                                                    </button>

                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ maxHeight: '50vh', overflow: 'auto' }}>
                                                        {filterCityList && filterCityList.length ? filterCityList?.map((item, index) => {
                                                            return (
                                                                <li key={index} className="dropdown-item" onClick={(e) => { e.preventDefault(); addToSelectedList(item, 'city') }}> {citySelectedList.includes(item) ? <i className="fas fa-check"></i> : null} {item}</li>
                                                            )
                                                        }) : <p>No data...</p>}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div style={{ margin: "10px 10px" }}>
                                                <div className="dropdown" style={{ backgroundColor: '#fff !important' }}>
                                                    <button className="btn dropdown-toggle btn-custom-dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {tempStateSelectedList.length ? "State " + tempStateSelectedList.length : "Select State"}
                                                    </button>

                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ maxHeight: '50vh', overflow: 'auto' }}>
                                                        {filterStateList && filterStateList.length ? filterStateList?.map((item, index) => {
                                                            return (
                                                                <form>
                                                                    <li key={index} className="dropdown-item" onClick={(e) => { e.preventDefault(); addToSelectedList(item, 'state') }}> {tempStateSelectedList.includes(item) ? <i className="fas fa-check"></i> : null} {item}</li>
                                                                </form>
                                                            )
                                                        }) : <p>No data...</p>}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center" style={{ margin: "0px 10px" }}>
                                            <div style={{ margin: "10px 10px" }}>
                                                <select className="form-select" id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                                    <option value="">Sort By</option>
                                                    <option value="pop">Population</option>
                                                    <option value="city">City</option>
                                                    <option value="state">State</option>
                                                </select>
                                            </div>
                                            <div style={{ margin: "10px 10px" }}>
                                                <select className="form-select" id="sortBy" value={sortType} onChange={(e) => setSortType(e.target.value)}>
                                                    <option value="">Sort Type</option>
                                                    <option value="-1">Top</option>
                                                    <option value="1">Bottom</option>
                                                </select>
                                            </div>
                                            <div style={{ margin: "10px 10px" }}>
                                                <select className="form-select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                                                    <option value="">Fetch {limit} Count</option>
                                                    <option value="10">10</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                    <option value="1000">1000</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center" style={{ margin: "0px 10px" }}>

                                            <div style={{ margin: "10px 10px" }}>
                                                <form className="d-flex">
                                                    <input className="form-control me-2" type="text" placeholder="Search by city/state" aria-label="Search" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                                                </form>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center" style={{ margin: "0px 10px" }}>
                                            <div style={{ margin: "10px 10px" }}>
                                                <button className="btn btn-primary button-city" onClick={(e) => { e.preventDefault(); getCitiesView() }}><i className="fas fa-table"></i> Get Data</button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col paddingOneRem" style={{ height: `calc(100vh - 262px)`, overflowY: 'auto' }}>
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
                                                            <th scope="row">{(index + 1) + ((pageNo) * limit)}</th>
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
                    </> :
                    <div className="text-center" style={{ height: `calc(100vh - 195px)`, overflowY: 'auto' }}>
                        <div style={{ paddingTop: "15%" }}>
                            <Loader />

                        </div>
                    </div>}
                {cityList && cityList.length ?

                    <div className="row shadow-sm" style={{ backgroundColor: 'red !important' }}>
                        <div className="col text-center">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center marginTopBottom">
                                    <li className={`page-item ${pageNo === 1 ? 'disabled' : ''}`} onClick={(e) => { e.preventDefault(); goToPreviousPage(); }}>
                                        <a className="page-link" href="#" tabIndex="-1">Previous</a>
                                    </li>
                                    <li className="page-item disabled"><a className="page-link">{pageNo+1}</a></li>
                                    <li className="page-item"><a className="page-link" >-</a></li>
                                    <li className="page-item disabled"><a className="page-link" >{Math.round(totalRecords / limit)+1}</a></li>
                                    <li onClick={(e) => { e.preventDefault(); goToNextPage(); }}
                                        className={`page-item ${pageNo === pages ? 'disabled' : ''}`}>
                                        <a className="page-link">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div> : null}

            </div>
        </Fragment>

    )
}
