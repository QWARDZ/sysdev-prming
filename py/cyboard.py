
boarding_houses = [] 

while True:
    print("\n--- CYBOARD ---")
    print("1. Add Boarding House")
    print("2. View Boarding Houses")
    print("3. Search Boarding House")
    print("4. Exit")

    choice = input("Choose option: ")

    if choice == "1":
        name = input("Boarding House Name: ")
        price = input("Price: ")
        location = input("Location: ")
        contact = input("Contact: ")
        
        boarding_houses.append({
            "name": name,
            "price": price,
            "location": location,
            "contact": contact
        })
        print("Boarding house added!")

    elif choice == "2":
        print("\n--- List of Boarding Houses ---")
        for house in boarding_houses:
            print(f"{house['name']} | {house['price']} | {house['location']} | {house['contact']}")

    elif choice == "3":
        search = input("Enter name or location to search: ")
        found = False
        for house in boarding_houses:
            if search.lower() in house['name'].lower() or search.lower() in house['location'].lower():
                print(f"{house['name']} | {house['price']} | {house['location']} | {house['contact']}")
                found = True
        if not found:
            print("No boarding house found.")

    elif choice == "4":
        print("Goodbye!")
        break
    else:
        print("Invalid choice, try again.")
