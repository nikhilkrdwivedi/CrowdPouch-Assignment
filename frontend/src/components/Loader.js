import React from 'react'

export default function Loader() {
    return (
        <div className="text-center">
            <div className="spinner-grow text-primary" style={{
                width: '5rem', height: ' 5rem'}}  role="status">
                    <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
