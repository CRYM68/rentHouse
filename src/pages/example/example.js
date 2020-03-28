import React from "react";
import { List } from "react-virtualized";
import { NavBar, Icon } from "antd-mobile";
import axios from "../../utils/request";
import { connect } from "react-redux";
import { changeCurrentCityMsg } from "../../store/actionCreator";

// List data as an array of strings
class App1 extends React.Component {
  state = {
    list: [
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa",
      "aa"
    ]
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
        // this.state.letters.push(first);
      } else {
        finalList[index].values.push(e.label);
      }
    });
    this.setState({
      list: finalList
    });
  };
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) => {
    return (
      <div key={key} style={style}>
        {this.state.list[index]}-{index}
      </div>
    );
  };
  a = () => {
    return 50;
  };

  render() {
    const { history } = this.props;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => history.go(-1)}
        >
          城市选择
        </NavBar>
        <List
          width={window.screen.width}
          height={window.screen.height - 45}
          rowCount={this.state.list.length}
          rowHeight={this.a}
          rowRenderer={this.rowRenderer}
          scrollToIndex={5}
          scrollToAlignment="start"
        />
      </div>
    );
  }
}

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

// Render your list
export default connect(mapStateToProps, mapdispatchToProps)(App1);
