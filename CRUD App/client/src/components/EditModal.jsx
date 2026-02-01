import { useState } from "react";
import "../styles/modal.css";

const EditModal = ({ user, onUpdate, onClose }) => {
  const [form, setForm] = useState(user);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit User</h3>

        <form onSubmit={submitHandler}>
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="email" value={form.email} onChange={handleChange} />
          <input name="age" value={form.age} onChange={handleChange} />
          <input name="phone" value={form.phone} onChange={handleChange} />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button className="edit-btn">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
