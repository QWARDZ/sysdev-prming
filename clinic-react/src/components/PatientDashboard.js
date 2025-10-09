import React, { useState } from 'react';

function PatientDashboard({ currentUser, appointments, onAddAppointment, onUpdateAppointment, showAlert }) {
  const [activeTab, setActiveTab] = useState('book');
  const [bookingData, setBookingData] = useState({
    doctor: 'Dr. Johnson',
    date: '',
    time: ''
  });

  const myAppointments = appointments.filter(a => a.patient === currentUser.email);
  const upcoming = myAppointments.filter(a => a.status === 'upcoming').length;
  const completed = myAppointments.filter(a => a.status === 'completed').length;

  const handleBooking = (e) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.time) {
      showAlert('warning', 'Please fill all fields!');
      return;
    }

    const appointment = {
      id: `APT-${appointments.length + 1}`,
      patient: currentUser.email,
      patient_name: currentUser.name,
      doctor: bookingData.doctor,
      date: bookingData.date,
      time: bookingData.time,
      status: 'upcoming'
    };

    onAddAppointment(appointment);
    showAlert('success', `Appointment booked! ID: ${appointment.id}`);
    setBookingData({ doctor: 'Dr. Johnson', date: '', time: '' });
  };

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      onUpdateAppointment(id, { status: 'cancelled' });
      showAlert('success', 'Appointment cancelled!');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2><i className="bi bi-person-circle"></i> Patient Dashboard</h2>
      
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success stats-card">
            <div className="card-body text-center">
              <i className="bi bi-calendar-check" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-2">My Appointments</h5>
              <h2>{myAppointments.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-info stats-card">
            <div className="card-body text-center">
              <i className="bi bi-clock-history" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-2">Upcoming</h5>
              <h2>{upcoming}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary stats-card">
            <div className="card-body text-center">
              <i className="bi bi-check-circle" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-2">Completed</h5>
              <h2>{completed}</h2>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'book' ? 'active' : ''}`}
            href="#book"
            onClick={(e) => { e.preventDefault(); setActiveTab('book'); }}
          >
            Book Appointment
          </a>
        </li>
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'my' ? 'active' : ''}`}
            href="#my"
            onClick={(e) => { e.preventDefault(); setActiveTab('my'); }}
          >
            My Appointments
          </a>
        </li>
      </ul>

      <div className="tab-content mt-3">
        {activeTab === 'book' && (
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5><i className="bi bi-calendar-plus"></i> Book New Appointment</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleBooking}>
                <div className="mb-3">
                  <label className="form-label">Select Doctor</label>
                  <select 
                    className="form-select"
                    value={bookingData.doctor}
                    onChange={(e) => setBookingData({ ...bookingData, doctor: e.target.value })}
                  >
                    <option value="Dr. Johnson">Dr. Johnson - General Physician</option>
                    <option value="Dr. Chen">Dr. Chen - Cardiologist</option>
                    <option value="Dr. Rodriguez">Dr. Rodriguez - Pediatrician</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    min={today}
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check-circle"></i> Book Appointment
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'my' && (
          <div className="card">
            <div className="card-header bg-info text-white">
              <h5><i className="bi bi-list-ul"></i> My Appointments</h5>
            </div>
            <div className="card-body">
              {myAppointments.length === 0 ? (
                <div className="alert alert-info">No appointments found.</div>
              ) : (
                myAppointments.map(apt => (
                  <div key={apt.id} className="card appointment-card mb-3">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="card-title">{apt.doctor}</h5>
                          <p className="card-text">
                            <i className="bi bi-calendar3"></i> {apt.date} at {apt.time}<br />
                            <i className="bi bi-hash"></i> {apt.id}
                          </p>
                        </div>
                        <div>
                          <span className={`badge status-${apt.status}`}>{apt.status.toUpperCase()}</span>
                        </div>
                      </div>
                      {apt.status === 'upcoming' && (
                        <button 
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() => handleCancel(apt.id)}
                        >
                          <i className="bi bi-x-circle"></i> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;
