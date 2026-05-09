import React from "react";
import { Link } from "@tanstack/react-router";

import { blogs } from "./BlogsData";

const BlogGrid = () => {
  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog.slug}>
          <div className="blog-img">
            <img src={blog.img} alt={blog.title} />
          </div>

          <div className="blog-content">
        <div className="date">Published on-{blog.date}</div>
            <h1><b>{blog.title}</b></h1>
            <p>{blog.desc}</p>

            {/* ✅ FIXED LINK */}<br />
            <Link
              to="/blog-details/$slug"
              params={{ slug: blog.slug }}
              className="read-btn"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}

      <style>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .blog-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          transition: 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
        .blog-card:hover {
          transform: translateY(-8px);
        }
        .blog-img img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }
        .blog-content {
          padding: 20px;
        }
          .date{
          font-size: 12px;
          }
        .read-btn {
          padding: 8px 16px;
          background:  oklch(var(--primary) / var(--tw-bg-opacity, 1));
          color: white;
          border-radius: 8px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default BlogGrid;
