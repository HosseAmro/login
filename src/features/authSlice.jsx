import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  names: {
    user: "",
    valid: false,
    focus: false,
    regexp: /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/,
  },
  num: { user: "", valid: false, focus: false, regexp: /^[0-9]{11,13}$/ },
  pas: { user: "", valid: false, focus: false, regexp: /^.{4,24}$/ },
  pas22: { user: "", valid: false, focus: false },
  msg: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    test0: (state, action) => {
      const result = state[action.payload].regexp.test(
        state[action.payload].user
      );
      state[action.payload].valid = result;
    },
    focus: (state, action) => {
      state[action.payload].focus = !state[action.payload].focus;
    },
    change: {
      reducer: (state, action) => {
        state[action.payload.names].user = action.payload.value;
      },
      prepare: (names, value) => {
        return {
          payload: {
            names,
            value,
          },
        };
      },
    },
    clear: (state) => {
      // eslint-disable-next-line no-unused-vars
      state = initialState;
    },
  },
});

export const actions = authSlice.actions;

export default authSlice.reducer;
