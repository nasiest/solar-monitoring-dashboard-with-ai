'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ShieldCheck, Users, Edit3, ArrowUpCircle, Power, X } from 'lucide-react';

const UserManagementDashboard = () => {
  const [activeModal, setActiveModal] = useState<null | 'edit' | 'promote' | 'deactivate'>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const openModal = (type: 'edit' | 'promote' | 'deactivate', role: string) => {
    setSelectedRole(role);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedRole(null);
  };

  const userRoles = [
    { name: 'Admin User', access: 'Full Access', color: 'border-amber-400', iconColor: 'text-yellow-500', desc: 'Has full control over all operations', textColor: 'text-green-600' },
    { name: 'Exam Officer', access: 'Limited Access', color: 'border-orange-400', iconColor: 'text-orange-500', desc: 'Can manage test results and exam schedules', textColor: 'text-blue-600' },
    { name: 'Lecturer', access: 'View-Only', color: 'border-yellow-400', iconColor: 'text-yellow-600', desc: 'Can view student performance and upload grades', textColor: 'text-purple-600' },
  ];

  return (
    <motion.div
      className="bg-linear-to-br from-amber-50 via-yellow-100 to-orange-50 rounded-2xl p-6 shadow-lg border border-amber-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-amber-800 flex items-center gap-2">
          <ShieldCheck className="text-yellow-500" size={24} />
          User Management
        </h3>
        <button className="bg-linear-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-md shadow hover:opacity-90 transition flex items-center gap-2">
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-inner text-center border border-yellow-200">
          <h4 className="text-lg font-semibold text-amber-700">Total Users</h4>
          <p className="text-3xl font-bold text-orange-600 mt-1">245</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-inner text-center border border-yellow-200">
          <h4 className="text-lg font-semibold text-amber-700">Active Roles</h4>
          <p className="text-3xl font-bold text-green-600 mt-1">3</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-inner text-center border border-yellow-200">
          <h4 className="text-lg font-semibold text-amber-700">Pending Invites</h4>
          <p className="text-3xl font-bold text-amber-500 mt-1">7</p>
        </div>
      </div>

      {/* User Roles */}
      <div className="space-y-4">
        {userRoles.map((role) => (
          <div
            key={role.name}
            className={`flex justify-between items-center bg-white p-4 rounded-md border-l-4 ${role.color} shadow-sm hover:shadow-md transition`}
          >
            <div className="flex items-center gap-2">
              <Users className={role.iconColor} size={20} />
              <div>
                <p className="font-semibold text-gray-800">{role.name}</p>
                <p className="text-sm text-gray-500">{role.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`${role.textColor} font-semibold`}>{role.access}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal('edit', role.name)}
                  className="p-2 text-amber-600 hover:bg-amber-100 rounded-full"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => openModal('promote', role.name)}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                >
                  <ArrowUpCircle size={18} />
                </button>
                <button
                  onClick={() => openModal('deactivate', role.name)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                >
                  <Power size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-600 italic text-center">
        Harness the power of the sun 🌞 to illuminate your team — manage, empower, and energize users with clarity.
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-md text-center relative border border-amber-200"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>

              {activeModal === 'edit' && (
                <>
                  <h2 className="text-xl font-semibold text-amber-700 mb-3">
                    Edit Role: {selectedRole}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Update permissions, name, or access level for this role.
                  </p>
                  <input
                    type="text"
                    placeholder="Update role name..."
                    className="w-full border border-yellow-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                  <button className="bg-linear-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">
                    Save Changes
                  </button>
                </>
              )}

              {activeModal === 'promote' && (
                <>
                  <h2 className="text-xl font-semibold text-green-700 mb-3">
                    Promote: {selectedRole}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to promote this role to a higher access level?
                  </p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                    Confirm Promotion
                  </button>
                </>
              )}

              {activeModal === 'deactivate' && (
                <>
                  <h2 className="text-xl font-semibold text-red-600 mb-3">
                    Deactivate: {selectedRole}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    This will temporarily disable access for this role. Proceed?
                  </p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                    Confirm Deactivation
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserManagementDashboard;




// 'use client';

// const UserManagementDashboard = () => {
//   return (
//     <div className="bg-white rounded-lg p-6 shadow-md">
//       <h3 className="text-xl font-semibold text-gray-900 mb-4">User Management</h3>
//       <div className="space-y-4">
//         <div className="flex justify-between">
//           <span className="font-medium">Admin User</span>
//           <span className="text-green-600">Full Access</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Exam Officer</span>
//           <span className="text-blue-600">Limited Access</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="font-medium">Lecturer</span>
//           <span className="text-purple-600">View-Only Access</span>
//         </div>

//         <div className="mt-4">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//             Add New User
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagementDashboard;
