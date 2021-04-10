import axios from "axios";

// ACTION TYPE
const SET_PLANTS_ACTION = "SET_PLANTS_ACTION";
const ADD_PLANT_ACTION = "ADD_PLANT_ACTION";
const DELETE_PLANT_ACTION = "DELETE_PLANT_ACTION";
const SET_PLANTS_ALL_ACTION = "SET_PLANTS_ALL_ACTION";

// ACTION CREATOR
export const setPlants = (plants, pageNum) => {
  return {
    type: SET_PLANTS_ACTION,
    plants,
    pageNum,
  };
};

export const setPlantsAll = (plants) => {
  return {
    type: SET_PLANTS_ALL_ACTION,
    plants,
  };
};

const addPlantCreator = (plant) => {
  console.log("plant added to state:", plant);
  return {
    type: ADD_PLANT_ACTION,
    plant,
  };
};

const deletePlantCreator = (plant) => {
  return {
    type: DELETE_PLANT_ACTION,
    plant,
  };
};

// THUNK
export const fetchPlantsAll = () => {
  return async (dispatch) => {
    try {
      const { data: plants } = await axios.get(`/api/plants/`);
      dispatch(setPlantsAll(plants));
    } catch (error) {
      console.log("Error in fetching plants");
    }
  };
};

export const fetchPlants = (pageNum) => {
  return async (dispatch) => {
    try {
      const { data: plants } = await axios.get(`/api/plants/page/${pageNum}`);
      dispatch(setPlants(plants, pageNum));
    } catch (error) {
      console.log("Error in fetching plants");
    }
  };
};

export const addPlant = (plant) => {
  return async (dispatch) => {
    try {
      const { data: newPlant } = await axios.post("/api/plants", plant);
      dispatch(addPlantCreator(newPlant));
    } catch (error) {
      console.log("Error in addPlant thunk");
    }
  };
};

export const deletePlant = (plantId) => {
  return async (dispatch) => {
    try {
      const { data: plant } = await axios.delete(`/api/plants/${plantId}`);
      dispatch(deletePlantCreator(plant));
    } catch (error) {
      console.log("Error in deletePlant thunk");
    }
  };
};

// INITIAL STATE
const initialState = {
  all: [],
};

//REDUCER
const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANTS_ACTION:
      return {
        ...state,
        all: action.plants,
      };
    case ADD_PLANT_ACTION:
      return { ...state, all: [...state.all, action.plant] };
    case DELETE_PLANT_ACTION:
      return {
        ...state,
        all: state.all.filter((plant) => plant.id !== action.plant.id),
      };
    case SET_PLANTS_ALL_ACTION:
      return { ...state, all: action.plants };
    default:
      return state;
  }
};

export default plantsReducer;
