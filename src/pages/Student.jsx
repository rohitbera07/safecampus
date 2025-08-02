import React, { useState } from 'react';
import ModalForm from '../components/ModelForm';

const Student = () => {
  const [modalOpen, setModalOpen] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendAlert = () => {
    // Add your SOS alert sending logic here
    alert('🚨 SOS alert sent!');
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#1E1E2F] text-[#F2F2F2]">
      {/* Sidebar */}
      <aside className="w-full md:px-8 md:py-14 md:w-16 h-16 md:h-auto flex md:flex-col items-center bg-[#2C2C3C] justify-center shadow-md">
        <div className="w-10 h-10 rounded-full bg-[#4E9FEE] font-jua flex justify-center items-center">R</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-y-24 gap-6">
          {/* Greeting */}
          <div className="h-40 rounded-xl shadow-md bg-[url('/7.jpg')] bg-cover bg-center text-white text-3xl font-jua pt-8 px-4 md:col-span-2">
            Hi User!
          </div>

          {/* Complaint Report */}
          <div className="bg-[url('/9.jpg')] bg-cover bg-center h-40 rounded-xl shadow-md p-4 flex flex-col justify-between md:col-span-2">
            <div className="text-red-100 text-2xl font-jua">Have a complaint? Report below.</div>
            <div
              className="w-5/6 m-1 p-1 rounded-xl text-white font-jua cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
          </div>
 {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#1E1E2F] p-6 rounded-xl shadow-lg text-white w-11/12 max-w-sm">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-6 text-gray-300">Do you really want to send an SOS alert?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendAlert}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
              >
                Send SOS
              </button>
            </div>
          </div>
        </div>
      )}
         {/* SOS ALERT */}
<div
  onClick={() => setIsModalOpen(true)} // ✅ Correct position
  className="bg-[url('/8.png')] cursor-pointer border border-white
 bg-cover bg-center h-40 rounded-xl shadow-md pt-10 flex flex-col justify-between md:col-span-1"
>
  {/* Optional inner content like a label or icon */}
</div>


        
          <div className="bg-[#2C2C3C] h-40 text-2xl rounded-xl shadow-md flex justify-center items-center md:col-span-1 md:max-w-[180px]">
           <div>Map view</div>
          </div>

          {/* Know your admins - always scroll horizontally */}
          <div className="bg-[#2C2C3C] h-56 rounded-xl shadow-md p-4 md:col-span-3 flex flex-col">
            <h1 className="m-1 text-white font-mono text-lg mb-3">Know your admins :</h1>
            <div
              className="bg-zinc-100 h-32 rounded-xl flex items-center shadow-md px-3 overflow-x-auto no-scrollbar gap-4 whitespace-nowrap"
            >
              {[
                { initial: 'F', name: 'Farookh', bg: '#4E9FEE' },
                { initial: 'C', name: 'Chahal', bg: '#1b1c1d' },
                { initial: 'K', name: 'Karan', bg: '#695019' },
                { initial: 'I', name: 'Inder', bg: '#EE704E' }, // added extras to test scroll
                { initial: 'N', name: 'Noor', bg: '#4E9FEE' },
                { initial: 'G', name: 'Gupta', bg: '#695019' },
              ].map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center inline-block min-w-[72px]"
                >
                  <div
                    className="w-14 h-14 rounded-full font-jua flex justify-center items-center text-white text-xl"
                    style={{ backgroundColor: member.bg }}
                  >
                    {member.initial}
                  </div>
                  <span className="mt-1 text-sm font-mono text-[#2C2C3C]">{member.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notices box */}
          <div className="bg-[#2C2C3C] h-56 rounded-xl shadow-md p-4 md:col-span-3 flex flex-col">
            <h1 className="m-1 text-white font-mono text-lg mb-3">Actions Taken by the Campus :</h1>
            <ul className="list-disc list-inside space-y-2 text-white font-mono text-sm overflow-y-auto max-h-[200px]">
              <li>Campus will be closed on Friday.</li>
              <li>Submit assignments by next Monday.</li>
              <li>New library timings effective immediately.</li>
              <li>Guest lecture on React next Wednesday.</li>
              <li>Sports day event postponed to next month.</li>
            </ul>
          </div>
        </div>

        {/* Map coming Soon - square */}
        
      </main>
    </div>
  );
};

export default Student;
