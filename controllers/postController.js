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
      const USERNAME = process.env.USERNAME_FLIP;
      const PASSWORD = process.env.PASSWORD_FLIP;

      const meme = await axios({
        method: "post",
        url: `https://api.imgflip.com/caption_image?template_id=${template_id}&username=${USERNAME}&password=${PASSWORD}&text0=${text0}&text1=${text1}`,
      });

      if (!meme.data.success) {
        throw { name: "imgflip_error", message: meme.data.error_message };
      }

      const imageUrl = meme.data.data.url;

      const post = await Post.create({ title, imageUrl, UserId: req.user.id });

      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  static async getAllMemes(req, res, next) {
    try {
      const memes = await axios({
        method: "get",
        url: `https://api.imgflip.com/get_memes`,
      });

      if (!memes.data.success) {
        throw { name: "imgflip_error", message: memes.data.error_message };
      }

      res.status(201).json(memes.data.data.memes);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
