// src/store/selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredEmployees = createSelector(
  (state) => state.employees.employees,
  (state) => state.employees.filters,
  (employees, filters) => {
    return employees.filter((employee) => {
      // Apply gender filter
      if (filters.gender.length > 0 && !filters.gender.includes(employee.gender)) {
        return false;
      }
      // Apply age filter
      if (filters.age.length > 0 && !filters.age.includes(employee.age)) {
        return false;
      }
      // Apply unit filter
      if (filters.unit.length > 0 && !filters.unit.includes(employee.unit)) {
        return false;
      }
      // Apply team filter
      if (filters.team.length > 0 && !filters.team.includes(employee.team)) {
        return false;
      }
      // Apply experience filter
      if (filters.experience.length > 0 && !filters.experience.includes(employee.duration)) {
        return false;
      }
      return true;
    });
  }
);
