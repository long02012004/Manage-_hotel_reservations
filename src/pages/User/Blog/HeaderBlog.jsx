import { Link, Outlet, NavLink } from "react-router-dom";
import styles from "./HeaderBlog.module.scss";
import { logo } from "../../../assets/images/img";
import { FaSearch } from "react-icons/fa";

const HeaderBlog = () => {
  return (
    <header>
      <div className={styles.header}>
        <Link className={styles.header__logo}>
          <img src={logo} alt="Logo" />
        </Link>
        <div className={styles["header__menu"]}>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/blog-main">Blog</NavLink>
            </li>
            <li className={styles["icon-search"]}>
              <NavLink to="/search">
                Search <FaSearch />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderBlog;
