import React from "react"

export const GameCard = ({ game }) => {
    return (
        <section className="game">
            <h3 className="game__name">{game.name}</h3>
            <img src={game.background_image} width="200"></img>
            <div className="game__rating">Metacritic Score: {game.metacritic}/100</div>
            <div className="game__esrb">ESRB Rating: {game.esrb_rating?.name}</div>
        </section>
    )
}