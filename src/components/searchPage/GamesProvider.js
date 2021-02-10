import React, { useState, createContext } from "react"
import { settings } from '../../Settings.js';

export const GameContext = createContext()



export const GamesProvider = (props) => {
    let [games, setGames] = useState([])

    const getGames = () => {
        return fetch(`https://api.rawg.io/api/games?key=${settings.rawgKey}`)
            .then(response => response.json())
            .then(setGames)
    }

    const getGameById = (id) => {
        return fetch(`https://api.rawg.io/api/games/${id}?key=${settings.rawgKey}`)
            .then(response => response.json())
    }

    const nextList = () => {
        if (games.next !== null) {
            fetch(`${games?.next}`)
                .then(response => response.json())
                .then(setGames)
        }
    }

    const prevList = () => {
        if (games.previous !== null) {
            fetch(`${games?.previous}`)
                .then(response => response.json())
                .then(setGames)
        }
    }

    const searchList = (term) => {
        if (term != "") {
            return fetch(`https://api.rawg.io/api/games?search=${term}&key=${settings.rawgKey}`)
                .then(response => response.json())
                .then(setGames)
        }
    }

    return (
        <GameContext.Provider value={{
            games, getGames, getGameById, nextList, prevList, searchList
        }}>
            {props.children}
        </GameContext.Provider>
    )
}