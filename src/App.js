import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { getUsers } from "./utils/Api";
import { UserContext } from "./utils/Context";

import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticleById from "./components/ArticleById";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState({ username: "tickle122" });

  useEffect(() => {
    getUsers().then(res => {
      setUser(res[0]);
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/topics/:topic" element={<ArticleList />} />
            <Route path="/articles/:article_id" element={<ArticleById />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
