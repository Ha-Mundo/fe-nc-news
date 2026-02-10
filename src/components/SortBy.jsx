import React from "react";

const SortBy = ({ sortValue, setSortValue }) => {
  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">Sort By: </label>
      <select 
        name="filter" 
        id="filter" 
        value={sortValue} // this keep the UI sync
        onChange={handleChange}
      >
        <option value="created_at">Date</option>
        <option value="author">Author</option>
        <option value="votes">Popularity</option>
        <option value="comment_count">Number of Comments</option>
      </select>
    </div>
  );
};

export default SortBy;