import React from "react";
import styles from "./BlogMain.module.scss";
import { blogData } from "../../../services/blogDataMain";
import HeaderBlog from "./HeaderBlog";
import { motion } from "framer-motion";
import FooterBlog from "./FooterBlog";

const BlogMain = () => {
  return (
    <>
      <HeaderBlog />
      <div className={styles.header}>
        <h1>Our Stories & Inspirations</h1>
        <p>
          Discover travel inspirations, lifestyle trends, and behind-the-scenes
          stories from our hotels and resorts around the world.
        </p>
      </div>
      <section className={styles.blogContainer}>
        {blogData.map((item) => (
          <motion.div
            key={item.id}
            className={styles.blogCard}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} />
              <div className={styles.overlay}>
                <button className={styles.readMore}>Read More</button>
              </div>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className={styles.date}>Posted on {item.date}</span>
          </motion.div>
        ))}
      </section>
      <FooterBlog />
    </>
  );
};
export default BlogMain;
