import React, { useEffect, useRef, useState } from "react";
import floor1 from "../assets/floor1.jpeg";
import floor2 from "../assets/floor2.jpeg";
import floor3 from "../assets/floor3.jpeg";
// Floor maps & coordinates
const floorMaps = {
  floor1: {
    src: floor1,
    width: 720,
    height: 720,
    areas: [
      { name: "canteen", coords: "202,28,477,109", shape: "rect" },
      { name: "siting area", coords: "205,133,471,323", shape: "rect" },
      { name: "office", coords: "317,376,470,583", shape: "rect" },
      { name: "admin office", coords: "202,492,46,413", shape: "rect" },
      { name: "workshop", coords: "47,505,202,579", shape: "rect" },
      { name: "playground", coords: "548,43,685,668", shape: "rect" },
    ],
  },
  floor2: {
    src: floor2,
    width: 1280,
    height: 1280,
    areas: [
      { name: "library", coords: "389,1053,1226,1257", shape: "rect" },
      { name: "room no.101", coords: "1038,21,1231,224", shape: "rect" },
      { name: "room 102", coords: "1039,259,1233,466", shape: "rect" },
      { name: "room 103", coords: "1034,506,1240,713", shape: "rect" },
      { name: "room 104", coords: "1037,749,1240,992", shape: "rect" },
      { name: "room 105", coords: "381,692,590,891", shape: "rect" },
      { name: "ladies washroom 1", coords: "385,423,590,501", shape: "rect" },
      { name: "gents washroom 1", coords: "389,164,590,243", shape: "rect" },
      { name: "exam cell", coords: "385,522,589,663", shape: "rect" },
    ],
  },
  floor3: {
    src: floor3,
    width: 1280,
    height: 1280,
    areas: [
      { name: "room 201", coords: "1238,228,1037,21", shape: "rect" },
      { name: "room 202", coords: "1034,264,1237,463", shape: "rect" },
      { name: "room 203", coords: "1031,744,1239,985", shape: "rect" },
      { name: "seminar hall", coords: "1033,506,1231,705", shape: "rect" },
      { name: "laboratory", coords: "386,1054,1229,1250", shape: "rect" },
      { name: "second floor corridor", coords: "704,120,970,938", shape: "rect" },
    ],
  },
};

// Sample complaint data
let complaintData = {}; // global variable

async function fetchComplaints() {
  try {
    const res = await fetch("http://localhost:5000/reports/api/complaints");
    complaintData = await res.json();
    console.log("Fetched complaintData:", complaintData);

    // Now you can use complaintData for heatmap or risk visualization
  
  } catch (err) {
    console.error("Error fetching complaints:", err);
  }
}

// Call on page load
fetchComplaints();


const getColor = (count) => {
  if(count === 1) return "yellow";
  if(count === 2) return "orange";
  if(count >= 3) return "red";
  return "transparent";
};

const CampusHeatmap = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [currentFloor, setCurrentFloor] = useState("floor1");
  const [zoom, setZoom] = useState(1);

  // Draw polygons
  useEffect(() => {
    const svg = svgRef.current;
    svg.innerHTML = "";
    const img = containerRef.current.querySelector("img");
    const { width: imgWidth, height: imgHeight } = img.getBoundingClientRect();

    const floorData = floorMaps[currentFloor];
    const scaleX = imgWidth / floorData.width;
    const scaleY = imgHeight / floorData.height;

    floorData.areas.forEach(area => {
      const coords = area.coords.split(",").map(Number);
      let points = "";
      if(area.shape === "rect") {
        points = `${coords[0]*scaleX},${coords[1]*scaleY} ${coords[2]*scaleX},${coords[1]*scaleY} ${coords[2]*scaleX},${coords[3]*scaleY} ${coords[0]*scaleX},${coords[3]*scaleY}`;
      }

      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      poly.setAttribute("points", points);
      poly.setAttribute("fill", getColor(complaintData[area.name]));
      poly.setAttribute("fill-opacity", "0.4");
      poly.setAttribute("stroke", "#000");
      poly.setAttribute("stroke-width", "1");
      poly.style.cursor = "pointer";

      poly.addEventListener("mouseenter", () => {
        tooltipRef.current.style.display = "block";
        tooltipRef.current.innerHTML = `<b>${area.name}</b><br/>Complaints: ${complaintData[area.name] || 0}`;
      });
      poly.addEventListener("mousemove", (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        tooltipRef.current.style.left = e.clientX - rect.left + 10 + "px";
        tooltipRef.current.style.top = e.clientY - rect.top + 10 + "px";
      });
      poly.addEventListener("mouseleave", () => {
        tooltipRef.current.style.display = "none";
      });

      svg.appendChild(poly);
    });
  }, [currentFloor, zoom]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Campus Complaints Heatmap</h2>
        <select
          className="border rounded-md p-2"
          value={currentFloor}
          onChange={(e) => setCurrentFloor(e.target.value)}
        >
          <option value="floor1">Floor 1</option>
          <option value="floor2">Floor 2</option>
          <option value="floor3">Floor 3</option>
        </select>
      </div>

      <div className="relative overflow-hidden border rounded-lg mx-auto" style={{ width: "100%", transform: `scale(${zoom})`, transformOrigin: "center center" }} ref={containerRef}>
        <img src={floorMaps[currentFloor].src} alt="Floor Map" className="w-full h-auto block mx-auto" />
        <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full pointer-events-auto"></svg>
        <div ref={tooltipRef} className="absolute bg-slate-800 text-white p-2 rounded-md text-sm pointer-events-none hidden z-10"></div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.5))}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CampusHeatmap;
