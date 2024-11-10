import React from 'react';
import './index.css'

export default function LoadingAnimation() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent">
            <div className="flex flex-col items-center">
                <div className="animate-pulse rounded-full bg-blue-950 h-16 w-16 mb-4"></div>
                <p className="text-blue-950 font-semibold">Loading, please relax...</p>
            </div>
        </div>
    );
}
