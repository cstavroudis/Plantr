import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchConfirmedCart } from "../store/cartReducer";
import { Button } from "react-materialize";
import { Link } from "react-router-dom";

class Confirmation extends Component {
  componentDidMount() {
    let userId;
    if (this.props.user.id) {
      userId = this.props.user.id;
    } else {
      userId = null;
    }
    this.props.fetchConfirmedCart(userId);
  }

  render() {
    let orderId = "";
    if (this.props.order.order) {
      orderId = this.props.order.order.orderId;
    }

    return (
      <div className="container" id="confirmation-page">
        <h3>✅ Thank you for your order!</h3>
        <h5>Order Number: {orderId}</h5>
        <Button>
          <Link to="/plants">{"< "}Continue Shopping</Link>
        </Button>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    user: state.user,
    order: state.cart.order,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchConfirmedCart: (userId) => dispatch(fetchConfirmedCart(userId)),
  };
};
export default connect(mapState, mapDispatch)(Confirmation);
