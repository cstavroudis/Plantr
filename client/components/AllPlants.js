import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPlant, addPlantGuest } from "../store/cartReducer";
import { fetchPlants, deletePlant } from "../store/allPlantsReducer";
import { getTypes } from "../store/typesReducer";
import Cart from "./Cart";
import {
  Col,
  Row,
  Icon,
  Card,
  CardTitle,
  Button,
  Pagination,
} from "react-materialize";
import { Multiselect } from "multiselect-react-dropdown";

const calculatePages = (length) => {
  if (length <= 12) return 1;
  if (length >= 24 && length > 12) return 2;
  if (length > 24) return 3;
};

class AllPlants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      filterArray: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.handleOrderSelect = this.handleOrderSelect.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchPlants(0, []);
    await this.props.getTypes();
    const typeFilters = await this.props.types.map((type) => {
      return { label: type.name, cat: "Type", key: type.id };
    });
    this.setState({ filterArray: typeFilters });
  }

  async handleOrderSelect(selectedList, selectedItem) {
    await this.setState({ order: selectedItem.key });
    this.props.filter(this.state.order, this.state.filters);
  }

  async handleFilterSelect(selectedList, selectedItem) {
    await this.setState({ filters: selectedList.map((filter) => filter.key) });
    await this.props.fetchPlants(0, this.state.filters);
  }

  async handleRemove(selectedList, removedItem) {
    await this.setState({ filters: selectedList.map((filter) => filter.key) });
    this.props.fetchPlants(0, this.state.filters);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAdd() {
    this.props.history.push("/add-plant");
  }

  handlePage(event) {
    this.props.fetchPlants(event, this.state.filters);
  }

  render() {
    const { plants } = this.props || [];
    let numPages = calculatePages(plants.length);

    return (
      <div>
        <h1>Plants</h1>

        <div className="view">
          <div id="order-filter">
            {/* <Multiselect
              id="1"
              options={this.state.orderArray}
              singleSelect
              displayValue="label"
              onSelect={this.handleOrderSelect}
              placeholder="Sort"
              style={{
                searchBox: {
                  border: "none",
                  borderRadius: "0px",
                },
              }}
            /> */}
            <Multiselect
              id="2"
              options={this.state.filterArray}
              groupBy="cat"
              displayValue="label"
              showCheckbox={true}
              onSelect={this.handleFilterSelect}
              onRemove={this.handleRemove}
              closeOnSelect={false}
              placeholder="Filter"
              closeIcon="cancel"
              style={{
                searchBox: {
                  border: "none",
                  borderRadius: "0px",
                },
              }}
            />
          </div>
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
                  <Col m={8} s={10}>
                    <Card
                      actions={[
                        <span key="2">
                          {plant.inventory < 1 ? (
                            <div>Sold Out</div>
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
                          <Link key="1" to={`/plants/${plant.id}`}>
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
          <Pagination
            activePage={1}
            items={numPages}
            leftBtn={<Icon>chevron_left</Icon>}
            maxButtons={8}
            rightBtn={<Icon>chevron_right</Icon>}
            onSelect={(event) =>
              this.props.fetchPlants(event - 1, this.state.filters)
            }
          />
        </div>
        {/* <Cart checkingOut={false} /> */}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    plants: state.plants.all,
    user: state.user,
    types: state.types.all,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchPlants: (pageNum, filters) => dispatch(fetchPlants(pageNum, filters)),
    addPlant: (userId, plantId) => dispatch(addPlant(userId, plantId)),
    deletePlant: (plantId) => dispatch(deletePlant(plantId)),
    addPlantGuest: (plant) => dispatch(addPlantGuest(plant)),
    getTypes: () => dispatch(getTypes()),
    filter: (order, filters) => dispatch(filterPlants(order, filters)),
  };
};

export default connect(mapState, mapDispatch)(AllPlants);
