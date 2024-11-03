import { useEffect, useState } from 'react';

export default function BlogPage() {
    const [myValue, setMyValue] = useState(null);

    useEffect(() => {
        const value = localStorage.getItem('myKey');
        setMyValue(value);
    }, []);

    return (
        <div>
            <h1>Blog Page</h1>
            <p>Value from localStorage: {myValue}</p>
        </div>
    );
}
