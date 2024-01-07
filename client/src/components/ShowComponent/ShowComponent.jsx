import { useState, useEffect } from "react";
import postService from "../../services/postService";
import UpdateModalComponent from "../UpdateModel/UpdateModelComponent";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function ShowComponent() {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch posts from server
  const fetchPosts = async () => {
    try {
      setPosts(await postService.getPosts());
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect 
  useEffect(() => {
    fetchPosts();
  }, []);

  // deletePost function
  const deletePost = async (id, e) => {
    try {
      const response = await postService.deletePost(id);
      if (response.data.success) {
        alert(response.data.msg);
        document.getElementById(id).parentElement.parentElement.remove();
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="App">
      <h2>Show Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.data != undefined &&
        posts.data.data.length > 0 && (
          <table style={{ width: "100%" }} border="10" color="black" cellPadding={'10px'} cellSpacing={'10px'}>
            <thead border="3">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Avatar</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {posts.data.data.map((post) => (
                <tr key={post._id}>
                  <td>{post.name}</td>
                  <td>{post.email}</td>
                  <td>{post.phone}</td>
                  <td>{post.address}</td>
                  <td>
                    <img
                      src={"http://127.0.0.1:5000/api/postImages/" + post.avatar}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>
                    <button
                      id={post._id}
                      onClick={(e) => deletePost(post._id, e)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <UpdateModalComponent
                      id={post._id}
                      name={post.name}
                      email={post.email}
                      phone={post.phone}
                      address={post.address}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

export default ShowComponent;
