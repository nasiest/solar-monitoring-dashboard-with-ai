'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion'; // ✅ Type-only import
import {
  Sun,
  Wind,
  AlertTriangle,
  Droplets,
  BatteryCharging,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const AlertsRecommendationsDashboard = () => {
  const [solarIntensity, setSolarIntensity] = useState(75);
  const [todayGeneration, setTodayGeneration] = useState(0);
  const [predictedGeneration, setPredictedGeneration] = useState(10);
  const [instantKW, setInstantKW] = useState(4.5);
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', actual: 38 },
    { day: 'Tue', actual: 41 },
    { day: 'Wed', actual: 39 },
    { day: 'Thu', actual: 43 },
    { day: 'Fri', actual: 44 },
    { day: 'Sat', actual: 47 },
    { day: 'Sun', actual: 46 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSolarIntensity((prev) => Math.min(Math.max(Math.round(prev + (Math.random() * 10 - 5)), 50), 100));
      setWeeklyData((prev) =>
        prev.map((entry) => ({ ...entry, actual: Math.max(30, Math.min(55, entry.actual + (Math.random() * 4 - 2))) }))
      );
      setTodayGeneration((prev) => Math.min(prev + Math.random() * 0.5, 12));
      setPredictedGeneration((prev) => Math.min(Math.max(prev + (Math.random() * 0.2 - 0.1), todayGeneration), 12));
      setInstantKW(Math.max(0, Math.min(6, 3 + Math.random() * 3)));
    }, 3000);

    return () => clearInterval(interval);
  }, [todayGeneration]);

  const recommendations = [
    { icon: <Droplets className="text-amber-500" />, title: 'Panel Cleaning Required', message: 'Panels A3–A5 showing 12% efficiency loss. Schedule cleaning soon.', bg: 'bg-amber-50 border-l-4 border-amber-500', text: 'text-amber-700' },
    { icon: <Sun className="text-yellow-500" />, title: 'Optimal Solar Conditions', message: 'High irradiance (850 W/m²) expected — maximize daytime charging.', bg: 'bg-yellow-50 border-l-4 border-yellow-500', text: 'text-yellow-700' },
    { icon: <Wind className="text-sky-500" />, title: 'Cool Breeze Detected', message: 'Wind speeds up to 10 km/h help maintain panel temperature below 40°C.', bg: 'bg-sky-50 border-l-4 border-sky-500', text: 'text-sky-700' },
    { icon: <BatteryCharging className="text-green-600" />, title: 'Battery Efficiency High', message: 'Battery storage currently operating at 93% optimal level.', bg: 'bg-green-50 border-l-4 border-green-500', text: 'text-green-700' },
    { icon: <AlertTriangle className="text-red-500" />, title: 'Inverter Voltage Warning', message: 'Inverter #2 output fluctuating — inspect connections and cooling system.', bg: 'bg-red-50 border-l-4 border-red-500', text: 'text-red-700' },
  ];

  const transition: Transition = { duration: 0.5, ease: 'easeOut' };
  const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition } };

  const combinedChartData = [...weeklyData, { day: 'Today', actual: todayGeneration, predicted: predictedGeneration }];
  const gaugeRotation = (instantKW / 6) * 180;

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="rounded-xl p-6 shadow-md bg-linear-to-br from-yellow-100 via-white to-amber-50 border border-yellow-200">
      {/* Solar Activity + Intensity + Gauge */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-6 bg-linear-to-r from-yellow-200 to-amber-100 p-4 rounded-lg border border-amber-300">
        <div className="flex items-center gap-3">
          <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
            <Sun className="text-yellow-500 w-10 h-10 drop-shadow-md" />
          </motion.div>
          <div>
            <p className="text-lg font-semibold text-amber-800">Solar Activity</p>
            <p className="text-sm text-amber-700 opacity-80">Real-time sunlight intensity</p>
          </div>
        </div>

        {/* Intensity Meter + Today Generation */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="relative w-40 h-3 bg-yellow-200 rounded-full overflow-hidden">
              <motion.div className="absolute top-0 left-0 h-full bg-linear-to-r from-amber-400 to-yellow-500" animate={{ width: `${solarIntensity}%` }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
            </div>
            <span className="text-amber-700 font-semibold">{solarIntensity}%</span>
          </div>

          <div className="text-amber-800 font-semibold text-center">
            🌅 Today: {todayGeneration.toFixed(2)} kWh / Predicted: {predictedGeneration.toFixed(2)} kWh
          </div>
        </div>

        {/* Live Solar Power Gauge */}
        <div className="relative w-36 h-20">
          <svg viewBox="0 0 120 60">
            <path d="M10,50 A50,50 0 0,1 110,50" stroke="#fbbf24" strokeWidth="10" fill="none" opacity={0.3} strokeLinecap="round" />
            <motion.path d="M10,50 A50,50 0 0,1 110,50" stroke="#f59e0b" strokeWidth="10" fill="none" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: gaugeRotation / 180 }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-end -mb-4">
            <span className="text-amber-800 font-bold text-sm">{instantKW.toFixed(2)} kW</span>
            <span className="text-amber-600 text-xs">Current Output</span>
          </div>
        </div>
      </motion.div>

      {/* Alerts & Recommendations */}
      <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
        <Sun className="text-yellow-500" /> Alerts & Recommendations
      </motion.h3>

      <motion.div variants={containerVariants} className="space-y-4">
        {recommendations.map((rec, idx) => (
          <motion.div key={idx} variants={itemVariants} whileHover={{ scale: 1.02, boxShadow: '0px 4px 12px rgba(255,200,0,0.3)' }} className={`p-4 rounded-lg flex items-start gap-3 ${rec.bg}`}>
            <div className="mt-1">{rec.icon}</div>
            <div>
              <p className={`font-semibold ${rec.text}`}>{rec.title}</p>
              <p className={`text-sm ${rec.text} opacity-80`}>{rec.message}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Combined Weekly + Today Chart */}
      <motion.div variants={itemVariants} className="mt-6 p-5 bg-linear-to-br from-amber-100 to-yellow-50 border border-amber-300 rounded-lg shadow-inner">
        <h4 className="text-lg font-semibold text-amber-800 mb-2 flex items-center gap-2">
          <BarChart3 className="text-amber-600 w-5 h-5" /> Weekly + Today Generation
        </h4>
        <div className="bg-white rounded-lg border border-amber-200 p-3">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={combinedChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#facc15" opacity={0.3} />
              <XAxis dataKey="day" stroke="#92400e" />
              <YAxis stroke="#92400e" />
              <Tooltip contentStyle={{ backgroundColor: '#fff7ed', border: '1px solid #fbbf24', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="actual" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: '#f59e0b' }} />
              <Line type="monotone" dataKey="predicted" stroke="#ea580c" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#ea580c' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlertsRecommendationsDashboard;






// 'use client';

// const AlertsRecommendationsDashboard = () => {
//   return (
//     <div className="bg-white rounded-lg p-6 shadow-md">
//       <h3 className="text-xl font-semibold text-gray-900 mb-4">Alerts & Recommendations</h3>
//       <div className="space-y-4">
//         <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
//           <p className="font-medium text-yellow-800">Panel Cleaning Required</p>
//           <p className="text-sm text-yellow-700">Panels A3-A5 showing reduced efficiency</p>
//         </div>
//         <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
//           <p className="font-medium text-blue-800">Optimal Weather Conditions</p>
//           <p className="text-sm text-blue-700">High solar irradiance expected today</p>
//         </div>
//         <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
//           <p className="font-medium text-green-800">Performance Alert</p>
//           <p className="text-sm text-green-700">Daily generation target exceeded by 15%</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlertsRecommendationsDashboard;
