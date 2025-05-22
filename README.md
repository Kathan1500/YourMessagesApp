*Exercise 2 – CS5450 Mobile Programming*

**React Native Messages Directory App**
---

### 📱 Overview

A fully functional and aesthetic mobile app developed using **React Native with Expo**. This project serves as **Exercise 2** for the CS5450 Mobile Programming course, demonstrating a categorized message management system.

The app features:

* A grid of circular category buttons (e.g., Personal, Work, School, etc.)
* Unique preloaded messages per category
* Full CRUD (Create, Read, Update, Delete) for message management
* A modal-based interface for adding messages and directories
* All logic implemented in a **single App.js file**

---

### ✅ Key Features

1. **Home Screen (Category Grid)**

   * Circular UI cards with emojis and background colors
   * 8 pre-defined categories with different messages
   * Dynamic addition of new categories

2. **Message View & Edit**

   * View messages under each selected directory
   * Edit or delete individual messages
   * Add new messages using a modal input form

3. **Add Category Feature**

   * Dedicated button to add a new directory
   * Prevents blank entries
   * Appends to existing directory list with a new ID

4. **Responsive UI Design**

   * ScrollView layout for directories and messages
   * Bottom-aligned Add Category button
   * Light theme with visually clean layout

---

### 📁 Project Structure

```
YourMessagesApp/
├── App.js                 # Entire app in one file
├── package.json           # Expo project metadata
├── node_modules/          # Auto-generated dependencies
├── assets/                # Optional: for emojis/images
└── README_MessagesApp.txt # This file
```

---

### 🛠 Setup Instructions

**Prerequisites:**

* Node.js
* Expo CLI (`npm install -g expo-cli`)

**Steps to Run:**

```bash
# 1. Navigate to project directory
cd YourMessagesApp

# 2. Start the app
npx expo start --localhost
```

**Test:**

* Scan QR using Expo Go app on your mobile
* Or press `a` in terminal to open in Android emulator

---

### 💡 Implementation Highlights

* **Modal Forms**: Used for adding/editing messages and creating categories
* **State Management**: React `useState` for storing messages and category data
* **StyleSheet**: Custom visual style for each component
* **Dynamic UI**: Loop-rendered components using `.map()` and `FlatList`

---



### 👨‍💻 Author

* **Student:** Kathan Suthar
* **Course:** CS5450 Mobile Programming
* **Instructor:** Dr. Sabah Mohammed
* **Submission Date:** 21 May
