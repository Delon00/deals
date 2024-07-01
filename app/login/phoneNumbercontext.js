// PhoneNumberContext.js
import React, { createContext, useState } from 'react';

const PhoneNumberContext = createContext();

export const PhoneNumberProvider = ({ children }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <PhoneNumberContext.Provider value={{ phoneNumber, setPhoneNumber }}>
            {children}
        </PhoneNumberContext.Provider>
    );
};

export default PhoneNumberContext;
