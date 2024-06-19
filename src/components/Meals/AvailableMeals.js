import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isLoading) {
				setIsLoading(false);
			}
		}, 8000);

		fetch("https://meals-2606-default-rtdb.firebaseio.com/meals.json")
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						"Check your internet connection"
					);
				}
				return response.json();
			})
			.then((data) => {
				const loadedMeals = [];
				for (const key in data) {
					loadedMeals.push({
						id: key,
						name: data[key].name,
						description: data[key].description,
						price: data[key].price,
					});
				}
				setMeals(loadedMeals);
				setIsLoading(false);
				clearTimeout(timer);
			})
			.catch((error) => {
				setError(error.message);
				setIsLoading(false);
				clearTimeout(timer);
			});

		return () => clearTimeout(timer);
	}, [isLoading]);

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				{isLoading && !error && <div className={classes.loader}></div>}
				{error && <p className={classes.error}>{error}</p>}
				{!isLoading && !error && <ul>{mealsList}</ul>}
			</Card>
		</section>
	);
};

export default AvailableMeals;
