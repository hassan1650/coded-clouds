const LOCAL_STORAGE_KEY = 'coded_clouds_tasks';

// Initial Dummy Data
const defaultTasks = [
  {
    id: 'task-1',
    title: 'Landing Page Refactoring',
    description: 'Optimize image buffers and implement Tailwind responsive utility classes for mobile layout.',
    assignee: { name: 'Zain Master', email: 'superadmin@apex.com', role: 'superadmin' },
    priority: 'high', 
    status: 'inprogress', 
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Electron Database Migration',
    description: 'Configure SQLite3 migration scripts for SHAI PE POS node environment.',
    assignee: { name: 'Hamza Dev', email: 'dev@apex.com', role: 'developer' },
    priority: 'medium',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

export const taskService = {
  // 1. Fetch All Tasks (Simulated API Call)
  getTasks: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!tasks) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultTasks));
          resolve(defaultTasks);
        } else {
          resolve(JSON.parse(tasks));
        }
      }, 500); 
    });
  },

  // 2. Create Task API Call
  createTask: async (taskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultTasks;
        const newTask = {
          id: `task-${Date.now()}`,
          ...taskData,
          createdAt: new Date().toISOString()
        };
        const updatedTasks = [...tasks, newTask];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
        resolve(newTask);
      }, 400);
    });
  },

  // 3. Update Task Status (Instant Shift)
  updateTaskStatus: async (taskId, newStatus) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultTasks;
        const updatedTasks = tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        );
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
        resolve(true);
      }, 200);
    });
  },

  // 4. Delete Task
  deleteTask: async (taskId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultTasks;
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
        resolve(true);
      }, 300);
    });
  },

// add comment to task
  addComment: async (taskId, commentText, user) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem('coded_clouds_tasks'));
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            const comments = task.comments || [];
            const newComment = {
              id: `comment-${Date.now()}`,
              text: commentText,
              userName: user?.name || 'Anonymous Node',
              userRole: user?.role || 'user',
              createdAt: new Date().toISOString()
            };
            return { ...task, comments: [...comments, newComment] };
          }
          return task;
        });
        localStorage.setItem('coded_clouds_tasks', JSON.stringify(updatedTasks));
        resolve(updatedTasks);
      }, 200);
    });
  }
  
};