import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ContactForm from "./ContactForm";
import { fetchOrders } from "../store/accountReducer";
import { Table } from "react-materialize";

/**
 * COMPONENT
 */
class Account extends React.Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.user.id);
  }

  render() {
    const user = this.props.user;
    const name = user.name ? user.name : "";
    const orders = this.props.orders;

    return (
      <div className="container">
        {name.length > 0 ? (
          <h3>Welcome, {name}!</h3>
        ) : (
          <h3>Welcome, {user.email}!</h3>
        )}

        <div className="user-home-page">
          <h4>My Orders</h4>
          <Table striped={true} className="deep-purple lighten-5">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Order ID</th>
                <th>Shipping Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.cart.id} className="hoverable">
                    <td>{order.cart.orderDate}</td>
                    <td>{order.cart.orderId}</td>
                    <td>{order.cart.shippingStatus}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="divider"></div>

          <h4 className="contact-us">Contact Us</h4>

          <ContactForm />
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log("state.userAccount:", state.userAccount);
  return {
    user: state.userAccount.user,
    orders: state.userAccount.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrders: (userId) => dispatch(fetchOrders(userId)),
  };
};

export default connect(mapState, mapDispatch)(Account);

/**
 * PROP TYPES
 */
Account.propTypes = {
  email: PropTypes.string,
};
