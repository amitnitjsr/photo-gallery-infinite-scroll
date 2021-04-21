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
        <div className="main-div">
            {list && list.length > 0 && (
                list.map((val) => {
                    return (
                        <div className="child-div">
                            <img src={val.urls.small} alt="no_image" />
                        </div>
                    )
                })
            )}
        </div>
    )

}

export default GalleryComponent;