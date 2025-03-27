import { createSlice } from "@reduxjs/toolkit";
const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUserFromFeed: (state, action) => {
      if (!state) return state;
      
      // Check if state is an object with a data property (which is an array)
      if (state.data && Array.isArray(state.data)) {
        // Create a new state object with filtered data array
        return {
          ...state,
          data: state.data.filter(user => user._id !== action.payload)
        };
      } 
      // If state is already an array
      else if (Array.isArray(state)) {
        return state.filter(user => user._id !== action.payload);
      }
      
      // Return unchanged state if it's neither a proper object nor array
      return state;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
