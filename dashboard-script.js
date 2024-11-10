// Handle opening and closing popups
function openPopup(popupId) {
    document.querySelectorAll('.popup').forEach(popup => popup.style.display = 'none');
    document.querySelector(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.querySelector(popupId).style.display = 'none';
}

// Section management
function addSection() {
    const sectionList = document.getElementById('section-list');
    const newSection = document.createElement('li');
    newSection.className = 'section-item';
    newSection.textContent = 'Ny Sektion';
    newSection.contentEditable = true;
    sectionList.appendChild(newSection);
}

function deleteSection() {
    const sectionList = document.getElementById('section-list');
    if (sectionList.lastElementChild) {
        sectionList.removeChild(sectionList.lastElementChild);
    }
}

// Live preview editing functions
function initLiveEditor() {
    const iframe = document.getElementById('live-preview').contentWindow.document;
    iframe.querySelectorAll('*').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            enableEditingMode(element);
            document.getElementById('section-heading').value = element.textContent;
        });
    });
}

function enableEditingMode(element) {
    element.setAttribute('contenteditable', 'true');
    element.style.border = '1px dashed #0072ff';
}

function updateSectionText(type, value) {
    const iframe = document.getElementById('live-preview').contentWindow.document;
    const selectedElement = iframe.querySelector('.editable');
    if (type === 'heading') {
        selectedElement.querySelector('h1').textContent = value;
    }
}

function updateSectionColor(color) {
    const iframe = document.getElementById('live-preview').contentWindow.document;
    iframe.body.style.backgroundColor = color;
}
