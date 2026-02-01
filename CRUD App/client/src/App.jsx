import Navbar from "./components/Navbar-temp.jsx";
import UserForm from "./components/UserForm.jsx";
import UserList from "./components/UserList.jsx";
import EditModal from "./components/EditModal.jsx";
import "./styles/main.css";
import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2 className="page-title">User Management</h2>
          <UserForm onAdd={(u) => setUsers([...users, { ...u, id: Date.now() }])} />
        </div>

        <div className="card">
          <UserList
            users={users}
            onDelete={(id) => setUsers(users.filter((u) => u.id !== id))}
            onEdit={setEditUser}
          />
        </div>
      </div>

      {editUser && (
        <EditModal
          user={editUser}
          onUpdate={(u) => {
            setUsers(users.map((x) => (x.id === u.id ? u : x)));
            setEditUser(null);
          }}
          onClose={() => setEditUser(null)}
        />
      )}
    </>
  );
};

export default App;
