import React from "react"
import { Link } from "react-router-dom"

export const GameCard = ({ game }) => {
    return (
        <section className="game">
            <h3 className="game__name">
                <Link to={`/game-${game.id}`}>
                    {game.name}
                </Link>
            </h3>
            <img src={game.background_image} width="200" alt="No image available"></img>
        </section>
    )
}