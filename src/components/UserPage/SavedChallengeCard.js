import React, { useContext, useState, useEffect } from "react"
import { SavedChallengeContext } from "../Challenges/SavedChallengeProvider"
import { Link } from 'react-router-dom'



export const SavedChallengeCard = savedChallenge => {

    const refreshPage = () => {
        window.location.reload(false)
    }

    const { getSavedChallenges, deleteSavedChallenge } = useContext(SavedChallengeContext)

    const [savedChallenges, setSavedChallenges] = useState([])


    const handleSavedChallengeDelete = () => {
        deleteSavedChallenge(savedChallenge.challenge.id)
        .then(refreshPage())
    }

    if (savedChallenge.challenge.userId === parseInt(sessionStorage.site_user)) {
    return (
        <section className="challenge">
            <h3 className="challenge__title">{savedChallenge.challenge.challenge.title}</h3>
            <h4 className="game__title"> <Link to={`/game-${savedChallenge.challenge.challenge.gameId}`}>
            {savedChallenge.challenge.challenge.game}
            </Link></h4>
            <div className="challenge__poster">Posted by: {savedChallenge.challenge.user.username}</div>
            <div className="challenge__description">{savedChallenge.challenge.challenge.description}</div>
            <button className="removeChallenge" onClick={handleSavedChallengeDelete}>Remove From Saved</button>
        </section>
    )
    } else {
        return ("")
    }
}