# 💻 Technical Documentation

Code explanation for the **Simple Clinic Management System** (243 lines).

---

## 📋 Table of Contents

- [Architecture](#-architecture)
- [Code Structure](#-code-structure)
- [Functions Reference](#-functions-reference)
- [Data Structures](#-data-structures)
- [Customization Guide](#-customization-guide)
- [Learning Exercises](#-learning-exercises)

---

## 🏗️ Architecture

### Design Pattern
- **Procedural Programming** - Simple functions, no classes
- **Role-Based Access Control (RBAC)** - 3 user roles
- **File-Based Storage** - JSON for persistence

### Data Flow
```
User Input → Function → Modify Data (in-memory) → Save to JSON → Confirmation
```

### File Structure
```
clinic.py (243 lines)
├── Imports & Setup (lines 1-25)
├── Utility Functions (lines 27-40)
├── Auth Functions (lines 42-73)
├── Patient Functions (lines 75-143)
├── Staff Functions (lines 145-185)
├── Admin Functions (lines 187-227)
└── Main Program (lines 229-243)
```

---

## 📦 Code Structure

### 1. Imports & Data Loading (Lines 1-25)

```python
import json
import os

USERS_FILE = 'users.json'
APPOINTMENTS_FILE = 'appointments.json'

def load_data(filename):
    return json.load(open(filename)) if os.path.exists(filename) else []

def save_data(filename, data):
    json.dump(data, open(filename, 'w'), indent=2)
```

**Key Concepts:**
- Compact file I/O
- Conditional file existence check
- Pretty-printed JSON with `indent=2`

### 2. Demo Data Initialization (Lines 16-23)

```python
if not users:
    users = [
        {'email': 'patient@clinic.com', 'password': 'patient123', 'name': 'John Patient', 'role': 'patient'},
        {'email': 'staff@clinic.com', 'password': 'staff123', 'name': 'Sarah Staff', 'role': 'staff'},
        {'email': 'admin@clinic.com', 'password': 'admin123', 'name': 'Alex Admin', 'role': 'admin'}
    ]
    save_data(USERS_FILE, users)
```

**Purpose:** Create 3 demo accounts if database is empty

---

## 🔧 Functions Reference

### Utility Functions

#### `clear()`
Clears console screen (cross-platform)

```python
def clear():
    os.system('cls' if os.name == 'nt' else 'clear')
```

#### `main_menu()`
Displays main menu and returns user choice

```python
def main_menu():
    clear()
    print("=" * 40)
    print("  CLINIC SYSTEM")
    print("=" * 40)
    print("\n1. Login  2. Register  3. Exit")
    return input("\nOption: ")
```

---

### Authentication Functions

#### `login()`
Authenticates user and sets global `current_user`

```python
def login():
    global current_user
    clear()
    print("=== LOGIN ===")
    email = input("Email: ")
    password = input("Password: ")
    for user in users:
        if user['email'] == email and user['password'] == password:
            current_user = user
            return True
    return False
```

**Returns:** `True` if successful, `False` otherwise

#### `register()`
Creates new patient account

```python
def register():
    clear()
    print("=== REGISTER ===")
    name = input("Name: ")
    email = input("Email: ")
    password = input("Password: ")
    if any(u['email'] == email for u in users):
        print("Email exists!")
    else:
        users.append({'email': email, 'password': password, 'name': name, 'role': 'patient'})
        save_data(USERS_FILE, users)
```

**Note:** Always creates **patient** role

---

### Patient Functions

#### `patient_menu()`
Main patient portal loop

```python
def patient_menu():
    global current_user
    while True:
        clear()
        print(f"=== PATIENT: {current_user['name']} ===")
        print("1. Book  2. View  3. Cancel  4. Logout")
        choice = input("Option: ")
        if choice == '1': book_appointment()
        elif choice == '2': view_my_appointments()
        elif choice == '3': cancel_appointment()
        elif choice == '4': current_user = None; break
```

#### `book_appointment()`
Creates new appointment

```python
def book_appointment():
    clear()
    doctors = ['Dr. Johnson', 'Dr. Chen', 'Dr. Rodriguez']
    # ... get user input ...
    apt = {
        'id': f'APT-{len(appointments)+1}',
        'patient': current_user['email'],
        'patient_name': current_user['name'],
        'doctor': doctors[int(doc)-1],
        'date': date,
        'time': time,
        'status': 'upcoming'
    }
    appointments.append(apt)
    save_data(APPOINTMENTS_FILE, appointments)
```

**ID Generation:** Simple increment (`APT-1`, `APT-2`, etc.)

#### `view_my_appointments()`
Shows only current user's appointments

```python
def view_my_appointments():
    my = [a for a in appointments if a['patient'] == current_user['email']]
    # ... display appointments ...
```

**Filtering:** List comprehension filters by email

#### `cancel_appointment()`
Changes appointment status to 'cancelled'

```python
def cancel_appointment():
    # ... show appointments ...
    for a in appointments:
        if a['id'] == apt_id: 
            a['status'] = 'cancelled'
```

**Note:** Doesn't delete, just changes status

---

### Staff Functions

#### `staff_menu()`
Staff portal loop

```python
def staff_menu():
    global current_user
    while True:
        print(f"=== STAFF: {current_user['name']} ===")
        print("1. View All  2. Update Status  3. Logout")
        # ... handle choices ...
```

#### `view_all_appointments()`
Shows all appointments in system

```python
def view_all_appointments():
    for i, a in enumerate(appointments, 1):
        print(f"[{i}] {a['id']} - {a['patient_name']} - {a['doctor']} - {a['date']} {a['time']} - {a['status']}")
```

#### `update_status()`
Changes appointment status

```python
def update_status():
    statuses = ['upcoming', 'completed', 'cancelled']
    # ... get user choice ...
    appointments[int(choice)-1]['status'] = statuses[int(s)-1]
    save_data(APPOINTMENTS_FILE, appointments)
```

---

### Admin Functions

#### `admin_menu()`
Admin portal loop

```python
def admin_menu():
    print("1. All Users  2. Add Staff  3. Stats  4. Logout")
```

#### `view_all_users()`
Lists all users with roles

```python
def view_all_users():
    for i, u in enumerate(users, 1):
        print(f"[{i}] {u['name']} - {u['email']} - {u.get('role', 'patient')}")
```

#### `add_staff()`
Creates new staff account

```python
def add_staff():
    users.append({'email': email, 'password': password, 'name': name, 'role': 'staff'})
    save_data(USERS_FILE, users)
```

#### `show_stats()`
Displays system statistics

```python
def show_stats():
    print(f"Users: {len(users)}")
    print(f"Patients: {len([u for u in users if u.get('role')=='patient'])}")
    print(f"Appointments: {len(appointments)}")
```

---

## 📊 Data Structures

### User Object

```python
{
    "email": "user@example.com",      # Unique identifier
    "password": "password123",         # Plain text (not secure!)
    "name": "User Name",               # Display name
    "role": "patient"                  # patient | staff | admin
}
```

### Appointment Object

```python
{
    "id": "APT-1",                     # Unique ID
    "patient": "user@example.com",     # Patient email (FK)
    "patient_name": "User Name",       # For display
    "doctor": "Dr. Johnson",           # Selected doctor
    "date": "2025-10-15",              # YYYY-MM-DD
    "time": "10:30",                   # HH:MM
    "status": "upcoming"               # upcoming | completed | cancelled
}
```

---

## 🔧 Customization Guide

### Add More Doctors

**Location:** `book_appointment()` function

```python
doctors = [
    'Dr. Johnson', 
    'Dr. Chen', 
    'Dr. Rodriguez',
    'Dr. New Doctor',      # Add here
]
```

**Also update:** Doctor selection validation from (1-3) to (1-4)

### Add Email Validation

```python
import re

def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

# In register():
if not is_valid_email(email):
    print("Invalid email format!")
    return
```

### Add Password Hashing

```python
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# In login:
if user['password'] == hash_password(password):
    # Success

# In register:
'password': hash_password(password)
```

### Add Date Validation

```python
from datetime import datetime

def is_valid_date(date_str):
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except:
        return False
```

### Add More Appointment Statuses

```python
statuses = ['upcoming', 'completed', 'cancelled', 'no-show', 'rescheduled']
```

---

## 🎓 Learning Exercises

### Beginner
1. Change the color scheme (add ANSI colors)
2. Add more doctors
3. Modify welcome messages

### Intermediate
1. Add date validation
2. Add appointment search by patient name
3. Add "View Today's Appointments" for staff
4. Add appointment statistics per doctor

### Advanced
1. Implement password hashing
2. Add SQLite database instead of JSON
3. Add appointment edit feature
4. Implement email notifications
5. Add appointment time conflict detection
6. Create a GUI with Tkinter

---

## 🐛 Common Issues

### Issue: KeyError when accessing user data

**Problem:**
```python
print(current_user['name'])  # KeyError if None
```

**Solution:**
```python
if current_user:
    print(current_user['name'])
```

### Issue: Duplicate appointment IDs

**Current:**
```python
'id': f'APT-{len(appointments)+1}'
```

**Better:**
```python
import uuid
'id': str(uuid.uuid4())[:8]  # Unique ID
```

### Issue: Data not saving

**Check:**
1. `save_data()` is called after modifications
2. File permissions in directory
3. Files not open in another program

---

## 📈 Python Concepts Used

- ✅ **Functions** - Code organization
- ✅ **Lists & Dictionaries** - Data storage
- ✅ **List Comprehensions** - Filtering data
- ✅ **File I/O** - JSON operations
- ✅ **Loops** - for, while
- ✅ **Conditionals** - if/elif/else
- ✅ **String Formatting** - f-strings
- ✅ **Error Handling** - try/except
- ✅ **Global Variables** - State management
- ✅ **Boolean Logic** - Authentication
- ✅ **Enumerate** - Index tracking

---

## 🚀 Performance Notes

- **Time Complexity:** O(n) for most operations (linear search)
- **Space Complexity:** O(n) - all data in memory
- **Scalability:** Good for < 1000 users/appointments
- **For larger scale:** Use database with indexing

---

## 📚 Further Reading

- [Python JSON Module](https://docs.python.org/3/library/json.html)
- [Python File I/O](https://docs.python.org/3/tutorial/inputoutput.html)
- [List Comprehensions](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions)
- [Password Hashing (hashlib)](https://docs.python.org/3/library/hashlib.html)

---

**Happy Coding! 💻**

Built with ❤️ for learning Python
