import json
import os

# Files
USERS = 'users.json'
APTS = 'appointments.json'

# Load/Save
def load(f):
    return json.load(open(f)) if os.path.exists(f) else []

def save(f, d):
    json.dump(d, open(f, 'w'), indent=2)

users = load(USERS) or [{'email': 'user@clinic.com', 'password': '123', 'name': 'John'}]
apts = load(APTS)
user = None

# Login
def login():
    global user
    os.system('cls||clear')
    print("=== LOGIN ===")
    e = input("Email: ")
    p = input("Password: ")
    for u in users:
        if u['email'] == e and u['password'] == p:
            user = u
            print(f"Welcome {u['name']}!")
            input("Press Enter...")
            return True
    print("Invalid!")
    input("Press Enter...")
    return False

# Book
def book():
    os.system('cls||clear')
    print("=== BOOK APPOINTMENT ===")
    date = input("Date (YYYY-MM-DD): ")
    time = input("Time (HH:MM): ")
    apt = {'id': len(apts)+1, 'patient': user['name'], 'date': date, 'time': time}
    apts.append(apt)
    save(APTS, apts)
    print("Booked!")
    input("Press Enter...")

# View
def view():
    os.system('cls||clear')
    print("=== MY APPOINTMENTS ===")
    my = [a for a in apts if a['patient'] == user['name']]
    if not my:
        print("No appointments")
    else:
        for a in my:
            print(f"ID {a['id']} - {a['date']} at {a['time']}")
    input("Press Enter...")

# Menu
def menu():
    while True:
        os.system('cls||clear')
        print("=== CLINIC ===")
        print(f"User: {user['name']}")
        print("1. Book  2. View  3. Logout")
        c = input("Option: ")
        if c == '1': book()
        elif c == '2': view()
        elif c == '3': break

# Main
def main():
    while True:
        os.system('cls||clear')
        print("=== CLINIC SYSTEM ===")
        print("1. Login  2. Exit")
        print("Demo: user@clinic.com / 123")
        c = input("Option: ")
        if c == '1' and login(): menu()
        elif c == '2': print("Goodbye!"); break

if __name__ == '__main__':
    main()
