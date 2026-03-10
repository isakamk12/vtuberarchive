document.addEventListener('DOMContentLoaded', () => {
    // Itsuki Sakyo JS

    // Usaboo Pitch Carousel
    const slides = document.querySelectorAll('.pitch-slide');
    const nextBtn = document.getElementById('next-pitch');
    const prevBtn = document.getElementById('prev-pitch');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

    // Business Card Exchange
    const cardBtn = document.getElementById('card-exchange');
    const cardPopup = document.getElementById('business-card');
    let cardVisible = false;

    cardBtn.addEventListener('click', () => {
        cardVisible = !cardVisible;
        cardPopup.classList.toggle('active');
        cardBtn.textContent = cardVisible ? "CLOSE CARD ✖" : "EXCHANGE CARD 💼";
    });

    // Drum Pads
    const pads = document.querySelectorAll('.drum-pad');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    pads.forEach(pad => {
        pad.addEventListener('mousedown', () => {
            const key = pad.getAttribute('data-key');
            playDrum(key);
        });
    });

    function playDrum(type) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        switch (type) {
            case 'kick':
                osc.frequency.setValueAtTime(150, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
                gain.gain.setValueAtTime(1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
                break;
            case 'snare':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(100, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
                // Add noise for snare
                const noise = audioCtx.createBufferSource();
                const bufferSize = audioCtx.sampleRate * 0.1;
                const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
                noise.buffer = buffer;
                const noiseFilter = audioCtx.createBiquadFilter();
                noiseFilter.type = 'highpass';
                noiseFilter.frequency.value = 1000;
                noise.connect(noiseFilter);
                noiseFilter.connect(gain);
                noise.start();
                break;
            case 'hihat':
                osc.type = 'square';
                osc.frequency.setValueAtTime(10000, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
                break;
        }

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }

    // Usaboo Mouse Follow
    const usaboo = document.getElementById('usaboo');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.02;
        const y = (e.clientY - window.innerHeight / 2) * 0.02;
        usaboo.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
    });

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.usaboo-pitch, .corporate-card, .drum-performance').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
