import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-nc-news.glitch.me/api",
});

export const getTopics = () => {
  return newsApi.get("/topics").then(res => {
    return res.data.topics;
  });
};

export const getArticles = (topic, sort_by, order) => {
  return newsApi
    .get("/articles", {
      params: { topic: topic, sort_by: sort_by, order: order },
    })
    .then(res => {
      return res.data.articles;
    });
};

export const getArticleById = article_id => {
  return newsApi.get(`/articles/${article_id}`).then(res => {
    return res.data.article;
  });
};

export const updateVote = (article_id, inc_votes) => {
  return newsApi.patch(`articles/${article_id}`, { inc_votes }).then(res => {
    return res.data.article.votes;
  });
};

export const getComments = article_id => {
  return newsApi.get(`/articles/${article_id}/comments`).then(res => {
    return res.data.comments;
  });
};

export const postComment = (article_id, request) => {
  return newsApi.post(`/articles/${article_id}/comments`, request).then(res => {
    return res.data.comment;
  });
};

export const getUsers = () => {
  return newsApi.get(`/users`).then(res => res.data.users);
};

export const deleteComment = comment_id => {
  return newsApi.delete(`/comments/${comment_id}`).then(res => {
    return res;
  });
};
