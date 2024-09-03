import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  isOpen: boolean;
  loading: boolean;
  openSidebar: boolean;
  selectedDateOrders:number;
  selectedDateRevenue: number
}
const initialState: IinitialState = {
  isOpen: false,
  loading: false,
  openSidebar: false,
  selectedDateOrders : 0,
  selectedDateRevenue:0
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setDialog: (state, action) => {
      state.isOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOpenSidebar: (state) => {
      state.openSidebar = !state.openSidebar;
    },
    setSelectedDateOrders : (state,action) => {
      state.selectedDateOrders = action.payload;
    },
    setSelectedDateRevenue : (state,action) => {
      state.selectedDateRevenue = action.payload;
    }
  },
});

export default adminSlice.reducer;
export const { setDialog, setLoading, setOpenSidebar,setSelectedDateOrders,setSelectedDateRevenue } = adminSlice.actions;
