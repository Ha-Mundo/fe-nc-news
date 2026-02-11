import { useState, useEffect } from "react";
import { getArticles } from "../utils/Api";

/**
 * Custom hook for article logic.
 * Handles the logic flip for 'author' sorting while keeping uppercase strings for API compatibility.
 */
const useArticles = (topic, initialSort = "created_at", initialOrder = "DESC") => {
  const [articles, setArticles] = useState([]);
  const [sortValue, setSortValue] = useState(initialSort);
  const [orderValue, setOrderValue] = useState(initialOrder); // UI state: "DESC" or "ASC"
  const [error, setError] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const toggleOrder = () => {
    setOrderValue((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  useEffect(() => {
    setError(null);

    /* 
       If sorting by author: 
       UI "DESC" (Arrow Down) -> We want A-Z -> Send "ASC" to Backend.
       UI "ASC" (Arrow Up) -> We want Z-A -> Send "DESC" to Backend.
    */
    let apiOrder = orderValue;
    if (sortValue === "author") {
      apiOrder = orderValue === "DESC" ? "ASC" : "DESC";
    }

    getArticles(topic, sortValue, apiOrder)
      .then((res) => {
        setArticles(res);
      })
      .catch((err) => {
        console.error("API Error details:", err);
        setError(err.response?.data?.msg || "Failed to load articles.");
      })
      .finally(() => {
        setIsFirstLoad(false);
      });
  }, [topic, sortValue, orderValue]);

  return { 
    articles, 
    sortValue, 
    setSortValue, 
    orderValue, 
    toggleOrder, 
    isFirstLoad, 
    error 
  };
};

export default useArticles;