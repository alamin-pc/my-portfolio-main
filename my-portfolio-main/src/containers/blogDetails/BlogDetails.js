import React, { useContext } from "react";
import "./BlogDetails.scss";
import { blogSection } from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import { Fade } from "react-reveal";
import { useParams, useHistory } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { marked } from "marked";
import DOMPurify from "dompurify";

export default function BlogDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { isDark } = useContext(StyleContext);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const blogIndex = parseInt(id);
  const blog = blogSection.blogs[blogIndex];

  if (!blog) {
    return (
      <div className={isDark ? "dark-mode" : null}>
        <Header />
        <div className="error-container">
          <h1>Blog post not found</h1>
          <button className="back-btn" onClick={() => history.push("/")}>
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  function openUrlInNewTab(url) {
    if (!url) {
      return;
    }
    var win = window.open(url, "_blank");
    win.focus();
  }

  return (
    <div className={isDark ? "dark-mode blog-detail-main" : "blog-detail-main"}>
      <div className="progress-container">
        <div
          className="progress-bar"
          id="myBar"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      <Header />
      <Fade bottom duration={1000} distance="20px">
        <div className="blog-detail-container">
          <div className="blog-detail-card">
            <button className="back-btn" onClick={() => history.goBack()}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
            <div className="blog-detail-content">
              {blog.image && (
                <div className="blog-detail-image-container">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-detail-image"
                  />
                </div>
              )}
              <div className="detail-meta">
                {blog.url && blog.url.includes("arxiv.org") && (
                  <span className="detail-badge">RESEARCH PAPER</span>
                )}
              </div>
              <h1 className="detail-title">{blog.title}</h1>
              <div
                className="detail-description-section markdown-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(marked.parse(blog.description, { breaks: true }))
                }}
              />

              {blog.footerLink ? (
                <div className="detail-footer-links">
                  {blog.footerLink.map((link, i) => (
                    <button
                      key={i}
                      className="detail-tag"
                      onClick={() => openUrlInNewTab(link.url)}
                    >
                      <i
                        className="fas fa-external-link-alt"
                        style={{ marginRight: "8px" }}
                      ></i>
                      {link.name}
                    </button>
                  ))}
                </div>
              ) : (
                blog.url && (
                  <div className="detail-footer-links">
                    <button
                      className="detail-tag"
                      onClick={() => openUrlInNewTab(blog.url)}
                    >
                      <i
                        className="fas fa-external-link-alt"
                        style={{ marginRight: "8px" }}
                      ></i>
                      View Full Paper
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Fade>
      <Footer />
    </div>
  );
}
