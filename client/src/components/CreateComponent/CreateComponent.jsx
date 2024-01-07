import React, { useState } from "react";
import postService from "../../services/postService";
import "./Create.css";

function CreateComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");

  // Form Submit handler function
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("avatar", avatar);

    try {
      const response = await postService.create(formData);
      console.log("Full response:", response);
      console.log("Response data:", response.data);
      event.target.reset();
      alert("Post Created");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h2> Create Post </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter the name"
          onChange={(event) => setName(event.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter the email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Enter the phone"
          onChange={(event) => setPhone(event.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="text"
          name="address"
          placeholder="Enter the address"
          onChange={(event) => setAddress(event.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="file"
          name="avatar"
          onChange={(event) => setAvatar(event.target.files[0] || "")}
          required
        />
        <br />
        <br />
        <button>Submit</button>
      </form>
      <p style={{ color: message.includes("Error") ? "red" : "green" }}>
        {message}
      </p>
    </div>
  );
}

export default CreateComponent;
