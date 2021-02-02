import React, { useState, createContext } from "react"
import { settings } from '../../Settings.js';

export const ListContext = createContext()



export const ListProvider = (props) => {
    let [games, setGamesList] = useState([])

    const getGamesList = () => {
        return fetch(`https://api.rawg.io/api/games?key=${settings.rawgKey}`)
            .then(response => response.json())
            .then(setGamesList)
    }
    const getGameById = (id) => {
        return fetch(`https://api.rawg.io/api/games/${id}?key=${settings.rawgKey}`)
            .then(response => response.json())
    }

    const nextList = () => {
        fetch(`${games?.next}`)
            .then(response => response.json())
            .then(setGamesList)
    }

    const prevList = () => {
        fetch(`${games?.previous}`)
            .then(response => response.json())
            .then(setGamesList)
    }

    return (
        <ListContext.Provider value={{
            games, getGamesList, getGameById, nextList, prevList
        }}>
            {props.children}
        </ListContext.Provider>
    )
}