import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  names: {
    user: "",
    valid: false,
    focus: false,
  },
  num: { user: "", valid: false, focus: false },
  pas: { user: "", valid: false, focus: false },
  pas22: { user: "", valid: false, focus: false },
  msg: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    valid: {
      reducer: (state, action) => {
        state[action.payload.names].valid = action.payload.reslut;
      },
      prepare: (names, reslut) => {
        return {
          payload: {
            names,
            reslut,
          },
        };
      },
    },
    focus: (state, action) => {
      state[action.payload].focus = !state[action.payload].focus;
    },
    msg: (state, action) => {
      state.msg = action.payload;
    },
    token: (state, action) => {
      state.token = action.payload;
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
      (state.names = {
        user: "",
        valid: false,
        focus: false,
        REG: /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/,
      }),
        (state.num = {
          user: "",
          valid: false,
          focus: false,
          REG: /^[0-9]{11,13}$/,
        }),
        (state.pas = {
          user: "",
          valid: false,
          focus: false,
          REG: /^.{4,24}$/,
        }),
        (state.pas22 = { user: "", valid: false, focus: false }),
        (state.msg = ""),
        (state.token = "");
    },
    authset: {
      reducer: (state, action) => {
        state.names.user = action.payload.names;
        state.pas.user = action.payload.pas;
        state.token = action.payload.token;
      },
      prepare: (token, names, pas) => {
        return {
          payload: {
            token,
            names,
            pas,
          },
        };
      },
    },
  },
});

export const actions = authSlice.actions;

export default authSlice.reducer;
