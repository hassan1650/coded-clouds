import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

const MOCK_DB = {
  "super@admin.com": { role: "superadmin", name: "Zain Master" },
  "admin@admin.com": { role: "admin", name: "Ali Admin" },
  "hr@admin.com": { role: "admin", name: "Sarah HR" }, 
  "dev@admin.com": { role: "developer", name: "Hamza Dev" },
  "designer@admin.com": { role: "designer", name: "Ayesha Design" },
  "marketing@admin.com": { role: "marketing", name: "Kamil Growth" },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lowerEmail = email.toLowerCase().trim();
        const foundUser = MOCK_DB[lowerEmail];
        if (foundUser && password === "12345678") {
          const userData = {
            email: lowerEmail,
            role: foundUser.role,
            name: foundUser.name
          };
          setUser(userData);
          resolve(userData); 
        } else {
          reject(new Error("Invalid email or password."));
        }
      }, 600);
    });
  };

  const logout = () => {
    setUser(null);
  };

  // Helper function to return all users registered in the system/DB
  const getAvailableUsers = () => {
    return Object.keys(MOCK_DB).map(email => ({
      email: email,
      name: MOCK_DB[email].name,
      role: MOCK_DB[email].role
    }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getAvailableUsers }}>
      {children}
    </AuthContext.Provider>
  );
};