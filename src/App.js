import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticleById from "./components/ArticleById";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container">
      {/* The Toaster is placed outside main content to ensure 
        it's always on top of every other element.
      */}
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          duration: 3000,
          style: { background: '#333', color: '#fff' },
          iconTheme: {
             primary: "#4169e1",    
             secondary: "#ffffff", 
   },

        }} 
      />
      
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/topics/:topic" element={<ArticleList />} />
            <Route path="/articles/:article_id" element={<ArticleById />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;