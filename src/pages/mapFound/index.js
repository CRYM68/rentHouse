import React, { Component } from "react";
import { connect } from "react-redux";

class map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick = () => {
    this.props.addNum();
  };
  render() {
    return <div onClick={this.handleClick}>aaa</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

const connFunc = connect(mapStateToProps);

export default connFunc(map);
