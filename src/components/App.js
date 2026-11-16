import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "male",
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [greeting, setGreeting] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validate = () => {
  const { name, email, gender, phoneNumber, password } = form;

  if (!name.trim() || !email.trim() || !gender || !phoneNumber.trim() || !password.trim())
    return "All fields are mandatory";


  if (!/^[a-zA-Z0-9 ]+$/.test(name)) return "Name is not alphanumeric";
  if (!email.includes("@")) return "Email must contain @";
  if (!["male", "female", "other"].includes(gender))
    return "Please identify as male, female or others";
  if (!/^[0-9]+$/.test(phoneNumber)) return "Phone Number must contain only numbers";
  if (password.length < 6) return "Password must contain atleast 6 letters";

  return "";
};
  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = validate();

    if (msg) {
      setError(msg);
      setGreeting("");
    } else {
      setError("");
      setGreeting(`Hello ${form.email.split("@")[0]}`);
    }
  };

  return (
    <div id="main">
      <form onSubmit={handleSubmit} noValidate>
        <input data-testid="name" name="name" placeholder="Name"
          value={form.name} onChange={handleChange} />

        <input data-testid="email" name="email" placeholder="Email"
          value={form.email} onChange={handleChange} />

        <select data-testid="gender" name="gender"
          value={form.gender} onChange={handleChange}>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>

        <input data-testid="phoneNumber" name="phoneNumber" placeholder="Phone Number"
          value={form.phoneNumber} onChange={handleChange} />

        <input data-testid="password" name="password" type="password"
          placeholder="Password" value={form.password} onChange={handleChange} />

        <button data-testid="submit" type="submit">Submit</button>
      </form>

      {error && <div>{error}</div>}
      {greeting && <div>{greeting}</div>}
    </div>
  );
};

export default App;