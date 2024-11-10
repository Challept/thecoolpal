// Befintlig navigeringskod

// Funktion för att redigera en sektion
function editSection() {
    const sectionId = document.getElementById("sectionId").value;
    const newContent = document.getElementById("newContent").value;
    const iframe = document.getElementById("livePreview").contentWindow.document;

    if (sectionId && newContent) {
        const section = iframe.getElementById(sectionId);
        if (section) {
            section.innerHTML = newContent;
            alert(`Sektionen ${sectionId} har uppdaterats.`);
        } else {
            alert("Sektionen kunde inte hittas. Kontrollera att ID:et är korrekt.");
        }
    } else {
        alert("Fyll i alla fält för att redigera.");
    }
}

// Befintlig kod för att hantera URL-hash och sektioner
const sections = document.querySelectorAll('.dashboard-section');
const links = document.querySelectorAll('.sidebar ul li a');

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

window.addEventListener('load', showSectionFromHash);
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        window.location.hash = sectionId;
        showSectionFromHash();
    });
});
