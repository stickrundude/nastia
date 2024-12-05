import React, { useEffect, useState } from 'react';

function Home() {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const countdownDate = new Date('Dec 25, 2024 00:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));

            if (distance < 0) {
                clearInterval(interval);
                setCountdown('Happy Birthday!');
            } else {
                setCountdown(`${days} days left!`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Welcome to Your Birthday Celebration!</h2>
            <p>{countdown}</p>
        </div>
    );
}

export default Home;
import confetti from 'canvas-confetti';

useEffect(() => {
    confetti({
        particleCount: 100,
        angle: 90,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
    });
}, []);
