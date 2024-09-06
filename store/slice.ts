import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  isOpen: boolean;
  loading: boolean;
  openSidebar: boolean;
  dasboardData : {
    selectedDateOrders : number,
    storeId:string,
    selectedDateRevenue:number
  }[]
}
const initialState: IinitialState = {
  isOpen: false,
  loading: false,
  openSidebar: false,
  dasboardData:[{
    selectedDateOrders:0,
    selectedDateRevenue:0,
    storeId:''
  }],
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
    setDashboardData : ( state,action) => {
      const { storeId, selectedDateOrders,selectedDateRevenue } = action.payload;
      for(let i = 0; i < state.dasboardData.length; i++){
        if(state.dasboardData[i].storeId === storeId){
          state.dasboardData[i].selectedDateOrders = selectedDateOrders;
          state.dasboardData[i].selectedDateRevenue = selectedDateRevenue;
        }
      }
    },
    pushDasboardData: (state, action) => {
      const { storeId, selectedDateOrders, selectedDateRevenue } = action.payload;
      const storeAlready =  state.dasboardData.find(item => item.storeId===storeId);
      if(storeAlready) setDashboardData({
        ...action.payload
      })
      else state.dasboardData.push({
        storeId,
        selectedDateOrders,
        selectedDateRevenue: selectedDateRevenue
      })

    },


  },
});

export default adminSlice.reducer;
export const {
  setDialog,
  setLoading,
  setOpenSidebar,
  setDashboardData,
  pushDasboardData

} = adminSlice.actions;
