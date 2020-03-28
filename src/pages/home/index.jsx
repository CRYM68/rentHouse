import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import { Route } from "react-router-dom";

import Index from "./index/index.jsx";
import Found from "./found";
import News from "./news";
import Personal from "./personal";

/**
 * Home
 */
class Home extends Component {
  constructor(props) {
    super(props);
    // 默认index
    if (this.props.location.pathname === "/home") {
      this.props.history.push("/home/index");
    }
  }

  render() {
    const { location, history } = this.props;
    return (
      <div style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}>
        <TabBar tintColor="#21b97a">
          {/* 首页 */}
          <TabBar.Item
            title="首页"
            key="index"
            icon={<i className="iconfont icon-ind"></i>}
            selectedIcon={<i className="iconfont icon-ind"></i>}
            selected={location.pathname === "/home/index"}
            onPress={() => {
              history.push("/home/index");
            }}
            data-seed="logId"
          >
            <Route component={Index} path="/home/index"></Route>
          </TabBar.Item>

          {/* 找房 */}
          <TabBar.Item
            icon={<i className="iconfont icon-findHouse"></i>}
            selectedIcon={<i className="iconfont icon-findHouse" />}
            title="找房"
            key="found"
            selected={location.pathname === "/home/found"}
            onPress={() => {
              history.push("/home/found");
            }}
            data-seed="logId1"
          >
            <Route component={Found} path="/home/found"></Route>
          </TabBar.Item>

          {/* 资讯 */}
          <TabBar.Item
            icon={<i className="iconfont icon-infom" />}
            selectedIcon={<i className="iconfont icon-infom" />}
            title="资讯"
            key="news"
            selected={location.pathname === "/home/news"}
            onPress={() => {
              history.push("/home/news");
            }}
          >
            <Route component={News} path="/home/news"></Route>
          </TabBar.Item>

          {/* 我的 */}
          <TabBar.Item
            icon={<i className="iconfont icon-my" />}
            selectedIcon={<i className="iconfont icon-my" />}
            title="我的"
            key="personal"
            selected={location.pathname === "/home/personal"}
            onPress={() => {
              history.push("/home/personal");
            }}
          >
            <Route component={Personal} path="/home/personal"></Route>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Home;
