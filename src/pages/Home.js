import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './Home.css';
import audioFile from '../sounds/1.mp3';
import kurwaAudioFile from '../sounds/kurwa.mp3';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import waitGif from '../images/wait.gif';
import happyGif from '../images/happy.gif';

function Home() {
    const [countdown, setCountdown] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isCountdownComplete, setIsCountdownComplete] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [currentGif, setCurrentGif] = useState(waitGif);
    const [isMuted, setIsMuted] = useState(false);
    const navigate = useNavigate();

    const audioRef = useRef(null);
    const kurwaAudioRef = useRef(null);

    useEffect(() => {
        const countdownDate = new Date('2024-12-07T17:08:30+01:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setCountdown('Це твій день народження! 🎉');
                setIsButtonEnabled(true);
                setIsCountdownComplete(true);

                setCurrentGif(happyGif);

                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
                if (kurwaAudioRef.current) {
                    kurwaAudioRef.current.play().catch((error) => {
                        console.error('Audio play failed:', error);
                    });
                }

                confetti({
                    particleCount: 200,
                    angle: 90,
                    spread: 70,
                    origin: { x: 0.5, y: 0.5 },
                });
            } else {
                setCountdown({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);


        const continuousConfettiInterval = setInterval(() => {
            confetti({
                particleCount: 5,
                angle: Math.random() * 360,
                spread: 10,
                origin: { x: Math.random(), y: -0.1 },
                colors: ['#ff5f57', '#ffbd2e', '#28c840', '#0071ff', '#f5a623'],
            });
        }, 200);

        return () => {
            clearInterval(interval);
            clearInterval(continuousConfettiInterval);
        };
    }, []);

    const handleClick = () => {
        navigate('/questions');
    };

    const handleModalClose = () => {
        setIsModalVisible(false);

        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error('Audio play failed:', error);
            });
        }
    };

    const handleAudioToggle = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
        }
        if (kurwaAudioRef.current) {
            kurwaAudioRef.current.muted = !isMuted;
        }
    };

    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`background-blur ${isModalVisible ? 'blur-background' : ''}`} />

            <motion.h2
                className="birthday-text"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                Happy Birthday Anastasiia!
            </motion.h2>

            {isCountdownComplete ? (
                <motion.p
                    className="countdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {countdown}
                </motion.p>
            ) : (
                <motion.p
                    className="countdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="countdown-number">{countdown.days}</span> Days,&nbsp;
                    <span className="countdown-number">{countdown.hours}</span> Hours,&nbsp;
                    <span className="countdown-number">{countdown.minutes}</span> Minutes,&nbsp;
                    and <span className="countdown-number">{countdown.seconds}</span> Seconds left!
                </motion.p>
            )}

            <AnimatePresence>
                {isModalVisible && !isCountdownComplete && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="modal"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p>You are here early!</p>
                            <button onClick={handleModalClose}>Close</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="button-container"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
            >
                <button onClick={handleClick} disabled={!isButtonEnabled}>
                    {isButtonEnabled ? 'Let\'s Go!' : 'Wait!'}
                </button>
            </motion.div>

            <motion.div
                className="gif-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <img src={currentGif} alt="Loading gif" className="gif" />
            </motion.div>

            {!isCountdownComplete && (
                <motion.div
                    className="audio-controls"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <button onClick={handleAudioToggle} className="audio-button">
                        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                    </button>
                </motion.div>
            )}

            <audio ref={kurwaAudioRef}>
                <source src={kurwaAudioFile} type="audio/mp3" />
            </audio>

            <audio ref={audioRef} loop>
                <source src={audioFile} type="audio/mp3" />
            </audio>
        </motion.div>
    );
}

export default Home;
