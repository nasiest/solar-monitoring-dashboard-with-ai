'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/useContext';
import { Sun, Moon } from 'lucide-react';

import PowerMonitoringDashboard from '../../components/PowerMonitoringDashbaord';
import UserManagementDashboard from '../../components/UserManagementDashboard';
import EnergyManagementDashboard from '../../components/EngergyManagementDashboard';
import AlertsRecommendationsDashboard from '../../components/AlertsRecommendationsDashboard';
import SystemSettingsDashboard from '../../components/SystemSettingsDashboard';

const AdminDashboard = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('powerMonitoring');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 🌓 Load theme preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('solar-theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // 💾 Save and apply theme
  useEffect(() => {
    localStorage.setItem('solar-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // 🔐 Auth check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user || !user.isAuthenticated || user.role !== 'admin') {
        router.push('/login');
      }
      setIsCheckingAuth(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [user, router]);

  // Loader
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-yellow-100 via-white to-sky-100 dark:from-slate-900 dark:via-slate-800 dark:to-black transition-all">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-yellow-800 dark:text-yellow-300 text-sm font-medium">
            Checking access permissions...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !user.isAuthenticated || user.role !== 'admin') {
    return null;
  }

  return (
    <motion.div
      className="relative min-h-screen bg-linear-to-br from-yellow-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-500"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <header className="bg-linear-to-r from-amber-500 to-yellow-400 dark:from-yellow-700 dark:to-amber-600 p-4 shadow-lg text-white flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-wide">☀️ Solar Admin Dashboard</h1>
          <p className="text-sm opacity-90">Monitor, manage and optimize your solar systems.</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Logout */}
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-md backdrop-blur-sm transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex p-6 space-x-6">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-xl shadow-md p-4 border border-yellow-100 dark:border-slate-700">
          <ul className="space-y-3">
            {[
              { key: 'powerMonitoring', label: 'Power Monitoring', icon: '⚡' },
              { key: 'energyManagement', label: 'Energy Management', icon: '🔋' },
              { key: 'userManagement', label: 'User Management', icon: '👥' },
              { key: 'alerts', label: 'Alerts & Recommendations', icon: '🚨' },
              { key: 'systemSettings', label: 'System Settings', icon: '⚙️' },
            ].map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full flex items-center space-x-2 py-2 px-3 rounded-lg font-medium transition-all ${
                    activeSection === item.key
                      ? 'bg-linear-to-r from-amber-500 to-yellow-400 text-white shadow-md dark:from-yellow-600 dark:to-amber-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-yellow-100 dark:border-slate-700 transition-all">
          <AnimatePresence mode="wait">
            {activeSection === 'powerMonitoring' && (
              <motion.div
                key="powerMonitoring"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <PowerMonitoringDashboard />
              </motion.div>
            )}

            {activeSection === 'energyManagement' && (
              <motion.div
                key="energyManagement"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <EnergyManagementDashboard />
              </motion.div>
            )}

            {activeSection === 'userManagement' && (
              <motion.div
                key="userManagement"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <UserManagementDashboard />
              </motion.div>
            )}

            {activeSection === 'alerts' && (
              <motion.div
                key="alerts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <AlertsRecommendationsDashboard />
              </motion.div>
            )}

            {activeSection === 'systemSettings' && (
              <motion.div
                key="systemSettings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <SystemSettingsDashboard />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* 🌞 Floating Solar Toggle Orb */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 border-2
          ${
            isDarkMode
              ? 'bg-linear-to-br from-amber-500 to-yellow-300 border-yellow-400 text-slate-900'
              : 'bg-linear-to-br from-slate-800 to-slate-900 border-slate-700 text-yellow-300'
          }`}
      >
        <motion.div
          key={isDarkMode ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default AdminDashboard;




// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useUser } from '../../context/useContext';

// import PowerMonitoringDashboard from '../../components/PowerMonitoringDashbaord';
// import UserManagementDashboard from '../../components/UserManagementDashboard';
// import EnergyManagementDashboard from '../../components/EngergyManagementDashboard';
// import AlertsRecommendationsDashboard from '../../components/AlertsRecommendationsDashboard';
// import SystemSettingsDashboard from '../../components/SystemSettingsDashboard';

// const AdminDashboard = () => {
//   const { user, logout } = useUser();
//   const router = useRouter();
//   const [activeSection, setActiveSection] = useState('powerMonitoring');
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);

//   useEffect(() => {
//     // Simulate async auth check
//     const timer = setTimeout(() => {
//       if (!user || !user.isAuthenticated || user.role !== 'admin') {
//         router.push('/login');
//       }
//       setIsCheckingAuth(false);
//     }, 800);
//     return () => clearTimeout(timer);
//   }, [user, router]);

//   // 🔄 Show animated loader while checking authentication
//   if (isCheckingAuth) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-600 text-sm">Checking access permissions...</p>
//         </div>
//       </div>
//     );
//   }

//   // 🚫 Redirected user or not admin
//   if (!user || !user.isAuthenticated || user.role !== 'admin') {
//     return null;
//   }

//   return (
//     <motion.div
//       className="bg-gray-50 min-h-screen"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       {/* Header */}
//       <header className="bg-white p-4 shadow-md">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-xl font-bold">Admin Dashboard</h1>
//             <p className="text-sm text-gray-600">
//               Full access to all panels and system management.
//             </p>
//           </div>

//           <button
//             onClick={() => {
//               logout();
//               router.push('/login');
//             }}
//             className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Layout */}
//       <div className="flex p-6 space-x-6">
//         {/* Sidebar */}
//         <aside className="w-1/4">
//           <ul className="space-y-4">
//             {[
//               { key: 'powerMonitoring', label: 'Power Monitoring' },
//               { key: 'energyManagement', label: 'Energy Management' },
//               { key: 'userManagement', label: 'User Management' },
//               { key: 'alerts', label: 'Alerts & Recommendations' },
//               { key: 'systemSettings', label: 'System Settings' },
//             ].map((item) => (
//               <li key={item.key}>
//                 <button
//                   onClick={() => setActiveSection(item.key)}
//                   className={`w-full py-2 rounded-md transition-all ${
//                     activeSection === item.key
//                       ? 'bg-blue-700 text-white'
//                       : 'bg-blue-600 text-white hover:bg-blue-700'
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <main className="w-3/4 bg-white p-6 rounded-lg shadow-md">
//           <AnimatePresence mode="wait">
//             {activeSection === 'powerMonitoring' && (
//               <motion.div
//                 key="powerMonitoring"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <PowerMonitoringDashboard />
//               </motion.div>
//             )}

//             {activeSection === 'energyManagement' && (
//               <motion.div
//                 key="energyManagement"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <EnergyManagementDashboard />
//               </motion.div>
//             )}

//             {activeSection === 'userManagement' && (
//               <motion.div
//                 key="userManagement"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <UserManagementDashboard />
//               </motion.div>
//             )}

//             {activeSection === 'alerts' && (
//               <motion.div
//                 key="alerts"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <AlertsRecommendationsDashboard />
//               </motion.div>
//             )}

//             {activeSection === 'systemSettings' && (
//               <motion.div
//                 key="systemSettings"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <SystemSettingsDashboard />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </main>
//       </div>
//     </motion.div>
//   );
// };

// export default AdminDashboard;



// 'use client';

// import { useEffect, useState } from 'react';
// import { useUser } from '../../context/useContext';
// import { useRouter } from 'next/navigation.jsx';
// import PowerMonitoringDashboard from '../../components/PowerMonitoringDashbaord.jsx';
// import UserManagementDashboard from '../../components/UserManagementDashboard.jsx';
// import EnergyManagementDashboard from '../../components/EngergyManagementDashboard.jsx';
// import AlertsRecommendationsDashboard from '../../components/AlertsRecommendationsDashboard.jsx';
// import SystemSettingsDashboard from '../../components/SystemSettingsDashboard.jsx';

// const AdminDashboard = () => {
//   const { user } = useUser();
//   const router = useRouter();
//   const [activeSection, setActiveSection] = useState('powerMonitoring');


//   useEffect(() => {
//     if (!user.isAuthenticated || user.role !== 'admin') {
//       router.push('/login');
//     }
//   }, [user, router]);

//   if (!user.isAuthenticated || user.role !== 'admin') {
//     return null; // Loading or redirecting state
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <header className="bg-white p-4 shadow-md">
//         <div className="flex justify-between">
//           <div>
//             <h1 className="text-xl font-bold">Admin Dashboard</h1>
//             <p className="text-sm text-gray-600">Full access to all panels and system management.</p>
//           </div>
//           <button
//             onClick={() => {
//               // Logout functionality
//               router.push('/login');
//             }}
//             className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       <div className="flex p-6 space-x-6">
//         {/* Sidebar */}
//         <div className="w-1/4">
//           <ul className="space-y-4">
//             <li>
//               <button
//                 onClick={() => setActiveSection('powerMonitoring')}
//                 className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//               >
//                 Power Monitoring
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveSection('energyManagement')}
//                 className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//               >
//                 Energy Management
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveSection('userManagement')}
//                 className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//               >
//                 User Management
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveSection('alerts')}
//                 className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//               >
//                 Alerts & Recommendations
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setActiveSection('systemSettings')}
//                 className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//               >
//                 System Settings
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
//           {activeSection === 'powerMonitoring' && <PowerMonitoringDashboard />}
//           {activeSection === 'energyManagement' && <EnergyManagementDashboard />}
//           {activeSection === 'userManagement' && <UserManagementDashboard />}
//           {activeSection === 'alerts' && <AlertsRecommendationsDashboard />}
//           {activeSection === 'systemSettings' && <SystemSettingsDashboard />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
