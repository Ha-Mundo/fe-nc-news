import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-22.herokuapp.com/api",
});

export const getTopics = () => {
  return newsApi.get("/topics").then(res => {
    return res.data.topics;
  });
};

export const getArticles = topic => {
  return newsApi.get("/articles", { params: { topic } }).then(res => {
    console.log(res);
    return res.data.articles;
  });
};

export const getArticleById = article_id => {
  return newsApi.get(`/articles/${article_id}`).then(res => {
    console.log(res);
    return res.data.article;
  });
};
