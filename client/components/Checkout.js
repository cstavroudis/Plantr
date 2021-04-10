import React from "react";
import { connect } from "react-redux";
import { checkout, guestCheckout } from "../store/cartReducer";
import Cart from "./Cart";
import { TextInput, Button } from "react-materialize";

const initialState = {
  ccNumber: "",
  ccExpDate: "",
  ccCVV: "",
  shippingAddress: "",
  errors: [],
};

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ccNumber: "",
      ccExpDate: "",
      ccCVV: "",
      shippingAddress: "",
      errors: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = [];
    if (this.state.ccNumber.length < 16) {
      errors.push("Please enter a valid card number.");
    }
    if (this.state.ccExpDate.length !== 5) {
      errors.push("Please enter a valid expiration date (MM/DD).");
    }
    if (this.state.ccCVV.length < 3 || this.state.ccCVV.length > 4) {
      errors.push("Please enter a valid CCV (3-4 digits).");
    }
    if (errors.length < 1) {
      this.props.user.id
        ? this.props.checkout(
            this.props.user.id,
            this.props.history,
            this.state.shippingAddress
          )
        : this.props.guestCheckout(
            this.props.cart,
            this.props.history,
            this.state.shippingAddress
          );
      this.setState(initialState);
    }
    this.setState({ errors: errors });
  }

  render() {
    return (
      <div className="container" id="checkout-container">
        <div id="checkout-form">
          <form onSubmit={this.handleSubmit}>
            <div className="shipping-details">
              <h4>Shipping Details</h4>

              <TextInput
                label="Shipping Address"
                className="input-box"
                name="shippingAddress"
                onChange={this.handleChange}
                value={this.state.shippingAddress}
              />
            </div>
            <div className="payment-details">
              <h4>Payment Details</h4>

              <TextInput
                label="Credit Card Number"
                className="input-box"
                name="ccNumber"
                onChange={this.handleChange}
                value={this.state.ccNumber}
              />

              <TextInput
                label="Expiration Date"
                className="input-box"
                name="ccExpDate"
                onChange={this.handleChange}
                value={this.state.ccExpDate}
              />

              <TextInput
                label="CVV"
                className="input-box"
                name="ccCVV"
                onChange={this.handleChange}
                value={this.state.ccCVV}
              />
            </div>
            <Button node="button" type="submit">
              Confirm Order
            </Button>
          </form>
          {this.state.errors.length > 0 &&
            this.state.errors.map((error) => (
              <h6 key={this.state.errors.indexOf(error)}>{error}</h6>
            ))}
        </div>
        <div className="checkout-cart">
          <Cart checkingOut={true} />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    cart: state.cart.active,
  };
};

const mapDispatch = (dispatch) => {
  return {
    checkout: (userId, history, shippingAddress) =>
      dispatch(checkout(userId, history, shippingAddress)),
    guestCheckout: (cart, history, shippingAddress) =>
      dispatch(guestCheckout(cart, history, shippingAddress)),
  };
};

export default connect(mapState, mapDispatch)(Checkout);
