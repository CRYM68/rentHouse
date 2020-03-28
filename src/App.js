import React, { Component } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import "./index.css";
import "./assets/fonts/iconfont.css";
import { connect } from "react-redux";
import { initCurrentCityMsg } from "./store/actionCreator";

// pages
import Home from "./pages/home/index.jsx";
import MapFound from "./pages/mapFound/";
import CitySelect from "./pages/citySelect/citySelect";
import Example from "./pages/example/example";

class App extends Component {
  componentDidMount() {
    // 初始化当前城市信息
    this.props.initCurrentCity();
  }
  render() {
    return (
      <div className="App">
        {this.props.cityName && (
          <HashRouter>
            <section>
              {/* Home */}
              <Route path="/home" component={Home}></Route>
              <Route path="/" component={Home} exact>
                <Redirect to="/home"></Redirect>
              </Route>

              {/* MapFound */}
              <Route path="/mapFound" component={MapFound} exact></Route>

              {/* CitySelect */}
              <Route path="/citySelect" component={CitySelect} exact></Route>
              <Route path="/example" component={Example} exact></Route>
            </section>
          </HashRouter>
        )}
      </div>
    );
  }
}

/*  * * * * * * * * * * * * ** redux */

const mapStateToProps = state => ({
  cityName: state.Main.currentCityMsg.name
});

const mapDispatchToProps = function(dispatch) {
  return {
    // 初始化城市信息
    initCurrentCity() {
      dispatch(initCurrentCityMsg());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
