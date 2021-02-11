import React, { useContext, useEffect, useState } from "react"
import { SavedChallengeContext } from "../Challenges/SavedChallengeProvider"
import { SavedChallengeCard } from "./SavedChallengeCard"
import { Link } from 'react-router-dom'
import "./SavedChallenge.css"

export const UserDetails = () => {

    const { getSavedChallenges, deleteSavedChallenge } = useContext(SavedChallengeContext)

    const [savedChallenges, setSavedChallenges] = useState([])

    //fetches all saved challenges
    useEffect(() => {
        getSavedChallenges()
            .then(setSavedChallenges)
    }, [])

    //handles the deleting of saved challenges for a single user
    const handleSavedChallengeDelete = (savedObj) => {
        deleteSavedChallenge(savedObj.id)
        .then(getSavedChallenges)
        .then(setSavedChallenges)
    }

    //renders each challenge
    return (
        <section className="SavedChallengeCard">
            <Link to={`/games`}>
                View list of games!
            </Link>
            <h1 className="header">Saved Challenges</h1>
            {savedChallenges.map((item) => {
                return <SavedChallengeCard key={item.id} challenge={item} deleteBtn={handleSavedChallengeDelete}/>
            })}
        </section>
    )
}