import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import employeesReducer from '../store/employeesSlice';
import sortReducer from '../store/sortSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    sort: sortReducer,
  },
});


