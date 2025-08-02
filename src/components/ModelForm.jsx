import React, { useState } from "react";

export default function ModalForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    riskLevel: "safety",
    area: "Area 1",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const areas = [
    "Area 1",
    "Area 2",
    "Area 3",
    "Area 4",
    "Area 5",
    "Area 6",
  ];

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    if (!isSubmitting) setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Fake async submit, replace with your API call
    setTimeout(() => {
      alert("Form submitted!");
      setIsSubmitting(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Form
      </button>

      {isOpen && (
        <>
          {/* Background blur overlay */}
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-r from-zinc-700 to-700 rounded-lg shadow-lg max-w-md w-full p-6 relative z-10"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on form click
            >
              <h2 className="text-xl font-semibold mb-4">Submit Report</h2>

              <label className="block mb-3">
                <span className="block mb-1 font-medium">Description</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 text-black focus:ring-blue-500"
                  rows={4}
                />
              </label>

              <div className="mb-3">
                <span className="block mb-1 font-medium">Risk Level</span>
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="riskLevel"
                    value="safety"
                    checked={formData.riskLevel === "safety"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Safety</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="riskLevel"
                    value="risky"
                    checked={formData.riskLevel === "risky"}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Risky</span>
                </label>
              </div>

              <label className="block mb-6">
                <span className="block mb-1 font-medium">Area</span>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
                    ></path>
                  </svg>
                ) : null}
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
