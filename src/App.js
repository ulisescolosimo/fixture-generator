import "./App.css";
import { useState, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GiSoccerField, GiSoccerBall } from "react-icons/gi";

function App() {
  const [teams, setTeams] = useState([]);

  const teamRef = useRef();
  const formRef = useRef();

  const handleTeams = async (e) => {
    e.preventDefault();
    if (teamRef.current.value != "") {
      await setTeams((teams) => [...teams, teamRef.current.value]);
      console.log(teams);
      formRef.current.reset();
    }
  };

  const roundRobin = (teams) => {
    let schedule = [];
    let league = teams.slice();

    if (league.length % 2) {
      league.push("None");
    }

    let rounds = league.length;

    for (let j = 0; j < rounds - 1; j++) {
      schedule[j] = [];
      for (let i = 0; i < rounds / 2; i++) {
        if (league[i] !== "None" && league[rounds - 1 - i] !== "None") {
          if (j % 2 == 1) {
            schedule[j].push([league[i], league[rounds - 1 - i]]);
          } else {
            schedule[j].push([league[rounds - 1 - i], league[i]]);
          }
        }
      }
      league.splice(1, 0, league.pop());
    }
    return schedule;
  };

  const [open, setOpen] = useState(false);

  const [fisture, setFisture] = useState([]);

  const createFisture = async () => {
    await setFisture(roundRobin(teams));
    setOpen(true);
  };

  const handleDelete = (jugador) => {
    let filter = teams.filter((item) => !item.includes(jugador));
    setTeams(filter);
  };

  const deleteFisture = () => {
    setFisture('')
    setOpen(false)

  }

  return (
    <div className="App text-white">
      <div className="navbar bg-base-300 jsutify">
  <a className="btn btn-ghost normal-case text-xl">Sorteo FISTUR</a>
</div>
      <form onSubmit={handleTeams} ref={formRef}>
        <input name="team" className="input my-5 bg-base-300" placeholder="Enter player" ref={teamRef} />
        <button type="submit" className="btn mx-2">
          Add player
        </button>
      </form>
      <div className="flex justify-center items-center gap-5 flex-wrap mt-5">
        {teams.length > 0 ? teams.map((item) => (
          <div className="card w-80 bg-base-300 shadow-xl">
            <div className="card-body w-auto flex justify-center items-center flex-row">
              <h2 className="card-title">{item}</h2>
              <AiOutlineDelete
                size={30}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(item)}
                id={item}
              />
            </div>
          </div>
        )) : <p className="text-2xl">0 players</p>}
      </div>
      <button className="btn my-10" onClick={createFisture}><GiSoccerBall size={20} className="mr-3" />
        Create fisture!
      </button>
      <div className="overflow-x-auto flex justify-center items-center gap-5 mt-5 flex-wrap">
        {open
          ? fisture.map((item, index) => (
            <div className="card w-96 bg-base-300 shadow-xl">
                <div className="card-body flex justify-center items-center">
                <GiSoccerField size={40} />
                <h2 className="text-2xl">Fecha {index + 1}:</h2>
                  {item.map((item2) => (
                    <p className="text-2xl">{item2.join(" vs ")}</p>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
      {open ? <button className="btn my-10" onClick={deleteFisture}>Delete fisture</button> : null}
    </div>
  );
}

export default App;
