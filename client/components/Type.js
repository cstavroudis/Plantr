import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleType } from "../store/typesReducer";
import { fetchPlantsAll } from "../store/allplantsReducer";
import { Link } from "react-router-dom";
import { Col, Row, Icon, Card, CardTitle, Button } from "react-materialize";

class Type extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSingleType(id);
    this.props.fetchPlantsAll();
  }
  render() {
    const type = this.props.singleType;
    const plants = type.plants || [];
    console.log("plants of type:", plants);

    return (
      <div className="container">
        <h2>{type.name}</h2>
        <p>Origin: {type.origin}</p>
        <p>{type.description}</p>
        <div className="divider"></div>
        <h5>Plants of the {type.name} species...</h5>
        <div className="all-plants-container">
          {plants.length > 0 ? (
            plants.map((plant) => {
              return (
                <Row key={plant.id} className="all-plants-plant">
                  <Col m={4} s={12}>
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
            })
          ) : (
            <p>"No plants available under this type."</p>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleType: state.types.singleType,
    plants: state.plants.all,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleType: (typeId) => dispatch(getSingleType(typeId)),
    fetchPlantsAll: () => dispatch(fetchPlantsAll()),
  };
};

export default connect(mapState, mapDispatch)(Type);
