import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './QuestionPage.css';
import image1 from '../images/q1.jpg';
import image2 from '../images/q2.jpg';
import image3 from '../images/q3.jpg';

const QuestionPage = () => {
    const navigate = useNavigate();

    const questions = [
        'Do you like me?',
        'Are you sure that you like me?',
        'Do you think I am racist?',
    ];

    const backgroundImages = [image1, image2, image3];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [yesCount, setYesCount] = useState(0);
    const [yesPosition, setYesPosition] = useState({ top: '40%', left: '50%' });
    const [noPosition, setNoPosition] = useState({ top: '60%', left: '50%' });
    const yesButtonRef = useRef(null);
    const noButtonRef = useRef(null);

    useEffect(() => {
        if (yesButtonRef.current) {
            const yesButtonHeight = yesButtonRef.current.offsetHeight;
            setNoPosition({
                top: `${yesButtonHeight + 20}px`,
                left: '50%',
            });
        }
    }, []);

    useEffect(() => {
        const startConfetti = () => {
            const confettiInterval = setInterval(() => {
                confetti({
                    particleCount: 5,
                    angle: Math.random() * 360,
                    spread: 55,
                    origin: {
                        x: Math.random(),
                        y: Math.random() * 0.5,
                    },
                });
            }, 200);

            return confettiInterval;
        };

        const confettiInterval = startConfetti();

        return () => clearInterval(confettiInterval);
    }, []);

    const handleAnswer = (answer) => {
        if (answer === 'Yes') {
            setYesCount(yesCount + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (answer === 'Yes' && yesCount + 1 === questions.length) {
            navigate('/gallery');
        }
    };

    const handleNoHover = () => {
        if (currentQuestionIndex !== 2) {
            const newTop = `${Math.random() * 100}%`;
            const newLeft = `${Math.random() * 100}%`;
            setNoPosition({ top: newTop, left: newLeft });
        }
    };

    const handleYesHover = () => {
        if (currentQuestionIndex === 2) {
            const newTop = `${Math.random() * 100}%`;
            const newLeft = `${Math.random() * 100}%`;
            setYesPosition({ top: newTop, left: newLeft });
        }
    };

    const handleNoClick = () => {
        if (currentQuestionIndex === 2) {
            navigate('/gallery');
        } else {
            alert('Stop trying to click no!');
        }
    };

    const handleYesClick = () => {
        if (currentQuestionIndex === 2) {
            alert('Stop lying!!!!');
        } else {
            handleAnswer('Yes');
        }
    };

    return (
        <motion.div
            className="questions-container"
            style={{ backgroundImage: `url(${backgroundImages[currentQuestionIndex]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <AnimatePresence mode="wait">
                <motion.h2
                    key={currentQuestionIndex}
                    className="question"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    {questions[currentQuestionIndex]}
                </motion.h2>
            </AnimatePresence>
            <div className="buttons">
                <button
                    onClick={handleYesClick}
                    onMouseEnter={handleYesHover}
                    className="yes-button"
                    ref={yesButtonRef}
                    style={{
                        top: yesPosition.top,
                        left: yesPosition.left,
                        position: 'absolute',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    Yes
                </button>
                <button
                    onClick={handleNoClick}
                    onMouseEnter={handleNoHover}
                    className="no-button"
                    ref={noButtonRef}
                    style={{
                        top: noPosition.top,
                        left: noPosition.left,
                        position: 'absolute',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    No
                </button>
            </div>
        </motion.div>
    );
};

export default QuestionPage;
