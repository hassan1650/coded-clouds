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
          reject(new Error("Invalid email or password. (Hint: Use password123)"));
        }
      }, 600);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};