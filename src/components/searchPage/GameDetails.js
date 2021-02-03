import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GameListProvider"
import { useParams } from "react-router-dom"

export const GameDetails = () => {
    const { getGameById } = useContext(GameContext)

    const [game, setGame] = useState({})

    const {gameId} = useParams()

    useEffect(() => {
        getGameById(gameId)
        .then((response) => {
            setGame(response)
        })
    }, [])

    

    return (
        <section className="game">
            <h3 className="game__title">Title: {game.name}</h3>
            <div className="game__platforms"> Platforms: {game.platforms.platform.map()}</div>
        </section>
    )
}