import React, { useState, useEffect } from 'react';
import { 
  UserPlus, Mail, Phone, Shield, Edit2, Trash2, 
  FileText, CheckCircle2, ArrowRight, Users, 
  ShieldCheck, FileCheck, Search, Filter 
} from 'lucide-react';
import CreateEmployeeModal from '../../components/CreateEmployeeModal';

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateView, setAnimateView] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');

  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: "Zain Master", 
      phone: "03001111111", 
      email: "superadmin@apex.com", 
      role: "superadmin",
      documents: { experienceLetter: "exp_zain.pdf", cnicCopy: "cnic_zain.pdf", educationalDocs: "degree_zain.pdf" }
    },
    { 
      id: 2, 
      name: "Hamza Dev", 
      phone: "03002222222", 
      email: "dev@apex.com", 
      role: "developer",
      documents: { experienceLetter: "exp_hamza.pdf", cnicCopy: "cnic_hamza.pdf", educationalDocs: "degree_hamza.pdf" }
    },
    { 
      id: 3, 
      name: "Sarah HR", 
      phone: "03003333333", 
      email: "hr@apex.com", 
      role: "hr",
      documents: { experienceLetter: "exp_sarah.pdf", cnicCopy: "cnic_sarah.pdf", educationalDocs: "degree_sarah.pdf" }
    },
  ]);

  useEffect(() => {
    setAnimateView(true);
  }, []);

  const totalEmployees = employees.length;
  const totalAdmins = employees.filter(emp => emp.role === 'superadmin' || emp.role === 'admin').length;
  const verifiedDocsCount = employees.filter(emp => 
    emp.documents?.experienceLetter && emp.documents?.cnicCopy && emp.documents?.educationalDocs
  ).length;

  const handleSaveEmployee = (newEmployeeData) => {
    const newlyCreated = {
      id: employees.length + 1,
      name: newEmployeeData.name,
      phone: newEmployeeData.phone,
      email: newEmployeeData.email,
      role: newEmployeeData.role,
      documents: {
        experienceLetter: newEmployeeData.experienceLetter?.name || "uploaded_exp.pdf",
        cnicCopy: newEmployeeData.cnicCopy?.name || "uploaded_cnic.pdf",
        educationalDocs: newEmployeeData.educationalDocs?.name || "uploaded_degree.pdf"
      }
    };

    setEmployees([...employees, newlyCreated]);
  };

  const viewDocumentAction = (fileName) => {
    alert(`Opening storage buffer preview for: ${fileName}`);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
  };

  const getAvatarStyles = (role) => {
    switch (role) {
      case 'superadmin': return 'from-rose-500 to-red-600 text-rose-100 shadow-rose-500/10';
      case 'admin': return 'from-orange-500 to-amber-600 text-orange-100 shadow-orange-500/10';
      case 'hr': return 'from-teal-500 to-emerald-600 text-teal-100 shadow-teal-500/10';
      case 'developer': return 'from-blue-500 to-indigo-600 text-blue-100 shadow-blue-500/10';
      case 'marketing': return 'from-purple-500 to-fuchsia-600 text-purple-100 shadow-purple-500/10';
      default: return 'from-slate-600 to-slate-700 text-slate-100 shadow-slate-500/10';
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRoleFilter === 'all' || emp.role === selectedRoleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className={`space-y-6 p-2 transition-all duration-700 ease-out transform ${
      animateView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
    }`}>
      
      {/* 1. TOP BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-slate-700/60 transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        
        <div className="z-10">
          <h2 className="text-xl font-bold text-slate-100 tracking-tight group-hover:text-white transition-colors">Employees Registry</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">Manage platform roles, node credentials, and uploaded verified files documentation.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 z-10 group/btn self-start sm:self-center"
        >
          <UserPlus size={16} className="group-hover/btn:rotate-12 transition-transform" />
          <span>Create Employee</span>
          <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-250" />
        </button>
      </div>

      {/* 2. DYNAMIC STATE CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Staff Card */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all duration-300"></div>
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Users size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Total Employees</p>
            <h4 className="text-2xl font-black text-slate-100 mt-1">{totalEmployees}</h4>
          </div>
        </div>

        {/* Administrative Roles Card */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group hover:border-rose-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/10 transition-all duration-300"></div>
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Administrative Nodes</p>
            <h4 className="text-2xl font-black text-slate-100 mt-1">{totalAdmins}</h4>
          </div>
        </div>

        {/* Document Cleared Nodes Card */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl sm:col-span-2 lg:col-span-1 flex items-center gap-4 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all duration-300"></div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <FileCheck size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Fully Verified Docs</p>
            <h4 className="text-2xl font-black text-slate-100 mt-1">{verifiedDocsCount} <span className="text-xs font-normal text-slate-500">/ {totalEmployees}</span></h4>
          </div>
        </div>
      </div>

      {/* 3. LIVE SEARCH & FILTER PANEL BAR */}
      <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="w-full md:max-w-md relative group">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
          <input 
            type="text"
            placeholder="Search by name or node email address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none transition-all duration-200"
          />
        </div>

        <div className="w-full md:w-auto flex items-center gap-2 self-end md:self-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:flex">
            <Filter size={12} />
            <span>Filter Role:</span>
          </div>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="w-full md:w-48 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 focus:outline-none cursor-pointer hover:bg-slate-950/80 transition-all"
          >
            <option value="all">ALL DEPARTMENTS</option>
            <option value="superadmin">SUPER ADMIN</option>
            <option value="admin">ADMIN</option>
            <option value="hr">HR</option>
            <option value="marketing">MARKETING</option>
            <option value="developer">DEVELOPER</option>
            <option value="business development">BUSINESS DEVELOPMENT</option>
          </select>
        </div>
      </div>

      {/* 4. TABLE GRID CONTAINER */}
      <div className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/40 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Identity Info</th>
                <th className="py-4 px-6">Phone Number</th>
                <th className="py-4 px-6">System Access Role</th>
                <th className="py-4 px-6">Verified (Docs)</th>
                <th className="py-4 px-6 text-right">Actions Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-sm text-slate-300">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr 
                    key={emp.id} 
                    className="hover:bg-slate-950/30 transition-all duration-150 group/row"
                  >
                    {/* Identity Info with Premium Custom Avatar */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 transform group-hover/row:translate-x-1 transition-transform duration-200">
                        
                        {/* ─── PREMIUM AVATAR WRAPPER ─── */}
                        <div className={`h-9 w-9 rounded-xl bg-gradient-to-br flex items-center justify-center font-bold text-xs shadow-md shrink-0 transition-transform duration-300 group-hover/row:scale-105 ${getAvatarStyles(emp.role)}`}>
                          {getInitials(emp.name)}
                        </div>

                        <div>
                          <div className="font-semibold text-slate-200 group-hover/row:text-white transition-colors">{emp.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 group-hover/row:text-slate-400 transition-colors">
                            <Mail size={12} className="text-slate-600 group-hover/row:text-blue-500/60 transition-colors" /> {emp.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs font-mono text-slate-400 group-hover/row:text-slate-300 transition-colors">
                      <span className="flex items-center gap-1">
                        <Phone size={12} className="text-slate-600 group-hover/row:text-slate-500 transition-colors" /> {emp.phone}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider transition-all duration-300 group-hover/row:scale-105 ${
                        emp.role === 'superadmin' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover/row:bg-rose-500/20 group-hover/row:border-rose-500/40' :
                        emp.role === 'admin' ? 'bg-red-500/10 border-red-500/20 text-red-400 group-hover/row:bg-red-500/20 group-hover/row:border-red-500/40' :
                        emp.role === 'hr' ? 'bg-teal-500/10 border-teal-500/20 text-teal-400 group-hover/row:bg-teal-500/20 group-hover/row:border-teal-500/40' :
                        emp.role === 'developer' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 group-hover/row:bg-emerald-500/20 group-hover/row:border-emerald-500/40' :
                        emp.role === 'marketing' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 group-hover/row:bg-amber-500/20 group-hover/row:border-amber-500/40' :
                        'bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover/row:bg-purple-500/20 group-hover/row:border-purple-500/40'
                      }`}>
                        <Shield size={10} />
                        {emp.role}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {emp.documents?.experienceLetter && (
                          <button 
                            type="button"
                            onClick={() => viewDocumentAction(emp.documents.experienceLetter)}
                            className="inline-flex items-center gap-1 text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-blue-400 border border-slate-800/80 hover:border-blue-500/30 rounded-md px-2.5 py-1 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 font-medium shadow-inner"
                            title={emp.documents.experienceLetter}
                          >
                            <FileText size={10} className="text-blue-400" />
                            <span>EXP</span>
                          </button>
                        )}
                        {emp.documents?.cnicCopy && (
                          <button 
                            type="button"
                            onClick={() => viewDocumentAction(emp.documents.cnicCopy)}
                            className="inline-flex items-center gap-1 text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800/80 hover:border-amber-500/30 rounded-md px-2.5 py-1 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 font-medium shadow-inner"
                            title={emp.documents.cnicCopy}
                          >
                            <FileText size={10} className="text-amber-400" />
                            <span>CNIC</span>
                          </button>
                        )}
                        {emp.documents?.educationalDocs && (
                          <button 
                            type="button"
                            onClick={() => viewDocumentAction(emp.documents.educationalDocs)}
                            className="inline-flex items-center gap-1 text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-800/80 hover:border-emerald-500/30 rounded-md px-2.5 py-1 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 font-medium shadow-inner"
                            title={emp.documents.educationalDocs}
                          >
                            <CheckCircle2 size={10} className="text-emerald-400" />
                            <span>EDU</span>
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity duration-150">
                        <button type="button" className="p-1.5 bg-slate-800 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 rounded-lg border border-slate-700/50 hover:border-blue-500/30 active:scale-90 transition-all"><Edit2 size={12} /></button>
                        <button type="button" className="p-1.5 bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-700/50 hover:border-rose-500/30 active:scale-90 transition-all"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-sm text-slate-500 font-medium">
                    No registry profiles matching query architecture found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateEmployeeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
      />
    </div>
  );
};

export default Employees;