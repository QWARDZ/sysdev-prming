import React from "react";

function Navbar({ currentUser, onLogout }) {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<div className="container">
				<a className="navbar-brand" href="#home">
					<i className="bi bi-hospital-fill"></i> Clinic System
				</a>
				<div className="ms-auto">
					{currentUser && (
						<>
							<span className="text-white me-3 fw-bold">{currentUser.name}</span>
							<button className="btn btn-outline-light btn-sm logout-btn" onClick={onLogout}>
								<i className="bi bi-box-arrow-right"></i> Logout
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
