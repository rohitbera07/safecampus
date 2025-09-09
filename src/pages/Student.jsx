import React, { useState, useEffect } from "react";
import CampusHeatmap from "../components/CampusHeatmap";

export default function StudentDashboard() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
 const [showMap, setShowMap] = useState(false);
  // Report form state
  const [reportData, setReportData] = useState({
    description: "",
    area: "",
  });

  // Call form state
  const [sosData, setSosData] = useState({
    description: "",
    area: "",
  });

  // Profile (from login response stored in localStorage)
 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfile({ name: user.name, role: user.role, email: user.email });
    }
  }, []);

  // Handle changes
  const handleReportChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };
const handleCallChange = (e) => {
  const { name, value } = e.target;
  setSosData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  // Submit Report Complaint
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reportData, email: localStorage.email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Report submitted successfully!");
        setShowReportModal(false);
        setReportData({ description: "", area: "" });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // Submit Voice Call Request
  const handleSOSSubmit = (e) => {
  e.preventDefault();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        const res = await fetch("http://localhost:5000/sos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: localStorage.name,      // from localStorage
            description: sosData.description,
            area: sosData.area,
            latitude,
            longitude,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("🚨 SOS sent successfully!");
          setSosData({ description: "", area: "" }); // for call form
          setShowCallModal(false); // close call modal

        } else {
          alert(data.error || "Failed to send SOS");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong!");
      }
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      {/* Topbar */}
      <header className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold">CampusVoice - Student Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{localStorage.name}</p>
            <p className="text-sm">{localStorage.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold shadow">
            {localStorage.name ? localStorage.name[0].toUpperCase() : "U"}
          </div>
        </div>
      </header>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Report Complaints */}
        <div className="bg-gray-100 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Report Complaints</h2>
          <p className="text-sm text-gray-600 mb-4">
            Quickly send emergency alerts to your trusted contacts with a single
            button press. Ensure your safety by notifying them of your location
            and situation.
          </p>
          <button
            onClick={() => setShowReportModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Report
          </button>
        </div>

        {/* Voice Calls */}
        <div className="bg-gray-100 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">SOS</h2>
          <p className="text-sm text-gray-600 mb-4">
            Initiate voice calls with your contacts directly from the app for
            immediate communication in urgent situations.
          </p>
          <button
            onClick={() => setShowCallModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            SOS
          </button>
        </div>
      </div>

      {/* Map View */}
    <div className="bg-gray-100 rounded-xl shadow p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Map View</h2>

      {/* Button to toggle map */}
      <button
        onClick={() => setShowMap(!showMap)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        {showMap ? "Hide Map" : "Show Map"}
      </button>

      {/* Conditional rendering */}
      {showMap && (
        <div className="mt-4">
          <CampusHeatmap />
        </div>
      )}
    </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
              Report Complaint
            </h2>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={reportData.description}
                  onChange={handleReportChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Area</label>
                <input
                  type="text"
                  name="area"
                  value={reportData.area}
                  onChange={handleReportChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Voice Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
              Make a Call
            </h2>

            <form onSubmit={handleSOSSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={sosData.description}
                  onChange={handleCallChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Area</label>
                <input
                  type="text"
                  name="area"
                  value={sosData.area}
                  onChange={handleCallChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowCallModal(false)}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Initiate Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        
    </div>
  );
}
