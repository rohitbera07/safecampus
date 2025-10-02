import React, { useState, useEffect } from "react";
import CampusHeatmap from "../components/CampusHeatmap";

// shadcn components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import UserMenu from "../components/UserMenu";

export default function StudentDashboard() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Report form state
  const [reportData, setReportData] = useState({
    description: "",
    location: "",
    image: null,
  });

  // Call form state
  const [sosData, setSosData] = useState({
    description: "",
    area: "",
  });

  // Location options
  const locationOptions = [
    "library",
    "canteen",
    "admin office",
    "playground",
    "workshop",
    "sitting area",
    "laboratory",
    "room no.101",
    "room no.102",
    "room no.103",
    "room no.104",
    "room no.105",
    "room no.201",
    "room no.202",
    "room no.203",
    "room no.204",
    "room no.205",
    "ladies washroom",
    "gents washroom",
    "stairs",
    "first floor corridor",
    "second floor corridor",
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfile({ name: user.name, role: user.role, email: user.email });
    }
  }, []);

  // Handle text inputs
  const handleReportChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleImageChange = (e) => {
    setReportData({ ...reportData, image: e.target.files[0] });
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
      const formData = new FormData();
      formData.append("description", reportData.description);
      formData.append("location", reportData.location);
      formData.append("email", localStorage.email);
      formData.append("image", reportData.image);

      const res = await fetch("http://localhost:5000/reports", {
  method: "POST",
  body: formData,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


      const data = await res.json();
      if (res.ok) {
        alert("Report submitted successfully!");
        setShowReportModal(false);
        setReportData({ description: "", location: "", image: null });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // Submit SOS
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
              name: localStorage.name,
              description: sosData.description,
              area: sosData.area,
              latitude,
              longitude,
            }),
          });

          const data = await res.json();
          if (res.ok) {
            alert("🚨 SOS sent successfully!");
            setSosData({ description: "", area: "" });
            setShowCallModal(false);
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
      <header className="flex justify-between items-center bg-slate-700 text-white px-6 py-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold">CampusVoice - Student Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{localStorage.name}</p>
            <p className="text-sm">{localStorage.role}</p>
          </div>
         <UserMenu/>
        </div>
      </header>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Report */}
        <div className="bg-gray-100 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Report Complaints</h2>
          <p className="text-sm text-gray-600 mb-4">
            Submit safety complaints with description, location, and image proof.
          </p>
          <Button onClick={() => setShowReportModal(true)}>Report</Button>
        </div>

        {/* SOS */}
        <div className="bg-gray-100 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">SOS</h2>
          <p className="text-sm text-gray-600 mb-4">
            Quickly send SOS alerts with your location.
          </p>
          <Button onClick={() => setShowCallModal(true)}>SOS</Button>
        </div>
      </div>

      {/* Map */}
      <div className="bg-gray-100 rounded-xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Map View</h2>
        <Button onClick={() => setShowMap(!showMap)}>
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
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
            <h2 className="text-xl font-semibold text-zinc-600 mb-4 text-center">
              Report Complaint
            </h2>
            <form onSubmit={handleReportSubmit} className="space-y-4">
              {/* Description */}
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

              {/* Location Combobox */}
              <div>
                <label className="block text-gray-700 mb-1">Location</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !reportData.location && "text-muted-foreground"
                      )}
                    >
                      {reportData.location || "Select a location"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search location..." />
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {locationOptions.map((loc) => (
                          <CommandItem
                            key={loc}
                            onSelect={() =>
                              setReportData({ ...reportData, location: loc })
                            }
                          >
                            {loc}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 mb-1">Upload Image</label>
                <Input type="file" accept="image/*" onChange={handleImageChange} required />
              </div>

              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setShowReportModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Report</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SOS Modal */}
      {showCallModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-blue-600 mb-4 text-center">
              Send SOS
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
                <Input
                  type="text"
                  name="area"
                  value={sosData.area}
                  onChange={handleCallChange}
                  required
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={() => setShowCallModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send SOS</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
