import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './Gallery.css';

function Gallery() {
    useEffect(() => {
        const interval = setInterval(() => {
            confetti({
                particleCount: 10,
                spread: 30,
                origin: { x: Math.random(), y: Math.random() },
                colors: ['#ffcccb', '#ff2e63', '#ff5c8e', '#ff9f9d'],
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="gallery-container">
            <div className="message-container">
                <h2>Welcome to the Gallery!</h2>
                <p>Enjoy the memories and beautiful moments!</p>
            </div>
            <div className="gallery-grid">

                <div className="gallery-item"><img src="/path/to/image1.jpg" alt="Image 1" /></div>
                <div className="gallery-item"><img src="/path/to/image2.jpg" alt="Image 2" /></div>
                <div className="gallery-item"><img src="/path/to/image3.jpg" alt="Image 3" /></div>

            </div>
        </div>
    );
}

export default Gallery;
