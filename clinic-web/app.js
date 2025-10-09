// Initialize data from localStorage or use defaults
let users = JSON.parse(localStorage.getItem("users")) || [
	{ email: "patient@clinic.com", password: "patient123", name: "John Patient", role: "patient" },
	{ email: "staff@clinic.com", password: "staff123", name: "Sarah Staff", role: "staff" },
	{ email: "admin@clinic.com", password: "admin123", name: "Alex Admin", role: "admin" },
];

let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let currentUser = null;

// Save data to localStorage
function saveData() {
	localStorage.setItem("users", JSON.stringify(users));
	localStorage.setItem("appointments", JSON.stringify(appointments));
}

// Show/Hide screens
function showAuthScreen() {
	document.getElementById("authScreen").style.display = "block";
	document.getElementById("patientDashboard").style.display = "none";
	document.getElementById("staffDashboard").style.display = "none";
	document.getElementById("adminDashboard").style.display = "none";
	document.getElementById("logoutBtn").style.display = "none";
	document.getElementById("userName").textContent = "";
}

function showDashboard() {
	document.getElementById("authScreen").style.display = "none";
	document.getElementById("logoutBtn").style.display = "block";
	document.getElementById("userName").textContent = currentUser.name;

	if (currentUser.role === "patient") {
		document.getElementById("patientDashboard").style.display = "block";
		loadPatientDashboard();
	} else if (currentUser.role === "staff") {
		document.getElementById("staffDashboard").style.display = "block";
		loadStaffDashboard();
	} else if (currentUser.role === "admin") {
		document.getElementById("adminDashboard").style.display = "block";
		loadAdminDashboard();
	}
}

// Toggle between login and register
function showLogin() {
	document.getElementById("loginForm").style.display = "block";
	document.getElementById("registerForm").style.display = "none";
}

function showRegister() {
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("registerForm").style.display = "block";
}

// Login function
function login() {
	const email = document.getElementById("loginEmail").value;
	const password = document.getElementById("loginPassword").value;

	const user = users.find((u) => u.email === email && u.password === password);

	if (user) {
		currentUser = user;
		showDashboard();
		showAlert("success", `Welcome ${user.name}!`);
	} else {
		showAlert("danger", "Invalid email or password!");
	}
}

// Register function
function register() {
	const name = document.getElementById("registerName").value;
	const email = document.getElementById("registerEmail").value;
	const password = document.getElementById("registerPassword").value;

	if (!name || !email || !password) {
		showAlert("warning", "Please fill all fields!");
		return;
	}

	if (users.find((u) => u.email === email)) {
		showAlert("danger", "Email already exists!");
		return;
	}

	users.push({ email, password, name, role: "patient" });
	saveData();
	showAlert("success", "Registration successful! Please login.");
	showLogin();

	// Clear form
	document.getElementById("registerName").value = "";
	document.getElementById("registerEmail").value = "";
	document.getElementById("registerPassword").value = "";
}

// Logout function
document.getElementById("logoutBtn").addEventListener("click", function () {
	currentUser = null;
	showAuthScreen();
	showAlert("info", "Logged out successfully!");
});

// Patient Dashboard Functions
function loadPatientDashboard() {
	const myAppointments = appointments.filter((a) => a.patient === currentUser.email);
	const upcoming = myAppointments.filter((a) => a.status === "upcoming").length;
	const completed = myAppointments.filter((a) => a.status === "completed").length;

	document.getElementById("patientAppointmentCount").textContent = myAppointments.length;
	document.getElementById("patientUpcomingCount").textContent = upcoming;
	document.getElementById("patientCompletedCount").textContent = completed;
	displayMyAppointments();

	// Set minimum date to today
	const today = new Date().toISOString().split("T")[0];
	document.getElementById("bookDate").setAttribute("min", today);
}

function bookAppointment() {
	const doctor = document.getElementById("bookDoctor").value;
	const date = document.getElementById("bookDate").value;
	const time = document.getElementById("bookTime").value;

	if (!date || !time) {
		showAlert("warning", "Please fill all fields!");
		return;
	}

	const appointment = {
		id: `APT-${appointments.length + 1}`,
		patient: currentUser.email,
		patient_name: currentUser.name,
		doctor: doctor,
		date: date,
		time: time,
		status: "upcoming",
	};

	appointments.push(appointment);
	saveData();
	showAlert("success", `Appointment booked! ID: ${appointment.id}`);

	// Clear form
	document.getElementById("bookDate").value = "";
	document.getElementById("bookTime").value = "";

	// Refresh display
	loadPatientDashboard();
}

function displayMyAppointments() {
	const myAppointments = appointments.filter((a) => a.patient === currentUser.email);
	const container = document.getElementById("myAppointmentsList");

	if (myAppointments.length === 0) {
		container.innerHTML = '<div class="alert alert-info">No appointments found.</div>';
		return;
	}

	let html = "";
	myAppointments.forEach((apt) => {
		const statusClass = `status-${apt.status}`;
		html += `
            <div class="card appointment-card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 class="card-title">${apt.doctor}</h5>
                            <p class="card-text">
                                <i class="bi bi-calendar3"></i> ${apt.date} at ${apt.time}<br>
                                <i class="bi bi-hash"></i> ${apt.id}
                            </p>
                        </div>
                        <div>
                            <span class="badge ${statusClass}">${apt.status.toUpperCase()}</span>
                        </div>
                    </div>
                    ${
											apt.status === "upcoming"
												? `
                        <button class="btn btn-danger btn-sm mt-2" onclick="cancelAppointment('${apt.id}')">
                            <i class="bi bi-x-circle"></i> Cancel
                        </button>
                    `
												: ""
										}
                </div>
            </div>
        `;
	});

	container.innerHTML = html;
}

function cancelAppointment(aptId) {
	if (confirm("Are you sure you want to cancel this appointment?")) {
		const apt = appointments.find((a) => a.id === aptId);
		if (apt) {
			apt.status = "cancelled";
			saveData();
			showAlert("success", "Appointment cancelled!");
			displayMyAppointments();
			loadPatientDashboard();
		}
	}
}

// Staff Dashboard Functions
function loadStaffDashboard() {
	const upcoming = appointments.filter((a) => a.status === "upcoming").length;
	const completed = appointments.filter((a) => a.status === "completed").length;
	const cancelled = appointments.filter((a) => a.status === "cancelled").length;

	document.getElementById("staffAppointmentCount").textContent = appointments.length;
	document.getElementById("staffUpcomingCount").textContent = upcoming;
	document.getElementById("staffCompletedCount").textContent = completed;
	document.getElementById("staffCancelledCount").textContent = cancelled;
	displayAllAppointments();
}

function displayAllAppointments() {
	const container = document.getElementById("allAppointmentsList");

	if (appointments.length === 0) {
		container.innerHTML = '<div class="alert alert-info">No appointments found.</div>';
		return;
	}

	let html = '<div class="table-responsive"><table class="table table-hover">';
	html += `
        <thead class="table-primary">
            <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
    `;

	appointments.forEach((apt) => {
		const statusClass = `status-${apt.status}`;
		html += `
            <tr>
                <td>${apt.id}</td>
                <td>${apt.patient_name}</td>
                <td>${apt.doctor}</td>
                <td>${apt.date}</td>
                <td>${apt.time}</td>
                <td><span class="badge ${statusClass}">${apt.status.toUpperCase()}</span></td>
                <td>
                    <select class="form-select form-select-sm" onchange="updateAppointmentStatus('${apt.id}', this.value)">
                        <option value="upcoming" ${apt.status === "upcoming" ? "selected" : ""}>Upcoming</option>
                        <option value="completed" ${apt.status === "completed" ? "selected" : ""}>Completed</option>
                        <option value="cancelled" ${apt.status === "cancelled" ? "selected" : ""}>Cancelled</option>
                    </select>
                </td>
            </tr>
        `;
	});

	html += "</tbody></table></div>";
	container.innerHTML = html;
}

function updateAppointmentStatus(aptId, newStatus) {
	const apt = appointments.find((a) => a.id === aptId);
	if (apt) {
		apt.status = newStatus;
		saveData();
		showAlert("success", "Status updated successfully!");
		displayAllAppointments();
		loadStaffDashboard();
	}
}

// Admin Dashboard Functions
function loadAdminDashboard() {
	updateAdminStats();
	displayAllUsers();
	displayStatistics();
}

function updateAdminStats() {
	const patients = users.filter((u) => u.role === "patient");
	const staff = users.filter((u) => u.role === "staff");

	document.getElementById("totalUsers").textContent = users.length;
	document.getElementById("totalPatients").textContent = patients.length;
	document.getElementById("totalStaff").textContent = staff.length;
	document.getElementById("totalAppointments").textContent = appointments.length;
}

function displayAllUsers() {
	const container = document.getElementById("usersList");

	let html = '<div class="table-responsive"><table class="table table-hover">';
	html += `
        <thead class="table-primary">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
    `;

	users.forEach((user, index) => {
		const roleClass = user.role === "admin" ? "danger" : user.role === "staff" ? "info" : "success";
		html += `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge bg-${roleClass}">${user.role.toUpperCase()}</span></td>
            </tr>
        `;
	});

	html += "</tbody></table></div>";
	container.innerHTML = html;
}

function addStaff() {
	const name = document.getElementById("staffName").value;
	const email = document.getElementById("staffEmail").value;
	const password = document.getElementById("staffPassword").value;

	if (!name || !email || !password) {
		showAlert("warning", "Please fill all fields!");
		return;
	}

	if (users.find((u) => u.email === email)) {
		showAlert("danger", "Email already exists!");
		return;
	}

	users.push({ email, password, name, role: "staff" });
	saveData();
	showAlert("success", "Staff added successfully!");

	// Clear form
	document.getElementById("staffName").value = "";
	document.getElementById("staffEmail").value = "";
	document.getElementById("staffPassword").value = "";

	// Refresh display
	updateAdminStats();
	displayAllUsers();
}

function displayStatistics() {
	const container = document.getElementById("statsContent");

	const upcoming = appointments.filter((a) => a.status === "upcoming").length;
	const completed = appointments.filter((a) => a.status === "completed").length;
	const cancelled = appointments.filter((a) => a.status === "cancelled").length;

	let html = `
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h6 class="text-muted">Total Users</h6>
                        <h3>${users.length}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h6 class="text-muted">Total Appointments</h6>
                        <h3>${appointments.length}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card border-primary">
                    <div class="card-body">
                        <h6 class="text-primary">Upcoming</h6>
                        <h3>${upcoming}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card border-success">
                    <div class="card-body">
                        <h6 class="text-success">Completed</h6>
                        <h3>${completed}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card border-danger">
                    <div class="card-body">
                        <h6 class="text-danger">Cancelled</h6>
                        <h3>${cancelled}</h3>
                    </div>
                </div>
            </div>
        </div>
    `;

	container.innerHTML = html;
}

// Alert function
function showAlert(type, message) {
	const alertDiv = document.createElement("div");
	alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
	alertDiv.style.zIndex = "9999";
	alertDiv.style.minWidth = "300px";
	alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
	document.body.appendChild(alertDiv);

	setTimeout(() => {
		alertDiv.remove();
	}, 3000);
}

// Initialize on page load
window.onload = function () {
	showAuthScreen();

	// Add enter key support for login
	document.getElementById("loginPassword").addEventListener("keypress", function (e) {
		if (e.key === "Enter") login();
	});

	document.getElementById("registerPassword").addEventListener("keypress", function (e) {
		if (e.key === "Enter") register();
	});
};
