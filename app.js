// --- 🗂️ MASTER ACADEMIC DATABASE ---
// Keys match exactly with your GitHub folder structures and file names
const academicDatabase = {
    "MJC-5-Eng": {
        name: "American Literature",
        folder: "MJC-5-Eng",
        units: [
            { title: "Unit 1: Drama", topics: [{ code: "1.1", name: "Tennessee Williams: The Glass Menagerie" }] },
            { title: "Unit 2: Fiction", topics: [{ code: "2.1", name: "Toni Morrison: Beloved" }] },
            { title: "Unit 3: Short Stories & Prose", topics: [
                { code: "3.1", name: "Edgar Allan Poe: The Purloined Letter" },
                { code: "3.2", name: "O. Henry: The Last Leaf" },
                { code: "3.3", name: "F. Scott Fitzgerald: The Crack-Up" },
                { code: "3.4", name: "William Faulkner: Dry September" }
            ]},
            { title: "Unit 4: Poetry", topics: [
                { code: "4.1", name: "Anne Bradstreet: The Prologue" },
                { code: "4.2", name: "Walt Whitman: O Captain! My Captain!" },
                { code: "4.3", name: "Sherman Alexie: Crow Testament" },
                { code: "4.4", name: "Robert Frost: The Road Not Taken" }
            ]}
        ]
    },
    "MJC-6-Eng": {
        name: "Language and Linguistics",
        folder: "MJC-6-Eng",
        units: [
            { title: "Unit 1: Core Concepts", topics: [
                { code: "1.1", name: "Introduction to Language & Linguistics" },
                { code: "1.2", name: "Language Varieties (Dialect, Register)" },
                { code: "1.3", name: "Linguistic Dichotomies (Langue & Parole)" }
            ]},
            { title: "Unit 2: Phonetics & Phonology", topics: [
                { code: "2.1", name: "Organs of Speech Sound Classification" },
                { code: "2.2", name: "Prosody & Syllable Structure (Word Stress)" }
            ]},
            { title: "Unit 3: Morphology", topics: [
                { code: "3.1", name: "Morphs, Morphemes & Allomorphs Matrix" },
                { code: "3.2", name: "Word Construction & Affixes Systems" }
            ]},
            { title: "Unit 4: Oral Drills & Practices", topics: [{ code: "4.1", name: "Applied Phonetics & IPA Transcription Practice" }] }
        ]
    },
    "MJC-7-Eng": {
        name: "British Poetry and Drama : 17th Century",
        folder: "MJC-7-Eng",
        units: [
            { title: "Unit 1: Epic Poetry", topics: [{ code: "1.1", name: "John Milton: Paradise Lost (Book 1)" }] },
            { title: "Unit 2: Metaphysical Poetry", topics: [{ code: "2.1", name: "John Donne: Poems Series" }] },
            { title: "Unit 3: Jacobean Comedy", topics: [{ code: "3.1", name: "Ben Jonson: The Alchemist" }] },
            { title: "Unit 4: Jacobean Tragedy", topics: [{ code: "4.1", name: "Thomas Middleton: Women Beware Women" }] }
        ]
    },
    "MIC-4_Urdu": {
        name: "Study of Urdu Ghazal",
        folder: "MIC-4-Urdu",
        units: [
            { title: "Unit 1: Tareef-o-Tareekh", topics: [
                { code: "1.1", name: "Urdu Ghazal ki Tareef aur Haisiyat" },
                { code: "1.2", name: "Dabistan-e-Delhi aur Lucknow ki Ghazal-goi" }
            ]},
            { title: "Unit 2: Wali & Mir", topics: [
                { code: "2.1", name: "Wali Deccani: Muflisi sab bahar khoti hai" },
                { code: "2.2", name: "Mir Taqi Mir: Nazuki us kay lab ki kya kahiye" }
            ]},
            { title: "Unit 3: Atish & Shad", topics: [
                { code: "3.1", name: "Khwaja Haider Ali Atish: Sun to sahi jahan men" },
                { code: "3.2", name: "Shad Azimabadi: Ab bhi ek umr pe jeene ka" }
            ]}
        ]
    },
    "AEC-4": {
        name: "Social Service / Scout & Guide / Sports",
        folder: "AEC-4",
        units: [
            { title: "Unit 1: NCC General", topics: [{ code: "1.1", name: "Introduction to NCC: Aims & Organization" }] },
            { title: "Unit 2: National Integration", topics: [{ code: "2.1", name: "Concept of Unity & Threats to National Security" }] },
            { title: "Unit 3: Personality Development", topics: [{ code: "3.1", name: "Personal Traits, Empathy & Creative Thinking" }] },
            { title: "Unit 4: Social Service", topics: [{ code: "4.1", name: "Basics of Social Service, NGOs & Youth Role" }] },
            { title: "Practical Component", topics: [
                { code: "P.1", name: "Military Training (Drill, Map Reading, Weapon Training)" },
                { code: "P.2", name: "Social Activity & Field Craft Exercise Packs" }
            ]}
        ]
    }
};

// --- STORAGE SYSTEM ---
let syllabusTracker = JSON.parse(localStorage.getItem('syllabusTracker')) || {};

// --- MOBILE SIDEBAR DRAWER CONTROLLER ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        if (window.innerWidth < 768) overlay.style.display = 'block';
    } else {
        sidebar.classList.add('collapsed');
        overlay.style.display = 'none';
    }
}

// --- AUTOMATED DARK MODE MANAGEMENT ---
function toggleTheme() {
    const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', active);
    localStorage.setItem('theme', active);
}
if(localStorage.getItem('theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

// --- MOBILE VIEW ROUTER CONTROL ---
function navigateTo(target) {
    document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
    const targetEl = document.getElementById(`nav-${target}`);
    if (targetEl) targetEl.classList.add('active');

    document.querySelectorAll('.content-view').forEach(view => view.classList.add('hidden'));
    document.getElementById(`view-${target}`).classList.remove('hidden');

    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.add('collapsed');
        document.getElementById('sidebar-overlay').style.display = 'none';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (target === 'dashboard') renderDashboard();
    else if (target === 'syllabus') renderSyllabusPage();
    else if (target === 'notes') renderNotesPage();
    else if (target === 'slides') renderSlidesSubjectLanding();
}

// --- 1. CORE DASHBOARD ENGINE ---
function renderDashboard() {
    const trackerContainer = document.getElementById('dashboard-tracker-list');
    trackerContainer.innerHTML = '';

    let totalTopics = 0;
    let completedTopics = 0;

    Object.keys(academicDatabase).forEach(subCode => {
        const subjectBox = document.createElement('div');
        subjectBox.style.marginBottom = '1.25rem';
        subjectBox.innerHTML = `<h3 style="font-size:1rem; border-bottom: 2px solid var(--border); padding-bottom: 0.3rem; margin-bottom: 0.5rem; color:var(--accent);">${subCode.replace('_', '-')}</h3>`;

        academicDatabase[subCode].units.forEach(unit => {
            unit.topics.forEach(topic => {
                totalTopics++;
                const key = `${subCode}_${topic.code}`;
                const isChecked = syllabusTracker[key] || false;
                if (isChecked) completedTopics++;

                const row = document.createElement('div');
                row.className = `tracker-item ${isChecked ? 'checked' : ''}`;
                row.onclick = () => toggleTrackItem(key);
                row.innerHTML = `
                    <span><strong>${topic.code}</strong> ${topic.name}</span>
                    <input type="checkbox" ${isChecked ? 'checked' : ''} style="width:20px; height:20px; pointer-events:none;">
                `;
                subjectBox.appendChild(row);
            });
        });
        trackerContainer.appendChild(subjectBox);
    });

    const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    document.getElementById('stats-syllabus-percent').innerText = `${percent}%`;
    document.getElementById('syllabus-progress-bar').style.width = `${percent}%`;
    document.getElementById('stats-decks-total').innerText = `${completedTopics} / ${totalTopics}`;
}

function toggleTrackItem(key) {
    syllabusTracker[key] = !syllabusTracker[key];
    localStorage.setItem('syllabusTracker', JSON.stringify(syllabusTracker));
    renderDashboard();
}

// --- 2. VAULT SYLLABUS CONTROLLER (GitHub Matching Strategy) ---
function renderSyllabusPage() {
    const container = document.getElementById('syllabus-cards-container');
    container.innerHTML = '';

    Object.keys(academicDatabase).forEach(code => {
        // Generates file names matching the screenshot exactly
        let fileName = `${code}_Syllabus.pdf`;
        if(code === "MJC-7-Eng") fileName = "MJC-7-Eng_Syllabys.pdf"; // Preserved spelling error from repo snapshot

        const card = document.createElement('div');
        card.className = 'subject-card';
        card.innerHTML = `
            <h3>${code.replace('_', '-')}</h3>
            <p style="color: var(--text-muted); font-size:0.85rem; margin: 0.2rem 0 1rem;">${academicDatabase[code].name}</p>
            <div class="btn-container">
                <a href="recourses/syllabus/${fileName}" target="_blank" class="btn-action">👁️ View</a>
                <a href="recourses/syllabus/${fileName}" download="${fileName}" class="btn-action btn-secondary">⬇️ Download</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- 3. ACADEMIC NOTES CONTROLLER ---
function renderNotesPage() {
    const container = document.getElementById('notes-cards-container');
    container.innerHTML = '';

    Object.keys(academicDatabase).forEach(code => {
        let fileName = `${code}_Notes.pdf`;
        if(code === "MIC-4_Urdu") fileName = "MIC-4-Urdu_Notes.pdf";

        const card = document.createElement('div');
        card.className = 'subject-card';
        card.style.borderColor = "#10b981";
        card.innerHTML = `
            <h3>${code.replace('_', '-')}</h3>
            <p style="color: var(--text-muted); font-size:0.85rem; margin: 0.2rem 0 1rem;">${academicDatabase[code].name}</p>
            <div class="btn-container">
                <a href="recourses/notes/${fileName}" target="_blank" class="btn-action" style="background:#10b981">📖 Open Notes</a>
                <a href="recourses/notes/${fileName}" download="${fileName}" class="btn-action btn-secondary">⬇/PDF</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- 4. REVISION SLIDES DRAWER ---
function renderSlidesSubjectLanding() {
    document.getElementById('slides-title').innerText = "Revision Slide Decks 🖼️";
    document.getElementById('slides-subtitle').innerText = "Select subject folder to open slides.";

    const container = document.getElementById('slides-container');
    container.innerHTML = `<div class="grid-cards"></div>`;
    const grid = container.querySelector('.grid-cards');

    Object.keys(academicDatabase).forEach(code => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <h3>${code.replace('_', '-')}</h3>
            <p style="color:var(--text-muted); font-size:0.85rem; margin-top:0.3rem;">${academicDatabase[code].name}</p>
            <div style="font-size:0.8rem; margin-top:0.8rem; color:var(--accent); font-weight:600;">Open Folder →</div>
        `;
        card.onclick = () => renderSlideTopicsList(code);
        grid.appendChild(card);
    });
}

function renderSlideTopicsList(subCode) {
    const targetFolder = academicDatabase[subCode].folder;
    document.getElementById('slides-title').innerText = `${subCode.replace('_', '-')} Slides`;
    
    const container = document.getElementById('slides-container');
    container.innerHTML = `<button class="btn-action btn-secondary" onclick="renderSlidesSubjectLanding()" style="margin-bottom: 1.25rem; flex:none; width:auto; padding:0.6rem 1rem;">← Back</button>`;

    academicDatabase[subCode].units.forEach(unit => {
        const box = document.createElement('div');
        box.className = 'card';
        box.innerHTML = `<h3 style="margin-bottom:0.75rem; border-bottom:1px solid var(--border); padding-bottom:0.4rem; font-size:1.05rem;">${unit.title}</h3>`;

        unit.topics.forEach(topic => {
            const slideFilePath = `recourses/slides/${targetFolder}/${topic.code}.pdf`;

            const row = document.createElement('div');
            row.className = 'tracker-item';
            row.style.padding = '0.6rem 0';
            row.innerHTML = `
                <span style="font-size:0.85rem;"><strong>File: ${topic.code}.pdf</strong><br><span style="color:var(--text-muted);">${topic.name}</span></span>
                <a href="${slideFilePath}" target="_blank" class="btn-action" style="flex:none; width:80px; padding:0.4rem 0.5rem; font-size:0.75rem;">🖼️ Open</a>
            `;
            box.appendChild(row);
        });
        container.appendChild(box);
    });
}

// --- 5. WORKSPACE ZIP PACK EXPORTER ---
function downloadMasterZip() {
    alert("Compiling structural system package layout templates...");
    const zip = new JSZip();
    Object.keys(academicDatabase).forEach(code => {
        const folder = zip.folder(code);
        folder.file("Structure_Details.txt", `Syllabus tracking structure for: ${code}`);
    });
    zip.generateAsync({type:"blob"}).then(function(content) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = "ZenStudy_Workspace.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('dashboard');
});
