import React from "react"
import { Link } from 'react-router-dom'



export const SavedChallengeCard = ({challenge, deleteBtn}) => {


    //only render the challenge card if the userId matches the current user
    if (challenge.userId === parseInt(sessionStorage.site_user)) {
    return (
        <section className="challenge">
            <h3 className="challenge__title">{challenge.challenge.title}</h3>
            <h4 className="game__title"> <Link to={`/game-${challenge.challenge.gameId}`}>
            {challenge.challenge.game}
            </Link></h4>
            <div className="challenge__poster">Posted by: {challenge.user.username}</div>
            <div className="challenge__description">{challenge.challenge.description}</div>
            <button className="removeChallenge" onClick={() => deleteBtn(challenge)}>Remove From Saved</button>
        </section>
    )
    } else {
        return ("")
    }
}