import React from 'react';

function Gallery() {
    return (
        <div>
            <h2>Our Favorite Memories</h2>
            <div className="gallery">
                <img src="image1.jpg" alt="Memory 1" />
                <img src="image2.jpg" alt="Memory 2" />
                <img src="image3.jpg" alt="Memory 3" />
            </div>
        </div>
    );
}

export default Gallery;
