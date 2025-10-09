import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AuthScreen from "./components/AuthScreen";
import PatientDashboard from "./components/PatientDashboard";
import StaffDashboard from "./components/StaffDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Alert from "./components/Alert";

function App() {
	const [users, setUsers] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
	const [alert, setAlert] = useState(null);

	// Load data from localStorage on mount
	useEffect(() => {
		const savedUsers = localStorage.getItem("users");
		const savedAppointments = localStorage.getItem("appointments");

		if (savedUsers) {
			setUsers(JSON.parse(savedUsers));
		} else {
			const defaultUsers = [
				{ email: "patient@clinic.com", password: "patient123", name: "John Patient", role: "patient" },
				{ email: "staff@clinic.com", password: "staff123", name: "Sarah Staff", role: "staff" },
				{ email: "admin@clinic.com", password: "admin123", name: "Alex Admin", role: "admin" },
			];
			setUsers(defaultUsers);
			localStorage.setItem("users", JSON.stringify(defaultUsers));
		}

		if (savedAppointments) {
			setAppointments(JSON.parse(savedAppointments));
		}
	}, []);

	// Save data to localStorage whenever it changes
	useEffect(() => {
		if (users.length > 0) {
			localStorage.setItem("users", JSON.stringify(users));
		}
	}, [users]);

	useEffect(() => {
		localStorage.setItem("appointments", JSON.stringify(appointments));
	}, [appointments]);

	const showAlert = (type, message) => {
		setAlert({ type, message });
		setTimeout(() => setAlert(null), 3000);
	};

	const handleLogin = (email, password) => {
		const user = users.find((u) => u.email === email && u.password === password);
		if (user) {
			setCurrentUser(user);
			showAlert("success", `Welcome ${user.name}!`);
			return true;
		}
		showAlert("danger", "Invalid email or password!");
		return false;
	};

	const handleRegister = (name, email, password) => {
		if (users.find((u) => u.email === email)) {
			showAlert("danger", "Email already exists!");
			return false;
		}
		const newUser = { email, password, name, role: "patient" };
		setUsers([...users, newUser]);
		showAlert("success", "Registration successful! Please login.");
		return true;
	};

	const handleLogout = () => {
		setCurrentUser(null);
		showAlert("info", "Logged out successfully!");
	};

	const addAppointment = (appointment) => {
		setAppointments([...appointments, appointment]);
	};

	const updateAppointment = (id, updates) => {
		setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt)));
	};

	const addUser = (user) => {
		setUsers([...users, user]);
	};

	return (
		<div className="App">
			<Navbar currentUser={currentUser} onLogout={handleLogout} />
			<div className="container main-container">
				{alert && <Alert type={alert.type} message={alert.message} />}

				{!currentUser ? (
					<AuthScreen onLogin={handleLogin} onRegister={handleRegister} />
				) : currentUser.role === "patient" ? (
					<PatientDashboard currentUser={currentUser} appointments={appointments} onAddAppointment={addAppointment} onUpdateAppointment={updateAppointment} showAlert={showAlert} />
				) : currentUser.role === "staff" ? (
					<StaffDashboard appointments={appointments} onUpdateAppointment={updateAppointment} showAlert={showAlert} />
				) : (
					<AdminDashboard users={users} appointments={appointments} onAddUser={addUser} showAlert={showAlert} />
				)}
			</div>
		</div>
	);
}

export default App;
