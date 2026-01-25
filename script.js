// --- 1. Setup Lenis (Smooth Scroll) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// --- 2. Custom Cursor & Magnetic Buttons ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
const magneticBtns = document.querySelectorAll('.magnetic-btn');

// Mouse Move Logic
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Dot follows directly
    if (cursorDot) cursorDot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;

    // Circle follows with delay
    if (cursorCircle) {
        cursorCircle.animate({
            transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
        }, { duration: 500, fill: "forwards" });
    }
});

// Hover States for Cursor
document.querySelectorAll('.hover-trigger').forEach(link => {
    link.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    link.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// Magnetic Effect
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});


// --- 3. Spotlight Effect on Cards ---
const cards = document.querySelectorAll('.spotlight-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});


// --- 4. Hacker Text Scramble Effect ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#@$%&";

document.querySelectorAll('[data-scramble="true"]').forEach(target => {
    target.addEventListener('mouseenter', event => {
        let iteration = 0;
        let interval = null;
        const originalText = event.target.innerText;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        target.addEventListener('mouseleave', () => {
            clearInterval(interval);
            event.target.innerText = originalText;
        }, { once: true });
    });
});


// --- 5. Terminal Typewriter (Data Science Edition) ---
const terminalContent = document.getElementById('terminal-content');
if (terminalContent) {
    const codeLines = [
        "<span class='text-purple-400'>import</span> <span class='text-yellow-300'>pandas</span> <span class='text-purple-400'>as</span> <span class='text-yellow-300'>pd</span>",
        "<span class='text-purple-400'>import</span> <span class='text-yellow-300'>numpy</span> <span class='text-purple-400'>as</span> <span class='text-yellow-300'>np</span>",
        "<span class='text-purple-400'>from</span> <span class='text-yellow-300'>sklearn.model_selection</span> <span class='text-purple-400'>import</span> train_test_split",
        "",
        "<span class='text-gray-500'># Initializing SAPCCA Neural Core</span>",
        "<span class='text-purple-400'>def</span> <span class='text-blue-400'>train_moderation_model</span>(data):",
        "&nbsp;&nbsp;<span class='text-gray-500'>''' Train AI for toxicity detection '''</span>",
        "&nbsp;&nbsp;X_train, X_test, y_train, y_test = train_test_split(data['text'], data['label'])",
        "&nbsp;&nbsp;model = <span class='text-green-400'>Sequential</span>([",
        "&nbsp;&nbsp;&nbsp;&nbsp;Embedding(input_dim=10000, output_dim=128),",
        "&nbsp;&nbsp;&nbsp;&nbsp;LSTM(64, return_sequences=<span class='text-purple-400'>True</span>),",
        "&nbsp;&nbsp;&nbsp;&nbsp;Dense(1, activation='sigmoid')",
        "&nbsp;&nbsp;])",
        "&nbsp;&nbsp;<span class='text-purple-400'>return</span> model.fit(X_train, y_train, epochs=10)",
        "",
        "<span class='text-green-400'>➜ UET_Lahore_Project.start()</span>",
        "<span class='text-blue-400'>✓ Secure AI Powered Campus Chat Application Online</span>"
    ];

    let lineIndex = 0;

    function typeWriter() {
        if (lineIndex < codeLines.length) {
            const line = codeLines[lineIndex];
            const p = document.createElement('div');
            p.innerHTML = line;
            p.className = "mb-1";
            terminalContent.appendChild(p);
            terminalContent.scrollTop = terminalContent.scrollHeight;
            lineIndex++;
            setTimeout(typeWriter, Math.random() * 200 + 50);
        }
    }

    // Start typing when section is in view
    ScrollTrigger.create({
        trigger: terminalContent,
        start: "top 80%",
        onEnter: () => {
            if (lineIndex === 0) typeWriter();
        }
    });
}


// --- 6. Advanced Three.js Background ---
const initThreeJS = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    // Match background color #030303
    scene.fog = new THREE.FogExp2(0x030303, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Particles - Blue & Purple Mix
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(0x3B82F6); // Blue
    const color2 = new THREE.Color(0x8B5CF6); // Purple

    for (let i = 0; i < particlesCount; i++) {
        // Positions
        posArray[i * 3] = (Math.random() - 0.5) * 100;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 100;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 100;

        // Colors
        const mixedColor = Math.random() > 0.5 ? color1 : color2;
        colorsArray[i * 3] = mixedColor.r;
        colorsArray[i * 3 + 1] = mixedColor.g;
        colorsArray[i * 3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.2, // Slightly larger
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Connecting Lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.08 });
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    const updateLines = () => {
        const positions = particlesMesh.geometry.attributes.position.array;
        const connectedPositions = [];
        const maxDist = 15; // Increased connection distance

        // Limit checks for performance
        for (let i = 0; i < 200; i++) {
            for (let j = i + 1; j < 200; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDist) {
                    connectedPositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectedPositions, 3));
    };

    // Mouse & Scroll Interaction
    let mouseX = 0;
    let mouseY = 0;
    let scrollSpeed = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });

    lenis.on('scroll', (e) => {
        scrollSpeed = e.velocity;
    });

    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Complex Rotation
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;
        linesMesh.rotation.y = elapsedTime * 0.05;
        linesMesh.rotation.x = elapsedTime * 0.02;

        // Warp
        const warp = Math.min(Math.abs(scrollSpeed) * 0.05, 0.5);
        particlesMesh.scale.z = 1 + warp;
        linesMesh.scale.z = 1 + warp;

        // Parallax
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Dynamic Line Updates
        updateLines();

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};


// --- 7. GSAP Reveals ---
const initGSAP = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text
    const tl = gsap.timeline();
    tl.to('.gsap-hero-text', { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 })
        .to('.gsap-hero', { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }, "-=0.8");

    // Section Reveals
    gsap.utils.toArray('section').forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: section, start: 'top 85%' } }
        );
    });
};



// --- 8. Mobile Menu Logic ---
const setupMobileMenu = () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const mobileCta = document.querySelector('.mobile-cta');
    let isMenuOpen = false;

    if (!menuBtn || !menuOverlay) return;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // Open Menu
            menuBtn.classList.add('active');
            menuOverlay.style.pointerEvents = 'auto';

            gsap.to(menuOverlay, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });

            gsap.to(mobileLinks, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });

            gsap.to(mobileCta, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.6
            });

        } else {
            // Close Menu
            menuBtn.classList.remove('active');
            menuOverlay.style.pointerEvents = 'none';

            gsap.to(menuOverlay, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
                delay: 0.3
            });

            gsap.to(mobileLinks, {
                y: '100%',
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.in"
            });

            gsap.to(mobileCta, {
                y: '100%',
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            });
        }
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) menuBtn.click();
        });
    });
};

    });
};

// --- 9. 3D Tilt Cards ---
const initTiltCards = () => {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
};

window.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initGSAP();
    setupMobileMenu();
    initTiltCards();
});
