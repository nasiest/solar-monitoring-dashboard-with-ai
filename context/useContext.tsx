'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// ✅ Define the supported user roles
type UserRole = 'admin' | 'marketer' |  'examofficer' | 'lecturer' | null;

// ✅ Define the shape of the user object
interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: UserRole;
  isAuthenticated: boolean;
}

// ✅ Define what the context provides
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: Partial<User>) => void;
  logout: () => void;
}

// ✅ Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// ✅ Hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// ✅ Context provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: Partial<User>) => {
    setUser({
      id: userData.id || '',
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || null,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


// 'use client';

// import { createContext, useContext, useState } from 'react';
// import type { ReactNode } from 'react';

// interface User {
//   id?: string;
//   name?: string;
//   email?: string;
//   isAuthenticated?: boolean; // ✅ add this
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };



// // import { createContext, useContext, useState, ReactNode } from 'react';

// // type UserRole = 'admin' | 'examofficer' | 'lecturer' | null;

// // interface UserContextType {
// //   user: { role: UserRole; isAuthenticated: boolean };
// //   login: (role: UserRole) => void;
// //   logout: () => void;
// // }

// // const UserContext = createContext<UserContextType | undefined>(undefined);

// // export const UserProvider = ({ children }: { children: ReactNode }) => {
// //   const [user, setUser] = useState<{ role: UserRole; isAuthenticated: boolean }>({
// //     role: null,
// //     isAuthenticated: false,
// //   });

// //   const login = (role: UserRole) => {
// //     setUser({ role, isAuthenticated: true });
// //   };

// //   const logout = () => {
// //     setUser({ role: null, isAuthenticated: false });
// //   };

// //   return (
// //     <UserContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </UserContext.Provider>
// //   );
// // };

// // export const useUser = () => {
// //   const context = useContext(UserContext);
// //   if (!context) {
// //     throw new Error('useUser must be used within a UserProvider');
// //   }
// //   return context;
// // };
