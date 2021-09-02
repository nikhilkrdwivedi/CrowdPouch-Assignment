import React,{useState} from 'react'
import { connect } from 'react-redux'; 
import { setUploadFile } from '../redux/uploadFile/uploadFile.actions'
import '../App.scss'
import NavBar from './NavBar'

function FileUpload(props) {
  const handleAttachFIle = e => {
    props.setUploadFile(e.target.files)
    e.target.value = '' // to clear the current file
  }

  return (
    <div>
      <NavBar />
      <div className="row shadow">
        <div className="col headingHeader">
          Upload Video
        </div>
      </div>
      <div className="container-fluid">
        <div className="row text-center paddingTopFiveRem" >
          <div className="col-xl-6 col-lg-6 col-md-10 col-sm-12 offset-xl-3 offset-lg-3 offset-md-1">
            <label htmlFor="formFile" className="form-label">Upload file (Video Only)</label>
            <input className="form-control" type="file" id="formFile" accept="video/mp4,video/x-m4v,video/*" onChange={handleAttachFIle} />
          </div>
        </div>
      </div>
    </div>
  )

}

const mapDispatchToProps = dispatch => ({
  setUploadFile: files => dispatch(setUploadFile(files)),
})

export default connect(null, mapDispatchToProps)(FileUpload)
