import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CampusHeatmap from "../components/CampusHeatmap";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { User, LogOut, MoreHorizontal, AlertTriangle } from "lucide-react";
import UserMenu from "../components/UserMenu";

const SEVERITY_NORMALIZED = (s) => {
  if (!s) return "Minor";
  const lowered = s.toLowerCase();
  if (lowered.includes("high")) return "Highly Risky";
  if (lowered.includes("risk")) return "Risky";
  return "Minor";
};

export default function AdminDashboard() {
  const [showMap, setShowMap] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedTab, setSelectedTab] = useState("All");
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const profile = useMemo(
    () => ({ name: "Admin User", email: "admin@example.com", role: "Administrator" }),
    []
  );

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/reports/fetch")
      .then((res) => res.json())
      .then((data) => {
        const normalized = (data.reports || []).map((r) => ({
          ...r,
          severity: SEVERITY_NORMALIZED(r.severity),
        }));
        setReports(normalized);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
        setError("Unable to load reports");
      })
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    const c = { All: reports.length, "Highly Risky": 0, Risky: 0, Minor: 0 };
    reports.forEach((r) => {
      if (r.severity === "Highly Risky") c["Highly Risky"]++;
      else if (r.severity === "Risky") c["Risky"]++;
      else c["Minor"]++;
    });
    return c;
  }, [reports]);

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const matchesTab = selectedTab === "All" ? true : r.severity === selectedTab;
      const q = search.trim().toLowerCase();
      if (!q) return matchesTab;
      const matchesSearch =
        (r.location || "").toLowerCase().includes(q) ||
        (r.email || "").toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [reports, selectedTab, search]);

  const deleteReport = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const resolveReport = async (id) => {
    try {
      console.log("Resolving report with id:", id);
      const res = await fetch(`http://localhost:5000/reports/${id}/resolve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("Resolve response:", data);
      if (!res.ok) throw new Error(data.message || "Failed to resolve report");

      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "Resolved" } : r))
      );
    } catch (err) {
      console.error("Error resolving report:", err);
      alert("Failed to resolve report");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">Overview of campus reports and quick actions</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[320px] hidden md:block">
              <Input
                placeholder="Search by location, email, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <UserMenu />

            <div className="md:hidden w-40">
              <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </header>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Reports</CardTitle>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>{reports.length} total</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-4">
              <TabsList>
                {["All", "Highly Risky", "Risky", "Minor"].map((t) => (
                  <TabsTrigger key={t} value={t} className="flex items-center gap-2">
                    {t} <span className="ml-1 text-xs text-slate-500">({counts[t] || 0})</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="divide-y">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="animate-pulse p-4 bg-white rounded-lg shadow-sm"></div>
                  ))}
                </div>
              ) : error ? (
                <div className="p-6 text-center text-red-600">{error}</div>
              ) : filtered.length === 0 ? (
                <div className="p-6 text-center text-slate-500">No reports match your filters.</div>
              ) : (
                filtered.map((r) => (
                  <div
                    key={r.id}
                    className={`py-4 ${r.status === "Resolved" ? "opacity-50" : ""}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">{r.location}</h3>
                        <p className="text-slate-600 mt-1 line-clamp-2">{r.description}</p>
                        {r.image && (
                          <img
                            src={r.image}
                            alt="Report"
                            className="mt-2 w-full max-h-60 object-contain rounded-md"
                          />
                        )}
                        <div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
                          <span>📧 {r.email}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>⏱ {r.timeAgo || r.createdAt || ""}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge className="capitalize mr-2">{r.severity}</Badge>
                        <Badge className="capitalize mr-2"> Authenticity level : {r.authenticity}</Badge>
                        {r.status === "Resolved" && (
                          <Badge variant="outline" className="text-green-600">Resolved</Badge>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1">
                              <MoreHorizontal />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {r.status !== "Resolved" && (
                              <DropdownMenuItem onClick={() => resolveReport(r.id)}>
                                Resolve
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => deleteReport(r.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-slate-500">
            Tip: Click a tab to filter by severity or use search to find reports quickly.
          </CardFooter>
        </Card>
      </div>

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
    </div>
  );
}
