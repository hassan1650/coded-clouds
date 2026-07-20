import React, { useState, useEffect, useContext } from 'react';
import { 
  Plus, Check, X, Clock, Calendar, 
  Loader2, CheckCircle2, XCircle 
} from 'lucide-react';
import { leaveService } from '../../services/leaveService';
import { AuthContext } from '../../context/AuthContext';
import ApplyLeaveModal from '../../components/ApplyLeaveModal';

const LeaveManagement = () => {
  const { user: authUser } = useContext(AuthContext) || {};
  const activeUser = authUser || { name: "Zain Master", email: "super@admin.com", role: "superadmin" };

  const isManagement = ['superadmin', 'admin', 'hr'].includes(activeUser.role);

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLeaves = async () => {
    setLoading(true);
    const data = await leaveService.getLeaves(activeUser);
    setLeaves(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaves();
  }, [activeUser.email]);

  const handleApplyLeave = async (formData) => {
    await leaveService.applyLeave(formData, activeUser);
    fetchLeaves();
  };

  const handleStatusChange = async (leaveId, newStatus) => {
    await leaveService.updateLeaveStatus(leaveId, newStatus, activeUser.name);
    fetchLeaves();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-lg">
            <CheckCircle2 size={12} /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold px-2.5 py-1 rounded-lg">
            <XCircle size={12} /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-lg">
            <Clock size={12} /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 p-2">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Leave Portal</h2>
          <p className="text-xs text-slate-400 mt-1">
            {isManagement 
              ? "Review and process team leave requests." 
              : "Track your leave applications and submit new requests."}
          </p>
        </div>

        {!isManagement && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/10 transition-all self-start sm:self-center active:scale-95"
          >
            <Plus size={16} />
            <span>Apply Leave</span>
          </button>
        )}
      </div>

      {/* Main Table Container */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-indigo-500" size={32} />
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 uppercase text-[10px] tracking-wider text-slate-500 border-b border-slate-800">
                <tr>
                  <th className="p-4">Employee</th>
                  <th className="p-4">Leave Type</th>
                  <th className="p-4">Dates</th>
                  <th className="p-4">Reason / Description</th>
                  <th className="p-4">Status</th>
                  {isManagement && <th className="p-4 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leaves.length > 0 ? (
                  leaves.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-950/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-200">{item.userName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{item.userRole}</div>
                      </td>

                      <td className="p-4">
                        <span className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg font-mono text-[11px] text-slate-300">
                          {item.leaveType}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-slate-500" />
                          <span>{item.startDate} to {item.endDate}</span>
                        </div>
                      </td>

                      <td className="p-4 max-w-xs truncate" title={item.reason}>
                        {item.reason}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {getStatusBadge(item.status)}
                        {item.reviewedBy && (
                          <span className="block text-[9px] text-slate-500 mt-0.5">By: {item.reviewedBy}</span>
                        )}
                      </td>

                      {isManagement && (
                        <td className="p-4 text-right whitespace-nowrap">
                          {item.status === 'pending' ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleStatusChange(item.id, 'approved')}
                                className="flex items-center gap-1 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-xl transition-all font-bold"
                              >
                                <Check size={12} /> Approve
                              </button>
                              <button
                                onClick={() => handleStatusChange(item.id, 'rejected')}
                                className="flex items-center gap-1 bg-rose-600/20 border border-rose-500/30 text-rose-400 hover:bg-rose-600 hover:text-white px-3 py-1.5 rounded-xl transition-all font-bold"
                              >
                                <X size={12} /> Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-600">Processed</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isManagement ? 6 : 5} className="text-center py-12 text-slate-500 text-xs">
                      No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Apply Leave Modal Component */}
      <ApplyLeaveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApplyLeave}
      />
    </div>
  );
};

export default LeaveManagement;