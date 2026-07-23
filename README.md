# 📚 Study Workspace — Developer Guide & Setup Manual

> **Modular, Serverless & PWA-Enabled Academic Dashboard**  
> Direct PDF previews via **Google Docs Viewer Wrapped URLs** and file delivery powered by **GitHub Release Assets**[cite: 3].

---

## 📌 Executive Summary

Yeh application ek lightweight, zero-backend study workspace hai. Fast rendering aur easy file management ke liye, yeh app **GitHub Release Tags** ko aaz a file database use karti hai[cite: 3]. 

Complex backend setup karne ke bajaye, saari files (`Syllabus`, `Notes`, aur `Slides`) ek strict **File Naming Convention** ke throw dynamic JavaScript URLs dwara auto-route aur preview hoti hain[cite: 3].

---

## 🛠️ 1. Directory & Folder Structure

```text
study-workspace/
├── index.html        # Main Application Viewport & UI Structure
├── style.css        # Responsive Layout & Dark/Light Theme Styles
├── app.js           # Core Routing Logic, Academic Database & URL Engine
├── manifest.json    # Progressive Web App (PWA) Manifest Configuration
├── sw.js            # Service Worker (Offline Support & Static Caching)
└── icons/           # Mobile App Installation Icons
    ├── icon-192.png
    └── icon-512.png

```

---

## 🧠 2. Core Architecture & Naming Rules

Application me teen distinct sections hain: **Syllabus Vault**, **PDF Notes Center**, aur **Revision Slides**. Teeno sections ek hi GitHub Release Tag se files fetch karte hain, lekin unka selection **File Name** par depend karta hai.

### 🔹 File Naming Standard

| Section | Target File Naming Pattern | Example File Name | Output Action |
| --- | --- | --- | --- |
| **Syllabus** | `[SubjectCode]_Syllabus.pdf`<br> | `MJC-5-Eng_Syllabus.pdf`<br> | Rendered in **Syllabus Vault**<br> |
| **Notes** | `[SubjectCode]_Notes.pdf`<br> | `MJC-5-Eng_Notes.pdf`<br> | Rendered in **PDF Notes Center**<br> |
| **Slides** | `[TopicCode].pdf`<br> | `1.1.pdf`, `1.1.1.pdf`

 | Rendered in **Revision Slides** Folder

 |

> ⚠️ **Important Note:** Upload karte waqt File Names exact hone chahiye. System Capitalization/Spelling base par hi files map karta hai.
> 
> 

---

## 🏷️ 3. Existing Subjects & Release Tag Mapping

Har subject ka ek unique **Release Tag** GitHub Releases par bana hota hai:

| Subject Code | Subject Title | GitHub Tag Name (`tag`) |
| --- | --- | --- |
| `MJC-5-Eng`<br> | American Literature | `mjc-5-english`<br> |
| `MJC-6-Eng`<br> | Language and Linguistics | `mjc-6-english`<br> |
| `MJC-7-Eng`<br> | British Poetry and Drama : 17th Century | `mjc-7-english`<br> |
| `MIC-4-Urdu`<br> | Study of Urdu Ghazal | `mic-4-urdu`<br> |
| `MIC-4-Hindi`<br> | आधुनिक हिन्दी कविता : छायावाद के बाद | `mic-4-hindi`<br> |
| `AEC-4`<br> | Social Service / Scout & Guide / Sports | `aec-4`<br> |

---

## 🚀 4. Workflow: Future Subject Ya Updates Kaise Karein?

Maan lo aapko future me ek naya subject **Economics (`MJC-5-Eco`)** add karna hai, ya kisi existing subject me naya topic/slide PDF add karna hai.

### 🔹 Scenario A: Naya Subject Add Karna (`MJC-5-Eco`)

#### Step 1: GitHub Release Create Karo

1. Apni GitHub Repository ke **Releases** section me jao.
2. Draft a new release me jao aur Tag Name rakho: **`mjc-5-eco`**.


3. Us Release Tag ke andar apni saari PDFs ek sath upload kar do:
* 📄 `MJC-5-Eco_Syllabus.pdf`

* 📄 `MJC-5-Eco_Notes.pdf`

* 📄 `1.1.pdf`, `1.2.pdf`, `2.1.pdf` *(Slide topics ke PDF codes)*



4. **Publish Release** par click kar do.

#### Step 2: `app.js` me Data Structure Add Karo

`app.js` ki `academicDatabase` object me naya key-value pair paste karo:

```javascript
    "MJC-5-Eco": {
        name: "Microeconomics",
        tag: "mjc-5-eco",
        units: [
            {
                title: "Unit 1: Basic Economic Concepts",
                topics: [
                    { code: "1.1", name: "Demand and Supply Laws" },
                    { code: "1.2", name: "Elasticity of Demand" }
                ]
            },
            {
                title: "Unit 2: Consumer Behavior",
                topics: [
                    { code: "2.1", name: "Indifference Curve Analysis" }
                ]
            }
        ]
    },

```

---

### 🔹 Scenario B: Existing Subject me Nayi Slide File Add Karna

1. GitHub par jaakar wahi **Existing Tag** open karo (e.g., `mic-4-hindi`).


2. Nayi PDF file upload kar do, jaise `1.2.4.pdf`.


3. `app.js` me corresponding subject unit ke under line append kar do:
```javascript
{ code: "1.2.4", name: "Topic ka Name" }

```



---

## ⚙️ 5. Technical How-It-Works (Behind the Scenes)

1. **Google Docs Viewer Integration:**
App direct download URL ko transform karke viewer format me convert karti hai:


```javascript
function getGithubPdfViewerUrl(tag, filename) {
    const rawUrl = `[https://github.com/USER/REPO/releases/download/$](https://github.com/USER/REPO/releases/download/$){tag}/${filename}`;
    return `[https://docs.google.com/gview?embedded=true&url=$](https://docs.google.com/gview?embedded=true&url=$){encodeURIComponent(rawUrl)}`;
}

```


2. **PWA & Offline Worker:**
`manifest.json` browser ko trigger karta hai home screen installation ke liye, aur `sw.js` app shell assets (`index.html`, `style.css`, `app.js`) ko cache karke instantaneous launch deta hai.

---

## 🔍 6. Troubleshooting & FAQs

* **Q: "View / Read" button click karne par 404 Error de raha hai?**
* **Solution:** Check karein ki GitHub Release public hai ya nahi. File name exact casing me hai ya nahi (e.g., `MJC-5-Eng_Syllabus.pdf` vs `mjc-5-eng_syllabus.pdf`).




* **Q: Kya Syllabus aur Notes ke liye alag Release Tags chahiye?**
* **Solution:** Nahi, ek subject ke saare assets (`Syllabus`, `Notes`, `Slides`) **ek hi Single Release Tag** me upload hote hain.


