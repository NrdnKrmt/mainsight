import axios from "axios";
import {useEffect, useState} from "react";
import {Preference} from "./Preference.ts"
import "./PreferenceInfo.css"
import { useNavigate } from "react-router-dom";

function PreferenceInfo() {

    const [preferences, setPreferences] = useState<Preference[]>([]);

    useEffect(() => {
        axios
            .get("/api/users/1/preferences")
            .then((response) => {
                setPreferences(response.data);
            })
    }, []);

    const navigate = useNavigate();

    function goToAdd() {
        navigate("/add");
    }

        return (
        <div className="preference-info-container">
            <div className="add-game">
                <button onClick={goToAdd}>Add Game</button>
            </div>
            <div className="preferences-boxes">
                {preferences.map((pref) => (
                    <div className="preference-box" key={pref.gameId}>
                        <h2>{pref.gameName}</h2>
                        <p><strong>Genre:</strong> {pref.gameGenre}</p>
                        <img src={pref.gameImage} alt={pref.gameName} className="game-image"/>
                        <p>{pref.gameDescription}</p>
                        <h3>{pref.preferredRole}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PreferenceInfo
