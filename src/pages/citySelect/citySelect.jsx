import React, { Component } from "react";
import axios from "../../utils/request";
import { connect } from "react-redux";
import { NavBar, Icon } from "antd-mobile";
import Css from "./citySelect.module.scss";
import { changeCurrentCityMsg } from "../../store/actionCreator";
import { List } from "react-virtualized";

// 找房

class Found extends Component {
  state = {
    list: [],
    letters: ["#", "热"],
    current: 0,
    control: true
  };
  componentDidMount = async () => {
    let finalList = [];
    let hotCity = (await axios.get("/area/hot")).data.body;
    let allCity = (await axios.get("/area/city?level=1")).data.body;
    hotCity = hotCity.map(e => e.label);

    finalList.push(
      {
        name: "当前定位",
        values: [this.props.cityName]
      },
      {
        name: "热门城市",
        values: hotCity
      }
    );
    allCity.sort((a, b) => (a.short < b.short ? -1 : 1));
    allCity.forEach(e => {
      const first = e.short[0].toUpperCase();
      const index = finalList.findIndex(ee => ee.name === first);
      if (index === -1) {
        finalList.push({
          name: first,
          values: [e.label]
        });
        this.state.letters.push(first);
      } else {
        finalList[index].values.push(e.label);
      }
    });
    this.setState({
      list: finalList
    });
  };

  // list 渲染函数
  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { history, changeCurrentCity } = this.props;
    return (
      <div key={key} style={style}>
        <div className={Css.title}>
          {this.state.list[index].name}-{index}
        </div>
        <div>
          {this.state.list[index].values.map((ee, ii) => (
            <div
              key={ii}
              className={Css.item}
              onClick={() => {
                changeCurrentCity(ee);
                history.push("/home/index");
              }}
            >
              {ee}
            </div>
          ))}
        </div>
      </div>
    );
  };
  // 计算每行高度
  setRowHeight = ({ index }) => {
    return 36 + this.state.list[index].values.length * 50;
  };

  // 页面滚动，侧边栏action改编
  onRowsRendered = ({ startIndex }) => {
    if (startIndex === this.state.current) return;
    this.setState({ current: startIndex });
  };

  // 切换选中项,并滚动至指定位置
  toggleCurrent = index => {
    this.setState({ current: index });
  };

  render() {
    const { history } = this.props;
    const { current } = this.state;

    return (
      <div className={Css.main}>
        {/* 导航栏 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => history.go(-1)}
        >
          城市选择
        </NavBar>

        {/* 城市列表 */}
        <div className={Css.list}>
          <List
            width={window.screen.width}
            height={window.screen.height - 45}
            rowCount={this.state.list.length}
            rowHeight={this.setRowHeight}
            rowRenderer={this.rowRenderer}
            onRowsRendered={this.onRowsRendered}
            scrollToIndex={current}
            scrollToAlignment="start"
          />

          {/*字母侧边栏 */}
          <div className={Css.navs}>
            {this.state.letters.map((e, i) => {
              return (
                <div
                  key={i}
                  className={[
                    Css.letters_item,
                    current === i ? Css.action : ""
                  ].join(" ")}
                  onClick={this.toggleCurrent.bind(this, i)}
                >
                  {e}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

/*    ******      redux               */

const mapStateToProps = function(state) {
  return {
    cityName: state.Main.currentCityMsg.name
  };
};

const mapdispatchToProps = function(dispatch) {
  return {
    // 修改当前城市
    changeCurrentCity(cityName) {
      dispatch(changeCurrentCityMsg(cityName));
    }
  };
};

export default connect(mapStateToProps, mapdispatchToProps)(Found);
