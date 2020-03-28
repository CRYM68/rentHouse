const defaultState = {
  currentCityMsg: {}
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  // 设置当前城市信息
  if (action.type === "setCurrentCityMsg") {
    newState.currentCityMsg = action.msg;
    return newState;
  }

  return state;
};
