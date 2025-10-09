import React, { useState } from "react";

function AdminDashboard({ users, appointments, onAddUser, showAlert }) {
	const [activeTab, setActiveTab] = useState("users");
	const [staffData, setStaffData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const patients = users.filter((u) => u.role === "patient");
	const staff = users.filter((u) => u.role === "staff");
	const upcoming = appointments.filter((a) => a.status === "upcoming").length;
	const completed = appointments.filter((a) => a.status === "completed").length;
	const cancelled = appointments.filter((a) => a.status === "cancelled").length;

	const handleAddStaff = (e) => {
		e.preventDefault();
		if (!staffData.name || !staffData.email || !staffData.password) {
			showAlert("warning", "Please fill all fields!");
			return;
		}
		if (users.find((u) => u.email === staffData.email)) {
			showAlert("danger", "Email already exists!");
			return;
		}
		onAddUser({ ...staffData, role: "staff" });
		showAlert("success", "Staff added successfully!");
		setStaffData({ name: "", email: "", password: "" });
	};

	return (
		<div>
			<h2>
				<i className="bi bi-shield-check"></i> Admin Dashboard
			</h2>

			<div className="row mb-4">
				<div className="col-md-3 mb-3">
					<div className="card text-white bg-primary stats-card">
						<div className="card-body text-center">
							<i className="bi bi-people-fill" style={{ fontSize: "3rem" }}></i>
							<h6 className="mt-2">Total Users</h6>
							<h2>{users.length}</h2>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div className="card text-white bg-success stats-card">
						<div className="card-body text-center">
							<i className="bi bi-person-fill" style={{ fontSize: "3rem" }}></i>
							<h6 className="mt-2">Patients</h6>
							<h2>{patients.length}</h2>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div className="card text-white bg-info stats-card">
						<div className="card-body text-center">
							<i className="bi bi-briefcase-fill" style={{ fontSize: "3rem" }}></i>
							<h6 className="mt-2">Staff</h6>
							<h2>{staff.length}</h2>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div className="card text-white bg-warning stats-card">
						<div className="card-body text-center">
							<i className="bi bi-calendar3-fill" style={{ fontSize: "3rem" }}></i>
							<h6 className="mt-2">Appointments</h6>
							<h2>{appointments.length}</h2>
						</div>
					</div>
				</div>
			</div>

			<ul className="nav nav-tabs">
				<li className="nav-item">
					<a
						className={`nav-link ${activeTab === "users" ? "active" : ""}`}
						href="#users"
						onClick={(e) => {
							e.preventDefault();
							setActiveTab("users");
						}}>
						All Users
					</a>
				</li>
				<li className="nav-item">
					<a
						className={`nav-link ${activeTab === "addStaff" ? "active" : ""}`}
						href="#addStaff"
						onClick={(e) => {
							e.preventDefault();
							setActiveTab("addStaff");
						}}>
						Add Staff
					</a>
				</li>
				<li className="nav-item">
					<a
						className={`nav-link ${activeTab === "stats" ? "active" : ""}`}
						href="#stats"
						onClick={(e) => {
							e.preventDefault();
							setActiveTab("stats");
						}}>
						Statistics
					</a>
				</li>
			</ul>

			<div className="tab-content mt-3">
				{activeTab === "users" && (
					<div className="card">
						<div className="card-header bg-primary text-white">
							<h5>
								<i className="bi bi-people"></i> All Users
							</h5>
						</div>
						<div className="card-body">
							<div className="table-responsive">
								<table className="table table-hover">
									<thead>
										<tr>
											<th>#</th>
											<th>Name</th>
											<th>Email</th>
											<th>Role</th>
										</tr>
									</thead>
									<tbody>
										{users.map((user, index) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{user.name}</td>
												<td>{user.email}</td>
												<td>
													<span className={`badge bg-${user.role === "admin" ? "danger" : user.role === "staff" ? "info" : "success"}`}>{user.role.toUpperCase()}</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}

				{activeTab === "addStaff" && (
					<div className="card">
						<div className="card-header bg-success text-white">
							<h5>
								<i className="bi bi-person-plus"></i> Add New Staff
							</h5>
						</div>
						<div className="card-body">
							<form onSubmit={handleAddStaff}>
								<div className="mb-3">
									<label className="form-label">Full Name</label>
									<input type="text" className="form-control" value={staffData.name} onChange={(e) => setStaffData({ ...staffData, name: e.target.value })} />
								</div>
								<div className="mb-3">
									<label className="form-label">Email</label>
									<input type="email" className="form-control" value={staffData.email} onChange={(e) => setStaffData({ ...staffData, email: e.target.value })} />
								</div>
								<div className="mb-3">
									<label className="form-label">Password</label>
									<input type="password" className="form-control" value={staffData.password} onChange={(e) => setStaffData({ ...staffData, password: e.target.value })} />
								</div>
								<button type="submit" className="btn btn-success">
									<i className="bi bi-plus-circle"></i> Add Staff
								</button>
							</form>
						</div>
					</div>
				)}

				{activeTab === "stats" && (
					<div className="card">
						<div className="card-header bg-info text-white">
							<h5>
								<i className="bi bi-bar-chart"></i> System Statistics
							</h5>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-md-6 mb-3">
									<div className="card">
										<div className="card-body">
											<h6 className="text-muted">Total Users</h6>
											<h3>{users.length}</h3>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-3">
									<div className="card">
										<div className="card-body">
											<h6 className="text-muted">Total Appointments</h6>
											<h3>{appointments.length}</h3>
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="card border-primary">
										<div className="card-body">
											<h6 className="text-primary">Upcoming</h6>
											<h3>{upcoming}</h3>
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="card border-success">
										<div className="card-body">
											<h6 className="text-success">Completed</h6>
											<h3>{completed}</h3>
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="card border-danger">
										<div className="card-body">
											<h6 className="text-danger">Cancelled</h6>
											<h3>{cancelled}</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default AdminDashboard;
