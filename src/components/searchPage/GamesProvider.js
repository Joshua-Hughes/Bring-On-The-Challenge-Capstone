import React, { useState, createContext } from "react"
import { settings } from '../../Settings.js';

export const GameContext = createContext()

export const GamesProvider = (props) => {
    let [games, setGames] = useState([])

    //fetches all games
    const getGames = () => {
        return fetch(`https://api.rawg.io/api/games?key=${settings.rawgKey}`)
            .then(response => response.json())
            .then(setGames)
    }

    //fetches a specific game by id
    const getGameById = (id) => {
        return fetch(`https://api.rawg.io/api/games/${id}?key=${settings.rawgKey}`)
            .then(response => response.json())
    }

    //fetches the next set of games
    const nextList = () => {
        if (games.next !== null) {
            fetch(`${games?.next}`)
                .then(response => response.json())
                .then(setGames)
        }
    }

    //fetches the previous set of games
    const prevList = () => {
        if (games.previous !== null) {
            fetch(`${games?.previous}`)
                .then(response => response.json())
                .then(setGames)
        }
    }

    //allow for the searching of games through the list
    const searchList = (term) => {
        if (term != "") {
            return fetch(`https://api.rawg.io/api/games?search=${term}&key=${settings.rawgKey}`)
                .then(response => response.json())
                .then(setGames)
        }
    }

    //returns all provider functions
    return (
        <GameContext.Provider value={{
            games, getGames, getGameById, nextList, prevList, searchList
        }}>
            {props.children}
        </GameContext.Provider>
    )
}