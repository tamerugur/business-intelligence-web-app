import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await fetch('http://localhost:3001/employees/getemployees');
  return response.json();
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    filters: {
      gender: [],
      age: [],
      unit: [],
      team: [],
      experience: []
    },
    status: 'idle',
    error: null
  },
  reducers: {
    setGenderFilter: (state, action) => {
      const newGenderFilter = action.payload;
      state.filters.gender = newGenderFilter;
    },
    setAgeFilter: (state, action) => {
      const newAgeFilter = action.payload;
      state.filters.age = newAgeFilter;
    },
    setUnitFilter: (state, action) => {
      const newUnitFilter = action.payload;
      state.filters.unit = newUnitFilter;
    },
    setTeamFilter: (state, action) => {
      const newTeamFilter = action.payload;
      state.filters.team = newTeamFilter;
    },
    setExperienceFilter: (state, action) => {
      const newExperienceFilter = action.payload;
      state.filters.experience = newExperienceFilter;
    },
    clearFilters: (state) => {
      state.filters = {
        gender: [],
        age: [],
        unit: [],
        team: [],
        experience: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  setGenderFilter,
  setAgeFilter,
  setUnitFilter,
  setTeamFilter,
  setExperienceFilter,
  clearFilters
} = employeesSlice.actions;

export default employeesSlice.reducer;
