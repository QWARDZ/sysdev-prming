import json
import os

USERS_FILE = 'users.json'
APPOINTMENTS_FILE = 'appointments.json'

def load_data(filename):
    return json.load(open(filename)) if os.path.exists(filename) else []

def save_data(filename, data):
    json.dump(data, open(filename, 'w'), indent=2)

users = load_data(USERS_FILE)
appointments = load_data(APPOINTMENTS_FILE)

if not users:
    users = [
        {'email': 'patient@clinic.com', 'password': 'patient123', 'name': 'John Patient', 'role': 'patient'},
        {'email': 'staff@clinic.com', 'password': 'staff123', 'name': 'Sarah Staff', 'role': 'staff'},
        {'email': 'admin@clinic.com', 'password': 'admin123', 'name': 'Alex Admin', 'role': 'admin'}
    ]
    save_data(USERS_FILE, users)

current_user = None

def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

def main_menu():
    clear()
    print("=" * 40)
    print("  CLINIC SYSTEM")
    print("=" * 40)
    print("\n1. Login  2. Register  3. Exit")
    print("\nDemo: patient@clinic.com/patient123")
    print("      staff@clinic.com/staff123")
    print("      admin@clinic.com/admin123")
    return input("\nOption: ")

# Login
def login():
    global current_user
    clear()
    print("=== LOGIN ===")
    email = input("Email: ")
    password = input("Password: ")
    for user in users:
        if user['email'] == email and user['password'] == password:
            current_user = user
            print(f"\nWelcome {user['name']}!")
            input("Press Enter...")
            return True
    print("Invalid credentials!")
    input("Press Enter...")
    return False

# Register
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
        print("Registered!")
    input("Press Enter...")

# Patient menu
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

# Book appointment
def book_appointment():
    clear()
    print("=== BOOK ===")
    doctors = ['Dr. Johnson', 'Dr. Chen', 'Dr. Rodriguez']
    for i, d in enumerate(doctors, 1): print(f"{i}. {d}")
    doc = input("Doctor (1-3): ")
    if doc not in ['1','2','3']:
        print("Invalid!")
        input("Press Enter...")
        return
    date = input("Date (YYYY-MM-DD): ")
    time = input("Time (HH:MM): ")
    apt = {'id': f'APT-{len(appointments)+1}', 'patient': current_user['email'], 
           'patient_name': current_user['name'], 'doctor': doctors[int(doc)-1],
           'date': date, 'time': time, 'status': 'upcoming'}
    appointments.append(apt)
    save_data(APPOINTMENTS_FILE, appointments)
    print(f"Booked! ID: {apt['id']}")
    input("Press Enter...")

# View appointments
def view_my_appointments():
    clear()
    print("=== MY APPOINTMENTS ===")
    my = [a for a in appointments if a['patient'] == current_user['email']]
    if not my:
        print("No appointments")
    else:
        for i, a in enumerate(my, 1):
            print(f"[{i}] {a['id']} - {a['doctor']} - {a['date']} {a['time']} - {a['status']}")
    input("Press Enter...")

# Cancel appointment
def cancel_appointment():
    clear()
    print("=== CANCEL ===")
    my = [a for a in appointments if a['patient'] == current_user['email']]
    if not my:
        print("No appointments")
        input("Press Enter...")
        return
    for i, a in enumerate(my, 1):
        print(f"[{i}] {a['id']} - {a['date']} {a['time']}")
    choice = input("Number (0=back): ")
    if choice != '0':
        try:
            apt_id = my[int(choice)-1]['id']
            for a in appointments:
                if a['id'] == apt_id: a['status'] = 'cancelled'
            save_data(APPOINTMENTS_FILE, appointments)
            print("Cancelled!")
        except: print("Invalid!")
    input("Press Enter...")

def staff_menu():
    global current_user
    while True:
        clear()
        print(f"=== STAFF: {current_user['name']} ===")
        print("1. View All  2. Update Status  3. Logout")
        choice = input("Option: ")
        if choice == '1': view_all_appointments()
        elif choice == '2': update_status()
        elif choice == '3': current_user = None; break

def view_all_appointments():
    clear()
    print("=== ALL APPOINTMENTS ===")
    if not appointments:
        print("No appointments")
    else:
        for i, a in enumerate(appointments, 1):
            print(f"[{i}] {a['id']} - {a['patient_name']} - {a['doctor']} - {a['date']} {a['time']} - {a['status']}")
    input("Press Enter...")

def update_status():
    clear()
    print("=== UPDATE STATUS ===")
    if not appointments:
        print("No appointments")
        input("Press Enter...")
        return
    for i, a in enumerate(appointments, 1):
        print(f"[{i}] {a['id']} - {a['status']}")
    choice = input("Appointment # (0=back): ")
    if choice != '0':
        try:
            statuses = ['upcoming', 'completed', 'cancelled']
            print("1. upcoming  2. completed  3. cancelled")
            s = input("New status (1-3): ")
            if s in ['1','2','3']:
                appointments[int(choice)-1]['status'] = statuses[int(s)-1]
                save_data(APPOINTMENTS_FILE, appointments)
                print("Updated!")
        except: print("Invalid!")
    input("Press Enter...")

def admin_menu():
    global current_user
    while True:
        clear()
        print(f"=== ADMIN: {current_user['name']} ===")
        print("1. All Users  2. Add Staff  3. Stats  4. Logout")
        choice = input("Option: ")
        if choice == '1': view_all_users()
        elif choice == '2': add_staff()
        elif choice == '3': show_stats()
        elif choice == '4': current_user = None; break

def view_all_users():
    clear()
    print("=== ALL USERS ===")
    for i, u in enumerate(users, 1):
        print(f"[{i}] {u['name']} - {u['email']} - {u.get('role', 'patient')}")
    input("Press Enter...")

def add_staff():
    clear()
    print("=== ADD STAFF ===")
    name = input("Name: ")
    email = input("Email: ")
    password = input("Password: ")
    if any(u['email'] == email for u in users):
        print("Email exists!")
    else:
        users.append({'email': email, 'password': password, 'name': name, 'role': 'staff'})
        save_data(USERS_FILE, users)
        print("Staff added!")
    input("Press Enter...")

def show_stats():
    clear()
    print("=== STATISTICS ===")
    print(f"Users: {len(users)}")
    print(f"Patients: {len([u for u in users if u.get('role')=='patient'])}")
    print(f"Staff: {len([u for u in users if u.get('role')=='staff'])}")
    print(f"Appointments: {len(appointments)}")
    print(f"Upcoming: {len([a for a in appointments if a['status']=='upcoming'])}")
    print(f"Completed: {len([a for a in appointments if a['status']=='completed'])}")
    input("Press Enter...")

# Main program
def main():
    while True:
        choice = main_menu()
        if choice == '1':
            if login():
                role = current_user.get('role', 'patient')
                if role == 'admin': admin_menu()
                elif role == 'staff': staff_menu()
                else: patient_menu()
        elif choice == '2': register()
        elif choice == '3': clear(); print("Goodbye!"); break

if __name__ == '__main__':
    try: main()
    except KeyboardInterrupt: print("\nGoodbye!")
