import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './Home.css';

function Home() {
    const [countdown, setCountdown] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        // Ukrainian time (UTC+2)
        const countdownDate = new Date('2024-12-12T00:00:00+02:00').getTime(); // Ukrainian time (UTC+2)

        // German time (UTC+1)
        // const countdownDate = new Date('2024-12-06T00:00:00+01:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval);
                setCountdown('Happy Birthday! 🎉');
                setIsButtonEnabled(true);

                confetti({
                    particleCount: 200,
                    angle: 90,
                    spread: 70,
                    origin: { x: 0.5, y: 0.5 },
                });
            } else {
                setCountdown({
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds,
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        navigate('/gallery');
    };

    return (
        <div className="home-container">
            <h2 className="birthday-text">Happy Birthday Anastasiia!</h2>
            <p className="countdown">
                <span className="countdown-number">{countdown.days}</span> Days,&nbsp;
                <span className="countdown-number">{countdown.hours}</span> Hours,&nbsp;
                <span className="countdown-number">{countdown.minutes}</span> Minutes,
                and <span className="countdown-number">{countdown.seconds}</span> Seconds left!
            </p>

            <button
                onClick={handleClick}
                disabled={!isButtonEnabled}
            >
                Let's Go!
            </button>
        </div>
    );
}

export default Home;
