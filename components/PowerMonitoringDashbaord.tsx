'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import { Sun, Zap, Battery, Leaf } from 'lucide-react';

let socket: any;

const PowerMonitoringDashboard = () => {
  const [powerData, setPowerData] = useState<any>(null);
  const [predictedPower, setPredictedPower] = useState<number | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number>(78);
  const [efficiency, setEfficiency] = useState<number>(92);
  const [co2Savings, setCo2Savings] = useState<number>(320);

  useEffect(() => {
    socket = io('http://localhost:3001');

    socket.on('powerData', (data: any) => {
      setPowerData(data);
    });

    socket.on('predictedPower', (data: any) => {
      setPredictedPower(data.predictedPower);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="
        rounded-2xl p-8 shadow-xl border
        bg-linear-to-br from-yellow-100 via-orange-100 to-amber-200
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        border-yellow-300/40 dark:border-amber-700/40
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Sun className="w-8 h-8 text-amber-500 dark:text-amber-400 animate-pulse" />
        <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-300">
          Solar Power Monitoring Dashboard
        </h3>
      </div>

      {/* Real-time Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Current Power */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            p-5 rounded-xl shadow-md border
            bg-white/70 dark:bg-gray-800/70 backdrop-blur-md
            border-yellow-200 dark:border-amber-700
          "
        >
          <div className="flex items-center gap-3">
            <Zap className="text-amber-500 dark:text-amber-400 w-6 h-6" />
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
              Current Power
            </p>
          </div>
          <p className="text-3xl font-bold text-amber-700 dark:text-amber-300 mt-2">
            {powerData ? `${powerData.power} kW` : 'Loading...'}
          </p>
        </motion.div>

        {/* Predicted Power */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            p-5 rounded-xl shadow-md border
            bg-white/70 dark:bg-gray-800/70 backdrop-blur-md
            border-orange-200 dark:border-orange-700
          "
        >
          <div className="flex items-center gap-3">
            <Sun className="text-orange-500 dark:text-orange-400 w-6 h-6" />
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
              Predicted Power (AI)
            </p>
          </div>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-300 mt-2">
            {predictedPower !== null ? `${predictedPower.toFixed(2)} kW` : 'Calculating...'}
          </p>
        </motion.div>

        {/* Battery Level */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            p-5 rounded-xl shadow-md border
            bg-white/70 dark:bg-gray-800/70 backdrop-blur-md
            border-green-200 dark:border-emerald-700
          "
        >
          <div className="flex items-center gap-3">
            <Battery className="text-green-500 dark:text-emerald-400 w-6 h-6" />
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
              Battery Level
            </p>
          </div>
          <p className="text-3xl font-bold text-green-600 dark:text-emerald-300 mt-2">
            {batteryLevel}%
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="bg-linear-to-r from-green-400 to-emerald-500 dark:from-emerald-500 dark:to-green-400 h-2 rounded-full"
              style={{ width: `${batteryLevel}%` }}
            ></div>
          </div>
        </motion.div>

        {/* CO₂ Savings */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            p-5 rounded-xl shadow-md border
            bg-white/70 dark:bg-gray-800/70 backdrop-blur-md
            border-lime-200 dark:border-lime-700
          "
        >
          <div className="flex items-center gap-3">
            <Leaf className="text-lime-600 dark:text-lime-400 w-6 h-6" />
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
              CO₂ Saved
            </p>
          </div>
          <p className="text-3xl font-bold text-lime-700 dark:text-lime-300 mt-2">
            {co2Savings} kg
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            This week’s environmental impact 🌍
          </p>
        </motion.div>
      </div>

      {/* Efficiency Section */}
      <div
        className="
          mt-8 p-5 rounded-xl shadow-md border
          bg-white/60 dark:bg-gray-800/60
          border-amber-200 dark:border-amber-700
        "
      >
        <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
          System Efficiency
        </h4>
        <div className="flex items-center justify-between">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-4">
            <div
              className="bg-linear-to-r from-yellow-400 to-orange-500 dark:from-amber-500 dark:to-orange-400 h-3 rounded-full"
              style={{ width: `${efficiency}%` }}
            ></div>
          </div>
          <p className="font-bold text-amber-700 dark:text-amber-300">
            {efficiency}%
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PowerMonitoringDashboard;



// 'use client';

// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// let socket: any;

// const PowerMonitoringDashboard = () => {
//   const [powerData, setPowerData] = useState<any>(null);
//   const [predictedPower, setPredictedPower] = useState<number | null>(null);

//   useEffect(() => {
//     // Connect to the backend via Socket.io
//     socket = io('http://localhost:3001'); // Your Express.js server

//     socket.on('powerData', (data: any) => {
//       setPowerData(data);
//     });

//     socket.on('predictedPower', (data: any) => {
//       setPredictedPower(data.predictedPower);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-md">
//       <h3 className="text-xl font-semibold text-gray-900 mb-4">Power Generation (Real-time)</h3>
//       <div className="space-y-2">
//         <div>
//           <p className="text-lg font-medium">Current Power: {powerData ? powerData.power : 'Loading...'} kW</p>
//         </div>
//         {predictedPower !== null && (
//           <div>
//             <p className="text-lg font-medium">
//               Predicted Power (AI): {predictedPower.toFixed(2)} kW
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PowerMonitoringDashboard;
