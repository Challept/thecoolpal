// Firebase initialization (add this only if you haven't added it in firebase-config.js)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to render sections from Firestore in real-time
function renderSections() {
    const sectionList = document.getElementById('section-list');
    sectionList.innerHTML = ''; // Clear the list before re-rendering

    // Listen for changes in Firestore collection
    onSnapshot(collection(db, 'sections'), (snapshot) => {
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
        await addDoc(collection(db, 'sections'), {
            name: sectionName,
            content: "This is the content of " + sectionName
        });
    }
}

// Function to delete a selected section
async function deleteSection(sectionId) {
    if (confirm("Are you sure you want to delete this section?")) {
        await deleteDoc(doc(db, 'sections', sectionId));
    }
}

// Function to select a section and display it in the edit panel
function selectSection(sectionId, name, content) {
    document.getElementById('section-heading').value = name;
    document.getElementById('section-content').value = content;
    document.getElementById('edit-panel').dataset.sectionId = sectionId;
}

// Function to update section content in Firestore
async function updateSectionContent() {
    const sectionId = document.getElementById('edit-panel').dataset.sectionId;
    const newContent = document.getElementById('section-content').value;

    if (sectionId) {
        await updateDoc(doc(db, 'sections', sectionId), {
            content: newContent
        });
    }
}

// Initialize the live editor
function initLiveEditor() {
    renderSections();

    // Attach event listeners
    document.getElementById('add-section-btn').addEventListener('click', addSection);
    document.getElementById('delete-section-btn').addEventListener('click', () => {
        const sectionId = document.getElementById('edit-panel').dataset.sectionId;
        if (sectionId) deleteSection(sectionId);
    });
    document.getElementById('section-content').addEventListener('input', updateSectionContent);
}

document.addEventListener('DOMContentLoaded', initLiveEditor);
