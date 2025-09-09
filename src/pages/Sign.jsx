import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  exit: { opacity: 0, y: -50, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

const Sign = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name:'', email:'', password:'', role:'', adminKey:'', mobile1:'', mobile2:''
  });

  const validateEmail = (email) => email.endsWith('@universal.edu.in');

  const next = () => {
    if (step===0 && !formData.role) { toast.error('Select role'); return; }
    if (step===1 && (!formData.name||!formData.email||!formData.password)) { toast.error('Provide all fields'); return; }
    if (step===2) {
      if (formData.role==='admin' && !formData.adminKey) { toast.error('Admin key missing'); return; }
      if (formData.role==='student' && (!formData.mobile1||!formData.mobile2)) { toast.error('Two mobile numbers required'); return; }
      if (!validateEmail(formData.email)) { toast.error('University email required'); return; }
    }
    setStep(s => s+1);
  };

  const back = () => setStep(s => Math.max(0, s-1));

  const submit = async () => {
    if (formData.role === "admin" && formData.adminKey !== "1305") {
      toast.error("Wrong admin key ❌");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          mobile1: formData.role === "student" ? formData.mobile1 : undefined,
          mobile2: formData.role === "student" ? formData.mobile2 : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Signup success ✅");
      navigate("/login");
    } catch (err) {
      toast.error("Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const stepCount = 4;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-blue-200 to-gray-300 p-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-lg bg-white rounded-xl p-8 shadow-2xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {step===0 && (
              <div className="text-center space-y-4 pt-12">
                <h2 className="text-3xl font-bold text-blue-600">Welcome aboard</h2>
                <p>Select your role to begin</p>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full mt-4 px-4 py-2 border rounded-md focus:ring-purple-400"
                >
                  <option value="">--Role--</option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}
            {step===1 && (
              <div className="space-y-4 pt-12">
                <h2 className="text-2xl font-semibold text-center">Your Info</h2>
                <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-purple-400"/>
                <input name="email" placeholder="University Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-purple-400"/>
                <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-purple-400"/>
              </div>
            )}
            {step===2 && (
              <div className="space-y-4 pt-12">
                {formData.role==='admin'
                  ? <input name="adminKey" placeholder="Admin Key" value={formData.adminKey} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-purple-400"/>
                  : <>
                      <input name="mobile1" placeholder="Mobile 1" value={formData.mobile1} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-purple-400"/>
                      <input name="mobile2" placeholder="Mobile 2" value={formData.mobile2} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:ring-purple-400"/>
                    </>
                }
              </div>
            )}
            {step===3 && (
              <div className="text-center space-y-4 pt-12">
                <h2 className="text-2xl font-bold text-purple-600">All set!</h2>
                <p>Click submit to complete signup.</p>
                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <p className="mt-4 text-sm">
                  Already have an account?{" "}
                  <span onClick={()=>navigate('/login')} className="text-purple-600 hover:underline cursor-pointer">
                    Login here
                  </span>
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          {step > 0 && <button onClick={back} className="text-gray-600 hover:text-gray-800">← Back</button>}
          {step < stepCount - 1 && <button onClick={next} className="ml-auto text-purple-600 hover:text-purple-800">Next →</button>}
        </div>
      </div>
    </div>
  );
};

export default Sign;
