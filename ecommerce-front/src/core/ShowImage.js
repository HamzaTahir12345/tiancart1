import React from 'react'
import { Link } from 'react-router-dom'

const ShowImage = ({ item, url }) => (
    <div className="product-img">
        {/* {console.log('--------------photo-----------',item.name)} */}
        <img
            src={`http://localhost:8000/api/${url}/photo/${item._id}`}
            alt={item.name}
            style={{ maxeHeight: "20%", maxWidth: "100%", height: "160px", width: "180px" }}
        />
    </div>
)

export default ShowImage;