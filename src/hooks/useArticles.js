import { useState, useEffect } from "react";
import { getArticles } from "../utils/Api";

/**
 * Custom hook to fetch articles based on topic, sort and order
 * Loader is shown ONLY on the very first fetch
 */
const useArticles = (topic, initialSort = "created_at", initialOrder = "DESC") => {
  const [articles, setArticles] = useState([]);
  const [sortValue, setSortValue] = useState(initialSort);
  const [orderValue, setOrderValue] = useState(initialOrder);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // only first load

  const toggleOrder = () => {
    setOrderValue(prev => (prev === "ASC" ? "DESC" : "ASC"));
  };

  useEffect(() => {
    getArticles(topic, sortValue, orderValue).then(res => {
      setArticles(res);
      if (isInitialLoading) setIsInitialLoading(false); // stop loader after first fetch
    });
  }, [topic, sortValue, orderValue]);

  return {
    articles,
    sortValue,
    setSortValue,
    orderValue,
    toggleOrder,
    isInitialLoading,
  };
};

export default useArticles;
