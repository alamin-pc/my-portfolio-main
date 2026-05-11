import React from "react";
import "./BlogCard.scss";
import {useHistory} from "react-router-dom";

export default function BlogCard({blog, isDark, index}) {
  const history = useHistory();

  function openBlogDetail(e) {
    e.preventDefault();
    history.push(`/blog-details/${index}`);
  }

  // Determine category based on URL or title
  const getCategory = blog => {
    if (blog.url && blog.url.includes("arxiv.org")) return "RESEARCH PAPER";
    if (blog.url && blog.url.includes("google")) return "AI NEWS";
    if (blog.title && blog.title.toLowerCase().includes("lstm"))
      return "DEEP LEARNING";
    return "AI & TECH";
  };

  return (
    <div onClick={openBlogDetail} className="blog-card-clickable">
      <div className={isDark ? "blog-container dark-mode" : "blog-container"}>
        <div className="blog-card-image-container">
          <div className="blog-category-badge">{getCategory(blog)}</div>
          <img
            className="blog-card-image"
            src={
              blog.image ||
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
            } // Fallback image
            alt={blog.title}
            onError={e => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800";
            }}
          />
          <div className="image-overlay"></div>
        </div>
        <div className="blog-card-content">
          <h3 className="blog-title">{blog.title}</h3>
          <p className="blog-description">{blog.description}</p>
          <div className="blog-card-footer">
            <div className="read-more-wrapper">
              <span className="read-more-text">Read Analysis</span>
              <div className="read-more-line"></div>
            </div>
            <div className="blog-icon-circle">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
