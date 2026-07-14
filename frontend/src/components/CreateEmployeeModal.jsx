import React, { useState, useEffect } from 'react';
import { X, UserPlus, Upload, FileText, CheckCircle2 } from 'lucide-react';

const CreateEmployeeModal = ({ isOpen, onClose, onSave }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animate, setAnimate] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: 'developer',
  });

  const [experienceLetter, setExperienceLetter] = useState(null);
  const [cnicCopy, setCnicCopy] = useState(null);
  const [educationalDocs, setEducationalDocs] = useState(null);
  const [otherDocs, setOtherDocs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setAnimate(true), 20);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone.length < 10 || formData.phone.length > 15) {
      alert("Phone number must be between 10 to 15 digits.");
      return;
    }
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (!experienceLetter || !cnicCopy || !educationalDocs) {
      alert("Please upload required documents (Experience Letter, CNIC Copy & Educational Documents).");
      return;
    }

    const data = {
      ...formData,
      experienceLetter,
      cnicCopy,
      educationalDocs,
      otherDocs
    };

    onSave(data);
    setFormData({ name: '', phone: '', email: '', password: '', role: 'developer' });
    setExperienceLetter(null);
    setCnicCopy(null);
    setEducationalDocs(null); 
    setOtherDocs([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
      
      <div 
        className={`fixed inset-0 bg-slate-950/80  transition-opacity duration-300 ease-in-out ${
          animate ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={onClose}
      ></div>

      <div 
        className={`bg-slate-900 border border-slate-800/80 rounded-2xl w-full max-w-2xl max-h-[85vh] shadow-2xl relative z-10 flex flex-col overflow-hidden transition-all duration-300 ease-out transform ${
          animate ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-blue-500/10 text-blue-400 rounded-xl"><UserPlus size={18} /></span>
            <h3 className="text-md font-bold tracking-wide text-slate-100">Add New Employee</h3>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-200 hover:rotate-90 transition-all duration-200 p-1">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden min-h-0 w-full">
          
          <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Employee Name *</label>
                <input 
                  type="text" required placeholder="Muhammad Hassan"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Phone Number *</label>
                <input 
                  type="number" required placeholder="03001234567"
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address *</label>
                <input 
                  type="email" required placeholder="hassan@company.com"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password *</label>
                <input 
                  type="password" required placeholder="••••••••" minLength={8}
                  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Select Role *</label>
              <select 
                value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none transition-all duration-200 cursor-pointer"
              >
                <option value="superadmin">SUPER ADMIN</option>
                <option value="admin">ADMIN</option>
                <option value="hr">HR</option>
                <option value="marketing">MARKETING</option>
                <option value="developer">DEVELOPER</option>
                <option value="business development">BUSINESS DEVELOPMENT</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-400">Required Documents</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Experience Letter */}
                <div className="bg-slate-950 border border-dashed border-slate-800 hover:border-blue-500/40 rounded-xl p-4 text-center relative transition-all duration-200 group">
                  <input type="file" required onChange={(e) => setExperienceLetter(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="flex flex-col items-center gap-1 group-hover:scale-[1.02] transition-transform">
                    {experienceLetter ? <CheckCircle2 className="text-emerald-400" size={20} /> : <Upload className="text-slate-500 group-hover:text-blue-400" size={20} />}
                    <span className="text-xs text-slate-300 font-medium">Experience Letter *</span>
                    <p className="text-[10px] text-slate-500 truncate max-w-xs">{experienceLetter ? experienceLetter.name : "Select File"}</p>
                  </div>
                </div>

                <div className="bg-slate-950 border border-dashed border-slate-800 hover:border-blue-500/40 rounded-xl p-4 text-center relative transition-all duration-200 group">
                  <input type="file" required onChange={(e) => setCnicCopy(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                  <div className="flex flex-col items-center gap-1 group-hover:scale-[1.02] transition-transform">
                    {cnicCopy ? <CheckCircle2 className="text-emerald-400" size={20} /> : <Upload className="text-slate-500 group-hover:text-blue-400" size={20} />}
                    <span className="text-xs text-slate-300 font-medium">CNIC Copy *</span>
                    <p className="text-[10px] text-slate-500 truncate max-w-xs">{cnicCopy ? cnicCopy.name : "Select File"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border border-dashed border-slate-800 hover:border-blue-500/40 rounded-xl p-4 text-center relative transition-all duration-200 group">
                <input type="file" required onChange={(e) => setEducationalDocs(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                <div className="flex flex-col items-center gap-1 group-hover:scale-[1.01] transition-transform">
                  {educationalDocs ? <CheckCircle2 className="text-emerald-400" size={20} /> : <FileText className="text-slate-500 group-hover:text-blue-400" size={20} />}
                  <span className="text-xs text-slate-300 font-medium">Educational Documents *</span>
                  <p className="text-[10px] text-slate-500 truncate max-w-sm">{educationalDocs ? educationalDocs.name : "Select Degree File"}</p>
                </div>
              </div>

              {/* Other Documents */}
              <div className="bg-slate-950 border border-dashed border-slate-800 hover:border-blue-500/40 rounded-xl p-4 text-center relative transition-all duration-200 group">
                <input type="file" multiple onChange={(e) => setOtherDocs([...e.target.files])} className="absolute inset-0 opacity-0 cursor-pointer" />
                <div className="flex flex-col items-center gap-1 group-hover:scale-[1.01] transition-transform">
                  <Upload className="text-slate-500 group-hover:text-blue-400" size={20} />
                  <span className="text-xs text-slate-300 font-medium">Other Documents (Optional)</span>
                  <p className="text-[10px] text-slate-500">{otherDocs.length > 0 ? `${otherDocs.length} files selected` : "Multiple allowed"}</p>
                </div>
              </div>
            </div>

          </div>
            {/* actions */}
          <div className="flex justify-end gap-3 p-4 px-6 border-t border-slate-800 bg-slate-900 shrink-0">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm bg-slate-800 text-slate-300 hover:bg-slate-700 transition active:scale-95 font-medium">Cancel</button>
            <button type="submit" className="px-4 py-2.5 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition active:scale-95 font-medium">Save Employee</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeModal;