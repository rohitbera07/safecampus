import React, { useEffect } from "react";
import mapImage from "../assets/map1.jpeg"; // put map1.jpeg inside src/assets

const complaintData = [
  { name: "room108", x: 134, y: 46, complaints: 2 },
  { name: "room107", x: 160, y: 178, complaints: 5 },
  { name: "room106", x: 136, y: 250, complaints: 0 },
  { name: "room105", x: 253, y: 379, complaints: 7 },
  { name: "room101", x: 341, y: 66, complaints: 1 },
  { name: "room103", x: 347, y: 177, complaints: 3 },
  { name: "room104", x: 346, y: 267, complaints: 6 },
  { name: "room102", x: 355, y: 116, complaints: 0 },
];

const CampusHeatmap = () => {
  useEffect(() => {
    const container = document.getElementById("map-container");
    const tooltip = document.getElementById("tooltip");

    function getColor(count) {
      if (count === 0) return "rgba(0,200,0,0.4)"; // green
      else if (count < 5) return "rgba(255,165,0,0.6)"; // orange
      else return "rgba(255,0,0,0.6)"; // red
    }

    complaintData.forEach((zone) => {
      if (zone.complaints > 0) {
        const circle = document.createElement("div");
        circle.className = "heat-circle";
        circle.style.left = `${zone.x}px`;
        circle.style.top = `${zone.y}px`;
        circle.style.backgroundColor = getColor(zone.complaints);

        circle.addEventListener("mouseover", () => {
          tooltip.style.opacity = 1;
          tooltip.textContent = `📍 ${zone.name} — ${zone.complaints} Complaints`;
        });

        circle.addEventListener("mousemove", (e) => {
  const rect = container.getBoundingClientRect(); // container position
  tooltip.style.left = e.clientX - rect.left + 10 + "px";
  tooltip.style.top = e.clientY - rect.top - 10 + "px";
});


        circle.addEventListener("mouseleave", () => {
          tooltip.style.opacity = 0;
        });

        container.appendChild(circle);
      }
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Campus Complaints Heatmap</h2>
      <div
        id="map-container"
        style={{
          position: "relative",
          display: "inline-block",
          width: "400px",
          height: "500px",
        }}
      >
        <img
          id="campus-map"
          src={mapImage}
          alt="Campus Map"
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "2px solid #ccc",
            borderRadius: "10px",
          }}
        />
        <div
          id="tooltip"
          style={{
            position: "absolute",
            background: "#1e293b",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "5px",
            fontSize: "14px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.2s",
            zIndex: 999,
          }}
        ></div>
      </div>
    </div>
  );
};

export default CampusHeatmap;
