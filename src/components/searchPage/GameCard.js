import React from "react"
import { Link } from "react-router-dom"

//displays each game passed through with a link to a details page
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