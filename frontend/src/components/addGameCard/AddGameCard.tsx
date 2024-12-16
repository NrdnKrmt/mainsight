import axios from "axios";
import {Dispatch, SetStateAction, useState} from "react";
import {Game} from "../addGame/Game.ts";
import RoleSelect from "../roleSelect/RoleSelect.tsx";

type Props = {
    game: Game
    setAvailableGames: Dispatch<SetStateAction<Game[]>>
    user: string;
}

function AddGameCard({game, setAvailableGames, user}: Readonly<Props>) {

    const [selectedRole, setSelectedRole] = useState<string>("");

    const handleAddPreference = async (userId: string, gameId: string, role: string): Promise<void> => {
        await axios
            .post(`/api/users/${userId}/preferences/${gameId}/${role}`, {})

        setAvailableGames((prev) => prev.filter(
                (currentAvailableGame) => gameId !== currentAvailableGame.id
            )
        )
    };

    return (
        <>
            <img src={game.image} alt={game.name} className="game-image"/>
            <div className="game-info">
                <h2>{game.name}</h2>
                <p><strong>Genre:</strong> {game.genre}</p>
                <p>{game.description}</p>
                <RoleSelect setSelectedRole={setSelectedRole}/>
                <button onClick={() => handleAddPreference(`${user}`, `${game.id}`, `${selectedRole}`)}>Add</button>
            </div>
        </>
    )
}

export default AddGameCard
