import React from 'react';

function GenderCheck({ onCheckboxChange, selectedGender }) {

    return (
        <div className='d-flex flex-column mt-2'>
            <h5>Select Gender:</h5>
            <div className='form-control l'>
                <label className={`${selectedGender === "male" ? "selected" : ""}`} >
                    <input type="radio" name="gender" value="male" checked={selectedGender === 'male'} onChange={() => onCheckboxChange("male")} />
                    Male
                </label>
            </div>
            <div className='form-control l mt-2'>
                <label className={`${selectedGender === "female" ? "selected" : ""}`}>
                    <input type="radio" name="gender" value="female" checked={selectedGender === 'female'} onChange={() => onCheckboxChange("female")} />
                    Female
                </label>
            </div>
        </div>
    );
}

export default GenderCheck;
