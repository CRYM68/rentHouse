// 百度地图API
const BMap = window.BMap;

export const getCurrentCityMsg = function() {
  return new Promise((reslove, reject) => {
    const myCity = new BMap.LocalCity();
    myCity.get(function(result) {
      result.name = result.name.replace("市", "");
      reslove(result);
    });
  });
};
