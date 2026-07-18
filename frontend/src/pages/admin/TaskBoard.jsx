import React, { useState, useEffect, useContext } from 'react';
import { 
  Plus, Loader2, Calendar, Trash2, 
  Clock, Play, Eye, CheckCircle 
} from 'lucide-react';
import { taskService } from '../../services/taskService';
import CreateTaskModal from '../../components/CreateTaskModal';
import TaskDetailModal from '../../components/TaskDetailModal'; 
import { AuthContext } from '../../context/AuthContext';

const Taskboard = () => {
  const { user: authUser, getAvailableUsers } = useContext(AuthContext) || {}; 
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const activeDatabaseUsers = getAvailableUsers ? getAvailableUsers() : [];

  const fetchTasks = async () => {
    setLoading(true);
    const data = await taskService.getTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    const created = await taskService.createTask(taskData);
    setTasks(prev => [...prev, created]);
  };

  const handleShiftStatus = async (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    await taskService.updateTaskStatus(taskId, newStatus);
    
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    await taskService.deleteTask(taskId);
    if (selectedTask?.id === taskId) {
      setIsDetailModalOpen(false);
    }
  };

  // Comment Addition Handler
  const handleAddComment = async (taskId, commentText) => {
    const activeUser = authUser || { name: "Zain Master", role: "superadmin" }; 
    const updatedTasks = await taskService.addComment(taskId, commentText, activeUser);
    setTasks(updatedTasks);
    
    const refreshedTask = updatedTasks.find(t => t.id === taskId);
    setSelectedTask(refreshedTask);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
  };

  // Column definitions
  const columns = [
    { id: 'pending', title: 'Pending Tasks', bgDot: 'bg-rose-500', glow: 'shadow-rose-500/5' },
    { id: 'inprogress', title: 'In Progress', bgDot: 'bg-blue-500', glow: 'shadow-blue-500/5' },
    { id: 'under_review', title: 'Under Review', bgDot: 'bg-amber-500', glow: 'shadow-amber-500/5' },
    { id: 'completed', title: 'Completed Node', bgDot: 'bg-emerald-500', glow: 'shadow-emerald-500/5' }
  ];

  return (
    <div className="space-y-6 p-2 transition-all duration-500">
      
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 border border-slate-800/80 rounded-2xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">Active Taskboard</h2>
          <p className="text-xs text-slate-400 mt-1">Track status shifts, developers output, and repository operations.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/10 active:scale-95 transition-all self-start sm:self-center"
        >
          <Plus size={16} />
          <span>Deploy Task</span>
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      ) : (
        /* Kanban Matrix Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {columns.map((col) => {
            const filteredTasks = tasks.filter(t => t.status === col.id);

            return (
              <div 
                key={col.id} 
                className={`bg-slate-900/50 border border-slate-900/90 rounded-2xl p-4 flex flex-col min-h-[550px] shadow-xl ${col.glow} transition-all duration-300 hover:border-slate-800/60`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/40">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${col.bgDot} animate-pulse`}></span>
                    <h4 className="text-sm font-bold text-slate-200 tracking-wide">{col.title}</h4>
                  </div>
                  <span className="text-xs font-black text-slate-500 bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                    {filteredTasks.length}
                  </span>
                </div>

                {/* Tasks List Wrapper */}
                <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[500px] pr-1">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <div 
                        key={task.id}
                        onClick={() => {
                          setSelectedTask(task);
                          setIsDetailModalOpen(true);
                        }}
                        className="group/card relative bg-slate-950 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                      >
                        {/* Status Shift Actions */}
                        <div 
                          onClick={(e) => e.stopPropagation()} 
                          className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 bg-slate-900/90 backdrop-blur-sm p-1 rounded-lg border border-slate-800 z-10"
                        >
                          {col.id !== 'pending' && (
                            <button 
                              onClick={() => handleShiftStatus(task.id, 'pending')}
                              title="Set Pending"
                              className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded transition-all"
                            >
                              <Clock size={11} />
                            </button>
                          )}
                          {col.id !== 'inprogress' && (
                            <button 
                              onClick={() => handleShiftStatus(task.id, 'inprogress')}
                              title="Start Progress"
                              className="p-1 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded transition-all"
                            >
                              <Play size={11} />
                            </button>
                          )}
                          {col.id !== 'under_review' && (
                            <button 
                              onClick={() => handleShiftStatus(task.id, 'under_review')}
                              title="Send to Review"
                              className="p-1 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 rounded transition-all"
                            >
                              <Eye size={11} />
                            </button>
                          )}
                          {col.id !== 'completed' && (
                            <button 
                              onClick={() => handleShiftStatus(task.id, 'completed')}
                              title="Complete"
                              className="p-1 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 rounded transition-all"
                            >
                              <CheckCircle size={11} />
                            </button>
                          )}
                          <div className="h-3 w-[1px] bg-slate-800 mx-0.5"></div>
                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            title="Delete Node"
                            className="p-1 hover:bg-red-500/20 text-slate-500 hover:text-red-400 rounded transition-all"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>

                        {/* Priority Badge */}
                        <div className="mb-2">
                          <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                            task.priority === 'high' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                            task.priority === 'medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                            'bg-blue-500/10 border-blue-500/20 text-blue-400'
                          }`}>
                            {task.priority}
                          </span>
                        </div>

                        {/* Details */}
                        <h5 className="text-xs font-bold text-slate-100 group-hover/card:text-white transition-colors">{task.title}</h5>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{task.description}</p>

                        {/* Footer Meta */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-900">
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-[9px] flex items-center justify-center shadow-md">
                              {getInitials(task.assignee?.name)}
                            </div>
                            <span className="text-[10px] font-semibold text-slate-300">{task.assignee?.name}</span>
                          </div>
                          
                          <span className="text-[9px] font-mono text-slate-500 flex items-center gap-0.5">
                            <Calendar size={10} />
                            {new Date(task.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-32 flex flex-col items-center justify-center border border-dashed border-slate-800/80 rounded-xl">
                      <span className="text-[11px] text-slate-500 font-medium">Clear Pipeline</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <CreateTaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateTask}
        authUsers={activeDatabaseUsers} 
      />

      {/* Task Detail & Discussion Modal */}
      <TaskDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onAddComment={handleAddComment}
        currentUser={authUser}
      />
    </div>
  );
};

export default Taskboard;