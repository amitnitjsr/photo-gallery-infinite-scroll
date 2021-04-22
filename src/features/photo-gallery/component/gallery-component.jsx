import React, { useState, useEffect } from 'react';
import './gallery-component.css';

const GalleryComponent = (props) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        if (props.list) {
            setList(props.list);
        }
    }, [props.list]);

    return (
        <div
            className="main-div"
        >
            {list && list.length > 0 && (
                list.map((val, index) => {
                    return (
                        <div className="child-div" key={index} onClick={() => props.clickOnPhoto(val.urls.small, index)}>
                            <img src={val.urls.small} alt="no_image" className="gallery-image" />
                        </div>
                    )
                })
            )}

        </div>
    )
}

export default GalleryComponent;