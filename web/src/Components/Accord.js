import React, { useState, useEffect } from 'react';
import './components.css';

const Accord = ({ title, items, className, filterType, selectedFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setCheckedItems(items.map(item => selectedFilter.includes(item)));
  }, [selectedFilter, items]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item, index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    if (newCheckedItems[index]) {
      onFilterChange(filterType, [...selectedFilter, item]);
    } else {
      onFilterChange(filterType, selectedFilter.filter(i => i !== item));
    }
  };

  return (
    <div className={`accordion ${className}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
      </div>
      {isOpen && (
        <div className="accordion-content">
          {items.map((item, index) => (
            <div key={item} className="accordion-item" onClick={() => handleItemClick(item, index)}>
              <input
                type="checkbox"
                className="accordion-item-checkbox"
                checked={checkedItems[index]}
                readOnly
              />
              <span className="accordion-item-label">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Accord;
