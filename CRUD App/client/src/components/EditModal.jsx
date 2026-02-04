import { useState } from "react";
import "../styles/modal.css";
import axios from "axios";

const EditModal = ({ user, onUpdate, onClose }) => {
  const [form, setForm] = useState(user);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/api/user-update/${form._id}`,
        form
      );

      // update UI ONLY if backend succeeded
      onUpdate(res.data.data || form);
      onClose();

    } catch (error) {
      const msg =
        error.response?.data?.message || "Error updating user";

      console.error(msg);
      alert(msg); // or toast.error(msg)
    }

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
