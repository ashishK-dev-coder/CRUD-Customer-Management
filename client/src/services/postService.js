import axios from "axios";

class Post {

  // Create post service
  create(formData) {
    const url = "http://localhost:5000/api/create-post";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return axios
      .post(url, formData, config)
    
  }

// Get post service 
  getPosts() {
    const url = "http://localhost:5000/api/get-post";
    return axios
      .get(url)
    
  }

  // Delete post service
  deletePost(id) {
    const url = `http://localhost:5000/api/delete-post/${id}`;
    return axios
      .get(url)
      
  }

  // Update post service
  update(formData) {
    const url = "http://localhost:5000/api/update-post";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios
      .post(url, formData, config)
     
  }
}

export default new Post();
