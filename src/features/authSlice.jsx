import { createSlice } from "@reduxjs/toolkit";
import { store } from "../App/store";

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
      const slect = store[action.payload];
      const result = slect.regexp.test(slect.user);
      slect.valid = result;
      
    },
    focus: (state, action) => {
      const slect = store[action.payload];
      slect.focus = !slect.focus;
      
    },
  },
  change: {
    reducer: (state, action) => {
      const slect = store[action.payload];
      slect.user = action.payload.value;
      
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
});

export const actions = authSlice.actions;

export default authSlice.reducer;
