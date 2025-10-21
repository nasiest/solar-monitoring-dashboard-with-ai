'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Sun, Zap, Leaf } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const EnergyManagementDashboard = () => {
  const [usage, setUsage] = useState(2.5);
  const [generation, setGeneration] = useState(18.7);
  const [efficiency, setEfficiency] = useState(87);
  const [batteryLevel, setBatteryLevel] = useState(72);
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Simulated Data
  const dailyData = [
    { time: '08:00', usage: 2.1, generation: 4.3 },
    { time: '10:00', usage: 2.4, generation: 7.6 },
    { time: '12:00', usage: 2.8, generation: 10.2 },
    { time: '14:00', usage: 3.1, generation: 9.8 },
    { time: '16:00', usage: 2.6, generation: 6.4 },
  ];

  const weeklyData = [
    { time: 'Mon', usage: 16.2, generation: 54.1 },
    { time: 'Tue', usage: 15.5, generation: 52.8 },
    { time: 'Wed', usage: 17.1, generation: 58.2 },
    { time: 'Thu', usage: 18.0, generation: 60.7 },
    { time: 'Fri', usage: 16.7, generation: 55.9 },
    { time: 'Sat', usage: 14.8, generation: 49.3 },
    { time: 'Sun', usage: 13.5, generation: 47.2 },
  ];

  const monthlyData = [
    { time: 'Week 1', usage: 110.2, generation: 400.5 },
    { time: 'Week 2', usage: 98.6, generation: 372.1 },
    { time: 'Week 3', usage: 120.9, generation: 410.3 },
    { time: 'Week 4', usage: 107.4, generation: 390.8 },
  ];

  const getData = () => {
    switch (view) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const handleOptimize = () => {
    setUsage((prev) => prev - 0.2);
    setEfficiency((prev) => prev + 2);
    setBatteryLevel((prev) => Math.min(prev + 3, 100));
  };

  // Dynamic Simulations
  useEffect(() => {
    const interval = setInterval(() => {
      setGeneration((prev) => prev + (Math.random() - 0.5) * 0.5);
      setUsage((prev) => prev + (Math.random() - 0.5) * 0.2);
      setBatteryLevel((prev) => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-linear-to-br from-yellow-50 via-white to-amber-100 rounded-2xl p-8 shadow-xl border border-yellow-200">
      <h3 className="text-2xl font-bold text-amber-700 mb-6 flex items-center gap-2">
        <Sun className="text-yellow-500" />
        Solar Energy Management
      </h3>

      {/* --- Metrics --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-xl p-5 shadow-md border border-yellow-100"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700 flex items-center gap-2">
              <Zap className="text-yellow-500" /> Current Usage
            </span>
            <span className="text-green-600 font-bold text-lg">{usage.toFixed(1)} kW</span>
          </div>
          <div className="h-2 bg-yellow-200 rounded-full">
            <div
              className="h-2 bg-yellow-500 rounded-full transition-all"
              style={{ width: `${(usage / 5) * 100}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-xl p-5 shadow-md border border-yellow-100"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700 flex items-center gap-2">
              <Battery className="text-green-500" /> Energy Generated
            </span>
            <span className="text-blue-600 font-bold text-lg">{generation.toFixed(1)} kWh</span>
          </div>
          <div className="h-2 bg-blue-100 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all"
              style={{ width: `${(generation / 20) * 100}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-xl p-5 shadow-md border border-yellow-100 sm:col-span-2"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700 flex items-center gap-2">
              <Leaf className="text-green-600" /> System Efficiency
            </span>
            <span className="text-amber-700 font-bold text-lg">{efficiency}%</span>
          </div>
          <div className="h-2 bg-amber-100 rounded-full">
            <div
              className="h-2 bg-amber-600 rounded-full transition-all"
              style={{ width: `${efficiency}%` }}
            ></div>
          </div>
        </motion.div>
      </div>

      {/* --- Chart Toggle Buttons --- */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-amber-700 flex items-center gap-2">
          <Sun className="text-yellow-500" /> Solar Power Overview
        </h4>
        <div className="flex gap-2">
          {['daily', 'weekly', 'monthly'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                view === v
                  ? 'bg-amber-500 text-white shadow'
                  : 'bg-yellow-100 text-amber-700 hover:bg-yellow-200'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* --- Chart --- */}
      <div className="bg-white rounded-xl p-5 shadow-md border border-yellow-100 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fcd34d" />
                <XAxis dataKey="time" stroke="#92400e" />
                <YAxis stroke="#92400e" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff8e1', borderColor: '#fbbf24' }}
                  labelStyle={{ color: '#78350f' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  name="Usage (kW)"
                />
                <Line
                  type="monotone"
                  dataKey="generation"
                  stroke="#22c55e"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                  name="Generation (kWh)"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Battery Storage Visualization --- */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-r from-yellow-100 to-amber-50 border border-yellow-200 p-6 rounded-xl shadow-md text-center mb-8"
      >
        <h4 className="text-lg font-semibold text-amber-700 mb-4 flex justify-center items-center gap-2">
          <Battery className="text-green-600" /> Battery Storage
        </h4>

        <div className="relative flex justify-center items-center">
          <svg className="w-32 h-32 rotate-90">
            <circle
              cx="64"
              cy="64"
              r="55"
              stroke="#fde68a"
              strokeWidth="10"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="55"
              stroke="url(#grad)"
              strokeWidth="10"
              fill="none"
              strokeDasharray="345"
              strokeDashoffset={345 - (batteryLevel / 100) * 345}
              strokeLinecap="round"
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute text-amber-800 font-bold text-2xl">
            {batteryLevel.toFixed(0)}%
          </span>
        </div>

        <p className="mt-3 text-gray-700 text-sm">
          {batteryLevel > 80
            ? 'Battery fully charged — great solar performance!'
            : batteryLevel > 40
            ? 'Battery partially charged — system performing well.'
            : 'Low battery level — consider optimizing energy usage.'}
        </p>
      </motion.div>

      {/* --- Optimize Button --- */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleOptimize}
        className="bg-linear-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:from-yellow-600 hover:to-amber-700 transition-all"
      >
        Optimize Energy Usage
      </motion.button>

      {/* --- Tips --- */}
      <div className="mt-8 bg-white p-5 rounded-xl shadow-sm border border-yellow-100">
        <h4 className="text-lg font-semibold text-amber-700 mb-3">🌞 Energy Saving Tips</h4>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          <li>Store solar energy during daylight for nighttime use.</li>
          <li>Clean panels regularly for better efficiency.</li>
          <li>Optimize daily to maintain 90%+ efficiency.</li>
          <li>Monitor weekly for performance trends.</li>
        </ul>
      </div>
    </div>
  );
};

export default EnergyManagementDashboard;



// 'use client';

// const EnergyManagementDashboard = () => {
//   return (
//     <div className="bg-white rounded-lg p-6 shadow-md">
//       <h3 className="text-xl font-semibold text-gray-900 mb-4">Energy Management</h3>
//       <div className="space-y-4">
//         <div className="flex justify-between">
//           <span className="font-medium">Current Energy Usage</span>
//           <span className="text-green-600 font-bold">2.5 kW</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Total Energy Generation</span>
//           <span className="text-blue-600 font-bold">18.7 kWh</span>
//         </div>
//         <div className="mt-4">
//           <button className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
//             Optimize Energy Usage
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnergyManagementDashboard;
