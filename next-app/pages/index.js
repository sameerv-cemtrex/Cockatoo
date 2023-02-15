import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

const IndexPage = () => {
  const [cocktail, setCocktail] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const fetchData = async () => {
    const resp = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const res = await resp.json();
    setCocktail(res.drinks[0]);
    setLoading(false);
  };
  const drinkList = [];

  if (!isLoading) {
    for (let x = 1; x <= 15; x++) {
      let drinkNo = "strIngredient";
      if (cocktail[drinkNo + x] !== null) {
        drinkList.push(cocktail[drinkNo + x]);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p style={{ color: "white" }}>Loading....</p>
      ) : (
        <>
          <h1 className={styles.title}>{cocktail.strDrink}</h1>
          <h4 className={styles.subtitle}>{cocktail.strCategory}</h4>

          <img
            src={cocktail.strDrinkThumb}
            alt="drink"
            width={300}
            height={300}
            className={styles.img}
          />

          <h3>Ingredients:</h3>
          <ul className={styles.list}>
            {drinkList.map((item) => (
              <li className={styles.listItem} key={item}>
                {item}
              </li>
            ))}
          </ul>

          <div>
            <h3
              onClick={() => setShowRecipe(!showRecipe)}
              className={styles.recipeBtn}
            >
              Recipe
            </h3>
            {showRecipe ? (
              <div className={styles.recipe}>{cocktail.strInstructions}</div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default IndexPage;
