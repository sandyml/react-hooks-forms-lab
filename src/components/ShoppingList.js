import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [onSearch, setSearch] = useState("");
	const [newArray, setArray] = useState(items);

	function onSearchChange(event) {
		//console.log(event);
		setSearch(event);
	}
	function handleCategoryChange(event) {
		setSelectedCategory(event);
	}

	function onItemFormSubmit(event) {
		//console.log(event);
		setArray([...newArray, event]);
	}
	const itemsToDisplay = newArray
		.filter((item) => {
			if (selectedCategory === "All") return true;

			return item.category === selectedCategory;
		}) 

		.filter((item) => {
			if (onSearch === "") {
				return true;
			} else {
				return item.name.includes(onSearch);
			}
		});

	return (
    
		<div className="ShoppingList">
			<ItemForm onItemFormSubmit={onItemFormSubmit} />
			<Filter
				search={onSearch}
				onCategoryChange={handleCategoryChange}
				onSearchChange={onSearchChange}
			/>
			<ul className="Items">
				{itemsToDisplay.map((item) => (
					<Item
						key={item.id}
						name={item.name}
						category={item.category}
					/>
				))}
			</ul>
		</div>
	);
}

export default ShoppingList;
