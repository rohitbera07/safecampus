import React, { useState } from 'react';

// Profile Modal Component
const ProfileModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#2C2C3C] rounded-xl p-6 w-11/12 max-w-sm shadow-lg text-white font-mono">
        <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
        <div className="space-y-2">
          <p><span className="text-gray-400">Name:</span> {student.name}</p>
          <p><span className="text-gray-400">Email:</span> {student.email}</p>
          <p><span className="text-gray-400">Phone:</span> {student.phone}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-xl text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Notice Creation Modal
const NoticeModal = ({ isOpen, onClose, onCreate }) => {
  const [noticeText, setNoticeText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noticeText.trim()) {
      onCreate(noticeText.trim());
      setNoticeText('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#2C2C3C] rounded-xl p-6 w-11/12 max-w-md shadow-lg">
        <h2 className="text-white font-mono text-xl mb-4">Take Action</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            className="w-full p-2 rounded-md resize-none text-[#2C2C3C]"
            placeholder="Write your actions here..."
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            required
          />
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#4E9FEE] text-white hover:bg-blue-600 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Dummy student profile data
const studentProfiles = {
  Ravi: { name: 'Ravi Kumar', email: 'ravi.kumar@example.com', phone: '9876543210' },
  Maya: { name: 'Maya Singh', email: 'maya.singh@example.com', phone: '9123456789' },
  Sara: { name: 'Sara Ali', email: 'sara.ali@example.com', phone: '9988776655' },
  John: { name: 'John Doe', email: 'john.doe@example.com', phone: '9871234567' },
  Anya: { name: 'Anya Patel', email: 'anya.patel@example.com', phone: '9012345678' },
};

const reportsData = [
  { id: 1, student: 'Ravi', tag: 'High Risky', description: 'Missed several deadlines' },
  { id: 2, student: 'Maya', tag: 'Moderate', description: 'Late submission of assignments' },
  { id: 3, student: 'Sara', tag: 'Minor', description: 'Forgot to attend one class' },
  { id: 4, student: 'John', tag: 'High Risky', description: 'Cheating in exams' },
  { id: 5, student: 'Anya', tag: 'Minor', description: 'Late to class twice' },
];

const AdminPage = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [notices, setNotices] = useState([
    'Campus maintenance scheduled for Sunday',
    'New library timings effective next week',
  ]);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredReports =
    selectedTag === 'All'
      ? reportsData
      : reportsData.filter((r) => r.tag === selectedTag);

  const tagColors = {
    'High Risky': 'bg-red-600',
    Moderate: 'bg-yellow-500',
    Minor: 'bg-green-500',
    All: 'bg-gray-600',
  };

  const openProfileModal = (studentKey) => {
    const profile = studentProfiles[studentKey];
    if (profile) {
      setSelectedStudent(profile);
      setProfileModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-white p-6 font-mono w-full mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#4E9FEE] hover:bg-blue-600 px-4 py-2 rounded-xl shadow-md transition"
        >
         Take  Action
        </button>
      </header>

      {/* Notices Section */}
      <section className="mb-10">
        <h2 className="text-xl mb-4 border-b border-gray-600 pb-2">Actions taken :</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-300 max-h-36 overflow-y-auto">
          {notices.length === 0 && <li>No notices yet.</li>}
          {notices.map((notice, idx) => (
            <li key={idx}>{notice}</li>
          ))}
        </ul>
      </section>

      {/* Reports Section */}
      <section>
        <h2 className="text-xl mb-4 border-b border-gray-600 pb-2">Student Reports</h2>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['All', 'High Risky', 'Moderate', 'Minor'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full font-semibold transition
                ${
                  selectedTag === tag
                    ? `${tagColors[tag]} text-white shadow-lg`
                    : `bg-gray-700 text-gray-300 hover:bg-gray-600`
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Reports list */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {filteredReports.length === 0 ? (
            <p className="text-gray-400 italic">No reports to show for "{selectedTag}".</p>
          ) : (
            filteredReports.map(({ id, student, tag, description }) => (
              <div
                key={id}
                className="bg-[#2C2C3C] rounded-xl p-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
              >
                <div>
                  <button
                    onClick={() => openProfileModal(student)}
                    className="text-lg font-semibold text-[#4E9FEE] hover:underline"
                  >
                    {student}
                  </button>
                  <p className="text-gray-300">{description}</p>
                </div>
                <span
                  className={`mt-2 md:mt-0 inline-block px-3 py-1 rounded-full font-semibold text-sm
                    ${
                      tag === 'High Risky'
                        ? 'bg-red-600 text-white'
                        : tag === 'Moderate'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-green-500 text-white'
                    }`}
                >
                  {tag}
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modals */}
      <NoticeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(newNotice) => setNotices((prev) => [newNotice, ...prev])}
      />
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default AdminPage;
