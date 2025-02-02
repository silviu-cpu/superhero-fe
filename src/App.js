import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State for the list of superheroes
  const [superheroes, setSuperheroes] = useState([]);
  // State for the input fields (name, superpower, humilityScore)
  const [newHero, setNewHero] = useState({
    name: "",
    superpower: "",
    humilityScore: 1,
  });

  // Fetch superheroes from the backend API
  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/superheroes");
      setSuperheroes(response.data);
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  // Add a new superhero to the list
  const addHero = async () => {
    if (
      newHero.name.trim() !== "" &&
      newHero.superpower.trim() !== "" &&
      newHero.humilityScore >= 1 &&
      newHero.humilityScore <= 10
    ) {
      try {
        await axios.post("http://localhost:3000/superheroes", newHero);
        fetchSuperheroes(); // Refresh the list of superheroes
        setNewHero({ name: "", superpower: "", humilityScore: 1 }); // Reset form fields
      } catch (error) {
        console.error("Error adding superhero:", error);
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHero((prev) => ({
      ...prev,
      [name]: name === "humilityScore" ? parseInt(value, 10) : value,
    }));
  };

  // Fetch superheroes on page load
  useEffect(() => {
    fetchSuperheroes();
  }, []);

  return (
    <div className="App">
      <h1>Superhero List</h1>
      <div>
        <input
          type="text"
          name="name"
          value={newHero.name}
          onChange={handleInputChange}
          placeholder="Enter superhero name"
        />
        <input
          type="text"
          name="superpower"
          value={newHero.superpower}
          onChange={handleInputChange}
          placeholder="Enter superhero superpower"
        />
        <input
          type="number"
          name="humilityScore"
          value={newHero.humilityScore}
          onChange={handleInputChange}
          placeholder="Enter humility score (1-10)"
        />
        <button onClick={addHero}>Add Superhero</button>
      </div>
      <ul>
        {superheroes.map((hero) => (
          <li key={hero.id}>
            {hero.name} ({hero.superpower}) - Humility Score:{" "}
            {hero.humilityScore}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
