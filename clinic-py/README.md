# 🏥 Simple Clinic Management System

A minimal clinic management system with **3 user roles** (Patient, Staff, Admin) in just **243 lines of Python**.

Perfect for learning: file handling, user roles, data structures, and console applications.

---

## 📋 Table of Contents

- [Features](#-features)
- [User Roles](#-user-roles)
- [Demo Accounts](#-demo-accounts)
- [File Structure](#-file-structure)
- [Documentation](#-documentation)

---

## ✨ Features

- 👥 **3 User Roles**: Patient, Staff, Admin
- 📅 Book, view, and cancel appointments
- 👤 User registration and login
- 🏥 Staff can manage all appointments
- 👨‍💼 Admin can manage users and view statistics
- 💾 JSON file storage (no database needed)
- 🎨 Clean, compact console interface
- ⚡ Simple and fast (243 lines total)

---

## 👥 User Roles

### 👤 **Patient**
- ✅ Book appointments with doctors
- ✅ View my appointments
- ✅ Cancel my appointments
- ✅ Register new account

### 👨‍⚕️ **Staff**
- ✅ View all appointments
- ✅ Update appointment status (upcoming/completed/cancelled)
- ✅ Monitor clinic schedule

### 👨‍💼 **Admin**
- ✅ View all users in the system
- ✅ Add new staff accounts
- ✅ View system statistics
- ✅ Full system oversight


---

## 🔑 Demo Accounts

Try all **3 roles** to see different features!

| Role | Email | Password |
|------|-------|----------|
| 👤 **Patient** | patient@clinic.com | patient123 |
| 👨‍⚕️ **Staff** | staff@clinic.com | staff123 |
| 👨‍💼 **Admin** | admin@clinic.com | admin123 |

---

## 📁 File Structure

```
simple-clinic-app/
├── clinic.py              # Main application (243 lines)
├── users.json             # User database (auto-created)
├── appointments.json      # Appointments database (auto-created)
├── README.md              # This file
├── USER_GUIDE.md          # Detailed user instructions
├── TECHNICAL_DOC.md       # Code documentation
├── run.bat                # Windows launcher
└── run.sh                 # Linux/Mac launcher
```

---

## 👨‍⚕️ Available Doctors

1. **Dr. Johnson**
2. **Dr. Chen**
3. **Dr. Rodriguez**

---

## 🎯 Quick Start

1. **Run the app**: `python clinic.py`
2. **Login as Patient**: Try booking appointments
3. **Login as Staff**: Try managing appointments
4. **Login as Admin**: View statistics and manage users

---


## 📊 Quick Stats

- **Total Lines**: 243
- **Functions**: 15
- **User Roles**: 3 (Patient, Staff, Admin)
- **Features**: Book, View, Cancel, Manage, Statistics
- **Dependencies**: 0 (standard library only)
- **Difficulty**: Beginner-friendly

---

## 📚 Documentation

- **README.md** - Overview and quick start (this file)
- **USER_GUIDE.md** - Step-by-step user instructions for each role
- **TECHNICAL_DOC.md** - Code explanation and customization guide

