"use strict";
const { Post, User, Like } = require("../models");
const axios = require("axios");

class PostController {
  static async showAllPosts(req, res, next) {
    try {
      const { page } = req.query;

      const postsRaw = await Post.findAll();

      const limit = 3;
      const offset = page ? page * limit : 0;

      let options = {
        limit: limit,
        offset: offset,
        include: [User, Like],
        order: [["id", "DESC"]],
      };

      const posts = await Post.findAndCountAll(options);

      const pageData = (data, page, limit, totalItems) => {
        const { rows: posts } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);

        return { totalItems, posts, totalPages, currentPage };
      };

      const result = pageData(posts, page, limit, postsRaw.length);

      if (result.posts.length === 0) {
        throw { name: "the_end" };
      }

      res.status(200).json(result);
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

      const memesData = memes.data.data.memes;

      const { page } = req.query;
      let currentPage = page;
      if (!page) {
        currentPage = 1;
      }
      const limit = 10;

      function paginate(array, page_size, page_number) {
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      }

      const memesPagination = paginate(memesData, limit, currentPage);

      if (memesPagination.length === 0) {
        throw { name: "the_end" };
      }

      const totalItems = memesData.length;
      const totalPages = Math.ceil(totalItems / limit);

      const result = {
        totalItems,
        memes: memesPagination,
        totalPages,
        currentPage,
      };

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async showPost(req, res, next) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id, {
        include: [User, Like],
      });
      if (!post) {
        throw { name: "post_not_found" };
      } else {
        res.status(200).json(post);
      }
    } catch (error) {
      next(error);
    }
  }

  static async showUserPost(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: Like,
        where: { UserId: req.user.id },
      });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);

      if (!post) {
        throw { name: "post_not_found" };
      }

      const status = await Post.destroy({ where: { id, UserId: req.user.id } });

      if (status === 0) {
        throw { name: "post_not_found" };
      }

      console.log(status);

      res.status(200).json({ message: `Post has been deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async editPost(req, res, next) {
    try {
      const { title } = req.body;
      const { id } = req.params;
      if (!title) {
        throw { name: "invalid_input" };
      }
      const post = await Post.findByPk(id);
      if (!post) {
        throw { name: "post_not_found" };
      }

      const status = await Post.update(
        { title },
        {
          where: {
            id,
            UserId: req.user.id,
          },
        }
      );

      if (status[0] === 0) {
        throw { name: "post_not_found" };
      }

      res.status(200).json({ message: `Post with id ${post.id} updated` });
    } catch (error) {
      next(error);
    }
  }

  static async likePost(req, res, next) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);
      if (!post) {
        throw { name: "post_not_found" };
      }

      const likeCheck = await Like.findOne({
        where: {
          UserId: req.user.id,
          PostId: id,
        },
      });

      if (likeCheck) {
        throw { name: "already_liked" };
      }

      const status = await Like.create({
        UserId: req.user.id,
        PostId: id,
      });

      res.status(200).json(status);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
