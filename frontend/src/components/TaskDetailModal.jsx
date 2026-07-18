import React, { useState } from 'react';
import { X, MessageSquare, Send, Calendar } from 'lucide-react';

const TaskDetailModal = ({ isOpen, onClose, task, onAddComment, currentUser }) => {
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !task) return null;

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(task.id, commentText);
    setCommentText('');
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
  };

  // Sort comments so the newest is always on top
  const sortedComments = task.comments 
    ? [...task.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/80 transition-opacity" onClick={onClose}></div>

      {/* Center Modal Wrapper */}
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden z-10 my-8">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"></div>

        {/* Top Header Actions */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/60 bg-slate-950/40">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-500">
            <span>{task.id.toUpperCase()}</span>
            <span>&gt;</span>
            <span className="text-blue-400 uppercase font-bold">{task.status.replace('_', ' ')}</span>
          </div>
          <button onClick={onClose} className="p-1.5 bg-slate-950 border border-slate-800/80 rounded-xl text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Title Area */}
          <div>
            <h3 className="text-xl font-bold text-slate-100 tracking-tight">{task.title}</h3>
          </div>

          {/* Assignee & Due Date Row Meta Matrix */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl">
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Assignee</span>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                  {getInitials(task.assignee?.name)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">{task.assignee?.name}</div>
                  <div className="text-[9px] font-mono uppercase text-slate-500">{task.assignee?.role}</div>
                </div>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Created Date</span>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={14} className="text-slate-500" />
                <span className="text-xs font-semibold text-slate-300">
                  {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Description Area */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/20 p-3 rounded-xl border border-slate-900">
              {task.description || "No description provided for this node workspace."}
            </p>
          </div>

          {/* Discussion / Comments Pipeline */}
          <div className="space-y-4 pt-4 border-t border-slate-800/40">
            <div className="flex items-center gap-1.5 text-slate-400">
              <MessageSquare size={14} />
              <h4 className="text-xs font-bold uppercase tracking-wider">Discussion ({task.comments?.length || 0})</h4>
            </div>

               {/* 2. Comments Stream Feed (Sorted to show newest first) */}
            <div className="space-y-3 pt-2">
              {sortedComments.length > 0 ? (
                sortedComments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-slate-950/60 border border-slate-800/60 rounded-xl space-y-1 animate-fadeIn">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-300">{comment.userName}</span>
                        <span className="text-slate-600 font-mono">({comment.userRole})</span>
                      </div>
                      <span className="text-slate-500 font-mono">
                        {new Date(comment.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-1">{comment.text}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-xs text-slate-600">
                  No logs in discussion stream yet.
                </div>
              )}
            </div>

            {/* 1. Comment Input Form (Stays static right above the comments stream) */}
            <form onSubmit={handlePostComment} className="space-y-2">
              <textarea
                rows="3"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500/80 rounded-xl p-3 text-xs text-slate-200 focus:outline-none transition-all resize-none shadow-inner"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/10 active:scale-95"
                >
                  <span>Post Comment</span>
                  <Send size={12} />
                </button>
              </div>
            </form>

         
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;