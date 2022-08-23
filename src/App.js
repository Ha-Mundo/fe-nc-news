import "./App.css";
import "./index.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ArticleList from "./components/ArticleList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route path="/articles" element={<ArticleList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
