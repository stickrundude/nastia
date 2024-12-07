import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './Gallery.css';
import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';
import image4 from '../images/4.jpg';
import image5 from '../images/5.jpg';
import image6 from '../images/6.jpg';
import image7 from '../images/7.jpg';
import image8 from '../images/8.jpg';
import image9 from '../images/9.jpg';
import image10 from '../images/10.jpg';
import image11 from '../images/11.jpg';
import image12 from '../images/12.jpg';
import image13 from '../images/13.jpg';
import image14 from '../images/14.jpg';
import image15 from '../images/15.jpg';
import image16 from '../images/16.jpg';
import audioFile from '../sounds/2.mp3';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

function Gallery() {
    const images = [
        image1, image2, image3, image4,
        image5, image6, image7, image8,
        image9, image10, image11, image12,
        image13, image14, image15, image16,
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const confettiInterval = setInterval(() => {
            confetti({
                particleCount: 10,
                spread: 30,
                origin: { x: Math.random(), y: Math.random() },
                colors: ['#ffcccb', '#ff2e63', '#ff5c8e', '#ff9f9d'],
            });
        }, 200);

        const imageInterval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => {
            clearInterval(confettiInterval);
            clearInterval(imageInterval);
        };
    }, [images.length]);

    useEffect(() => {
        const playAudio = async () => {
            try {
                await audioRef.current.play();
            } catch (error) {
                console.error('Audio play failed:', error);
            }
        };

        playAudio();
    }, []);

    const handleMuteToggle = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <motion.div
            className="gallery-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
        >
            <div className="gallery-grid">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`gallery-item ${activeIndex === index ? 'active' : ''}`}
                    >
                        <img src={src} alt={`Gallery ${index + 1}`} />
                    </div>
                ))}

                <div className="message-container">
                    <h2>Вітаю, старенька, тепер ти вже ближче до того щоб стати бабуською!</h2>
                    <p>
                        Although we met because of the consequences of your bad choices, I am still very happy that I approached you in the pool bar even though you were scared of me for some reason (must be my skin color).
                        I hope you have a wonderful 21st birthday and I hope you like my stupid gift. This is hopefully the only birthday we are spending apart, and I can't wait to be with you.
                        You are my stupid, annoying, and gorgeous ginger. Happy birthday Kutia and I like you!
                    </p>
                </div>
            </div>

            <div className="audio-controls">
                <button onClick={handleMuteToggle} className="audio-button">
                    {audioRef.current && audioRef.current.muted ? (
                        <FaVolumeMute size={20} />
                    ) : (
                        <FaVolumeUp size={20} />
                    )}
                </button>
            </div>

            <audio ref={audioRef} loop>
                <source src={audioFile} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </motion.div>
    );
}

export default Gallery;
