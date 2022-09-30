import React from "react";

const SortBy = ({ sortValue, setSortValue }) => {
  const handleChange = event => {
    setSortValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">Sort By: </label>
      <select name="filter" id="filter" onChange={handleChange}>
        <option value="created_at">Date</option>
        <option value="votes">Most Popular</option>
        <option value="author">Author</option>
      </select>
    </div>
  );
};

export default SortBy;
