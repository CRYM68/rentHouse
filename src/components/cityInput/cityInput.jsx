import React, { Component } from "react";
import Css from "./cityInput.module.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class CityInput extends Component {
  state = {};
  render() {
    const { history } = this.props;
    return (
      <div className={Css.cityInput}>
        {/* 搜索框 */}
        <div className={Css.search}>
          {/* 城市选择部分 */}
          <div
            className={Css.location}
            onClick={() => {
              history.push("/citySelect");
            }}
          >
            {this.props.cityName}
            <i className={["iconfont", " icon-arrow", Css.icon].join(" ")}></i>
          </div>

          {/* 搜索框部分 */}
          <div className={Css.searchInput}>
            <i className={["iconfont", "icon-seach", Css.icon].join(" ")}></i>
            请输入小区或地址
          </div>
        </div>

        {/* 按钮图标 */}
        <div className={Css.btn}>
          <i
            className={["iconfont", " icon-map", Css.map].join(" ")}
            onClick={() => {
              history.push("/mapFound");
            }}
          ></i>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cityName: state.Main.currentCityMsg.name
  };
};

export default connect(mapStateToProps)(withRouter(CityInput));
