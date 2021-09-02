/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import ReactPlayer from 'react-player';
import NavBar from './NavBar';
import Swal from 'sweetalert2'
import environment from '../config/environment';
const VideoLibrary = () => {
  const [currentVideo, setCurrentVideo] = useState({});
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    axios.get(`${environment.BASE_URL}/video/`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(function (response) {
        setVideoList(response.data.data);
      })
      .catch(function (error) {
        Swal.fire({
          title: 'Error!',
          text: `${error?.response?.data?.errorMsg ? error?.response?.data?.errorMsg : 'Something went wrong'}`,
          icon: 'error',
          confirmButtonText: 'Oh, close now!'
        })
      })
  }, []);
  return (
    <div className="container-fluid">
      <NavBar />
      <div className="row shadow">
                    <div className="col headingHeader">
                       Video Library 
                    </div>
                </div>
      <div className="row" style={{ maxHeight:`calc(100vh - 140px)`, overflow: 'auto' }}>
        {videoList && videoList.length ?
          videoList.map((item, index) => {
            return (
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mt-3" key={index}>
                <div className="card h-100">

                  <video src={item.fileUrl} className="card-img-top" alt={item.fileName} />


                  <div className="card-body" style={{ backgroundColor: 'pink', height: '150px !important' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }} className="card-title" title={item.fileName}>{item.fileName.length > 23 ? `${item.fileName.substring(0, 23)}...` : item.fileName}</div>
                    <div className="clearfix mb-3">
                      <div style={{ fontSize: '1rem' }} className="card-text float-start"><b>format:</b> <span className="badge rounded-pill bg-primary"> {item.format}</span></div>
                      <div style={{ fontSize: '1rem' }} className="card-text float-end"><b>size:</b> {(item.bytes / (1024 * 1024)).toFixed(2)} MB </div>
                    </div>
                    <div className="text-center">
                      <a className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setCurrentVideo(item)}><i className="far fa-play-circle"></i> Play Video</a>

                    </div>
                  </div>
                </div>
              </div>)
          }) :
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">No Data Found!</div>
        }
      </div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Video Preview</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setCurrentVideo({})}></button>
            </div>
            <div className="modal-body text-center">
              <ReactPlayer
                controls
                className='react-player'
                url={currentVideo?.fileUrl}
                // url={currentVideo && Object.keys(currentVideo).length ? "https://www.youtube.com/watch?v=KVh4KtUSW3A&ab_channel=VYRLOriginals":""}
                width='100%'
                height='65vh'
              />
            </div>
            <div style={{padding: '0rem 1rem'}}>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }} className="card-title" title={currentVideo.fileName}>{currentVideo.fileName}</div>
         
              <div style={{display: 'flex', paddingBottom: '1rem'}}>
              <div style={{ fontSize: '1rem' }} className="card-text"><b>format:</b> <span className="badge rounded-pill bg-primary"> {currentVideo.format}</span></div>
              <div style={{ fontSize: '1rem', paddingLeft: '1rem' }} className="card-text"><b>size:</b> {(currentVideo.bytes / (1024 * 1024)).toFixed(2)} MB </div>
              <div style={{ fontSize: '1rem', paddingLeft: '1rem' }} className="card-text"><b>uploaded on:</b> {currentVideo?.createdAt?.substring(0,10)} </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* <FloatButton /> */}
    </div>
  )
}
export default VideoLibrary