import { createSlice } from "@reduxjs/toolkit";

const counterStore=createSlice({
  name:'counter',
  initialState:{
    count:0
  },
  reducers:{
    add:(state)=>{
      state.count++
    },
    decrease:(state)=>{
      state.count--
    }
  }
})

//解构出创建action对象的函数
const {add,decrease}=counterStore.actions
//获得reducer函数
const CounterReducer=counterStore.reducer
//导出创建action对象的函数和reducer函数
export {add,decrease}
export default CounterReducer

