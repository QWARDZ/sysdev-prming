# 📖 User Guide - Clinic Management System

Step-by-step guide for **Patients**, **Staff**, and **Admins**.

---

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Patient Guide](#-patient-guide)
- [Staff Guide](#-staff-guide)
- [Admin Guide](#-admin-guide)
- [Tips & Best Practices](#-tips--best-practices)
- [FAQ](#-faq)

---

## 🚀 Getting Started

### Running the App

**Windows:**
```bash
python clinic.py
```

**Linux/Mac:**
```bash
python3 clinic.py
```

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Patient | patient@clinic.com | patient123 |
| Staff | staff@clinic.com | staff123 |
| Admin | admin@clinic.com | admin123 |

---

## 👤 Patient Guide

### 1. Login

```
=== LOGIN ===
Email: patient@clinic.com
Password: patient123
```

### 2. Book Appointment

```
=== PATIENT: John Patient ===
1. Book  2. View  3. Cancel  4. Logout
Option: 1

=== BOOK ===
1. Dr. Johnson
2. Dr. Chen
3. Dr. Rodriguez
Doctor (1-3): 1
Date (YYYY-MM-DD): 2025-10-15
Time (HH:MM): 10:30
Booked! ID: APT-1
```

**Date Format:** YYYY-MM-DD (Example: 2025-10-15)  
**Time Format:** HH:MM (Example: 10:30 or 14:00)

### 3. View My Appointments

```
Option: 2

=== MY APPOINTMENTS ===
[1] APT-1 - Dr. Johnson - 2025-10-15 10:30 - upcoming
```

### 4. Cancel Appointment

```
Option: 3

=== CANCEL ===
[1] APT-1 - 2025-10-15 10:30
Number (0=back): 1
Cancelled!
```

### 5. Logout

```
Option: 4
```

---

## 👨‍⚕️ Staff Guide

### 1. Login

```
=== LOGIN ===
Email: staff@clinic.com
Password: staff123
```

### 2. View All Appointments

```
=== STAFF: Sarah Staff ===
1. View All  2. Update Status  3. Logout
Option: 1

=== ALL APPOINTMENTS ===
[1] APT-1 - John Patient - Dr. Johnson - 2025-10-15 10:30 - upcoming
[2] APT-2 - Jane Doe - Dr. Chen - 2025-10-16 14:00 - upcoming
```

### 3. Update Appointment Status

```
Option: 2

=== UPDATE STATUS ===
[1] APT-1 - upcoming
[2] APT-2 - upcoming
Appointment # (0=back): 1

1. upcoming  2. completed  3. cancelled
New status (1-3): 2
Updated!
```

**Status Options:**
- **upcoming** - Appointment scheduled
- **completed** - Appointment finished
- **cancelled** - Appointment cancelled

---

## 👨‍💼 Admin Guide

### 1. Login

```
=== LOGIN ===
Email: admin@clinic.com
Password: admin123
```

### 2. View All Users

```
=== ADMIN: Alex Admin ===
1. All Users  2. Add Staff  3. Stats  4. Logout
Option: 1

=== ALL USERS ===
[1] John Patient - patient@clinic.com - patient
[2] Sarah Staff - staff@clinic.com - staff
[3] Alex Admin - admin@clinic.com - admin
```

### 3. Add Staff Account

```
Option: 2

=== ADD STAFF ===
Name: Mike Support
Email: mike@clinic.com
Password: mike123
Staff added!
```

### 4. View Statistics

```
Option: 3

=== STATISTICS ===
Users: 4
Patients: 2
Staff: 2
Appointments: 5
Upcoming: 3
Completed: 2
```

---

## 💡 Tips & Best Practices

### Date & Time Format

✅ **Correct:**
- Date: `2025-10-15` or `2025-12-31`
- Time: `10:30` or `14:00`

❌ **Incorrect:**
- Date: `10/15/2025` or `15-10-2025`
- Time: `10:30 AM` or `2:30 PM`

### Menu Navigation

- **Always read the options** before typing
- **Type the number** and press Enter
- **Use 0** to go back (when available)
- **Use Logout** to return to main menu

### Best Practices

1. **Patients**: Book appointments in advance
2. **Staff**: Update appointment status after each visit
3. **Admin**: Regularly check statistics
4. **All**: Logout after finishing your session

---

## ❓ FAQ

### How do I register as a new patient?

```
=== CLINIC SYSTEM ===
1. Login  2. Register  3. Exit
Option: 2

=== REGISTER ===
Name: Your Name
Email: yourname@example.com
Password: yourpassword
Registered!
```

### Can I edit an appointment?

No, but you can **cancel** and **rebook** a new one.

### Can I change my password?

Not in this version. For learning purposes, passwords are simple.

### What if I forget my password?

Use the demo accounts or check the `users.json` file.

### Can staff and admin book appointments?

No, only **Patient** role can book appointments for themselves.

### Can I add admin accounts?

Not through the app. You can manually edit `users.json` and set `"role": "admin"`.

### How do I delete an appointment?

Staff can mark it as **cancelled**. It stays in the system for record-keeping.

### Where is the data stored?

In two JSON files:
- `users.json` - All user accounts
- `appointments.json` - All appointments

### Can multiple people use this at the same time?

No, this is a single-user console app. For multi-user, you'd need a client-server architecture.

### How do I backup my data?

Copy `users.json` and `appointments.json` to a safe location.

### How do I reset everything?

Delete `users.json` and `appointments.json` then restart the app.

---

## 🛠️ Troubleshooting

### Problem: Can't login with demo account

**Solution:** Delete `users.json` and restart - it will recreate all demo accounts.

### Problem: Appointment not showing

**Solution:** Make sure you're logged in as the same patient who booked it.

### Problem: Changes not saving

**Solution:** Check file permissions in the directory.

---

## 🎯 Quick Reference Card

```
┌─────────────────────────────────────────────┐
│         CLINIC MANAGEMENT SYSTEM            │
├─────────────────────────────────────────────┤
│ PATIENT (patient@clinic.com/patient123)     │
│   1. Book appointments                      │
│   2. View my appointments                   │
│   3. Cancel appointments                    │
├─────────────────────────────────────────────┤
│ STAFF (staff@clinic.com/staff123)           │
│   1. View all appointments                  │
│   2. Update appointment status              │
├─────────────────────────────────────────────┤
│ ADMIN (admin@clinic.com/admin123)           │
│   1. View all users                         │
│   2. Add staff accounts                     │
│   3. View system statistics                 │
└─────────────────────────────────────────────┘
```

---

**Need more help?** Check **TECHNICAL_DOC.md** for code details.

**Happy Managing! 🏥**
