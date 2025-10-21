'use client';

import { useState } from 'react';
import { Sun, BatteryCharging, Zap, CloudSun } from 'lucide-react';

const SystemSettingsDashboard = () => {
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [batteryPriority, setBatteryPriority] = useState(true);
  const [lowBattery, setLowBattery] = useState(20);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [energySaving, setEnergySaving] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);

  // Example solar forecast data
  const currentOutput = 3200; // in Watts
  const predictedOutput = 4500; // in Watts

  // Example panel statuses
  const panels = [
    { id: 1, name: 'Panel A', status: 'normal' }, // normal, low, offline
    { id: 2, name: 'Panel B', status: 'low' },
    { id: 3, name: 'Panel C', status: 'offline' },
    { id: 4, name: 'Panel D', status: 'normal' },
  ];

  // Helper for status color
  const statusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500';
      case 'low':
        return 'bg-yellow-400';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Solar Power Forecast Card */}
      <div className="bg-yellow-100 rounded-lg shadow-lg p-6 border border-yellow-300 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sun className="w-12 h-12 text-yellow-500 animate-pulse" />
          <div>
            <h4 className="text-lg font-semibold text-yellow-800">Solar Power Forecast</h4>
            <p className="text-sm text-yellow-700">Today’s Predicted Energy Output</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-800">{currentOutput} W</div>
          <div className="text-sm text-yellow-700">Predicted: {predictedOutput} W</div>
        </div>
      </div>

      {/* Solar Panel Status */}
      <div className="bg-yellow-50 rounded-lg p-6 shadow-lg border border-yellow-200">
        <h4 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center gap-2">
          <CloudSun className="w-6 h-6 text-yellow-600" />
          Solar Panel Status
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="flex items-center gap-2 p-3 bg-yellow-100 rounded-lg border border-yellow-300 shadow-sm"
            >
              <div className={`w-4 h-4 rounded-full ${statusColor(panel.status)}`}></div>
              <span className="text-sm font-medium text-yellow-800">{panel.name}</span>
              <span className="text-xs text-yellow-700 capitalize">({panel.status})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Settings Dashboard */}
      <div className="bg-yellow-50 rounded-lg p-6 shadow-lg border border-yellow-200">
        <h3 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center gap-2">
          <Sun className="w-6 h-6 text-yellow-600" />
          System Settings
        </h3>

        <div className="space-y-5">
          {/* Auto Power Switching */}
          <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-300 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Auto Power Switching</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={autoSwitch}
                onChange={() => setAutoSwitch(!autoSwitch)}
              />
              <div className="w-12 h-6 bg-yellow-300 peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-yellow-400 after:rounded-full after:h-5 after:w-5 transition-all peer-checked:bg-yellow-600"></div>
            </label>
          </div>

          {/* Battery Backup Priority */}
          <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-300 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BatteryCharging className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Battery Backup Priority</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={batteryPriority}
                onChange={() => setBatteryPriority(!batteryPriority)}
              />
              <div className="w-12 h-6 bg-yellow-300 peer-focus:ring-4 peer-focus:ring-yellow-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-yellow-400 after:rounded-full after:h-5 after:w-5 transition-all peer-checked:bg-yellow-600"></div>
            </label>
          </div>

          {/* Low Battery Threshold */}
          <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-300 shadow-sm">
            <span className="text-sm font-medium text-yellow-800">Low Battery Threshold (%)</span>
            <input
              type="range"
              min="10"
              max="50"
              value={lowBattery}
              onChange={(e) => setLowBattery(Number(e.target.value))}
              className="w-full mt-2 accent-yellow-500"
            />
            <div className="text-right text-yellow-700 font-semibold mt-1">{lowBattery}%</div>
          </div>

          {/* Additional Settings */}
          <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-300 shadow-sm">
            <h4 className="text-sm font-semibold text-yellow-800 mb-3">Additional Settings</h4>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center gap-2 text-yellow-700">
                <input
                  type="checkbox"
                  className="accent-yellow-500"
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                />
                Enable Email Alerts
              </label>

              <label className="inline-flex items-center gap-2 text-yellow-700">
                <input
                  type="checkbox"
                  className="accent-yellow-500"
                  checked={smsAlerts}
                  onChange={() => setSmsAlerts(!smsAlerts)}
                />
                Enable SMS Alerts
              </label>

              <label className="inline-flex items-center gap-2 text-yellow-700">
                <input
                  type="checkbox"
                  className="accent-yellow-500"
                  checked={energySaving}
                  onChange={() => setEnergySaving(!energySaving)}
                />
                Enable Energy Saving Mode
              </label>

              <label className="inline-flex items-center gap-2 text-yellow-700">
                <input
                  type="checkbox"
                  className="accent-yellow-500"
                  checked={performanceMode}
                  onChange={() => setPerformanceMode(!performanceMode)}
                />
                High Performance Mode
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsDashboard;




// 'use client';

// const SystemSettingsDashboard = () => {
//   return (
//     <div className="bg-white rounded-lg p-6 shadow-md">
//       <h3 className="text-xl font-semibold text-gray-900 mb-4">System Settings</h3>
//       <div className="space-y-4">
//         <div className="p-3 bg-white rounded border">
//           <div className="flex items-center justify-between">
//             <span className="text-sm">Auto Power Switching</span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input type="checkbox" className="sr-only peer" checked />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600"></div>
//             </label>
//           </div>
//         </div>
//         <div className="p-3 bg-white rounded border">
//           <div className="flex items-center justify-between">
//             <span className="text-sm">Battery Backup Priority</span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input type="checkbox" className="sr-only peer" checked />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600"></div>
//             </label>
//           </div>
//         </div>
//         <div className="p-3 bg-white rounded border">
//           <span className="text-sm">Low Battery Threshold (%)</span>
//           <input
//             type="range"
//             min="10"
//             max="50"
//             defaultValue="20"
//             className="w-full"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SystemSettingsDashboard;
