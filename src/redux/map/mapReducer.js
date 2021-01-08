import { SET_MAP_DATA, SET_NEW_REGION, EDIT_REGION, DELETE_REGION, DEACTIVE_REGION } from "./mapTypes";

const initialData = {
  mapData: []
};

export const mapData = (state = initialData.mapData, action) => {
  switch (action.type) {
    case SET_MAP_DATA:
      return {
        mapData: action.payload
      };

    case SET_NEW_REGION:
      return {
        ...state,
        mapData: state.mapData.concat(action.payload)
      }

    case EDIT_REGION:
      return {
        ...state,
        mapData: state.mapData.map(
          (content) => content.id === action.payload.id ? {
            ...content,
            name: action.payload.name,
            desc: action.payload.desc,
            color: action.payload.color,
            price: action.payload.price
          }
            : content
        )
      };

    case DELETE_REGION:
      return {
        ...state,
        mapData: state.mapData.filter(item => item.id !== action.payload)
      };

    case DEACTIVE_REGION:
      return {
        ...state,
        mapData: state.mapData.map(
          (content) => content.id === action.payload.id ? {
            ...content,
            isActive: !action.payload.isActive
          }
            : content
        )
      }

    default:
      return state;
  }
};
