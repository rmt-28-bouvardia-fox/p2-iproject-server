"use strict";
const { Post, User } = require("../models");
const axios = require("axios");

class PostController {
  static async showAllPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: User,
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async createPosts(req, res, next) {
    try {
      const { template_id, text0, text1, title } = req.body;
      const meme = await axios({
        method: "post",
        url: `https://api.imgflip.com/caption_image?template_id=${template_id}&username=Reiterate2231&password=w7pL8j9SZU63VF&text0=${text0}&text1=${text1}`,
      });

      const imageUrl = meme.data.data.url;

      const post = await Post.create({ title, imageUrl, UserId: req.user.id });

      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
