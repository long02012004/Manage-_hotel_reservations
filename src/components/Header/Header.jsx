import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logo, avatar_blog } from "../../assets/images/img";
import styles from "./Header.module.scss";
import { useSelector     } from "react-redux";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickSignUp = () => {
    navigate("/sign-up");
  };

  // đổi màu header khi cuộn
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles["header-container"]}>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.header__logo}>
          <Link to="/home">
            <img
              src={logo}
              alt="Khách Sạn ABC"
              className={styles.header__logo}
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className={styles.header__nav}>
          <ul className={styles.nav}>
            <li className={styles.nav__item}>
              <NavLink className={styles.nav__link} to="/home">
                Trang chủ
              </NavLink>
            </li>
            <li className={styles.nav__item}>
              <NavLink className={styles.nav__link} to="/food">
                Ẩm thực
              </NavLink>
            </li>
            <li className={styles.nav__item}>
              <NavLink className={styles.nav__link} to="/blog">
                Blog
              </NavLink>
            </li>
            <li className={styles.nav__item}>
              <NavLink className={styles.nav__link} to="/offers">
                Ưu Đãi
              </NavLink>
            </li>
            <li className={styles.nav__item}>
              <NavLink className={styles.nav__link} to="/viewroom">
                Tìm Phòng
              </NavLink>
            </li>
            <li className={styles.nav__item}>
              <NavLink className={styles.nav__link} to="/contact">
                Liên Hệ
              </NavLink>
            </li>
            <li className={`${styles.nav__item} ${styles.nav__lang}`}>
              <span className={styles.nav__link} tabIndex={0}>
                Tiếng Việt <i className="bx bx-chevron-down"></i>
                <ul className={styles.nav__subnav}>
                  <li>
                    <a href="#">Tiếng Anh</a>
                  </li>
                  <li>
                    <a href="#">Tiếng Hàn</a>
                  </li>
                  <li>
                    <a href="#">Tiếng Trung</a>
                  </li>
                </ul>
              </span>
            </li>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <li className={styles.nav__item}>
                  <Link className={styles.nav__link} to="/profile">
                    <img
                      src={avatar_blog}
                      alt="Avatar"
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        marginRight: 8,
                      }}
                    />
                    <span>{account?.username || "Phước Long"}</span>
                  </Link>
                </li>
                <li className={styles.nav__item}>
                  <button
                    className={styles.nav__link}
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Đăng xuất
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.nav__item}>
                  <button
                    className={styles.nav__btn}
                    onClick={handleClickLogin}
                  >
                    Đăng nhập
                  </button>
                </li>
                <li className={styles.nav__item}>
                  <button
                    className={styles.nav__btn}
                    onClick={handleClickSignUp}
                  >
                    Đăng ký
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
