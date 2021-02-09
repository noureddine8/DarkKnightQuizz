import { combineReducers, createStore } from "redux";

//actions
export const updateStore = (level, newScore) => {
  return { type: "UPDATE_STORE", payload: { level, newScore } };
};
export const insertScore = (level, newScore) => {
  return { type: "INSERT_STORE", payload: { level, newScore } };
};

//reducers
const storeReducer = (scores = [], action) => {
  switch (action.type) {
    case "UPDATE_STORE":
      return scores.map((score) => {
        if (scores.indexOf(score) == action.payload.level - 1) {
          return action.payload.newScore;
        } else return score;
      });
    case "INSERT_STORE":
      return [
        ...scores,
        (scores[action.payload.level - 1] = action.payload.newScore),
      ];
    default:
      return scores;
  }
};
//rootReducer
export const rootReducer = combineReducers({
  scores: storeReducer,
});
//store

export const store = createStore(rootReducer);
