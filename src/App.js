import React, { useState } from 'react';
import Footer from "./components/Footer";
import Axios from 'axios'
import './App.css';
import { v4 as uuid } from 'uuid'
import Recipe from './components/Recipe'
import Alert from "./components/Alert";

const App = () => {

  const [query, setQuery] = useState("")
  let [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState("");

  const APP_ID = "6e821545"
  const APP_KEY = "62416024663e954d8a87f8360e32e985"
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value)

  }

  const onSubmit = (e) => {
    e.preventDefault();

    getData();
  }

  return (

    <div className="App">

      <h1 onClick={getData}>Recipe Search </h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input type="text" placeholder="Search Ingredient" onChange={onChange} value={query} />
        <input type="submit" value="Search" />
      </form>

      <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuid()} recipe={recipe} />)}
      </div>
      <Footer />
    </div>
  );
}

export default App;
