import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cafes: [],
  searchTerm: "",
  filteredData: [],
};

const cafeSlice = createSlice({
  name: "cafes",
  initialState,
  reducers: {
    setCafes(state, action) {
      state.cafes = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.filteredData = state.cafes.filter((cafe) =>
        cafe.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
  },
});

export const { setCafes, setSearchTerm } = cafeSlice.actions;
export default cafeSlice.reducer;
