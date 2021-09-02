
import './FloatButton.scss';
import ProgressStatus from './ProgressStatus';

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { size, toArray } from 'lodash'

import { uploadFile } from '../redux/uploadFile/uploadFile.actions'


const UploadProgress = props => {
  const { fileProgress, uploadFile } = props
  const uploadedFileAmount = size(fileProgress)

  useEffect(() => {
    const fileToUpload = toArray(fileProgress).filter(file => file.progress === 0)
    uploadFile(fileToUpload)
  }, [uploadedFileAmount])

  return uploadedFileAmount > 0 ? (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="fas fa-cloud-upload-alt comment">
        </i>
        <i className="fa fa-close close"></i>
      </label>
      <div className="wrapper shadow-lg">
        <div className="header">
          <i className="fas fa-arrow-circle-up"></i> Uploading files (Video only)
        </div>
        <div className="chat-form">
          {size(fileProgress)
            ? toArray(fileProgress).map(file => <ProgressStatus key={file.id} file={file} />)
            : null}
        </div>

      </div>
    </>
  ) : null
}

const mapStateToProps = state => ({
  fileProgress: state.UploadFile.fileProgress,
})

const mapDispatchToProps = dispatch => ({
  uploadFile: files => dispatch(uploadFile(files)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgress)
