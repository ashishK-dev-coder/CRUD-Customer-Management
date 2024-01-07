const Customer = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const post = new Customer({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      avatar: req.file.filename,
    });

    const postData = await post.save();

    res.status(200).send({ success: true, msg: "Post Data", data: postData });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Customer.find({});
    res.status(200).send({ success: true, msg: "Posts Data", data: posts });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await Customer.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).send({ success: false, msg: "Post not found" });
    }

    res.status(200).send({ success: true, msg: "Post deleted successfully" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    if (req.file !== undefined) {
      var id = req.body.id;
      var name = req.body.name;
      var email = req.body.email;
      var phone = req.body.phone
      var address = req.body.address
      var filename = req.file.filename;

      await Customer.findByIdAndUpdate(
        { _id: id },
        { $set: { name: name, email: email, avatar: filename , phone: phone , address: address} }
      );
      res
        .status(200)
        .send({ success: true, msg: "Posts updated successfully" });
    } else {
      var id = req.body.id;
      var name = req.body.name;
      var email = req.body.email;
      var phone = req.body.phone;
      var address = req.body.address;

      await Customer.findByIdAndUpdate(
        { _id: id },
        { $set: { name: name, email: email, phone: phone , address: address} }
      );

      res
        .status(200)
        .send({ success: true, msg: "Posts updated successfully" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
};

// const updatePost = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const title = req.body.title;
//     const date = req.body.date;

//     let updateFields = { title, date };

//     if (req.file !== undefined) {
//       updateFields.image = req.file.filename;
//     }

//     await Post.findByIdAndUpdate({ _id: id }, { $set: updateFields });
//     res.status(200).send({ success: true, msg: "Post updated successfully" });
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// };
