import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { fetchCart } from "../store/cartReducer";
import "materialize-css";

class Navbar extends React.Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
    });
    const userId = this.props.user.id;
    if (userId) {
      this.props.fetchCart(userId);
    }
  }
  render() {
    const { handleClick, isLoggedIn } = this.props;
    return (
      <div className="navbar-fixed">
        <div className="navbar">
          <nav>
            <div className="nav-wrapper grey darken-4">
              <Link to="/" className="brand-logo">
                Plantr
              </Link>

              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons white-text">menu</i>
              </a>
              {isLoggedIn ? (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  {/* The navbar will show these links after you log in */}
                  <li>
                    <Link to="/plants">Plants</Link>
                  </li>
                  <li>
                    <Link to="/types">Types</Link>
                  </li>
                  <li>
                    <Link to="/account">Account</Link>
                  </li>
                  <li>
                    <a href="#" onClick={handleClick}>
                      Logout
                    </a>
                  </li>
                  <li>
                    <Link to="/cart">
                      <button type="button" id="cart-btn">
                        <img
                          id="cart-img"
                          src="https://i.imgur.com/XET9X5C.png"
                        />
                      </button>
                      <span id="cart-count">{this.props.quantity}</span>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  {/* The navbar will show these links before you log in */}
                  <li>
                    <Link to="/plants">Plants</Link>
                  </li>
                  <li>
                    <Link to="/types">Types</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <button type="button" id="cart-btn">
                        <img
                          id="cart-img"
                          src="https://i.imgur.com/XET9X5C.png"
                        />
                      </button>
                      <span id="cart-count">{this.props.quantity}</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>

          <ul className="sidenav" id="mobile-demo">
            <li>
              <Link to="/cart">
                <button type="button" id="cart-btn">
                  <img id="cart-img" src="https://i.imgur.com/XET9X5C.png" />
                </button>
                <span id="cart-count">{this.props.quantity}</span>
              </Link>
            </li>

            <li>
              <Link to="/plants">Plants</Link>
            </li>
            <li>
              <Link to="/types">Types</Link>
            </li>
            {isLoggedIn && (
              <li>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/account">Account</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    cart: state.cart.active,
    quantity: state.cart.quantity,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    fetchCart: (id) => dispatch(fetchCart(id)),
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
