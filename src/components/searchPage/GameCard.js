import React from "react"

export const GameCard = ({ game }) => (
    <section className="game">
        <h3 className="game__name">Title: {game.results.name}</h3>
        <div className="game__rating">Ratings: {game.results.rating}/{game.results.rating_top}</div>
        <div className="game__metacritic">Metacritic Score: {game.results.metacritic}/100</div>
        <div className="game__esrb">ESRB Rating: {game.results.esrb_rating.name}</div>
    </section>
)