import React from "react"

export const ChallengeCard = ({ challenge, game }) => {
    if (challenge.gameId === game.id) {
        return (
            <section className="challenge">
                <h3 className="challenge__title">{challenge.name}</h3>
            </section>
        )
    }
}