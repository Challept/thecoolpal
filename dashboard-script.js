// Hitta alla sektioner och länkar
const sections = document.querySelectorAll('.dashboard-section');
const links = document.querySelectorAll('.sidebar ul li a');

// Navigera till sektionen från URL-hash eller klick
function showSectionFromHash() {
    const hash = window.location.hash.substring(1) || 'overview';
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(hash).style.display = 'block';
    updateActiveLink(hash);
}

function updateActiveLink(sectionId) {
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Vid sidladdning, visa sektionen från URL
window.addEventListener('load', showSectionFromHash);

// Uppdatera URL och sektion vid klick
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        window.location.hash = sectionId;
        showSectionFromHash();
    });
});
