import axios from 'axios'
import uploadFileTypes from './uploadFile.types'
import Swal from 'sweetalert2'
export const setUploadFile = data => ({
  type: uploadFileTypes.SET_UPLOAD_FILE,
  payload: data,
})

export const setUploadProgress = (id, progress) => ({
  type: uploadFileTypes.SET_UPLOAD_PROGRESS,
  payload: {
    id,
    progress,
  },
})

export const successUploadFile = id => ({
  type: uploadFileTypes.SUCCESS_UPLOAD_FILE,
  payload: id,
})

export const failureUploadFile = id => ({
  type: uploadFileTypes.FAILURE_UPLOAD_FILE,
  payload: id,
})

export const uploadFile = files => dispatch => {
  console.log("====================")
  if (files.length) {
    files.forEach(async file => {
      const formPayload = new FormData()
      formPayload.append('file', file.file)

      try {
        await axios({
          baseURL: 'http://localhost:3000',
          url: '/api/v1/video/upload',
          method: 'post',
          data: formPayload,
          headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
          },
          onUploadProgress: progress => {
            const { loaded, total } = progress

            const percentageProgress = Math.floor((loaded / total) * 100)
            dispatch(setUploadProgress(file.id, percentageProgress))
          },
        })
        Swal.fire({
          title: 'Success!',
          text: `Video uploaded successfully!`,
          icon: 'success',
          confirmButtonText: 'Yes, close now!'
        })
        dispatch(successUploadFile(file.id))
      } catch (error) {

        console.log('00000000000000000000000000000', )
        Swal.fire({
          title: 'Error!',
          text: `${error?.response?.data?.errorMsg ? error?.response?.data?.errorMsg : 'Something went wrong'}`,
          icon: 'error',
          confirmButtonText: 'Oh, close now!'
        })
        dispatch(failureUploadFile(file.id))
      }
    })
  }
}
