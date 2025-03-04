const faces = Array.from({ length: 31 }, (_, i) => `faces/face${i + 1}.png`);
let isRolling = false;
let previousFaces = [];

document.getElementById('button').addEventListener('click', drawFace);

function drawFace() {
    if (isRolling || faces.length === 0) return;
    isRolling = true;

    const faceImage = document.getElementById("random-face");
    const animationContainer = document.getElementById('animation-container');
    animationContainer.innerHTML = ''; // Clear previous animation

    let count = 0;
    const interval = setInterval(() => {
        faceImage.style.opacity = 0;
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * faces.length);
            faceImage.src = faces[randomIndex];
            faceImage.style.opacity = 1;
        }, 250);
        count++;
        if (count > 20) {
            clearInterval(interval);
            setTimeout(() => {
                const finalIndex = Math.floor(Math.random() * faces.length);
                const finalFace = faces.splice(finalIndex, 1)[0];
                faceImage.src = finalFace;
                previousFaces.push(finalFace);
                updateHistory();
                updateCounter();
                // playAnimation();
                isRolling = false;
            }, 250);
        }
    }, 50);
}

function updateHistory() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';
    previousFaces.forEach(face => {
        const img = document.createElement('img');
        img.src = face;
        img.alt = 'Previous Face';
        img.className = 'history-item';
        historyContainer.appendChild(img);
    });
}

function updateCounter() {
    const counter = document.getElementById('counter');
    counter.textContent = `Drawn Faces: ${previousFaces.length} / 31`;
}

// function playAnimation() {
//     const animationContainer = document.getElementById('animation-container');
//     animationContainer.style.display = 'block';
//     animationContainer.innerHTML = ''; // Clear any existing animation

//     // Create a darkened overlay behind the animation
//     const overlay = document.createElement('div');
//     overlay.setAttribute('id', 'animation-overlay');
//     animationContainer.appendChild(overlay);

//     const lottiePlayer = document.createElement('lottie-player');
//     lottiePlayer.setAttribute('src', 'lottieAnimation/foodies.json'); // Ensure correct path
//     lottiePlayer.setAttribute('background', 'transparent');
//     lottiePlayer.setAttribute('style', 'width: 500px; height: 500px;');
//     lottiePlayer.setAttribute('autoplay', '');
//     lottiePlayer.setAttribute('loop', 'false');
//     lottiePlayer.setAttribute('speed', '3'); // Adjust speed for ~2s duration

//     animationContainer.appendChild(lottiePlayer);
    
//     // Automatically stop animation after 2 seconds
//     setTimeout(() => {
//         lottiePlayer.stop(); // Force stop animation
//         animationContainer.innerHTML = ''; // Clear animation from DOM
//         animationContainer.style.display = 'none'; // Hide animation container
//     }, 1500); // 2000ms = 2 seconds
// }
