import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes } from "../store/typesReducer";
import { Col, Row, CardPanel } from "react-materialize";

class Types extends Component {
  componentDidMount() {
    this.props.getTypes();
  }

  render() {
    const types = this.props.types;

    return (
      <div className="container">
        <h1>Types</h1>
        {types.map((type) => {
          return (
            <Row key={type.id}>
              <Col m={12} s={12}>
                <CardPanel className="deep-purple lighten-5">
                  <Link to={`/plants/types/${type.id}`}>
                    <h3>{type.name}</h3>
                  </Link>
                  <span>{type.description}</span>
                </CardPanel>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    types: state.types.all,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getTypes: () => dispatch(getTypes()),
  };
};

export default connect(mapState, mapDispatch)(Types);
