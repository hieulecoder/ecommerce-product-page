/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./Nav.module.css";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as CartIcon } from "../images/icon-cart.svg";
import { ReactComponent as MenuIcon } from "../images/icon-menu.svg";
import { useEffect, useRef, useState } from "react";
import Links from "./Links";
import CartPreview from "./CartPreview";

const Nav = ({
  itemCount,
  showMenu,
  showCartPreview,
  clearCart,
  closeCartPreview,
  setShowCartPreview,
}) => {
  const { pathname } = useLocation();
  const cartPreviewRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartPreviewRef.current &&
        !cartPreviewRef.current.contains(event.target)
      ) {
        setShowCartPreview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.container}>
      <div className={styles.navGroup}>
        <div className={styles.menuIcon} onClick={showMenu}>
          <MenuIcon />
        </div>
        <Link to="/">
          <Logo />
        </Link>
        <Links device="desktop" />
      </div>
      <div className={styles.navGroup}>
        <div className={styles.cartIcon} ref={cartPreviewRef}>
          <CartIcon onClick={() => setShowCartPreview(!showCartPreview)} />
          <div
            className={styles.itemCount}
            style={{ display: itemCount === 0 ? "none" : "block" }}
          >
            {itemCount}
          </div>
          {showCartPreview && (
            <CartPreview
              isMobile={false}
              itemCount={itemCount}
              clearCart={clearCart}
              closeCartPreview={closeCartPreview}
            />
          )}
        </div>
        <Link to="/user">
          <img
            className={`${styles.avatar} ${
              pathname === "/user" && styles.avatarActive
            }`}
            src={require("../images/image-avatar.png")}
            alt="user"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
