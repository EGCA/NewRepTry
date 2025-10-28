// Enhanced audio generation for the game with improved voice assistant integration
function generateBellSound(frequency, duration = 0.5) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Enhanced audio generation with multiple tones
function generateChordSound(frequencies, duration = 0.5) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    frequencies.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        const volume = 0.2 / frequencies.length; // Adjust volume for multiple tones
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime + (index * 0.05)); // Slight delay for chord effect
        oscillator.stop(audioContext.currentTime + duration);
    });
}

// Generate notification sound for voice assistant
function generateNotificationSound() {
    generateChordSound([440, 554, 659], 0.3); // A major chord
}

// Generate success sound
function generateSuccessSound() {
    generateChordSound([523, 659, 784], 0.5); // C major chord
}

// Generate error sound
function generateErrorSound() {
    generateBellSound(200, 0.2);
}

// Export for use in main game and voice assistant
window.generateBellSound = generateBellSound;
window.generateChordSound = generateChordSound;
window.generateNotificationSound = generateNotificationSound;
window.generateSuccessSound = generateSuccessSound;
window.generateErrorSound = generateErrorSound;