import { Section } from "../type/section";

interface Action {
  type: string;
  payload?: Section[];
}

const initialState = {
  data: [] as Section[],
}


export const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload ? [...action.payload] : state.data,
      };
      case "SET_USER_URL":
        return {
          ...state,
          userUrl: action.payload,
        };
    default:
      return state;
  }
}