import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPlant, addPlantGuest } from "../store/cartReducer";
import { fetchPlants, deletePlant } from "../store/allPlantsReducer";
import { getTypes } from "../store/typesReducer";
import Cart from "./Cart";
import { Col, Row, Icon, Card, CardTitle, Button } from "react-materialize";

// COMPONENT

class AllPlants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "all",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlants(this.props.pageNum);
    this.props.getTypes();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAdd() {
    this.props.history.push("/add-plant");
  }

  render() {
    const plants = this.props.plants.filter((plant) => {
      if (this.state.filter !== "all") {
        return plant.type.name === this.state.filter;
      }
      return plant;
    });

    return (
      <div>
        <h1>Plants</h1>
        <span className="filter">
          <label htmlFor="filter">Filter: </label>
          <select
            onChange={this.handleChange}
            value={this.state.filter}
            name="filter"
          >
            <option>all</option>
            {this.props.types.map((type) => {
              return <option key={type.id}>{type.name}</option>;
            })}
          </select>
        </span>
        <div className="view">
          {this.props.user.isAdmin && (
            <Button
              className="red"
              floating
              icon={<Icon>add</Icon>}
              large
              node="button"
              waves="light"
              onClick={this.handleAdd}
              tooltip="Add Plant"
              tooltipOptions={{
                position: "right",
              }}
            />
          )}

          <div className="all-plants-container">
            {plants.map((plant) => {
              return (
                <Row key={plant.id} className="all-plants-plant">
                  <Col m={6} s={12}>
                    <Card
                      actions={[
                        <span key="2">
                          {plant.inventory < 1 ? (
                            <h3>Sold Out</h3>
                          ) : (
                            <Button
                              node="button"
                              style={{
                                marginRight: "5px",
                              }}
                              waves="light"
                              onClick={() =>
                                this.props.user.id
                                  ? this.props.addPlant(
                                      this.props.user.id,
                                      plant.id
                                    )
                                  : this.props.addPlantGuest(plant)
                              }
                            >
                              ADD TO CART
                            </Button>
                          )}
                        </span>,
                        <span key="3">
                          {this.props.user.isAdmin && (
                            <Button
                              node="button"
                              className="red darken-1"
                              style={{
                                marginRight: "5px",
                              }}
                              waves="light"
                              onClick={() => this.props.deletePlant(plant.id)}
                            >
                              DELETE
                            </Button>
                          )}
                        </span>,
                      ]}
                      closeIcon={<Icon>close</Icon>}
                      header={
                        <CardTitle
                          className="center-align"
                          // className="all-plants-img"
                          image={plant.imageUrl}
                        >
                          <Link key="1" to={`/plants/types/${plant.type.id}`}>
                            {plant.name}
                          </Link>
                        </CardTitle>
                      }
                      revealIcon={<Icon>more_vert</Icon>}
                    >
                      <div>${plant.price}</div>
                    </Card>
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>
      </div>

      //
      //     </div>
      //     <Cart checkingOut={false} />
      //   </div>
      //   <div className="pagination">
      //     <button
      //       style={{
      //         visibility: this.props.pageNum === 0 ? 'hidden' : 'visible',
      //       }}
      //       type="button"
      //       onClick={() => this.props.fetchPlants(this.props.pageNum - 1)}
      //     >{`Prev: ${this.props.pageNum}`}</button>
      //     <p>{`${this.props.pageNum + 1}`}</p>
      //     <button
      //       type="button"
      //       onClick={() => this.props.fetchPlants(this.props.pageNum + 1)}
      //     >{`Next: ${this.props.pageNum + 2}`}</button>
      //   </div>
      // </div>
    );
  }
}

const mapState = (state) => {
  return {
    plants: state.plants.all,
    user: state.user,
    pageNum: state.plants.pageNum,
    types: state.types.all,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPlants: (pageNum) => dispatch(fetchPlants(pageNum)),
    addPlant: (userId, plantId) => dispatch(addPlant(userId, plantId)),
    deletePlant: (plantId) => dispatch(deletePlant(plantId)),
    addPlantGuest: (plant) => dispatch(addPlantGuest(plant)),
    getTypes: () => dispatch(getTypes()),
  };
};

export default connect(mapState, mapDispatch)(AllPlants);
