import React, { useState } from 'react';
import { X, Plus, AlertCircle, FileText, User, Tag, Layers } from 'lucide-react';

const CreateTaskModal = ({ isOpen, onClose, onSave, authUsers }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('pending');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !assignedTo) return;
    const selectedUser = authUsers.find(u => u.email === assignedTo);

    onSave({
      title,
      description,
      assignee: selectedUser,
      priority,
      status
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setPriority('medium');
    setStatus('pending');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden z-10 transform scale-100 transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <Plus size={18} className="text-blue-400" />
            <h3 className="text-base font-bold text-slate-100">Deploy New Task Node</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Task Title</label>
            <div className="relative">
              <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                required
                placeholder="e.g. Optimize React layout tree" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
            <textarea 
              rows="3"
              placeholder="Describe the workspace objective..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Grid for Assignee and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Assignee Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Assign Node</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <select
                  required
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="">Select Developer</option>
                  {authUsers.map(u => (
                    <option key={u.email} value={u.email}>{u.name} ({u.role})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Priority Level</label>
              <div className="relative">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="low">LOW PRIORITY</option>
                  <option value="medium">MEDIUM PRIORITY</option>
                  <option value="high">HIGH PRIORITY</option>
                </select>
              </div>
            </div>
          </div>

          {/* Initial Status Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Initial Status</label>
            <div className="relative">
              <Layers size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="pending">PENDING COLUMN</option>
                <option value="inprogress">IN PROGRESS</option>
                <option value="under_review">UNDER REVIEW</option>
                <option value="completed">COMPLETED</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-300 rounded-xl text-xs font-semibold border border-slate-800 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/10 active:scale-95 transition-all"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
