const STORAGE_KEY = 'app_leave_requests';

const initialMockLeaves = [
  {
    id: "LV-101",
    userEmail: "dev@admin.com",
    userName: "Hamza Dev",
    userRole: "developer",
    leaveType: "Sick Leave",
    startDate: "2026-08-01",
    endDate: "2026-08-03",
    reason: "Severe fever and flu. Doctor advised 3 days rest.",
    status: "pending",
    appliedAt: "2026-07-20T10:00:00Z",
    reviewedBy: null
  },
  {
    id: "LV-102",
    userEmail: "marketing@admin.com",
    userName: "Kamil Growth",
    userRole: "marketing",
    leaveType: "Casual Leave",
    startDate: "2026-07-22",
    endDate: "2026-07-22",
    reason: "Personal family emergency.",
    status: "approved",
    appliedAt: "2026-07-18T14:30:00Z",
    reviewedBy: "Sarah HR"
  }
];

const getStoredLeaves = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockLeaves));
    return initialMockLeaves;
  }
  return JSON.parse(data);
};

const saveLeavesToStorage = (leaves) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leaves));
};

export const leaveService = {
  getLeaves: async (currentUser) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!currentUser) return resolve([]);
        
        const allLeaves = getStoredLeaves();
        const isManagement = ['superadmin', 'admin', 'hr'].includes(currentUser.role);
        
        if (isManagement) {
          resolve(allLeaves);
        } else {
          const userLeaves = allLeaves.filter(l => l.userEmail === currentUser.email);
          resolve(userLeaves);
        }
      }, 300);
    });
  },

  applyLeave: async (leaveData, currentUser) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allLeaves = getStoredLeaves();

        const newLeave = {
          id: `LV-${Math.floor(100 + Math.random() * 900)}`,
          userEmail: currentUser.email,
          userName: currentUser.name,
          userRole: currentUser.role,
          ...leaveData,
          status: 'pending',
          appliedAt: new Date().toISOString(),
          reviewedBy: null
        };

        const updatedLeaves = [newLeave, ...allLeaves];
        saveLeavesToStorage(updatedLeaves); 
        
        resolve(newLeave);
      }, 400);
    });
  },

  updateLeaveStatus: async (leaveId, status, reviewerName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allLeaves = getStoredLeaves();

        const updatedLeaves = allLeaves.map(leave => {
          if (leave.id === leaveId) {
            return {
              ...leave,
              status,
              reviewedBy: reviewerName
            };
          }
          return leave;
        });

        saveLeavesToStorage(updatedLeaves); 
        resolve(updatedLeaves);
      }, 300);
    });
  }
};