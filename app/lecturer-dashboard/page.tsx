'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/useContext';

import PowerMonitoringDashboard from '../../components/PowerMonitoringDashbaord';
import AlertsRecommendationsDashboard from '../../components/AlertsRecommendationsDashboard';

const LecturerDashboard = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('powerMonitoring');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user || !user.isAuthenticated || user.role !== 'lecturer') {
        router.push('/login');
      }
      setIsCheckingAuth(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [user, router]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-yellow-100 via-orange-100 to-amber-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-amber-700 text-sm font-medium">
            Checking access permissions...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !user.isAuthenticated || user.role !== 'lecturer') {
    return null;
  }

  return (
    <motion.div
      className="bg-linear-to-br from-yellow-50 via-orange-50 to-amber-50 min-h-screen text-amber-900"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ☀️ Animated Solar Header */}
      <header className="relative overflow-hidden bg-linear-to-r from-amber-500 via-orange-500 to-yellow-400 p-4 shadow-md text-white rounded-b-2xl">
        {/* 🌞 Rotating sun rays background */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-[400px] h-[400px] rounded-full bg-linear-radial from-yellow-300 via-amber-400 to-transparent blur-3xl"></div>
        </motion.div>

        {/* Header Content */}
        <div className="relative flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide drop-shadow-sm">
              ☀️ Lecturer Dashboard
            </h1>
            <p className="text-sm opacity-90 drop-shadow-sm">
              Viewonly.
            </p>
          </div>

          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-2 px-4 rounded-md transition-all shadow-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* 🔆 Layout */}
      <div className="flex p-6 space-x-6">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md border border-amber-100">
          <ul className="space-y-3">
            {[
              { key: 'powerMonitoring', label: 'Power Monitoring' },
              { key: 'alerts', label: 'Alerts & Recommendations' },
            ].map((item) => (
              <li key={item.key}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveSection(item.key)}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    activeSection === item.key
                      ? 'bg-linear-to-r from-yellow-500 via-amber-500 to-orange-500 text-white shadow-lg'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                  }`}
                >
                  {item.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md border border-amber-100 relative overflow-hidden">
          {/* subtle solar shimmer overlay */}
          <motion.div
            className="absolute inset-0 bg-linear-to-tr from-transparent via-yellow-100/40 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

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

export default LecturerDashboard;



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

// const LecturerDashboard = () => {
//   const { user, logout } = useUser();
//   const router = useRouter();
//   const [activeSection, setActiveSection] = useState('powerMonitoring');
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);

//   useEffect(() => {
//     // Simulate async auth check
//     const timer = setTimeout(() => {
//       if (!user || !user.isAuthenticated || user.role !== 'lecturer') {
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

//   // 🚫 Redirected user or not lecturer
//   if (!user || !user.isAuthenticated || user.role !== 'lecturer') {
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

// export default LecturerDashboard;


// 'use client';

// import { useEffect, useState } from 'react';
// import { useUser } from '../../context/useContext';
// import { useRouter }  from 'next/navigation.jsx';
// import PowerMonitoringDashboard from '../../components/PowerMonitoringDashbaord.jsx';
// import AlertsRecommendationsDashboard from '../../components/AlertsRecommendationsDashboard.jsx';

// const LecturerDashboard = () => {
//   const { user } = useUser();
//   const router = useRouter();
//   const [activeSection, setActiveSection] = useState('powerMonitoring');

//   useEffect(() => {
//     if (!user.isAuthenticated || user.role !== 'lecturer') {
//       router.push('/login');
//     }
//   }, [user, router]);

//   if (!user.isAuthenticated || user.role !== 'lecturer') {
//     return null; // Loading or redirecting state
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <header className="bg-white p-4 shadow-md">
//         <div className="flex justify-between">
//           <div>
//             <h1 className="text-xl font-bold">Lecturer Dashboard</h1>
//             <p className="text-sm text-gray-600">View-only access to power and energy data.</p>
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

// export default LecturerDashboard;
