import React from "react";

const Input = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

export default Input;
