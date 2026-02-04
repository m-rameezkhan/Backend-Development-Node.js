import Navbar from "./components/Navbar.jsx";
import UserForm from "./components/UserForm.jsx";
import UserList from "./components/UserList.jsx";
import EditModal from "./components/EditModal.jsx";
import "./styles/main.css";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);


  useEffect(() => {

  const usersFetch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user-view');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  usersFetch();

  }, []);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user-delete/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = (updatedUser) => {
  setUsers(users =>
    users.map(user =>
      user._id === updatedUser._id ? updatedUser : user
    )
  );
};

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2 className="page-title">User Management</h2>
          <UserForm onAdd={(u) => setUsers([...users, { ...u, _id: Date.now() }])} />
        </div>

        <div className="card">
          <UserList
            users={users}
            onDelete={onDelete}
            onEdit={setEditUser}
          />
        </div>
      </div>

      {editUser && (
        <EditModal
          user={editUser}
          onUpdate={handleUpdate}
          onClose={() => setEditUser(null)}
        />
      )}
    </>
  );
};

export default App;
