import { useState } from "react";
import "../styles/form.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UserForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post('http://localhost:3000/api/user-insert', form);
      toast.success('User added successfully!');
      console.log('User added:', response.data);
      setForm({ name: "", email: "", age: "", phone: "" });
    } catch (error) {
      console.error('There was an error adding the user!', error.response.data);
      if (error.status === 409) {
        return toast.error('User with this email already exists');
      }
      return toast.error('Error adding user');
    }
    onAdd(form);
    setForm({ name: "", email: "", age: "", phone: "" });
  };

  return (
    <>
      <ToastContainer />
      <form className="user-form" onSubmit={submitHandler}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

        <button>Add User</button>
      </form>
    </>
  );
};

export default UserForm;
