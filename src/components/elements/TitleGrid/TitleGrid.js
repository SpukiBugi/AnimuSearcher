import React from 'react';
import './TitleGrid.css';


const TitleGrid = (props) => {

    const renderElements = () => {
        const gridElements = props.children.map((element, i) => {
            return (
                <div key = {i} className = "titleGrid__element">
                    {element}
                </div>
            )
        })
        return gridElements;
    }
    
    return (
        <div className = "titleGrid">
            <div className = "titleGrid__content">
                {renderElements()}
            </div>
        </div>
    )
}

export default TitleGrid;