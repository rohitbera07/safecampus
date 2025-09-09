import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/reports/fetch")
      .then((res) => res.json())
      .then((data) => {
        const normalized = (data.reports || []).map((r) => ({
          ...r,
          severity:
            r.severity.toLowerCase() === "highly risky"
              ? "Highly Risky"
              : r.severity.toLowerCase() === "risky"
              ? "Risky"
              : "Minor",
        }));
        setReports(normalized);
      })
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);

  const filteredReports = reports.filter((r) => {
    const matchesTag = selectedTag === "All" || r.severity === selectedTag;
    const matchesSearch =
      r.area.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const tagColors = {
    "Highly Risky": "bg-red-500",
    Risky: "bg-yellow-400 text-black",
    Minor: "bg-blue-500",
    All: "bg-gray-400",
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 font-sans w-full mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1E40AF]">Admin Dashboard</h1>
      </header>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by area, email, or description..."
          className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Highly Risky", "Risky", "Minor"].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full font-semibold transition
              ${
                selectedTag === tag
                  ? `${tagColors[tag]} text-white shadow-md`
                  : `bg-gray-200 text-gray-600 hover:bg-gray-300`
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Reports list */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredReports.length === 0 ? (
          <p className="text-gray-500 italic">
            No reports to show for "{selectedTag}".
          </p>
        ) : (
          filteredReports.map(
            ({ id, description, area, severity, email, timeAgo }) => (
              <div
                key={id}
                className="bg-white rounded-xl p-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border border-gray-200"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#1E40AF]">
                    {area}
                  </h3>
                  <p className="text-gray-700">{description}</p>
                  <p className="text-gray-500 text-sm">📧 {email}</p>
                  <p className="text-gray-400 text-xs">⏱ {timeAgo}</p>
                </div>
                <span
                  className={`mt-2 md:mt-0 inline-block px-3 py-1 rounded-full font-semibold text-sm
                    ${
                      severity === "Highly Risky"
                        ? "bg-red-500 text-white"
                        : severity === "Risky"
                        ? "bg-yellow-400 text-black"
                        : "bg-blue-500 text-white"
                    }`}
                >
                  {severity}
                </span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default AdminPage;
