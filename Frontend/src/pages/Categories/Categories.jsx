import React from "react";
import "./Categories.scss";

const Categories = ({ categories, onSelectCategory }) => {
  // categories = [{ id: 28, name: "Action" }, { id: 35, name: "Comedy" }, ...]
  
  return (
    <div className="categoriesPage">
      <h1>Browse by Category</h1>
      
      <div className="categoriesGrid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="categoryCard"
            onClick={() => onSelectCategory(cat)}
          >
            <div className="categoryContent">
              <h3>{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;