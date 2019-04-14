import React from 'react';
import './LoadMoreBtn.css';

const LoadMoreBtn = (props) => {
    return (
        <div className = "loadButton" onClick={props.onClick}>
            <p>{props.text}</p>
        </div>
    )
}

export default LoadMoreBtn;