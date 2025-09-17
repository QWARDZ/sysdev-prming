students = {}

while True:
    print("\n--- SLAMS MENU ---")
    print("1. Add Student")
    print("2. Time In")
    print("3. Time Out")
    print("4. Add Grade")
    print("5. Show Report")
    print("0. Exit")

    choice = input("Choose: ")

    if choice == "1":
        name = input("Student Name: ")
        students[name] = {"time_in": "", "time_out": "", "grades": []}
        print("Student added!")

    elif choice == "2":
        name = input("Student Name: ")
        if name in students:
            students[name]["time_in"] = input("Enter Time-in: ")
            print("Time-in recorded.")
        else:
            print("Student not found!")

    elif choice == "3":
        name = input("Student Name: ")
        if name in students:
            students[name]["time_out"] = input("Enter Time-out: ")
            print("Time-out recorded.")
        else:
            print("Student not found!")

    elif choice == "4":
        name = input("Student Name: ")
        if name in students:
            grade = float(input("Enter Grade (0-100): "))
            students[name]["grades"].append(grade)
            print("Grade added.")
        else:
            print("Student not found!")

    elif choice == "5":
        name = input("Student Name: ")
        if name in students:
            s = students[name]
            print("\n--- REPORT ---")
            print("Name:", name)
            print("Time-in:", s["time_in"])
            print("Time-out:", s["time_out"])
            if s["grades"]:
                avg = sum(s["grades"]) / len(s["grades"])
                print("Grades:", s["grades"])
                print("Average:", avg)
            else:
                print("No grades yet.")
        else:
            print("Student not found!")

    elif choice == "0":
        print("Goodbye!")
        break

    else:
        print("Invalid choice!")
