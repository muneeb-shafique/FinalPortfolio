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



// --- 10. Workflow Animation ---
const initWorkflowAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    const line = document.getElementById('workflow-line');
    const steps = document.querySelectorAll('.workflow-step');

    if (line) {
        gsap.to(line, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.workflow-step', // Start roughly when first step appears
                start: 'top 70%',
                end: 'bottom 50%',
                scrub: 1
            }
        });
    }

    steps.forEach(step => {
        gsap.to(step, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
};



// --- 11. Blog System ---
const initBlogSystem = () => {
    const blogGrid = document.getElementById('blog-grid');
    const searchInput = document.getElementById('blog-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('no-results');

    if (!blogGrid) return;

    // Demo Data
    const blogs = [
        {
            title: "The Future of AI in 2026",
            excerpt: "Exploring the next generation of agentic AI systems, reasoning architectures, and their practical implications.",
            category: "ai",
            date: "Jan 24, 2026",
            readTime: "5 min",
            tags: ["AI", "Agents", "Future"],
            link: "Blogs/ai-future-2026.html"
        },
        {
            title: "Adversarial Attacks on ML Models",
            excerpt: "Understanding security risks in neural networks and practical defense methods to build robust AI.",
            category: "cyber",
            date: "Jan 18, 2026",
            readTime: "8 min",
            tags: ["AI Security", "Robustness", "ML"],
            link: "Blogs/adversarial-ml-security.html"
        },
        {
            title: "Optimizing Python for Scale",
            excerpt: "Advanced concurrency patterns, profiling tools, and memory optimizations for large-scale data systems.",
            category: "data",
            date: "Jan 10, 2026",
            readTime: "6 min",
            tags: ["Python", "Performance", "Optimization"],
            link: "Blogs/optimizing-python.html"
        },
        {
            title: "Fine-Tuning LLMs on Consumer GPUs",
            excerpt: "A practical developer's guide to model quantization, LoRA, and training large language models on local hardware.",
            category: "ai",
            date: "Feb 02, 2026",
            readTime: "7 min",
            tags: ["LLM", "Fine-Tuning", "GPU"],
            link: "Blogs/fine-tuning-llms.html"
        },
        {
            title: "Feature Engineering for Time-Series",
            excerpt: "How to construct rolling windows, lag features, and domain-specific indicators to improve model accuracy.",
            category: "data",
            date: "Jan 05, 2026",
            readTime: "6 min",
            tags: ["Time-Series", "Pandas", "Feature Engineering"],
            link: "Blogs/time-series-features.html"
        },
        {
            title: "End-to-End ML Pipelines",
            excerpt: "From data ingestion to model deployment: automating the lifecycle of AI with MLOps and Kubernetes.",
            category: "mlops",
            date: "Dec 15, 2025",
            readTime: "9 min",
            tags: ["MLOps", "Kubernetes", "Pipelines"],
            link: "Blogs/ml-pipelines.html"
        }
    ];

    const renderBlogs = (filteredBlogs) => {
        blogGrid.innerHTML = '';

        if (filteredBlogs.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');

        filteredBlogs.forEach((blog, index) => {
            const card = document.createElement('div');
            card.className = "glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300 opacity-0 translate-y-4";
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;

            // Generate tags HTML
            const tagsHtml = blog.tags.map(tag =>
                `<span class="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-gray-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors">${tag}</span>`
            ).join('');

            card.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div class="relative z-10 flex flex-col h-full">
                    <div class="flex justify-between items-start mb-6">
                        <span class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            ${index + 1 < 10 ? '0' + (index + 1) : index + 1}
                        </span>
                        <span class="text-xs font-mono text-gray-500">${blog.date}</span>
                    </div>
                    
                    <h3 class="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">${blog.title}</h3>
                    <p class="text-gray-400 text-sm mb-6 flex-grow">${blog.excerpt}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${tagsHtml}
                    </div>
                    
                    <div class="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                        <span class="text-xs font-mono text-gray-500">${blog.readTime} READ</span>
                        <a href="${blog.link}" class="text-xs font-bold tracking-wider hover:text-white transition-colors flex items-center gap-2 group/link">
                            READ ENTRY <span class="group-hover/link:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>
            `;

            blogGrid.appendChild(card);
        });
    };

    // Initial Render
    renderBlogs(blogs);

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = blogs.filter(blog =>
            blog.title.toLowerCase().includes(query) ||
            blog.excerpt.toLowerCase().includes(query) ||
            blog.tags.some(tag => tag.toLowerCase().includes(query))
        );
        renderBlogs(filtered);
    });

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Update
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-white/10', 'text-white');
                b.classList.add('bg-transparent', 'text-gray-400');
            });
            btn.classList.remove('bg-transparent', 'text-gray-400');
            btn.classList.add('active', 'bg-white/10', 'text-white');

            // Filtering
            const category = btn.dataset.filter;
            if (category === 'all') {
                renderBlogs(blogs);
            } else {
                const filtered = blogs.filter(blog => blog.category === category);
                renderBlogs(filtered);
            }
        });
    });
};



// --- 12. Blog Interactions (New) ---
const initBlogInteractions = () => {
    // 1. Reading Progress Bar
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 1.5 Reading Stats (New)
    const article = document.querySelector('article');
    if (!article) return;

    const text = article.innerText;
    const wpm = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);

    // Create or Update stats container in sidebar if it exists
    const statsContainer = document.getElementById('reading-stats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <span>WORDS: ${words}</span>
            <span>TIME: ${time} MIN</span>
        `;
    }

    // 2. Interaction Bar (Like & Share)
    const interactionBar = document.createElement('div');
    interactionBar.className = 'interaction-bar';
    interactionBar.innerHTML = `
        <button class="interaction-btn like-btn" id="like-btn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            <span id="like-count">0</span>
        </button>
        <div class="w-px h-4 bg-white/20"></div>
        <button class="interaction-btn share-btn" id="share-btn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            <span>Share</span>
        </button>
    `;
    document.body.appendChild(interactionBar);

    // Like Logic with LocalStorage
    const likeBtn = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');
    const pageId = window.location.pathname; // Unique ID per page

    // Load state
    let likes = parseInt(localStorage.getItem(`likes_${pageId}`)) || Math.floor(Math.random() * 50) + 10;
    let hasLiked = localStorage.getItem(`liked_${pageId}`) === 'true';

    likeCount.innerText = likes;
    if (hasLiked) likeBtn.classList.add('liked');

    likeBtn.addEventListener('click', () => {
        if (hasLiked) {
            likes--;
            hasLiked = false;
            likeBtn.classList.remove('liked');
        } else {
            likes++;
            hasLiked = true;
            likeBtn.classList.add('liked');

            // Heart animation
            gsap.fromTo(likeBtn.querySelector('svg'),
                { scale: 1 },
                { scale: 1.5, duration: 0.2, yoyo: true, repeat: 1 }
            );
        }
        likeCount.innerText = likes;
        localStorage.setItem(`likes_${pageId}`, likes);
        localStorage.setItem(`liked_${pageId}`, hasLiked);
    });

    // Share Logic
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: document.title,
            text: 'Check out this article!',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share canceled');
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            const span = shareBtn.querySelector('span');
            const originalText = span.innerText;
            span.innerText = 'Copied!';
            setTimeout(() => { span.innerText = originalText; }, 2000);
        }
    });

    // 3. Code Copy Buttons
    document.querySelectorAll('pre').forEach(pre => {
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.innerText = 'Copy';
        pre.appendChild(btn);

        btn.addEventListener('click', () => {
            const code = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText.replace('Copy', '');
            navigator.clipboard.writeText(code);
            btn.innerText = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.innerText = 'Copy';
                btn.classList.remove('copied');
            }, 2000);
        });
    });

    // 4. Sidebar Functionality (Newsletter & Tags)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const btn = newsletterForm.querySelector('button');
        const input = newsletterForm.querySelector('input');

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (input.value.includes('@')) {
                btn.innerText = 'SUBSCRIBED!';
                btn.style.backgroundColor = '#10B981'; // Green
                btn.style.color = 'white';
                input.value = '';
                setTimeout(() => {
                    btn.innerText = 'SUBSCRIBE';
                    btn.style.backgroundColor = 'white';
                    btn.style.color = 'black';
                }, 3000);
            } else {
                alert('Please enter a valid neural address.');
            }
        });
    }

    // Make tags clickable (Navigate to main blog page with filter)
    document.querySelectorAll('.tag-cloud .tag-chip').forEach(tag => {
        tag.style.cursor = 'pointer';
        tag.addEventListener('click', () => {
            // Since there is no real backend, we just show a toast for now
            // In a real app: window.location.href = '../blogs.html?tag=' + tag.innerText.replace('#', '');
            const originalText = tag.innerText;
            tag.innerText = 'FILTERING...';
            tag.style.borderColor = '#3B82F6';
            tag.style.color = '#3B82F6';

            setTimeout(() => {
                tag.innerText = originalText;
                tag.style.borderColor = 'rgba(255,255,255,0.05)';
                tag.style.color = '#9CA3AF';
                alert(`Redirecting to archives filtered by ${originalText}... (Simulation)`);
            }, 800);
        });
    });
};

window.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initGSAP();
    setupMobileMenu();
    initTiltCards();
    initWorkflowAnimation();
    initBlogSystem();
    initBlogInteractions();
});
