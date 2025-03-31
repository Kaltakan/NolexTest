import React from "react";

const Select = ({ children, onChange }) => {
    return (
        <select className="border border-gray-300 p-2 rounded w-full" onChange={onChange}>
            {children}
        </select>
    );
};

export default Select;
