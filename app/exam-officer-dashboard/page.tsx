'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/useContext';
import { Sun, Moon } from 'lucide-react';

import PowerMonitoringDashboard from '../../components/PowerMonitoringDashbaord';
import AlertsRecommendationsDashboard from '../../components/AlertsRecommendationsDashboard';

const ExamOfficerDashboard = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('powerMonitoring');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // 🌞 Load saved theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('solarTheme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // 💾 Save theme preference when toggled
  useEffect(() => {
    localStorage.setItem('solarTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // 👮 Authentication check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user || !user.isAuthenticated || user.role !== 'examofficer') {
        router.push('/login');
      }
      setIsCheckingAuth(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [user, router]);

  if (isCheckingAuth) {
    return (
      <div
        className={`flex items-center justify-center h-screen ${
          darkMode
            ? 'bg-linear-to-br from-amber-900 via-orange-900 to-yellow-800'
            : 'bg-linear-to-br from-amber-100 via-yellow-50 to-orange-100'
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`w-12 h-12 border-4 ${
              darkMode
                ? 'border-amber-400 border-t-transparent'
                : 'border-amber-500 border-t-transparent'
            } rounded-full animate-spin`}
          ></div>
          <p
            className={`text-sm ${
              darkMode ? 'text-yellow-300' : 'text-amber-700'
            }`}
          >
            Checking access permissions...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !user.isAuthenticated || user.role !== 'examofficer') {
    return null;
  }

  return (
    <motion.div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? 'bg-linear-to-br from-gray-900 via-amber-900 to-orange-900 text-amber-100'
          : 'bg-linear-to-br from-amber-50 via-orange-50 to-yellow-100 text-gray-800'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <header
        className={`flex justify-between items-center p-4 shadow-lg rounded-b-2xl transition-all duration-500 ${
          darkMode
            ? 'bg-linear-to-r from-amber-800 to-orange-700 text-white'
            : 'bg-linear-to-r from-yellow-500 to-amber-600 text-white'
        }`}
      >
        <div>
          <h1 className="text-2xl font-bold drop-shadow-sm flex items-center gap-2">
            ☀️ Exam Officer Dashboard
          </h1>
          <p
            className={`text-sm ${
              darkMode ? 'text-yellow-200' : 'text-yellow-100'
            }`}
          >
            Limited access
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* 🌞🌙 Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all shadow-sm ${
              darkMode
                ? 'bg-amber-700 hover:bg-amber-600 text-white'
                : 'bg-white text-amber-700 hover:bg-amber-100'
            }`}
          >
            {darkMode ? (
              <>
                <Sun className="w-5 h-5" /> Solar Day
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" /> Solar Night
              </>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className={`py-2 px-4 rounded-md font-semibold transition-all ${
              darkMode
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-white text-red-600 hover:bg-red-100'
            }`}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex p-6 space-x-6">
        {/* Sidebar */}
        <aside
          className={`w-1/4 p-4 rounded-xl shadow-md border transition-all duration-500 ${
            darkMode
              ? 'bg-amber-900/40 border-amber-800'
              : 'bg-white/80 backdrop-blur-sm border-yellow-100'
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-amber-300' : 'text-amber-700'
            }`}
          >
            Navigation
          </h2>
          <ul className="space-y-3">
            {[
              { key: 'powerMonitoring', label: '⚡ Power Monitoring' },
              { key: 'alerts', label: '🔔 Alerts & Recommendations' },
            ].map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full py-2 px-3 rounded-md font-medium transition-all ${
                    activeSection === item.key
                      ? darkMode
                        ? 'bg-linear-to-r from-amber-700 to-yellow-600 text-white shadow-md'
                        : 'bg-linear-to-r from-yellow-500 to-amber-600 text-white shadow-md'
                      : darkMode
                      ? 'bg-amber-800 text-amber-200 hover:bg-amber-700'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main
          className={`w-3/4 p-6 rounded-2xl shadow-lg border transition-all duration-500 ${
            darkMode
              ? 'bg-amber-900/50 border-amber-800'
              : 'bg-white border-yellow-100'
          }`}
        >
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
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
};

export default ExamOfficerDashboard;



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useUser } from '../../context/useContext';

// import PowerMonitoringDashboard from '../../components/PowerMonitoringDashbaord';
// // import UserManagementDashboard from '../../components/UserManagementDashboard';
// // import EnergyManagementDashboard from '../../components/EngergyManagementDashboard';
// import AlertsRecommendationsDashboard from '../../components/AlertsRecommendationsDashboard';
// // import SystemSettingsDashboard from '../../components/SystemSettingsDashboard';

// const ExamOfficerDashboard = () => {
//   const { user, logout } = useUser();
//   const router = useRouter();
//   const [activeSection, setActiveSection] = useState('powerMonitoring');
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);

//   useEffect(() => {
//     // Simulate async auth check
//     const timer = setTimeout(() => {
//       if (!user || !user.isAuthenticated || user.role !== 'examofficer') {
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

//   // 🚫 Redirected user or not exam-officer
//   if (!user || !user.isAuthenticated || user.role !== 'examofficer') {
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
//             <h1 className="text-xl font-bold">Exam Officer Dashboard</h1>
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
//               // { key: 'energyManagement', label: 'Energy Management' },
//               // { key: 'userManagement', label: 'User Management' },
//               { key: 'alerts', label: 'Alerts & Recommendations' },
//               // { key: 'systemSettings', label: 'System Settings' },
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

//             {/* {activeSection === 'energyManagement' && (
//               <motion.div
//                 key="energyManagement"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <EnergyManagementDashboard />
//               </motion.div>
//             )} */}

//             {/* {activeSection === 'userManagement' && (
//               <motion.div
//                 key="userManagement"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <UserManagementDashboard />
//               </motion.div>
//             )} */}

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

//             {/* {activeSection === 'systemSettings' && (
//               <motion.div
//                 key="systemSettings"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <SystemSettingsDashboard />
//               </motion.div>
//             )} */}
//           </AnimatePresence>
//         </main>
//       </div>
//     </motion.div>
//   );
// };

// export default ExamOfficerDashboard;


// 'use client';

// import { useEffect, useState } from 'react';
// import { useUser } from '../../context/useContext';
// import { useRouter } from 'next/navigation.jsx';
// import PowerMonitoringDashboard from '../../components/PowerMonitoringDashbaord.jsx';
// import AlertsRecommendationsDashboard from '../../components/AlertsRecommendationsDashboard.jsx';

// const ExamOfficerDashboard = () => {
//   const { user } = useUser();
//   const router = useRouter();
//   const [activeSection, setActiveSection] = useState('powerMonitoring');

//   useEffect(() => {
//     if (!user.isAuthenticated || user.role !== 'examofficer') {
//       router.push('/login');
//     }
//   }, [user, router]);

//   if (!user.isAuthenticated || user.role !== 'examofficer') {
//     return null; // Loading or redirecting state
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <header className="bg-white p-4 shadow-md">
//         <div className="flex justify-between">
//           <div>
//             <h1 className="text-xl font-bold">Exam Officer Dashboard</h1>
//             <p className="text-sm text-gray-600">Limited access to power data and alerts.</p>
//           </div>
//           <button
//             onClick={() => {
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
//                 onClick={() => setActiveSection('alerts')}
//                 className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//               >
//                 Alerts & Recommendations
//               </button>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
//           {activeSection === 'powerMonitoring' && <PowerMonitoringDashboard />}
//           {activeSection === 'alerts' && <AlertsRecommendationsDashboard />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExamOfficerDashboard;
