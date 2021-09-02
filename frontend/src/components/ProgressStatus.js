import React from 'react'

const ProgressStatus = props => {
  const { file, progress } = props.file
    return (
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
  {file.name}
  <div className="progress mb-2" style={{height: "15px"}}>
        <div
          className='progress-bar'
          role='progressbar'
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
     
    )
}
export default ProgressStatus;