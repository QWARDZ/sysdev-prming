import json
import os

# Files
USERS = 'users.json'
SALES = 'sales.json'

# Load/Save
def load(f):
    return json.load(open(f)) if os.path.exists(f) else []

def save(f, d):
    json.dump(d, open(f, 'w'), indent=2)

users = load(USERS) or [{'email': 'admin@profit.com', 'password': '123', 'name': 'Admin'}]
sales = load(SALES)
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

# Add Sale
def add_sale():
    os.system('cls||clear')
    print("=== ADD SALE ===")
    product = input("Product: ")
    amount = float(input("Amount ($): "))
    sale = {'id': len(sales)+1, 'product': product, 'amount': amount}
    sales.append(sale)
    save(SALES, sales)
    print("Sale recorded!")
    input("Press Enter...")

# View Sales
def view():
    os.system('cls||clear')
    print("=== SALES ===")
    if not sales:
        print("No sales")
    else:
        for s in sales:
            print(f"#{s['id']} - {s['product']} - ${s['amount']:.2f}")
    input("Press Enter...")

# Analytics
def analytics():
    os.system('cls||clear')
    print("=== ANALYTICS ===\n")
    if not sales:
        print("No data")
    else:
        total = sum(s['amount'] for s in sales)
        print(f"Total Revenue: ${total:.2f}")
        print(f"Total Sales: {len(sales)}")
        print(f"Average: ${total/len(sales):.2f}")
    input("Press Enter...")

# Menu
def menu():
    while True:
        os.system('cls||clear')
        print("=== PROFIT RADAR ===")
        print(f"User: {user['name']}")
        print("1. Add Sale  2. View  3. Analytics  4. Logout")
        c = input("Option: ")
        if c == '1': add_sale()
        elif c == '2': view()
        elif c == '3': analytics()
        elif c == '4': break

# Main
def main():
    while True:
        os.system('cls||clear')
        print("=== PROFIT RADAR ===")
        print("1. Login  2. Exit")
        print("Demo: admin@profit.com / 123")
        c = input("Option: ")
        if c == '1' and login(): menu()
        elif c == '2': print("Goodbye!"); break

if __name__ == '__main__':
    main()
