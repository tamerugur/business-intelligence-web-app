// src/components/Filters.js
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Accord from "./Accord";
import { 
  setGenderFilter, 
  setAgeFilter, 
  setUnitFilter, 
  setTeamFilter, 
  setExperienceFilter, 
} from '../store/employeesSlice';
import "./components.css";

const unitItems = [
  "Kurumsal Dijital Uygulamalar",
  "KGY ve OPİM",
  "Bankasürans Uygulamaları",
  "İK Uygulamaları",
  "Müşteri İlişkileri Yönetimi",
  "Müşteri ve Kampanya Yönetimi",
  "İş Zekası Ve Raporlama",
  "Veri Analitiği ve Yapay Zeka",
  "Analitik Araç ve Ortam Yönetimi",
  "Veri Ambarı Yönetimi"
];

const genderItems = ["Male", "Female"];

const ageItems = [
  "18-25",
  "25-35",
  "35-50",
  "50+"
];

const teamItems = [
  "Software Development",
  "Analyst",
  "Hiring",
  "Maintaining",
  "Supervisor",
  "Security"
];

const expItems = [
  "0-2 years",
  "2-5 years",
  "5-10 years",
  "10-15 years",
  "15+ years",
];

function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.employees.filters);

  const handleFilterChange = (filterType, values) => {
    switch (filterType) {
      case 'gender':
        dispatch(setGenderFilter(values));
        break;
      case 'age':
        dispatch(setAgeFilter(values));
        break;
      case 'unit':
        dispatch(setUnitFilter(values));
        break;
      case 'team':
        dispatch(setTeamFilter(values));
        break;
      case 'experience':
        dispatch(setExperienceFilter(values));
        break;
      default:
        break;
    }
  };

  return (
    <div className="filters-container">
      <Accord 
        title="Unit" 
        className="accordion-duel" 
        items={unitItems} 
        filterType="unit" 
        selectedFilter={filters.unit} 
        onFilterChange={handleFilterChange}
      />
      <Accord 
        title="Gender" 
        className="accordion-duel" 
        items={genderItems} 
        filterType="gender" 
        selectedFilter={filters.gender} 
        onFilterChange={handleFilterChange}
      />
      <Accord 
        title="Age" 
        className="accordion-duel" 
        items={ageItems} 
        filterType="age" 
        selectedFilter={filters.age} 
        onFilterChange={handleFilterChange}
      />
      <Accord 
        title="Team" 
        className="accordion-duel" 
        items={teamItems} 
        filterType="team" 
        selectedFilter={filters.team} 
        onFilterChange={handleFilterChange}
      />
      <Accord 
        title="Employee Duration" 
        className="accordion-duel" 
        items={expItems} 
        filterType="experience" 
        selectedFilter={filters.experience} 
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default Filters;

export {unitItems, genderItems, teamItems, ageItems, expItems};