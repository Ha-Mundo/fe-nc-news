import "./App.css";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ArticleList from "./components/ArticleList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:topic" element={<ArticleList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
