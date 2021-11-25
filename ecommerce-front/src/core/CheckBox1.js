import React, { useState } from 'react'


const CheckBox1 = ({ handleFilters }) => {
    var [checked, setChecked] = useState()

    const handleToggle = () => {


        if (checked === 1) {
            checked = -1
        } else {
            setChecked(1)
        }
        //        console.log('handle',newCheckedCategoryId)
        checked = 1
    }

    return (
        <li className="list-unstyled">
            <input
                type="checkbox"
                className="form-check-input"
                onChange={handleToggle()}
                value={(checked === -1)}

            />
            <label className="form-check-label">Hot Selling</label>
        </li>
    );
};

export default CheckBox1;
