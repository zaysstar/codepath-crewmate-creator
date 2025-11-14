# 🚀 Crewmate Creator

Welcome to **Crewmate Creator** — a full-stack React web application built with **Vite** and **Firebase**. Build, customize, and manage your own team of crewmates with unique names, speeds, colors, and genders.

This project demonstrates full **CRUD** operations, **React Router** navigation, and dynamic component-based styling.

---

## 🎬 Live Demo

![Screen_Recording_2025_11_14_014651_V1](https://github.com/user-attachments/assets/2fa51ac9-883b-42bb-98bf-a6916469a739)


---

## ✨ Features

### 🟢 Create Crewmates
- Centered form for adding new crewmates.
- Set a **custom name**.
- Assign a **speed value**.
- Choose from **22 unique colors** via dropdown.
- Choose from **3 gender options** (with symbols).

### 🔵 Read (Gallery)
- Responsive gallery page showing all crewmates.
- Each card includes:
  - Name
  - Speed
  - Color
  - Gender  
- Circular preview image on the right side of each card.

### 🟣 Read (Details)
- Click any crewmate to view a full-page detailed profile.
- Displays a large crewmate image.

### 🟠 Update
- Full “Edit” page to modify any crewmate data.

### 🔴 Delete
- Delete a crewmate from the database directly from the Edit page.

### 🌌 Dynamic Styling
- Persistent sidebar for navigation.
- Animated GIF “space” background.
- Semi-transparent floating content boxes.
- Dynamic image mapping:  
  Maps color names (e.g., `"Sky Blue"`) → image files (e.g., `/images/skyblue.png`).

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Firebase Firestore
- **Routing:** React Router v6
- **Styling:** CSS

---

## 🔌 Getting Started

Follow these steps to run the project locally.

---

## 1. Prerequisites

Make sure you have:

- Node.js **v18+**
- npm (or yarn)

---

## 2. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## 3. Install Dependencies
```bash
npm install
```

## 4. Set Up Firebase (CRITICAL)
## This app will NOT run without proper Firebase setup.

### Create a Firebase Project
Go to the Firebase Console.

Click Add Project → follow the setup steps.

Disable Google Analytics if you want.

### Create Firestore Database
Go to Build → Firestore Database.

Click Create database.

Choose Test mode.

Pick a server location like us-central.

### Update Security Rules
Test mode expires in 30 days, so set permanent dev-mode rules:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Click Publish.

## 5. Get Your Config Keys
Go to Project Settings (gear icon).

In Your Apps, click the Web App (</>) icon.

Register a name for the app.

Copy the generated firebaseConfig.

Create firebaseConfig.js
Inside src/:

js
Copy code
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd..."
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
6. Add Crewmate Images
Your app expects the images to live in:

swift
Copy code
public/images/
Add all 22 crewmate color images, lowercase filenames:

swift
Copy code
public/images/red.png
public/images/blue.png
public/images/skyblue.png
public/images/fortegreen.png
...
Also include:

swift
Copy code
public/images/default.png
This acts as a fallback.

7. Run the App
You're all set!

bash
Copy code
npm run dev
Then open:

arduino
Copy code
http://localhost:5173
Enjoy creating your squad of space explorers! 🚀👨‍🚀👩‍🚀

vbnet
Copy code

Let me know if you want this turned into a README with badges, installation blocks, tables, or anything more polished!
