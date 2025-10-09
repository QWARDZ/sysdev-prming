import React from "react";

function StaffDashboard({ appointments, onUpdateAppointment, showAlert }) {
	const upcoming = appointments.filter((a) => a.status === "upcoming").length;
	const completed = appointments.filter((a) => a.status === "completed").length;
	const cancelled = appointments.filter((a) => a.status === "cancelled").length;

	const handleStatusUpdate = (id, newStatus) => {
		onUpdateAppointment(id, { status: newStatus });
		showAlert("success", "Status updated successfully!");
	};

	return (
		<div>
			<h2>
				<i className="bi bi-clipboard-check"></i> Staff Dashboard
			</h2>

			<div className="row mb-4">
				<div className="col-md-3 mb-3">
					<div className="card text-white bg-warning stats-card">
						<div className="card-body text-center">
							<i className="bi bi-calendar2-week" style={{ fontSize: "3rem" }}></i>
							<h6 className="mt-2">Total Appointments</h6>
							<h2>{appointments.length}</h2>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div className="card text-white bg-info stats-card">
						<div className="card-body text-center">
							<i className="bi bi-hourglass-split" style={{ fontSize: "3rem" }}></i>
							<h6 className="mt-2">Upcoming</h6>
							<h2>{upcoming}</h2>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div className="card text-white bg-success stats-card">
						<div className="card-body text-center">
							<i className="bi bi-check-circle-fill" style={{ fontSize: "3rem" }}></i>
							<h6 className="mt-2">Completed</h6>
							<h2>{completed}</h2>
						</div>
					</div>
				</div>
				<div className="col-md-3 mb-3">
					<div className="card text-white bg-danger stats-card">
						<div className="card-body text-center">
							<i className="bi bi-x-circle-fill" style={{ fontSize: "3rem" }}></i>
							<h6 className="mt-2">Cancelled</h6>
							<h2>{cancelled}</h2>
						</div>
					</div>
				</div>
			</div>

			<div className="card">
				<div className="card-header bg-primary text-white">
					<h5>
						<i className="bi bi-list-check"></i> All Appointments
					</h5>
				</div>
				<div className="card-body">
					{appointments.length === 0 ? (
						<div className="alert alert-info">No appointments found.</div>
					) : (
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
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
									{appointments.map((apt) => (
										<tr key={apt.id}>
											<td>{apt.id}</td>
											<td>{apt.patient_name}</td>
											<td>{apt.doctor}</td>
											<td>{apt.date}</td>
											<td>{apt.time}</td>
											<td>
												<span className={`badge status-${apt.status}`}>{apt.status.toUpperCase()}</span>
											</td>
											<td>
												<select className="form-select form-select-sm" value={apt.status} onChange={(e) => handleStatusUpdate(apt.id, e.target.value)}>
													<option value="upcoming">Upcoming</option>
													<option value="completed">Completed</option>
													<option value="cancelled">Cancelled</option>
												</select>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default StaffDashboard;
