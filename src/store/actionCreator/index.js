import { getCurrentCityMsg } from "../../utils/bdMapHelper";

// 初始化当前城市信息
export const initCurrentCityMsg = function() {
  return async function(dispatch) {
    const res = await getCurrentCityMsg();
    dispatch({
      type: "setCurrentCityMsg",
      msg: res
    });
  };
};

// 修改当前城市
export const changeCurrentCityMsg = function(cityName) {
  return function(dispatch) {
    dispatch({
      type: "setCurrentCityMsg",
      msg: { name: cityName }
    });
  };
};
