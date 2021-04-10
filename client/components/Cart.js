import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  fetchCart,
  deleteItem,
  editQuantity,
  editQuantGuest,
  removeItemGuest,
} from "../store/cartReducer";
import { Col, Row, Icon, Card, CardTitle, Button } from "react-materialize";
import { Link } from "react-router-dom";
// import {Cart, CheckoutButton, Product} from 'react-shopping-cart'

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const userId = this.props.user.id;
    if (userId) {
      this.props.fetchCart(userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      const userId = this.props.user.id;
      this.props.fetchCart(userId);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push("/checkout");
  }

  render() {
    const cart = this.props.cart;
    return (
      <div className="container" id="cart">
        <div id="cart-left">
          {cart.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            <p>You have {cart.length} item(s) in your cart</p>
          )}
          {cart.map((plant) => {
            return (
              <Row key={plant.id}>
                {/* className="all-plants-plant" */}
                <Col m={8} s={10}>
                  <Card
                    actions={[
                      <span key="1">
                        <Button
                          node="button"
                          className="red darken-2"
                          style={{
                            marginRight: "5px",
                          }}
                          waves="light"
                          onClick={() =>
                            this.props.user.id
                              ? this.props.deleteItem(
                                  this.props.user.id,
                                  plant.id
                                )
                              : this.props.removeItemGuest(plant.id)
                          }
                        >
                          REMOVE ITEM
                        </Button>
                      </span>,
                    ]}
                    closeIcon={<Icon>close</Icon>}
                    header={
                      <CardTitle
                        className="center-align"
                        // className="all-plants-img"
                        image={plant.imageUrl}
                      >
                        <Link key="1" to={`/plants/${plant.id}`}>
                          {plant.name}
                        </Link>
                      </CardTitle>
                    }
                    revealIcon={<Icon>more_vert</Icon>}
                  >
                    <div id="cart-plant-price">${plant.price}</div>
                    <div>
                      {"Qty:  "}
                      <span key="1">
                        <Button
                          className="qty-btn"
                          small
                          floating
                          node="button"
                          style={{
                            marginRight: "5px",
                          }}
                          waves="light"
                          onClick={() =>
                            this.props.user.id
                              ? this.props.editQuantity(
                                  this.props.user.id,
                                  plant.id,
                                  plant.item.quantity - 1
                                )
                              : this.props.editQuantGuest(
                                  plant,
                                  plant.item.quantity - 1
                                )
                          }
                        >
                          {" - "}
                        </Button>
                      </span>
                      <span id="plant-qty">{`${plant.item.quantity}  `}</span>

                      <span key="2">
                        <Button
                          className="qty-btn"
                          small
                          floating
                          node="button"
                          style={{
                            marginRight: "5px",
                          }}
                          waves="light"
                          onClick={() =>
                            this.props.user.id
                              ? this.props.editQuantity(
                                  this.props.user.id,
                                  plant.id,
                                  plant.item.quantity + 1
                                )
                              : this.props.editQuantGuest(
                                  plant,
                                  plant.item.quantity + 1
                                )
                          }
                        >
                          {" + "}
                        </Button>
                      </span>
                    </div>
                  </Card>
                </Col>
              </Row>
              // <div  className="checkout-item">
              //   <img src={plant.imageUrl} className="checkout-plant-img" />
              //   <h2>
              //     <Link to={`/plants/${plant.id}`}>{plant.name}</Link>
              //   </h2>
              //   <p>
              //     {plant.item.quantity} @ ${plant.price}
              //   </p>
              //   <button
              //     type="button"
              //     onClick={() =>
              //       this.props.user.id
              //         ? this.props.deleteItem(this.props.user.id, plant.id)
              //         : this.props.removeItemGuest(plant.id)
              //     }
              //   >
              //     Remove Item
              //   </button>
              //
              //   <hr />
              // </div>
            );
          })}
        </div>

        <div id="cart-right">
          <div id="checkout-box">
            <div id="cart-total">
              <h5>TOTAL</h5>
              <h6 id="cart-total-num">
                $
                {cart
                  .reduce(
                    (sum, currentPlant) =>
                      sum + currentPlant.item.quantity * currentPlant.price,
                    0
                  )
                  .toFixed(2)}
              </h6>
            </div>

            <div>
              <Button
                type="button"
                id="checkout-btn"
                onClick={this.handleSubmit}
              >
                {" "}
                Checkout{" "}
              </Button>
            </div>
          </div>
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
    fetchCart: (id) => dispatch(fetchCart(id)),
    deleteItem: (userId, plantId) => dispatch(deleteItem(userId, plantId)),
    editQuantity: (userId, plantId, newQuant) =>
      dispatch(editQuantity(userId, plantId, newQuant)),
    editQuantGuest: (plant, newQuant) =>
      dispatch(editQuantGuest(plant, newQuant)),
    removeItemGuest: (plantId) => dispatch(removeItemGuest(plantId)),
  };
};
export default connect(mapState, mapDispatch)(Cart);
