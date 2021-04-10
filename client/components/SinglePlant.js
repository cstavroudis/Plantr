import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlant, editPlant } from "../store/singlePlantReducer";
import { addPlant } from "../store/cartReducer";
import { getTypes } from "../store/typesReducer";
import { Link } from "react-router-dom";
import { Button } from "react-materialize";
// import Cart from "./Cart";

class SinglePlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      description: "",
      inventory: 0,
      price: 0,
      light: "",
      water: "",
      humidity: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchPlant(id);
    await this.props.getTypes();
    await this.setState({
      name: this.props.plant.name,
      imageUrl: this.props.plant.imageUrl,
      description: this.props.plant.description,
      inventory: this.props.plant.inventory,
      price: this.props.plant.price,
      light: this.props.plant.light,
      water: this.props.plant.water,
      humidity: this.props.plant.humidity,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editPlant(this.props.plant.id, this.state);
  }

  render() {
    const plant = this.props.plant;
    // const type = plant.type ? plant.type.name || "";
    let type;
    if (plant.type) type = plant.type.name;
    else type = "";
    const user = this.props.user;

    return (
      <div className="container">
        <div className="plant-user-view">
          <img src={plant.imageUrl} className="single-plant-img" />
          <div>
            <h3>{plant.name}</h3>
            <Link to={`/types/${plant.typeId}`}>
              <h5>{type}</h5>
            </Link>
            <h5>${plant.price}</h5>
            <Button
              node="button"
              style={{
                marginRight: "5px",
              }}
              waves="light"
              onClick={() => this.props.addPlant(user.id, plant.id)}
            >
              ADD TO CART
            </Button>
            <h2> </h2>
            <div className="divider"></div>
            <div className="section">
              <h5>About...</h5>
              <p>{plant.description}</p>
            </div>

            <div className="divider"></div>
            <div className="section">
              <h5>Care...</h5>
              <p>Light: {plant.light}</p>
              <p>Water: {plant.water}</p>
            </div>
          </div>
        </div>
        {user.isAdmin && (
          <div className="plant-admin-view">
            <form id="add-plant-form" onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  className="input-box"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
              <div>
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  className="input-box"
                  name="imageUrl"
                  onChange={this.handleChange}
                  value={this.state.imageUrl}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  className="input-box"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </div>
              <div>
                <label htmlFor="inventory">Number in Inventory</label>
                <input
                  className="input-box"
                  name="inventory"
                  onChange={this.handleChange}
                  value={this.state.inventory}
                />
              </div>
              <div>
                <label htmlFor="price">Price $</label>
                <input
                  className="input-box"
                  name="price"
                  onChange={this.handleChange}
                  value={this.state.price}
                />
              </div>
              <div className="add-plant-light">
                <label htmlFor="light">Light</label>
                <select
                  onChange={this.handleChange}
                  value={this.state.light}
                  name="light"
                >
                  <option>direct</option>
                  <option>indirect</option>
                  <option>none</option>
                </select>
              </div>
              <div className="add-plant-water">
                <label htmlFor="water">Water</label>
                <select
                  onChange={this.handleChange}
                  value={this.state.water}
                  name="water"
                >
                  <option>daily</option>
                  <option>bi-weekly</option>
                  <option>weekly</option>
                </select>
              </div>
              <div className="add-plant-humidity">
                <label htmlFor="humidity">Humidity</label>
                <select
                  onChange={this.handleChange}
                  value={this.state.humidity}
                  name="humidity"
                >
                  <option>low</option>
                  <option>medium</option>
                  <option>high</option>
                </select>
              </div>
              <div className="add-plant-type">
                <label htmlFor="type">type</label>
                <select
                  onChange={this.handleChange}
                  value={this.state.type}
                  name="type"
                >
                  {this.props.types.map((thisType) => {
                    return <option key={thisType.id}>{thisType.name}</option>;
                  })}
                </select>
              </div>
              <button id="add-plant-btn" type="submit">
                Edit Plant
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    plant: state.plant.single,
    types: state.types.all,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPlant: (id) => dispatch(fetchPlant(id)),
    addPlant: (userId, plantId) => dispatch(addPlant(userId, plantId)),
    editPlant: (plantId, plant) => dispatch(editPlant(plantId, plant)),
    getTypes: () => dispatch(getTypes()),
  };
};

export default connect(mapState, mapDispatch)(SinglePlant);
