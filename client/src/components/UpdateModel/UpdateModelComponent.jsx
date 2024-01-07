import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import postService from "../../services/postService";

function UpdateModalComponent(props) {
  const [isShow, invokeModal] = useState(false);

  const initModal = () => {
    return invokeModal(!isShow);
  };

  // form updation data
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const [address, setAddress] = useState(props.address);
  const [id, setId] = useState(props.id);
  const [selectedFile, setSelectedFile] = useState("");

  // update form handler function
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (selectedFile != "" || selectedFile.length != 0) {
      formData.append("id", id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("avatar", selectedFile);
    } else {
      formData.append("id", id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
    }

    try {
      const response = await postService.update(formData);

      if (response.data.success) {
        alert(response.data.msg);
      } else {
        alert(response.data.msg);
      }
      initModal();
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post. Please try again.");
    }
  };
  return (
    <>
      <Button variant="success" onClick={initModal}>
        Edit
      </Button>

      <Modal show={isShow} onHide={initModal}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              type="text"
              name="name"
              placeholder="Update Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <br />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Update Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <br />
            <br />
            <input
              type="text"
              name="phone"
              placeholder="Update Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <br />
            <br />
            <input
              type="text"
              name="address"
              placeholder="Update Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <br />
            <br />
            <input
              type="file"
              name="file"
              onChange={(event) => setSelectedFile(event.target.files[0])}
            />
            <br />
            <br />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
            <Button type="submit" variant="dark">
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default UpdateModalComponent;
