import { useEffect, useMemo, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

function App() {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState(null);

  const locationEvents = useMemo(() => {
    if (!location) {
      return [];
    }

    return events.filter((event) => event.location === location);
  }, [location, events]);

  useEffect(() => {
    fetch("http://localhost:3000/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setLocation("Los Angeles")}>Los Angeles</button>
        <button onClick={() => setLocation("Mexico")}>Mexico</button>
        <button onClick={() => setLocation("Oslo")}>Oslo</button>
      </div>
      <div className="card">
        <ul className="events">
          {locationEvents.map((event) => (
            <li key={event.id} className="card-event">
              <p>{event.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
