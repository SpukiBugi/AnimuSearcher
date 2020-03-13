import React from 'react';
import './AnimuInfo.css';

const AnimuInfo = (props) => {
    if (props.animu !== undefined) {
        return(
            <div className="animuInfo"
            style={{
                backgroundImage: "url(" + props.animu.bannerImage + ")"
            }}
            >
                <div className='animuInfo__content'>
                    <h1>{props.animu.title.romaji}</h1>
                    <div> <img className='animuInfo__thumb' src={props.animu.coverImage.large} alt='thumb' /> </div>
                    <div className='animuInfo__text'>
                        <h3 className="animuInfo__title">SYNOPSIS</h3>
                        <p dangerouslySetInnerHTML = {{__html: props.animu.description }} />
                        <h3 className="animuInfo__title">RATING</h3>
                        <div className='animuInfo__rating'>
                            <meter min='0' max='100' optimum='100' low='40' high='70' value={props.animu.averageScore}></meter>
                            <p className='animuInfo__score'>{props.animu.averageScore}/100</p>
                        </div>
                    </div>
                </div>
            </div> 


        )
    }
    else return ('wait')
}

export default AnimuInfo;