// src/components/UserMenu.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

export default function UserMenu() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch profile when profile modal opens
  useEffect(() => {
    if (profileOpen && token) {
      fetch("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch((err) => console.error(err));
    }
  }, [profileOpen, token]);

  // Fetch reports when reports modal opens
  const fetchReports = () => {
    if (token) {
      fetch("http://localhost:5000/reports/my-reports", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setReports(data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (reportsOpen) fetchReports();
  }, [reportsOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/login");
    window.location.reload();
  };

  // Resolve report
  const resolveReport = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/reports/${id}/resolve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resolve report");

      // Update local state
      setReports((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Resolved" } : r))
      );
    } catch (err) {
      console.error("Error resolving report:", err);
      alert("Failed to resolve report");
    }
  };

  return (
    <div className="relative">
      {/* Avatar Trigger */}
      <Popover>
        <PopoverTrigger asChild>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold shadow cursor-pointer">
            {localStorage.name ? localStorage.name[0].toUpperCase() : "U"}
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-40 p-0 rounded-md bg-white shadow-lg">
          <ul className="flex flex-col">
            <li
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => setProfileOpen(true)}
            >
              Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => setReportsOpen(true)}
            >
              My Reports
            </li>
            <li
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </PopoverContent>
      </Popover>

      {/* Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            {profile.role === "student" && (
              <>
                <p>
                  <strong>Mobile 1:</strong> {profile.mobile1}
                </p>
                {profile.mobile2 && (
                  <p>
                    <strong>Mobile 2:</strong> {profile.mobile2}
                  </p>
                )}
              </>
            )}
            <p>
              <strong>Role:</strong> {profile.role}
            </p>
          </div>
          <DialogClose asChild>
            <Button className="mt-4 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Reports Modal */}
      <Dialog open={reportsOpen} onOpenChange={setReportsOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Reports</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            {reports.length === 0 ? (
              <p>No reports submitted yet.</p>
            ) : (
              reports.map((report) => (
                <Card
                  key={report._id}
                  className={`${
                    report.status === "Resolved" ? "opacity-50" : ""
                  }`}
                >
                  <CardContent className="space-y-1">
                    <p>
                      <strong>Description:</strong> {report.description}
                    </p>
                    <p>
                      <strong>Area:</strong> {report.location}
                    </p>
                    <p>
                      <strong>Severity:</strong> {report.severity}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          report.status === "Resolved"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {report.status === "Resolved" ? "Resolved" : "Pending"}
                      </span>
                    </p>
                    {report.status !== "Resolved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => resolveReport(report._id)}
                      >
                        Resolve
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <DialogClose asChild>
            <Button className="mt-4 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
