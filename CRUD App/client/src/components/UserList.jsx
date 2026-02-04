import "../styles/table.css";

const UserList = ({ users, onDelete, onEdit }) => {
  if (users.length === 0) return <p>No users found</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.age}</td>
            <td>{u.phone}</td>
            <td>
              <button className="action-btn edit-btn" onClick={() => onEdit(u)}>
                Edit
              </button>
              <button className="action-btn delete-btn" onClick={() => onDelete(u._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
