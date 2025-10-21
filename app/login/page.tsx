'use client';

import { useState } from 'react';
import { useUser } from '../../context/useContext';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'examofficer' | 'lecturer'>('admin');
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    login({
      role,
      isAuthenticated: true,
    });

    if (role === 'admin') {
      router.push('/admin-dashboard');
    } else if (role === 'examofficer') {
      router.push('/exam-officer-dashboard');
    } else if (role === 'lecturer') {
      router.push('/lecturer-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-400 via-orange-300 to-sky-500">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-yellow-200">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-slate-800">
          ☀️ Solar Monitoring Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as 'admin' | 'examofficer' | 'lecturer')
              }
              className="w-full p-2 border border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
              <option value="admin">Admin</option>
              <option value="examofficer">Exam Officer</option>
              <option value="lecturer">Lecturer</option>
            </select>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-yellow-500 to-orange-500 text-white py-2 rounded-md font-semibold shadow-md hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-5">
          Powered by <span className="text-yellow-600 font-semibold">SolarGrid Systems</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

// 'use client';

// import { useState } from 'react';
// import { useUser } from '../../context/useContext';
// import { useRouter } from 'next/navigation';

// const LoginPage = () => {
//   const { login } = useUser();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<'admin' | 'examofficer' | 'lecturer'>('admin');
//   const router = useRouter();

//   const handleLogin = (event: React.FormEvent) => {
//     event.preventDefault();

//     // ✅ Pass an object instead of a string
//     login({
//       role,
//       isAuthenticated: true,
//     });

//     // ✅ Redirect based on role
//     if (role === 'admin') {
//       router.push('/admin-dashboard');
//     } else if (role === 'examofficer') {
//       router.push('/exam-officer-dashboard');
//     } else if (role === 'lecturer') {
//       router.push('/lecturer-dashboard');
//     }
//   };

//   return (
//     <div className="bg-linear-to-r from-purple-500 to-indigo-600 min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           Login to Solar Monitoring Dashboard
//         </h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Role</label>
//             <select
//               value={role}
//               onChange={(e) =>
//                 setRole(e.target.value as 'admin' | 'examofficer' | 'lecturer')
//               }
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="admin">Admin</option>
//               <option value="examofficer">Exam Officer</option>
//               <option value="lecturer">Lecturer</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               placeholder="Enter your username"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// 'use client';

// import { useState } from 'react';
// import { useUser } from '../../context/useContext';
// import { useRouter } from 'next/navigation';

// const LoginPage = () => {
//   const { login } = useUser();
//   const [role, setRole] = useState<'admin' | 'examofficer' | 'lecturer'>('admin');
//   const router = useRouter();

//   const handleLogin = (event: React.FormEvent) => {
//     event.preventDefault();
//     login(role);
//     if (role === 'admin') {
//       router.push('/admin-dashboard');
//     } else if (role === 'examofficer') {
//       router.push('/exam-officer-dashboard');
//     } else if (role === 'lecturer') {
//       router.push('/lecturer-dashboard');
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Login to Solar Monitoring Dashboard</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value as 'admin' | 'examofficer' | 'lecturer')}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="admin">Admin</option>
//               <option value="examofficer">Exam Officer</option>
//               <option value="lecturer">Lecturer</option>
//             </select>
//           </div>
//           <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
