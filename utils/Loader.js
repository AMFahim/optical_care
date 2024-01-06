"use client"
import React, { useEffect, useState } from 'react';



const Loader = () => {
    const [loading, setLoading] = useState(false);

useEffect(() => {
    setLoading(true);

    // Simulate data loading with a 5-second delay
    const loadingTimeout = setTimeout(() => {
        setLoading(false);
    }, 5000);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(loadingTimeout);
}, []);
    return (
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
};

export default Loader;