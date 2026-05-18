/* ============================================================
   THEME
   ============================================================ */
function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.getElementById('themeIcon').className =
        theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

function initTheme() {
    setTheme(getTheme());
}

/* ============================================================
   LOADER
   ============================================================ */
window.addEventListener('load', function () {
    setTimeout(function () {
        var loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 900);
});

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
    var burger = document.getElementById('burgerBtn');
    var menu   = document.getElementById('mobileMenu');

    burger.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('open');
        burger.classList.toggle('active', isOpen);
        burger.setAttribute('aria-expanded', isOpen);
        menu.setAttribute('aria-hidden', !isOpen);
    });

    document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
        });
    });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = anchor.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/* ============================================================
   TYPEWRITER
   ============================================================ */
function initTypewriter() {
    var titles  = ['Full-Stack Developer', 'Web Application Engineer', 'API Integration Specialist'];
    var el      = document.getElementById('typewriter');
    var ti      = 0;
    var ci      = 0;
    var deleting = false;

    function tick() {
        var word = titles[ti];

        if (!deleting) {
            el.textContent = word.slice(0, ++ci);
            if (ci === word.length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
            }
        } else {
            el.textContent = word.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                ti = (ti + 1) % titles.length;
            }
        }
        setTimeout(tick, deleting ? 42 : 82);
    }

    tick();
}

/* ============================================================
   SCROLL ANIMATIONS — Intersection Observer
   ============================================================ */
function initScrollAnimations() {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
        observer.observe(el);
    });
}

/* ============================================================
   ACTIVE NAV HIGHLIGHT
   ============================================================ */
function initActiveNav() {
    var sections  = document.querySelectorAll('section[id]');
    var navLinks  = document.querySelectorAll('.nav-link');
    var navbar    = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        var scrollY = window.scrollY;

        navbar.classList.toggle('scrolled', scrollY > 60);

        var current = '';
        sections.forEach(function (sec) {
            if (scrollY >= sec.offsetTop - 160) current = sec.id;
        });

        navLinks.forEach(function (link) {
            link.classList.toggle('active', link.dataset.section === current);
        });
    }, { passive: true });
}

/* ============================================================
   SKILLS DATA & RENDER
   ============================================================ */
var skillsData = [
    {
        icon: 'fa-solid fa-code',
        color: '#2563eb',
        category: 'Frontend & Mobile',
        skills: ['JavaScript', 'Vue.js', 'React', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'Flutter', 'Responsive UI'],
    },
    {
        icon: 'fa-solid fa-server',
        color: '#1b3a6b',
        category: 'Backend & APIs',
        skills: ['PHP', 'Laravel', 'CodeIgniter', 'Python', 'REST APIs', 'Microservices', 'WebSockets', 'SOAP APIs'],
    },
    {
        icon: 'fa-solid fa-database',
        color: '#7c3aed',
        category: 'Databases & Infrastructure',
        skills: ['MySQL', 'MariaDB', 'MongoDB', 'Redis', 'AWS (EC2, S3)', 'Docker', 'Linux', 'Nginx', 'Apache'],
    },
    {
        icon: 'fa-solid fa-wrench',
        color: '#059669',
        category: 'Tools & Platforms',
        skills: ['Git', 'Jira', 'Figma', 'Postman', 'Draw.io', 'Slack', 'VS Code'],
    },
];

function renderSkills() {
    var grid = document.getElementById('skillsGrid');
    grid.innerHTML = skillsData.map(function (cat, i) {
        return '<div class="skill-card animate-on-scroll" style="--delay:' + (i * 90) + 'ms">'
            + '<div class="skill-card-header">'
            +   '<div class="skill-icon" style="color:' + cat.color + '">'
            +     '<i class="' + cat.icon + '"></i>'
            +   '</div>'
            +   '<h3 class="skill-category">' + cat.category + '</h3>'
            + '</div>'
            + '<div class="skill-badges">'
            +   cat.skills.map(function (s) {
                    return '<span class="skill-badge">' + s + '</span>';
                }).join('')
            + '</div>'
            + '</div>';
    }).join('');

    initScrollAnimations();
}

/* ============================================================
   PROJECTS DATA
   ============================================================ */
var projectsData = [
    {
        id: 'hris',
        image: './assets/image/project-image/hris-laptop.png',
        url: 'https://hris.lucky8star.com',
        title: 'HRIS — Human Resource Management System',
        role: 'Full-Stack Developer',
        shortDesc: 'Enterprise HR automation covering payroll, timekeeping, leave management, and employee self-service at scale.',
        objective: 'End-to-end HR automation platform serving enterprise operations — streamlining payroll generation, timekeeping, overtime and leave requests, and employee self-service. Engineered for high data volume with customizable workflows that centralize HR operations into a single, auditable system.',
        responsibilities: [
            'Architected full-stack application from database design to responsive UI delivery',
            'Engineered a real-time payroll engine with configurable deduction, allowance, and tax computation rules',
            'Built a self-service employee portal for leave requests, overtime applications, and payslip access',
            'Optimized complex MySQL queries handling multi-department payroll runs across large employee datasets',
            'Defined and documented RESTful API endpoints for inter-module communication',
            'Ensured cross-browser and cross-device compatibility across all HR modules',
        ],
        techstack: ['PHP', 'CodeIgniter', 'MySQL', 'Bootstrap', 'jQuery', 'JavaScript'],
        wide: false,
    },
    {
        id: 'ocbs',
        image: './assets/image/project-image/ocbs-laptop.png',
        url: 'https://ocbs.alpharedph.com',
        title: 'OCBS / CRM — Kiosk Operations Platform',
        role: 'Full-Stack Developer',
        shortDesc: 'Multi-department CRM orchestrating kiosk lifecycle management, inventory tracking, and third-party coordination across 100+ sites.',
        objective: 'A centralized operations platform managing the full kiosk deployment lifecycle — from equipment inventory and installation to live operation. Coordinated workflows across Finance, Sales, Helpdesk, and Audit departments, with real-time inventory visibility for both company and kiosk-owner assets.',
        responsibilities: [
            'Designed a multi-role access system with department-specific dashboards and granular permission layers',
            'Built an inventory management module tracking equipment allocation across 100+ kiosk sites',
            'Developed automated workflow triggers for installation milestones and operational status changes',
            'Integrated third-party vendor communication pipelines for seamless partner coordination',
            'Implemented reporting dashboards giving management real-time operational visibility',
            'Ensured cross-platform optimization across desktop and tablet devices used in field operations',
        ],
        techstack: ['PHP', 'CodeIgniter', 'MySQL', 'Bootstrap', 'jQuery', 'JavaScript'],
        wide: false,
    },
    {
        id: 'elotto',
        image: './assets/image/project-image/lt-laptop.png',
        url: null,
        title: 'ELOTTO — Online Lottery Platform',
        role: 'Full-Stack Developer',
        shortDesc: 'Regulated online lottery with real-time draws via WebSockets and seamless payment integrations through GCash, Maya & DragonPay.',
        objective: 'A secure and user-friendly online lottery platform enabling players to purchase tickets, watch live draws in real time, and manage deposits and withdrawals through integrated payment partners. Built with a security-first architecture to protect user data and ensure transactional integrity under high concurrency.',
        responsibilities: [
            'Architected a real-time WebSocket layer (Ratchet) syncing live draw broadcasts across player and admin interfaces',
            'Integrated GCash, Maya, and DragonPay payment APIs for frictionless deposit and withdrawal flows',
            'Developed a secure ticket purchasing flow with full transaction logging and audit trails',
            'Implemented lottery result publication and an automated winning calculation engine',
            'Designed and optimized database schemas for high-concurrency ticket and transaction operations',
            'Conducted security reviews of all payment flows and sensitive user data handling',
        ],
        techstack: ['CodeIgniter', 'MySQL', 'WebSocket (Ratchet)', 'Bootstrap', 'jQuery'],
        wide: false,
    },
    {
        id: 'otchoplay',
        image: './assets/image/project-image/digi.png',
        url: 'https://digiluck.world',
        title: 'OtchoPlay — Multi-Provider Casino Platform',
        role: 'Full-Stack Developer',
        shortDesc: 'Sophisticated gaming hub integrating 8+ top-tier providers (Pragmatic Play, EVO, JILI & more) via REST & SOAP APIs.',
        objective: 'A premium online casino platform aggregating 8+ world-class game providers through seamless REST and SOAP API integrations, delivering a secure, engaging experience with robust real-time session management, wallet synchronization, and full regulatory compliance.',
        responsibilities: [
            'Integrated REST and SOAP APIs for Pragmatic Play, SA Gaming, Simple Play, BigPot, JILI, Pocket Games, EVO, and CLOT',
            'Reverse-engineered merchant documentation to ensure specification-compliant API connectivity',
            'Developed a real-time game session management layer with live wallet synchronization',
            'Implemented layered security protocols for PII protection and encrypted financial transaction handling',
            'Built a fully responsive front end optimized across desktop, tablet, and mobile browsers',
            'Designed and maintained normalized database schemas for player, transaction, and game-provider data',
        ],
        techstack: ['PHP', 'CodeIgniter', 'MySQL', 'WebSocket (Ratchet)', 'Bootstrap'],
        wide: false,
    },
    {
        id: 'parking',
        image: './assets/image/project-image/parking-laptop.png',
        url: 'https://parking.lucky8star.com',
        title: 'Smart Parking & Cashier System',
        role: 'Full-Stack Developer',
        shortDesc: 'Real-time vehicle monitoring and automated billing powered by WebSockets, eliminating manual cashier overhead.',
        objective: 'A real-time parking management system providing instant vehicle entry/exit monitoring, automated duration tracking, and precise fee calculation. Deployed at Lucky8star facilities to eliminate manual processing, reduce queue times, and generate tamper-proof billing records.',
        responsibilities: [
            'Built a WebSocket-powered live dashboard for real-time vehicle entry/exit event tracking',
            'Developed an automated fee calculation engine based on duration tiers and vehicle categories',
            'Created a cashier UI enabling fast payment processing and digital receipt generation',
            'Designed database schemas for vehicle records, parking sessions, and payment audit logs',
            'Integrated with hardware gate controllers via WebSocket messaging protocol',
            'Optimized for low-latency real-time updates under high-throughput concurrent scenarios',
        ],
        techstack: ['CodeIgniter', 'MySQL', 'WebSocket (Ratchet)', 'Bootstrap', 'jQuery'],
        wide: false,
    },
    {
        id: 'betwinu',
        image: null,
        url: 'https://www.betwinu.com/',
        gradient: 'linear-gradient(135deg, #0d2137 0%, #1b3a6b 55%, #2563eb 100%)',
        title: 'BetWinU — International Casino Platform',
        role: 'Full-Stack Developer',
        shortDesc: 'Premium cross-border casino with multi-currency gateways spanning Philippines, Thailand, Vietnam & Malaysia markets.',
        objective: 'A production-grade online casino platform with a complete deposit/withdrawal infrastructure integrated with Maya, GCash, and international banking APIs supporting cross-border transactions across Thailand, Vietnam, and Malaysia. Built with compliance-ready architecture, strong encryption, and a real-time transaction processing engine for 24/7 regulated gaming markets.',
        responsibilities: [
            'Engineered a multi-currency payment gateway connecting GCash, Maya, and regional banking APIs across PH, TH, VN, and MY',
            'Built secure deposit and withdrawal flows with automated reconciliation and full audit logging',
            'Implemented KYC and compliance verification workflows aligned with international gaming regulations',
            'Developed real-time transaction dashboards for operations and finance team oversight',
            'Applied layered security protocols for PII protection and end-to-end encrypted financial data handling',
            'Architected for 24/7 high availability with fault-tolerant design and zero-downtime deployments',
        ],
        techstack: ['PHP', 'CodeIgniter', 'MySQL', 'Payment APIs', 'WebSocket', 'Bootstrap'],
        wide: false,
    },
    {
        id: 'zigzag',
        image: null,
        url: null,
        appStoreUrl: 'https://apps.apple.com/us/app/zig-zag-live/id6755465986',
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.zigzaglive.app',
        isMobileApp: true,
        gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)',
        title: 'ZigZag Live — Social Live Streaming App',
        role: 'Full-Stack Developer',
        shortDesc: 'Live streaming platform for iOS & Android — empowering creators to earn through real-time gifting, live battles, and a smart discovery engine.',
        objective: 'A feature-rich live streaming platform available on both iOS and Android that empowers creators to go live instantly, grow their audience through smart discovery algorithms, and monetize through an advanced gifting and reward economy. Engineered for real-time interaction at scale with live battles, leaderboards, and creator revenue tools.',
        responsibilities: [
            'Developed core live streaming infrastructure supporting real-time creator-to-audience interaction at scale',
            'Built the gifting and virtual coin economy — purchase flows, real-time gift animations, and creator payout logic',
            'Implemented live battle and ranking systems to drive user engagement and extend session time',
            'Integrated smart discovery and recommendation algorithms to surface new creators to relevant audiences',
            'Published and maintained app releases on the App Store (iOS 15.1+) and Google Play (Android)',
            'Ensured sub-second latency performance under concurrent live stream load with robust fault handling',
        ],
        techstack: ['Mobile Development', 'React Native','Augmented Reality','Real-Time Streaming', 'In-App Purchases', 'iOS', 'Android'],
        wide: true,
    },
];

/* ============================================================
   PROJECTS RENDER
   ============================================================ */
function renderProjects() {
    var grid = document.getElementById('projectsGrid');

    grid.innerHTML = projectsData.map(function (p, i) {
        var techPreview = p.techstack.slice(0, 4);
        var extraCount  = p.techstack.length - 4;

        /* --- image area --- */
        var imageHtml;
        if (p.image) {
            imageHtml = '<div class="project-image">'
                + '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy">'
                + '</div>';
        } else {
            var innerContent;
            if (p.isMobileApp) {
                innerContent = '<div class="mobile-app-badge">'
                    + '<i class="fa-solid fa-mobile-screen-button"></i>'
                    + '<span>Mobile App</span>'
                    + '</div>'
                    + '<div class="store-badges">'
                    + '<a href="' + p.appStoreUrl + '" target="_blank" rel="noopener" class="store-badge-link" onclick="event.stopPropagation()">'
                    +   '<i class="fa-brands fa-apple"></i> App Store'
                    + '</a>'
                    + '<a href="' + p.playStoreUrl + '" target="_blank" rel="noopener" class="store-badge-link" onclick="event.stopPropagation()">'
                    +   '<i class="fa-brands fa-google-play"></i> Play Store'
                    + '</a>'
                    + '</div>';
            } else {
                innerContent = '<div class="project-logo-badge">'
                    + '<i class="fa-solid fa-globe"></i>'
                    + '<span>Live Platform</span>'
                    + '</div>';
            }
            imageHtml = '<div class="project-image-placeholder" style="background:' + p.gradient + '">'
                + innerContent
                + '</div>';
        }

        /* --- tech badges --- */
        var techHtml = techPreview.map(function (t) {
            return '<span class="tech-badge">' + t + '</span>';
        }).join('');
        if (extraCount > 0) {
            techHtml += '<span class="tech-badge tech-badge--more">+' + extraCount + '</span>';
        }

        /* --- action links --- */
        var actionsHtml = '';
        if (p.url) {
            actionsHtml += '<a href="' + p.url + '" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()">'
                + '<i class="fa-solid fa-arrow-up-right-from-square"></i> Live'
                + '</a>';
        }
        if (p.isMobileApp) {
            actionsHtml += '<a href="' + p.appStoreUrl + '" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()">'
                + '<i class="fa-brands fa-apple"></i> iOS'
                + '</a>'
                + '<a href="' + p.playStoreUrl + '" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()">'
                + '<i class="fa-brands fa-google-play"></i> Android'
                + '</a>';
        }
        actionsHtml += '<button class="btn btn-sm" onclick="openDrawer(\'' + p.id + '\')">Details</button>';

        var wideClass = p.wide ? ' project-card--wide' : '';

        return '<div class="project-card' + wideClass + ' animate-on-scroll" style="--delay:' + (i * 75) + 'ms">'
            + imageHtml
            + '<div class="project-card-body">'
            +   '<div class="project-card-header">'
            +     '<h3 class="project-title">' + p.title + '</h3>'
            +     '<span class="project-role">' + p.role + '</span>'
            +   '</div>'
            +   '<p class="project-desc">' + p.shortDesc + '</p>'
            +   '<div class="project-tech">' + techHtml + '</div>'
            +   '<div class="project-actions">' + actionsHtml + '</div>'
            + '</div>'
            + '</div>';
    }).join('');

    initScrollAnimations();
}

/* ============================================================
   PROJECT DRAWER
   ============================================================ */
function openDrawer(id) {
    var p = projectsData.find(function (x) { return x.id === id; });
    if (!p) return;

    var linksHtml = '';
    if (p.url) {
        linksHtml += '<a href="' + p.url + '" target="_blank" rel="noopener" class="drawer-link">'
            + '<i class="fa-solid fa-arrow-up-right-from-square"></i> View Live</a>';
    }
    if (p.isMobileApp) {
        linksHtml += '<div class="drawer-store-links">'
            + '<a href="' + p.appStoreUrl + '" target="_blank" rel="noopener" class="drawer-store-btn">'
            +   '<i class="fa-brands fa-apple"></i> App Store</a>'
            + '<a href="' + p.playStoreUrl + '" target="_blank" rel="noopener" class="drawer-store-btn">'
            +   '<i class="fa-brands fa-google-play"></i> Play Store</a>'
            + '</div>';
    }

    var respHtml = p.responsibilities.map(function (r) {
        return '<li>' + r + '</li>';
    }).join('');

    var techHtml = p.techstack.map(function (t) {
        return '<span class="tech-badge tech-badge--lg">' + t + '</span>';
    }).join('');

    document.getElementById('drawerContent').innerHTML =
        '<div class="drawer-project-header">'
        +   '<h2 class="drawer-title">' + p.title + '</h2>'
        +   '<span class="drawer-role">' + p.role + '</span>'
        +   linksHtml
        + '</div>'
        + '<div class="drawer-section">'
        +   '<h4 class="drawer-section-title"><i class="fa-solid fa-bullseye"></i> Project Overview</h4>'
        +   '<p>' + p.objective + '</p>'
        + '</div>'
        + '<div class="drawer-section">'
        +   '<h4 class="drawer-section-title"><i class="fa-solid fa-list-check"></i> Roles &amp; Responsibilities</h4>'
        +   '<ul class="drawer-list">' + respHtml + '</ul>'
        + '</div>'
        + '<div class="drawer-section">'
        +   '<h4 class="drawer-section-title"><i class="fa-solid fa-layer-group"></i> Tech Stack</h4>'
        +   '<div class="drawer-tech">' + techHtml + '</div>'
        + '</div>';

    document.getElementById('projectDrawer').classList.add('open');
    document.getElementById('drawerBackdrop').classList.add('open');
    document.getElementById('projectDrawer').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    document.getElementById('projectDrawer').classList.remove('open');
    document.getElementById('drawerBackdrop').classList.remove('open');
    document.getElementById('projectDrawer').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/* ============================================================
   EXPERIENCE DATA & RENDER
   ============================================================ */
var experienceData = [
    {
        company: 'Surge Mobile Access Inc.',
        role: 'Full Stack Developer',
        date: 'Oct 2025 – Present',
        location: 'Pasig City',
        type: 'work',
        description: 'Developed a MERN-based React Native live streaming app integrated with LiveKit and DeepAR, featuring real-time socket-powered gifting and coin purchases. Built a MERN stack wallet and payment gateway integrated with QRPH and cryptocurrency wallet providers. Designed a WiFi captive portal system with Omada API for automated network authentication, and applied MultiChain for Distributed Ledger Technology (DLT) implementation.',
    },
    {
        company: 'Vértere Global Solutions, Inc.',
        role: 'Full Stack Software Developer / Programmer Analyst III',
        date: 'Feb 2025 – Sept 2025',
        location: 'Makati City',
        type: 'work',
        description: 'Delivered 50% of MVP features for a self-service loan application portal (Vue, Tailwind, CodeIgniter API). Engineered a Banker\'s Rule (360-day interest) API microservice adopted across 4 channels. Implemented automated document generation (PN, DS, amortization) that eliminated 100% of manual processing for thousands of documents.',
    },
    {
        company: 'Freelance',
        role: 'Full Stack Developer',
        date: 'Sept 2024 – Jan 2025',
        type: 'work',
        description: 'Built a scalable casino platform covering admin and player operations with APIs and Seamless Wallet integration (Evo, Jili, SA Gaming, PG Soft). Implemented secure payment processing for deposits and withdrawals. Integrated third-party payment APIs (DragonPay, FuturePay, Sunny Page) across multiple platforms.',
    },
    {
        company: 'MDS Call Solutions Inc.',
        role: 'Full Stack Developer',
        date: 'Aug 2023 – Aug 2024',
        location: 'Makati City',
        type: 'work',
        description: 'Delivered 100% of MVP features for a self-service Early Wage Access application built on Vue, Tailwind, and Laravel API. Developed and maintained secure, high-performance REST APIs for cross-system communication. Integrated UnionBank\'s i2i Open Finance platform to support compliant multi-institution fund transfers.',
    },
    {
        company: 'Lucky8star Quest Inc.',
        role: 'Full Stack Developer',
        date: 'Oct 2020 – Jul 2023',
        location: 'Mandaluyong',
        type: 'work',
        description: 'Engineered scalable front-end and back-end architectures, optimized database structures, and configured WebSockets for real-time updates across multiple production systems. Designed intuitive user flows collaborating with designers to deliver cross-platform experiences. Improved application performance and stability, contributing to higher user retention and smoother platform operations.',
    },
    {
        company: 'Systems Plus Computer College',
        role: 'B.S. Information Technology',
        date: '2016 – 2020',
        location: 'Cubao',
        type: 'education',
        description: 'Built a strong foundation in software engineering, database systems, networking, and web technologies — the launchpad for a career in full-stack development.',
    },
];

function renderExperience() {
    var timeline = document.getElementById('timeline');

    timeline.innerHTML = experienceData.map(function (item, i) {
        var iconClass = item.type === 'education'
            ? 'fa-solid fa-graduation-cap'
            : 'fa-solid fa-briefcase';

        var dotClass = item.type === 'education' ? ' timeline-dot--edu' : '';

        return '<div class="timeline-item animate-on-scroll" style="--delay:' + (i * 100) + 'ms">'
            + '<div class="timeline-dot' + dotClass + '">'
            +   '<i class="' + iconClass + '"></i>'
            + '</div>'
            + '<div class="timeline-content">'
            +   '<div class="timeline-meta">'
            +     '<span class="timeline-date"><i class="fa-regular fa-calendar"></i> ' + item.date + '</span>'
            +     '<span class="timeline-type-badge ' + item.type + '">' + (item.type === 'education' ? 'Education' : 'Work') + '</span>'
            +   '</div>'
            +   '<h3 class="timeline-company">' + item.company + '</h3>'
            +   '<h4 class="timeline-role">' + item.role + '</h4>'
            +   (item.description ? '<p class="timeline-desc">' + item.description + '</p>' : '')
            + '</div>'
            + '</div>';
    }).join('');

    initScrollAnimations();
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initTypewriter();
    initScrollAnimations();
    initActiveNav();

    renderSkills();
    renderProjects();
    renderExperience();

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('drawerClose').addEventListener('click', closeDrawer);
    document.getElementById('drawerBackdrop').addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDrawer();
    });
});
