import React from "react";

function Alert({ type, message }) {
	return (
		<div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
			{message}
		</div>
	);
}

export default Alert;
