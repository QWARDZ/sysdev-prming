import json
import os

# Files
USERS = 'users.json'
ORDERS = 'orders.json'

# Load/Save
def load(f):
    return json.load(open(f)) if os.path.exists(f) else []

def save(f, d):
    json.dump(d, open(f, 'w'), indent=2)

users = load(USERS) or [{'email': 'user@order.com', 'password': '123', 'name': 'John'}]
orders = load(ORDERS)
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

# Place Order
def place_order():
    os.system('cls||clear')
    print("=== PLACE ORDER ===")
    item = input("Item: ")
    qty = input("Quantity: ")
    address = input("Delivery Address: ")
    order = {
        'id': len(orders)+1, 
        'customer': user['name'], 
        'item': item, 
        'quantity': qty,
        'address': address,
        'status': 'Pending'
    }
    orders.append(order)
    save(ORDERS, orders)
    print(f"Order #{order['id']} placed!")
    input("Press Enter...")

# View Orders
def view():
    os.system('cls||clear')
    print("=== MY ORDERS ===")
    my = [o for o in orders if o['customer'] == user['name']]
    if not my:
        print("No orders")
    else:
        for o in my:
            print(f"Order #{o['id']}")
            print(f"  Item: {o['item']} (x{o['quantity']})")
            print(f"  Address: {o['address']}")
            print(f"  Status: {o['status']}\n")
    input("Press Enter...")

# Menu
def menu():
    while True:
        os.system('cls||clear')
        print("=== EXPRESS DELIVERY ===")
        print(f"User: {user['name']}")
        print("1. Place Order  2. My Orders  3. Logout")
        c = input("Option: ")
        if c == '1': place_order()
        elif c == '2': view()
        elif c == '3': break

# Main
def main():
    while True:
        os.system('cls||clear')
        print("=== EXPRESS DELIVERY SYSTEM ===")
        print("1. Login  2. Exit")
        print("Demo: user@order.com / 123")
        c = input("Option: ")
        if c == '1' and login(): menu()
        elif c == '2': print("Goodbye!"); break

if __name__ == '__main__':
    main()
