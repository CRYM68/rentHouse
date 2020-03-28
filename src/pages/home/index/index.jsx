import React, { Component } from "react";

import Carousel from "../../../components/Carousel.jsx";
import CityInput from "../../../components/cityInput/cityInput.jsx";
import indexCss from "./index.module.scss";
import axios, { baseURL } from "../../../utils/request";

// 导入本地图片
import nav1 from "../../../assets/images/nav-1.png";
import nav2 from "../../../assets/images/nav-2.png";
import nav3 from "../../../assets/images/nav-3.png";
import nav4 from "../../../assets/images/nav-4.png";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navs: [
        { id: 1, text: "整租", imgSrc: nav1 },
        { id: 2, text: "合租", imgSrc: nav2 },
        { id: 3, text: "地图找房", imgSrc: nav3 },
        { id: 4, text: "去出租", imgSrc: nav4 }
      ],
      groups: [],
      news: []
    };
  }
  componentDidMount = () => {
    this.getGroups();
    this.getNews();
  };
  //   获取Droups
  getGroups = async () => {
    const res = await axios.get("/home/groups");
    this.setState({
      groups: res.data.body
    });
  };

  // 获取News
  getNews = async () => {
    const res = await axios.get("/home/news");
    this.setState({
      news: res.data.body
    });
  };

  render() {
    return (
      <div>
        {/* 搜索框 */}
        <CityInput></CityInput>

        {/* 轮播图 */}
        <Carousel />

        {/* 导航栏 */}
        <div className={indexCss.navs}>
          {this.state.navs.map(e => {
            return (
              <div key={e.id} className={indexCss.item}>
                <img src={e.imgSrc} alt="" />
                <span>{e.text}</span>
              </div>
            );
          })}
        </div>

        {/* 租房小组 */}
        <div className={indexCss.groups}>
          <div className={indexCss.title}>
            <h3>租房小组</h3>

            <a href="">更多</a>
          </div>
          <div className={indexCss.tabs}>
            {this.state.groups.map((e, i) => {
              return (
                <div key={e.id} className={indexCss.tab}>
                  <div className={indexCss.text}>
                    <p>{e.title}</p>
                    <p>{e.desc}</p>
                  </div>
                  <div>
                    <img src={baseURL + e.imgSrc} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 资讯 */}
        <div className={indexCss.news}>
          <div className={indexCss.title}>
            <h3>最新资讯</h3>
            <a hres="#">更多</a>
          </div>
          <div>
            {this.state.news.map(e => {
              return (
                <div className={indexCss.item} key={e.id}>
                  <div className={indexCss.left}>
                    <img src={baseURL + e.imgSrc} alt="" />
                  </div>
                  <div className={indexCss.right}>
                    <h3>{e.title}</h3>
                    <div className={indexCss.from_date}>
                      <div className={indexCss.from}>{e.from}</div>
                      <div className={indexCss.date}>{e.date}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
