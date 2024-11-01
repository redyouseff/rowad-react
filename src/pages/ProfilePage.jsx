import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../Redux/Actions/AuthAction';
import { FaEdit, FaGraduationCap, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const Profile = () => {
  const userData = useSelector((state) => state.authReducer.loggeduser);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile);
  }, [dispatch]);

  useEffect(() => {
    if (userData?.data?.data[0]) {
      setUser(userData.data.data[0]);
      setEditedUser(userData.data.data[0]);
    }
  }, [userData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would dispatch an action to update the user profile
    // For now, we'll just update the local state
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="mb-4 sm:mb-0 sm:mr-8">
                <img
                  src="./images/teacher.webp"
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600 mt-2">{user.email}</p>
                <button
                  onClick={isEditing ? handleSave : handleEdit}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  {isEditing ? 'Save Profile' : 'Edit Profile'}
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaUser className="text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name || ''}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <span>{user.name}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email || ''}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <span>{user.email}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-500 mr-2" />
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedUser.phone || ''}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <span>{user.phone}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Purchased Courses</h2>
              {user.course && user.course.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.course.map((course) => (
                    <li key={course._id} className="bg-gray-100 rounded-lg p-4 flex items-center">
                      <FaGraduationCap className="text-blue-500 mr-2" />
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.level}</p>
                        <p className="text-sm text-gray-600">{course.price} EGP</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No courses purchased yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;