import React from 'react';

function GenderCheck({ onCheckboxChange, selectedGender }) {

    return (
        <div className='flex flex-col mt-2'>
            <h5 className="text-lg sm:text-xl font-semibold">Select Gender:</h5>
            <div className='form-control'>
                <label className={`${selectedGender === "male" ? "selected" : ""} flex items-center space-x-2`}>
                    <input 
                        type="radio" 
                        name="gender" 
                        value="male" 
                        checked={selectedGender === 'male'} 
                        onChange={() => onCheckboxChange("male")} 
                        className="form-radio text-indigo-600"
                    />
                    <span>Male</span>
                </label>
            </div>
            <div className='form-control mt-2'>
                <label className={`${selectedGender === "female" ? "selected" : ""} flex items-center space-x-2`}>
                    <input 
                        type="radio" 
                        name="gender" 
                        value="female" 
                        checked={selectedGender === 'female'} 
                        onChange={() => onCheckboxChange("female")} 
                        className="form-radio text-indigo-600"
                    />
                    <span>Female</span>
                </label>
            </div>
        </div>
    );
}

export default GenderCheck;
