import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { fetchCart } from "../store/cartReducer";
import "materialize-css";

class Navbar extends React.Component {
  componentDidMount() {
    const userId = this.props.user.id;
    if (userId) {
      this.props.fetchCart(userId);
    }
  }
  render() {
    const { handleClick, isLoggedIn } = this.props;
    const { cart } = this.props || [];
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
                      <span id="cart-count">{cart.length}</span>
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
                </ul>
              )}
            </div>
          </nav>

          <ul className="sidenav" id="mobile-demo">
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

// old links with icons
//   <Link to="/account">
//     <div className="nav-link">
//       <img src="https://i.pinimg.com/originals/bb/24/ae/bb24aecc2d6e5d51bf29c72acb3f1741.png" />
//       <p>Account</p>
//     </div>
//   </Link>
//   <a href="#" onClick={handleClick}>
//     <div className="nav-link">
//       <img src="https://images.vexels.com/media/users/3/202344/isolated/preview/242900d7a49739d3a909fbb7263b305d-tall-mushroom-stroke-by-vexels.png" />
//       <p>Logout</p>
//     </div>
//   </a>
// </div>

//   <Link to="/login">
//     <div className="nav-link">
//       <img src="https://img.icons8.com/wired/2x/login-rounded-right.png" />
//       <p>Login</p>
//     </div>
//   </Link>
//   <Link to="/signup">
//     <div className="nav-link">
//       <img src="https://images.vexels.com/media/users/3/212787/isolated/lists/df52a0a9737daa1f0c5a565ff99d6529-flowery-medical-cross-symbol-outline.png" />
//       <p>Sign Up</p>
//     </div>
//   </Link>

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    cart: state.cart.active,
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
