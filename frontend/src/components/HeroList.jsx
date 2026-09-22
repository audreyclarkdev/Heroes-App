import { useState, useEffect } from "react";
import HeroDetail from "./HeroDetail";

// This component fetches and renders
// the heroes list from the server
const HeroList = () => {
  const [heroes, setHeroes] = useState([]);

  // The base url for the server with the ids
  // of the heroes I want to display hardcoded in.
  const baseURL = "http://localhost:3000/heroes?ids=717,620,517";

  // triggers the call to the backend server
  // with empty dependency array so it runs only once when this component mounts
  useEffect(() => {
    // fetching from our backend server
    // with the backend handling the actual external api call
    // so the frontend never has direct access to it

    fetch(`${baseURL}`)
      .then((res) => {
        // fetch() doesn't reject on HTTP error responses so we want to
        // manually check for those and throw here
        // to make sure our .catch() catches these
        if (!res.ok) {
          throw new Error(`Cannot get hero. Status is: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setHeroes(data);
      })
      .catch((error) => console.error("Something went wrong", error));
  }, []);

  // Looping over our heroes array to render
  // the HeroDetail component once per hero
  // using hero props here and the key needs to be here to
  const renderedHeroes = heroes.map((hero) => {
    return <HeroDetail key={hero.id} hero={hero} />;
  });

  return <div className="hero-list">{renderedHeroes}</div>;
};

export default HeroList;
