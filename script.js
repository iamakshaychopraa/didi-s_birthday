/* ============================================================
   BIRTHDAY SURPRISE — script.js
   All interactivity, animations, and personalisation
   ============================================================ */

/* ──────────────────────────────────────────────────────────────
   🎀  PERSONALISATION CONFIG — Edit these to customise!
   ────────────────────────────────────────────────────────────── */
const CONFIG = {

    /* Sister's name (used in the reveal heading) */
    sisterName: "Ridhi",

    /* Your name / nickname (used in the letter signature) */
    yourName: "Akshay",

    /* Reveal screen */
    revealTitle: "Happy Birthday, Didi! 🎂",
    revealSubtitle:
        "Today is all about celebrating the most wonderful person I know.<br>This little corner of the internet is made just for you\u2002♡",

    /* Letter */
    letterGreeting: "Dear Ridhi,",
    letterParagraphs: [
        "If I could wrap up all the gratitude and love I have for you and hand it over in a box, it still wouldn't be enough.",
        "You've been my partner in crime, my shoulder to lean on, my loudest cheerleader, and honestly — the funniest person I know (don't let it go to your head 😄).",
        "Through every silly argument over nothing, every late-night talk, every moment you showed up for me without being asked — you've made my life so much better just by being in it.",
        "So today, on YOUR day, I just want to say: thank you for being the most amazing sister, Ridhi. The world is so much brighter with you in it, and I'm the luckiest brother to have you.",
        "Here's to another year of adventures, inside jokes, questionable decisions, and unconditional love.\u2002🤍",
    ],
    letterClosing: "All my love, always",
    letterSignature: "— {yourName}\u2002♡",  // {yourName} gets replaced

    /* Six reasons she's special */
    reasons: [
        {
            icon: "🌸",
            title: "Your Laughter",
            text: "Ridhi, the way you laugh — loud, unfiltered, contagious — is one of my favourite sounds in the entire world.",
        },
        {
            icon: "💫",
            title: "Your Kindness",
            text: "You care so deeply about everyone around you. Your kindness is quiet, steady, and truly extraordinary.",
        },
        {
            icon: "🦋",
            title: "Your Strength",
            text: "Even on the hard days, you keep going with such grace. Your resilience inspires me more than you know.",
        },
        {
            icon: "🌷",
            title: "Your Warmth",
            text: "You make everyone feel like they belong. Being around you feels like the safest, happiest place in the world.",
        },
        {
            icon: "✨",
            title: "Your Spark",
            text: "There's something about you that lights up every room you walk into. A spark that's uniquely, beautifully yours.",
        },
        {
            icon: "🤍",
            title: "Best Sister Ever",
            text: "I couldn't have asked for a better sister. You make my life brighter every single day, Ridhi — never forget that.",
        },
    ],

    /* Open-when envelopes */
    envelopes: [
        {
            emoji: "😊",
            label: "you need a smile",
            heading: "Hey Ridhi, you gorgeous human!",
            message:
                "Just a reminder that your smile could literally power a small city. Whatever is going on, it's temporary — but your magic? That's permanent. Now go smile at a mirror. Your brother's orders. 💛",
        },
        {
            emoji: "🌧️",
            label: "you're having a bad day",
            heading: "Bad days don't last, Ridhi.",
            message:
                "I know today is heavy, and I wish I could take it all away. But please remember: you've survived every single bad day so far, and this one is no different. Your brother is SO proud of you. Breathe. You've got this. 🤍",
        },
        {
            emoji: "💭",
            label: "you need a little reminder",
            heading: "A gentle reminder ♡",
            message:
                "Ridhi, you are enough. Exactly as you are, right now, reading this. Not when you finish that task, not when you reach that goal — right now. You are worthy of love, rest, and every beautiful thing life has to offer. 🌷",
        },
        {
            emoji: "🤗",
            label: "you miss me",
            heading: "I miss you too, Ridhi!",
            message:
                "Distance and busy lives can't change the fact that you're my favourite person on this planet. Close your eyes and imagine the biggest, warmest hug — that's from your brother Akshay. Always. 💕",
        },
    ],

    /* Gift message */
    giftMessage: "Ridhi, you are my greatest gift. Never forget that.\u2002💝",

    /* Final screen */
    finalText:
        "No matter how much we grow up,<br>you'll always have your brother\u2002♡<br><span style='font-size:.7em;color:#9a8898;margin-top:8px;display:inline-block'>— Akshay</span>",

    /* Optional: path to a background music file (e.g. "music.mp3") */
    musicFile: "",

    /* Optional: path to a photo to show on the reveal screen */
    photo: "",
};

/* ──────────────────────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────────────────────── */
let revealed = false;
let musicPlaying = false;
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

/* ──────────────────────────────────────────────────────────────
   DOM REFERENCES
   ────────────────────────────────────────────────────────────── */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ──────────────────────────────────────────────────────────────
   INITIALISE
   ────────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
    populateContent();
    createFloatingElements();
    setupOpenButton();
    setupEnvelopes();
    setupGiftBox();
    setupMusicToggle();
    setupReplay();
    if (!prefersReducedMotion) setupCursorSparkles();
    initScrollObserver();
});

/* ──────────────────────────────────────────────────────────────
   POPULATE CONTENT FROM CONFIG
   ────────────────────────────────────────────────────────────── */
function populateContent() {
    const c = CONFIG;

    /* Reveal */
    const revTitle = $("#reveal-title");
    const revSub = $("#reveal-subtitle");
    if (revTitle) revTitle.textContent = c.revealTitle;
    if (revSub) revSub.innerHTML = c.revealSubtitle;

    /* Letter */
    const greeting = $("#letter-greeting");
    const body = $("#letter-body");
    const closing = $("#letter-closing");
    const sig = $("#letter-sig");
    if (greeting) greeting.textContent = c.letterGreeting;
    if (body) {
        body.innerHTML = c.letterParagraphs.map((p) => `<p>${p}</p>`).join("");
    }
    if (closing) closing.textContent = c.letterClosing;
    if (sig)
        sig.textContent = c.letterSignature.replace("{yourName}", c.yourName);

    /* Reasons */
    const grid = $("#reasons-grid");
    if (grid) {
        grid.innerHTML = c.reasons
            .map(
                (r, i) => `
            <div class="reason-card scroll-reveal" style="transition-delay:${i * 80}ms">
                <span class="reason-icon" aria-hidden="true">${r.icon}</span>
                <h3 class="reason-title">${r.title}</h3>
                <p class="reason-text">${r.text}</p>
            </div>`
            )
            .join("");
    }

    /* Envelopes */
    const envGrid = $("#envelopes-grid");
    if (envGrid) {
        envGrid.innerHTML = c.envelopes
            .map(
                (e, i) => `
            <button class="envelope scroll-reveal" data-envelope="${i}"
                    style="transition-delay:${i * 100}ms"
                    aria-label="Open when ${e.label}">
                <span class="envelope-emoji">${e.emoji}</span>
                <span class="envelope-prefix">Open when…</span>
                <span class="envelope-label">${e.label}</span>
            </button>`
            )
            .join("");
    }

    /* Gift message */
    const giftText = $("#gift-msg-text");
    if (giftText) giftText.textContent = c.giftMessage;

    /* Final */
    const finalText = $("#final-text");
    if (finalText) finalText.innerHTML = c.finalText;

    /* Music source */
    if (c.musicFile) {
        const audio = $("#bg-music");
        if (audio) {
            const source = document.createElement("source");
            source.src = c.musicFile;
            source.type = "audio/mpeg";
            audio.appendChild(source);
        }
    }
}

/* ──────────────────────────────────────────────────────────────
   FLOATING BACKGROUND ELEMENTS (Welcome screen)
   ────────────────────────────────────────────────────────────── */
function createFloatingElements() {
    if (prefersReducedMotion) return;
    const container = $("#floating-bg");
    if (!container) return;

    const items = ["♡", "✦", "❀", "·", "✧", "♡", "❁", "·", "✦", "♡",
                   "✿", "♡", "·", "✦", "❀", "♡", "✧", "·", "❁", "♡"];

    items.forEach((char, i) => {
        const el = document.createElement("span");
        el.className = "float-el";
        el.textContent = char;
        el.setAttribute("aria-hidden", "true");

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = (.8 + Math.random() * 1.2).toFixed(2);
        const opacity = (.08 + Math.random() * .15).toFixed(2);
        const dur = (14 + Math.random() * 20).toFixed(1);
        const del = (Math.random() * 12).toFixed(1);

        el.style.left = left + "%";
        el.style.top = top + "%";
        el.style.setProperty("--sz", size + "rem");
        el.style.setProperty("--op", opacity);
        el.style.setProperty("--dur", dur + "s");
        el.style.setProperty("--del", del + "s");
        el.style.setProperty("--dx1", (Math.random() * 60 - 30) + "px");
        el.style.setProperty("--dy1", (Math.random() * 60 - 30) + "px");
        el.style.setProperty("--dx2", (Math.random() * 60 - 30) + "px");
        el.style.setProperty("--dy2", (Math.random() * 60 - 30) + "px");
        el.style.setProperty("--dx3", (Math.random() * 60 - 30) + "px");
        el.style.setProperty("--dy3", (Math.random() * 60 - 30) + "px");

        container.appendChild(el);
    });
}

/* ──────────────────────────────────────────────────────────────
   OPEN SURPRISE — Welcome → Reveal transition
   ────────────────────────────────────────────────────────────── */
function setupOpenButton() {
    const btn = $("#open-btn");
    if (!btn) return;
    btn.addEventListener("click", openSurprise);
}

function openSurprise() {
    if (revealed) return;
    revealed = true;

    const welcome = $("#welcome-screen");
    const main = $("#main-content");
    const musicBtn = $(".music-toggle");

    /* Animate welcome out */
    welcome.classList.add("exit");

    setTimeout(() => {
        welcome.style.display = "none";
        main.setAttribute("aria-hidden", "false");
        main.classList.add("visible");
        if (musicBtn) musicBtn.classList.add("visible");

        /* Scroll to reveal section */
        window.scrollTo({ top: 0, behavior: "instant" });

        /* Launch confetti */
        if (!prefersReducedMotion) {
            confetti.launch(130, 3500);
        }

        /* Re-run scroll observer for newly visible elements */
        setTimeout(() => {
            observeAll();
        }, 100);
    }, 650);
}

/* ──────────────────────────────────────────────────────────────
   CONFETTI SYSTEM (canvas-based)
   ────────────────────────────────────────────────────────────── */
const confetti = (() => {
    const canvas = $("#confetti-canvas");
    if (!canvas) return { launch() {} };
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animating = false;

    const COLORS = [
        "#f889b8", "#c8b4f0", "#f8c8a4", "#e8c36a",
        "#8ecae6", "#95d5b2", "#f7b8d0", "#b8b0f0",
    ];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    function create() {
        return {
            x: Math.random() * canvas.width,
            y: -12 - Math.random() * canvas.height * 0.3,
            w: 4 + Math.random() * 6,
            h: 3 + Math.random() * 4,
            vx: Math.random() * 3.5 - 1.75,
            vy: 2 + Math.random() * 3,
            rot: Math.random() * 360,
            rv: (Math.random() - 0.5) * 12,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            gravity: 0.04 + Math.random() * 0.03,
            opacity: 0.75 + Math.random() * 0.25,
            shape: Math.random() > 0.5 ? "rect" : "circle",
        };
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter((p) => p.y < canvas.height + 30);

        particles.forEach((p) => {
            p.vy += p.gravity;
            p.y += p.vy;
            p.x += p.vx + Math.sin(p.y * 0.008) * 0.6;
            p.rot += p.rv;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            if (p.shape === "rect") {
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.w / 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });

        if (particles.length > 0) {
            requestAnimationFrame(draw);
        } else {
            animating = false;
        }
    }

    function launch(count = 120, duration = 3000) {
        if (prefersReducedMotion) return;
        for (let i = 0; i < count; i++) {
            setTimeout(() => particles.push(create()), Math.random() * duration * 0.35);
        }
        if (!animating) {
            animating = true;
            draw();
        }
    }

    return { launch };
})();

/* ──────────────────────────────────────────────────────────────
   SCROLL REVEAL OBSERVER
   ────────────────────────────────────────────────────────────── */
let observer;

function initScrollObserver() {
    if (prefersReducedMotion) {
        /* Show everything immediately */
        $$(".scroll-reveal").forEach((el) => el.classList.add("revealed"));
        return;
    }

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observeAll();
}

function observeAll() {
    if (!observer) return;
    $$(".scroll-reveal:not(.revealed)").forEach((el) => observer.observe(el));
}

/* ──────────────────────────────────────────────────────────────
   ENVELOPE INTERACTIONS
   ────────────────────────────────────────────────────────────── */
function setupEnvelopes() {
    const modal = $("#envelope-modal");
    const closeBtn = $("#modal-close");
    if (!modal || !closeBtn) return;

    /* Delegate click from grid */
    document.addEventListener("click", (e) => {
        const env = e.target.closest(".envelope");
        if (!env) return;
        const idx = parseInt(env.dataset.envelope, 10);
        const data = CONFIG.envelopes[idx];
        if (!data) return;

        $("#modal-emoji").textContent = data.emoji;
        $("#modal-heading").textContent = data.heading;
        $("#modal-body").textContent = data.message;

        modal.classList.add("active");
        modal.focus();
    });

    /* Close */
    closeBtn.addEventListener("click", () => closeModal());
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    function closeModal() {
        modal.classList.remove("active");
    }
}

/* ──────────────────────────────────────────────────────────────
   GIFT BOX
   ────────────────────────────────────────────────────────────── */
function setupGiftBox() {
    const box = $("#gift-box");
    const hint = $("#gift-hint");
    if (!box) return;

    box.addEventListener("click", () => {
        if (box.classList.contains("opened")) return;
        box.classList.add("opened");
        if (hint) hint.classList.add("hidden");

        if (!prefersReducedMotion) {
            confetti.launch(100, 2500);
        }
    });
}

/* ──────────────────────────────────────────────────────────────
   MUSIC TOGGLE
   ────────────────────────────────────────────────────────────── */
function setupMusicToggle() {
    const btn = $(".music-toggle");
    const audio = $("#bg-music");
    const icon = $("#music-icon");
    if (!btn || !audio) return;

    /* Hide button if no music source at all */
    const hasSrc = audio.querySelector("source") || CONFIG.musicFile;
    if (!hasSrc) {
        /* Still show the button, but use Web Audio API melody as fallback */
    }

    btn.addEventListener("click", () => {
        if (musicPlaying) {
            stopMusic(audio, btn, icon);
        } else {
            playMusic(audio, btn, icon);
        }
    });
}

function playMusic(audio, btn, icon) {
    /* Try HTML audio first */
    const hasSrc = audio.querySelector("source") || audio.src;
    if (hasSrc && audio.querySelector("source")) {
        audio.play().catch(() => {
            /* If no file, fall back to Web Audio melody */
            playMelody();
        });
    } else {
        playMelody();
    }
    musicPlaying = true;
    btn.classList.add("playing");
    icon.textContent = "♫";
    btn.title = "Pause music";
}

function stopMusic(audio, btn, icon) {
    audio.pause();
    stopMelody();
    musicPlaying = false;
    btn.classList.remove("playing");
    icon.textContent = "♪";
    btn.title = "Play music";
}

/* ---------- Web Audio fallback: Happy Birthday melody ---------- */
let melodyCtx = null;
let melodyTimeout = null;
let melodyPlaying = false;

function playMelody() {
    if (!melodyCtx)
        melodyCtx = new (window.AudioContext || window.webkitAudioContext)();
    melodyPlaying = true;
    scheduleMelody();
}

function stopMelody() {
    melodyPlaying = false;
    if (melodyTimeout) clearTimeout(melodyTimeout);
}

function scheduleMelody() {
    if (!melodyPlaying || !melodyCtx) return;

    /* Happy Birthday in note frequencies & durations */
    const notes = [
        [262, .28], [262, .28], [294, .55], [262, .55], [349, .55], [330, .95],
        [262, .28], [262, .28], [294, .55], [262, .55], [392, .55], [349, .95],
        [262, .28], [262, .28], [523, .55], [440, .55], [349, .55], [330, .55], [294, .75],
        [466, .28], [466, .28], [440, .55], [349, .55], [392, .55], [349, .95],
    ];

    let t = melodyCtx.currentTime + 0.05;
    notes.forEach(([freq, dur]) => {
        const osc = melodyCtx.createOscillator();
        const gain = melodyCtx.createGain();
        osc.connect(gain);
        gain.connect(melodyCtx.destination);
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.13, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.start(t);
        osc.stop(t + dur + 0.02);
        t += dur + 0.04;
    });

    const totalDur = notes.reduce((s, [, d]) => s + d + 0.04, 0);
    melodyTimeout = setTimeout(() => scheduleMelody(), totalDur * 1000 + 800);
}

/* ──────────────────────────────────────────────────────────────
   CURSOR SPARKLE (desktop only)
   ────────────────────────────────────────────────────────────── */
function setupCursorSparkles() {
    /* Only on devices that have a fine pointer (mouse) */
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const container = $("#cursor-sparkles");
    if (!container) return;

    let lastTime = 0;
    const COLORS = ["#f889b8", "#c8b4f0", "#e8c36a", "#f8c8a4"];

    document.addEventListener("mousemove", (e) => {
        const now = Date.now();
        if (now - lastTime < 50) return;  // throttle
        if (Math.random() > 0.55) return; // randomise
        lastTime = now;

        const dot = document.createElement("div");
        dot.className = "sparkle-dot";
        const size = 3 + Math.random() * 5;
        dot.style.width = size + "px";
        dot.style.height = size + "px";
        dot.style.left = e.clientX - size / 2 + "px";
        dot.style.top = e.clientY - size / 2 + "px";
        dot.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
        container.appendChild(dot);

        setTimeout(() => dot.remove(), 550);
    });
}

/* ──────────────────────────────────────────────────────────────
   REPLAY
   ────────────────────────────────────────────────────────────── */
function setupReplay() {
    const btn = $("#replay-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        revealed = false;

        /* Stop music */
        const audio = $("#bg-music");
        const musicBtn = $(".music-toggle");
        const musicIcon = $("#music-icon");
        if (audio && musicPlaying) {
            stopMusic(audio, musicBtn, musicIcon);
        }

        /* Hide main content */
        const main = $("#main-content");
        main.classList.remove("visible");
        main.setAttribute("aria-hidden", "true");

        /* Reset scroll-reveal states */
        $$(".scroll-reveal").forEach((el) => el.classList.remove("revealed"));

        /* Reset gift box */
        const gift = $("#gift-box");
        const hint = $("#gift-hint");
        if (gift) gift.classList.remove("opened");
        if (hint) hint.classList.remove("hidden");

        /* Hide music toggle */
        if (musicBtn) musicBtn.classList.remove("visible");

        /* Show welcome again */
        const welcome = $("#welcome-screen");
        welcome.style.display = "";
        welcome.classList.remove("exit");

        window.scrollTo({ top: 0, behavior: "instant" });
    });
}
