import React from 'react'
import NavBar from './NavBar'
export default function Home() {
    return (
        <div>
        <NavBar />
        <div className="row shadow">
          <div className="col headingHeader">
           POD Assignment
          </div>
        </div>
        <div className="container">
          <div className="row " >
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3">
              <div><b>Summary of Assignment:</b></div>
              <ul>
                <li>Side nav bar have two sections.</li>
                <li>First section(City wise view) is about city populations. This section have further two section one is for city wise data and and other is population based top and bottom city. </li>
                <li>Second section(File management) is about upload video to server and view video.</li>
                <li>Please <a href="https://drive.google.com/drive/folders/1dpO34zR6HKqWklxi4-y8ZAJqCjIHLSUM?usp=sharing" target="_blank">find all sample video</a> to test because we need to implement separate service to handle large to convert mp4. So, i used small video to show assignment.</li>
                <li>I am using Cloudinary to save files. So, please add constant in backend/constants. Which i have already mailed. </li>
              </ul>
            
            </div>
          </div>
        </div>
      </div>
    )
}
