import React from 'react';
import { Link } from 'react-router-dom';
import './AnimuThumb.css';

const AnimuThumb = (props) => {
    return (
        
            <Link to={{ pathname: `/${props.animuId}/${props.animuName}`, animuName: `${props.animuName}` }}>
                <div className="animuThumb">
                    <img src = {props.image} alt='image'/>
                    <p>{props.animuName}</p>
                </div>
            </Link>
        
    )
}

export default AnimuThumb;