import { useState } from "react";
import "../styles/form.css";

const UserForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", email: "", age: "", phone: "" });
  };

  return (
    <form className="user-form" onSubmit={submitHandler}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

      <button>Add User</button>
    </form>
  );
};

export default UserForm;
