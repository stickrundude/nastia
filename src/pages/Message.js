import React from 'react';

function Message() {
    return (
        <div>
            <h2>Special Message for You!</h2>
            <p>You are amazing, and I’m so excited to celebrate you today!</p>
        </div>
    );
}

export default Message;
import confetti from 'canvas-confetti';

useEffect(() => {
    confetti({
        particleCount: 100,
        angle: 90,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
    });
}, []);
