/**
 * W Trade Solutions — Main JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
});

// ── Nav scroll effect ──────────────────────
function initNavScroll() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
    });
}

// ── Mobile menu toggle ─────────────────────
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const links = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
    });

    // Close on link click
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
        });
    });
}

// ── Smooth scroll for anchor links ─────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ── Contact form ───────────────────────────
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                showMessage('success', 'Thank you! We will get back to you within 24 hours.');
                form.reset();
            } else {
                showMessage('error', 'Something went wrong. Please email us directly.');
            }
        } catch (err) {
            showMessage('error', 'Could not send. Please email us directly.');
        }

        btn.textContent = originalText;
        btn.disabled = false;
    });
}

function showMessage(type, text) {
    // Remove existing message
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = `form-message form-message-${type}`;
    msg.textContent = text;
    msg.style.cssText = `
        padding: 14px 18px;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        margin-top: 12px;
        font-size: 0.93rem;
        ${type === 'success'
            ? 'background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;'
            : 'background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;'}
    `;

    const form = document.getElementById('contactForm');
    form.appendChild(msg);

    // Auto-dismiss
    setTimeout(() => msg.remove(), 6000);
}
