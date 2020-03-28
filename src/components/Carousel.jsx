import React from "react";
import { Carousel } from "antd-mobile";
import axios, { baseURL } from "../utils/request";

class Slide extends React.Component {
  state = {
    data: [],
    imgHeight: 176
  };
  async componentDidMount() {
    const res = await axios.get("/home/swiper");
    this.setState({
      data: res.data.body
    });
  }
  render() {
    return (
      <div>
        {this.state.data.length && (
          <Carousel autoplay infinite>
            {this.state.data.map(val => (
              <a
                key={val}
                href="http://www.alipay.com"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: this.state.imgHeight
                }}
              >
                <img
                  src={baseURL + val.imgSrc}
                  alt=""
                  style={{ width: "100%", verticalAlign: "top" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event("resize"));
                    this.setState({ imgHeight: "auto" });
                  }}
                />
              </a>
            ))}
          </Carousel>
        )}
      </div>
    );
  }
}

export default Slide;
