// JavaScript for About Section Tab Functionality
function openTab(tabId) {
    var tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(function (pane) {
        pane.classList.remove('active');
    });

    var tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(function (button) {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');

    var clickedButton = document.querySelector('.tab-btn[data-tab="' + tabId + '"]');
    clickedButton.classList.add('active');
}

function cleanupDOM() {
    const unwantedElements = document.querySelectorAll(
        '.tab-content > .pagination, .tab-content > .nav-arrows, .tab-content > *:not(.tab-pane)'
    );

    unwantedElements.forEach(function (element) {
        if (element.tagName !== 'DIV' || !element.classList.contains('tab-pane')) {
            element.remove();
        }
    });

    const tabContent = document.querySelector('.tab-content');
    if (tabContent) {
        Array.from(tabContent.childNodes).forEach(function (node) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                tabContent.removeChild(node);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    var tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var tabId = this.getAttribute('data-tab');
            openTab(tabId);
        });
    });

    const experienceLink = document.querySelector('.nav-right a[href="#experience"]');
    if (experienceLink) {
        experienceLink.addEventListener('click', handleNavClick);
    }

    cleanupDOM();
    setTimeout(cleanupDOM, 100);

    // ✅ Contact Form Handling with Enhancements
    const form = document.getElementById('contact-form');

    if (form) {
        const button = form.querySelector('.btn-contact');

        // Add status message container if not already present
        let statusMessage = document.createElement('div');
        statusMessage.className = 'status-message';
        form.appendChild(statusMessage);

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Disable button and show loading text
            button.disabled = true;
            button.textContent = 'Sending...';

            // Debug log
            console.log("Submitting form with data:", new FormData(this));

            // Clear previous status
            statusMessage.textContent = '';
            statusMessage.style.color = '';

            emailjs.sendForm('service_ha2q1k9', 'template_oozxsoi', this)
                .then(function () {
                    statusMessage.textContent = 'Message sent successfully!';
                    statusMessage.style.color = 'green';
                    form.reset();
                }, function (error) {
                    statusMessage.textContent = 'Failed to send message. Please try again later.';
                    statusMessage.style.color = 'red';
                    console.error('EmailJS Error:', error);
                })
                .finally(function () {
                    button.disabled = false;
                    button.textContent = 'Send Message';
                });
        });
    }
});
