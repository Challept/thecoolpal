// Firebase already initialized in firebase-config.js
const db = firebase.firestore();

// Function to render sections from Firestore in real-time
function renderSections() {
    const sectionList = document.getElementById('section-list');
    sectionList.innerHTML = ''; // Clear the list before re-rendering

    // Listen for changes in Firestore collection
    db.collection('sections').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            const section = doc.data();
            const listItem = document.createElement('li');
            listItem.className = 'section-item';
            listItem.textContent = section.name;
            listItem.onclick = () => selectSection(doc.id, section.name, section.content);
            sectionList.appendChild(listItem);
        });
    });
}

// Function to add a new section
async function addSection() {
    const sectionName = prompt("Enter section name:");
    if (sectionName) {
        await db.collection('sections').add({
            name: sectionName,
            content: "This is the content of " + sectionName
        });
    }
}

// Function to delete a selected section
function deleteSection() {
    const sectionId = document.getElementById('edit-panel').dataset.sectionId;
    if (sectionId && confirm("Are you sure you want to delete this section?")) {
        db.collection('sections').doc(sectionId).delete();
    }
}

// Function to select a section and display it in the edit panel
function selectSection(sectionId, name, content) {
    document.getElementById('section-heading').value = name;
    document.getElementById('section-content').value = content;
    document.getElementById('edit-panel').dataset.sectionId = sectionId;
}

// Function to update section content in Firestore
function updateSectionContent() {
    const sectionId = document.getElementById('edit-panel').dataset.sectionId;
    const newContent = document.getElementById('section-content').value;

    if (sectionId) {
        db.collection('sections').doc(sectionId).update({
            content: newContent
        });
    }
}

// Function to initialize the live editor
function initLiveEditor() {
    renderSections();

    // Attach event listeners
    document.getElementById('add-section-btn').addEventListener('click', addSection);
    document.getElementById('delete-section-btn').addEventListener('click', deleteSection);
    document.getElementById('section-content').addEventListener('input', updateSectionContent);
}

document.addEventListener('DOMContentLoaded', initLiveEditor);
