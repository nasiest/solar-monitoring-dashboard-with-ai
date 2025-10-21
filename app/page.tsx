'use client';

import { useUser } from '../context/useContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.isAuthenticated) {
      switch (user.role) {
        case 'admin':
          router.push('/admin-dashboard');
          break;
        case 'examofficer':
          router.push('/exam-officer-dashboard');
          break;
        case 'lecturer':
          router.push('/lecturer-dashboard');
          break;
        default:
          break;
      }
    }
  }, [user, router]);

  const team = [
    { name: 'Dr. (Mrs.) Grace T. Samuel', role: 'Project Supervisor', color: 'bg-yellow-100', image: '/images/supervisor.jpg' },
    { name: 'Engr. A. A. Bello', role: 'Co-Supervisor', color: 'bg-orange-100', image: '/images/cosupervisor.jpg' },
    { name: 'Suleiman Garba', role: 'Team Lead / Developer', color: 'bg-yellow-200', image: '/images/suleiman.jpg' },
    { name: 'Maryam Yusuf', role: 'Frontend Developer', color: 'bg-yellow-100', image: '/images/maryam.jpg' },
    { name: 'Abdullahi Musa', role: 'Backend Engineer', color: 'bg-orange-200', image: '/images/abdullahi.jpg' },
    { name: 'Ibrahim Aliyu', role: 'Database Administrator', color: 'bg-yellow-300', image: '/images/ibrahim.jpg' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-orange-100 to-blue-50 text-gray-800">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h1
          className="text-5xl font-extrabold text-yellow-600 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Solar Energy Monitoring System
        </motion.h1>
        <p className="text-xl max-w-3xl text-orange-700 mb-8">
          Department of Computer Science, Federal Polytechnic Bida 🌞 <br />
          Monitor, predict, and manage solar performance with intelligent analytics.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200 shadow-lg"
        >
          Get Started
        </button>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white/70 backdrop-blur-md text-center">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">About the Project</h2>
        <p className="max-w-4xl mx-auto text-lg text-gray-700">
          This system is a solar energy monitoring and management platform developed by the Department of Computer Science,
          Federal Polytechnic Bida. It provides real-time monitoring of solar energy generation and storage, enabling
          predictive maintenance and efficiency optimization using AI-based analytics.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-linear-to-r from-yellow-100 via-white to-blue-100 text-center">
        <h2 className="text-3xl font-bold text-orange-600 mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[
            { title: '⚡ Real-time Monitoring', desc: 'View live data of solar energy generation and usage.' },
            { title: '📈 AI Predictions', desc: 'Receive performance insights and energy forecasts.' },
            { title: '🧭 Smart Management', desc: 'Optimize panel efficiency and detect faults early.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="p-6 bg-yellow-50 rounded-2xl shadow-md hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-orange-600 mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-yellow-700 mb-10">Project Team & Supervisors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {team.map((person, i) => (
            <motion.div
              key={i}
              className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition-all ${person.color}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex items-center justify-center mb-4">
                {person.image ? (
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover shadow-md border-4 border-yellow-400"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-orange-500 text-white text-3xl font-bold shadow-md">
                    {person.name
                      .split(' ')
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-orange-700">{person.name}</h3>
              <p className="text-gray-700 mt-2">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 text-center bg-yellow-500 text-blue-900">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore the Dashboard?</h2>
        <p className="text-lg mb-6">Log in to access insights and manage solar energy systems effectively.</p>
        <button
          onClick={() => router.push('/login')}
          className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition duration-200"
        >
          Go to Login
        </button>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm bg-orange-700 text-white">
        © {new Date().getFullYear()} Department of Computer Science, Federal Polytechnic Bida. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;












// 'use client';

// import { useUser } from '../context/useContext';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const HomePage = () => {
//   const { user } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     // ✅ Check safely for authentication and role
//     if (user?.isAuthenticated) {
//       switch (user.role) {
//         case 'admin':
//           router.push('/admin-dashboard');
//           break;
//         case 'examofficer':
//           router.push('/exam-officer-dashboard');
//           break;
//         case 'lecturer':
//           router.push('/lecturer-dashboard');
//           break;
//         default:
//           break;
//       }
//     }
//   }, [user, router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="text-center p-10 space-y-6">
//         <h1 className="text-4xl font-bold text-blue-600">
//           Welcome to the Solar Monitoring Dashboard
//         </h1>
//         <p className="text-xl text-gray-600">
//           Monitor solar power generation in real-time, get AI-powered predictions, and manage the system efficiently.
//         </p>
//         <div className="mt-6 space-y-4">
//           <p className="text-lg text-gray-500">Please log in to access the dashboard.</p>
//           <button
//             onClick={() => router.push('/login')}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// 'use client';

// import { useUser } from '../context/useContext';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const HomePage = () => {
//   const { user } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     // If the user is logged in, redirect to their respective dashboard
//     if (user.isAuthenticated) {
//       if (user.role === 'admin') {
//         router.push('/admin-dashboard');
//       } else if (user.role === 'examofficer') {
//         router.push('/exam-officer-dashboard');
//       } else if (user.role === 'lecturer') {
//         router.push('/lecturer-dashboard');
//       }
//     }
//   }, [user, router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="text-center p-10 space-y-6">
//         <h1 className="text-4xl font-bold text-blue-600">Welcome to the Solar Monitoring Dashboard</h1>
//         <p className="text-xl text-gray-600">Monitor solar power generation in real-time, get AI-powered predictions, and manage the system efficiently.</p>
//         <div className="mt-6 space-y-4">
//           <p className="text-lg text-gray-500">Please log in to access the dashboard.</p>
//           <button
//             onClick={() => router.push('/login')}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
