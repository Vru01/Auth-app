import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get('/user/profile');
                setUser(res.data);
            } catch (err) {
                console.error('Error fetching profile', err);
                setError(err.response ? err.response.data : 'Error fetching profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            await axios.put('/user/profile', user);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating profile', err);
            setError(err.response ? err.response.data : 'Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.delete('/user/profile');
            navigate('/register');
        } catch (err) {
            console.error('Error deleting profile', err);
            setError(err.response ? err.response.data : 'Error deleting profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl mb-4">Profile</h2>
                {isEditing ? (
                    <div>
                        <div>
                            <label><strong>Name:</strong></label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="border p-2 rounded mb-2"
                            />
                        </div>
                        <div>
                            <label><strong>Email:</strong></label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="border p-2 rounded mb-2"
                            />
                        </div>
                        <div>
                            <label><strong>Phone:</strong></label>
                            <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                className="border p-2 rounded mb-2"
                            />
                        </div>
                        <div>
                            <label><strong>Address:</strong></label>
                            <input
                                type="text"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                                className="border p-2 rounded mb-2"
                            />
                        </div>
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white p-2 rounded mt-4"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white p-2 rounded mt-4 ml-2"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white p-2 rounded mt-4"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-4">
                <button
                    onClick={() => navigate('/login')}
                    className="bg-green-500 text-white p-2 rounded mr-2"
                >
                    Go to Login
                </button>
                <button
                    onClick={() => navigate('/register')}
                    className="bg-purple-500 text-white p-2 rounded mr-2"
                >
                    Go to Register
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white p-2 rounded"
                >
                    Delete Profile
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
