import React, { useState } from "react";

function AuthScreen({ onLogin, onRegister }) {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isLogin) {
			onLogin(formData.email, formData.password);
		} else {
			if (!formData.name || !formData.email || !formData.password) {
				alert("Please fill all fields!");
				return;
			}
			if (onRegister(formData.name, formData.email, formData.password)) {
				setIsLogin(true);
				setFormData({ name: "", email: "", password: "" });
			}
		}
	};

	return (
		<div className="auth-screen">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow">
						<div className="card-header bg-primary text-white text-center">
							<h4>
								<i className="bi bi-hospital-fill"></i> Clinic System
							</h4>
						</div>
						<div className="card-body">
							<h5 className="mb-3">{isLogin ? "Login" : "Register"}</h5>
							<form onSubmit={handleSubmit}>
								{!isLogin && (
									<div className="mb-3">
										<label className="form-label">Full Name</label>
										<input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" />
									</div>
								)}
								<div className="mb-3">
									<label className="form-label">Email</label>
									<input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
								</div>
								<div className="mb-3">
									<label className="form-label">Password</label>
									<input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
								</div>
								<button type="submit" className={`btn ${isLogin ? "btn-primary" : "btn-success"} w-100`}>
									{isLogin ? "Login" : "Register"}
								</button>
								<div className="text-center mt-3">
									<small>
										{isLogin ? "Don't have an account? " : "Already have an account? "}
										<a
											href="#toggle"
											onClick={(e) => {
												e.preventDefault();
												setIsLogin(!isLogin);
											}}>
											{isLogin ? "Register" : "Login"}
										</a>
									</small>
								</div>
							</form>
							{isLogin && (
								<>
									<hr />
									<div className="alert alert-info">
										<strong>Demo Accounts:</strong>
										<br />
										<small>
											Patient: patient@clinic.com / patient123
											<br />
											Staff: staff@clinic.com / staff123
											<br />
											Admin: admin@clinic.com / admin123
										</small>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthScreen;
