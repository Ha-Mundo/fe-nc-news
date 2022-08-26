import "./App.css";
import "./index.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { getUsers } from "./utils/Api";
import { UserContext } from "./utils/Context";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ArticleList from "./components/ArticleList";
import ArticleById from "./components/ArticleById";

function App() {
  const [user, setUser] = useState({ username: "weegembump" });

  useEffect(() => {
    getUsers().then(res => {
      setUser(res[0]);
    });
  }, []);

  console.log(user);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/topics/:topic" element={<ArticleList />} />
            <Route path="/articles/:article_id" element={<ArticleById />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
