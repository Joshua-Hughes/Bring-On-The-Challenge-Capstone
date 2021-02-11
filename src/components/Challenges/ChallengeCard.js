import React, { useContext, useRef } from "react"
import { ChallengeContext } from "./ChallengeProvider"
import { SavedChallengeContext } from "./SavedChallengeProvider"
import { ChallengeForm } from "../Challenges/ChallengeForm"

//Renders a card for each existing challenge per game
export const ChallengeCard = ({ challenge, game }) => {

    const newChallengeForm = useRef()

    const { deleteChallenge } = useContext(ChallengeContext)

    const { saveChallenge } = useContext(SavedChallengeContext)

    //handles the deleting of challenges
    const handleChallengeDelete = () => {
        deleteChallenge(challenge.id)
    }

    //handles the saving of challenges
    const handleChallengeSave = () => {
        {
            saveChallenge({
                userId: parseInt(sessionStorage.site_user),
                challengeId: challenge.id,
                isComplete: false
            })
            .then(() => {
                window.alert("Challenge Saved!")
            })
        }

    }

    //if the challenge belongs to the currently viewed game, render the card.
    //if the challenge belongs to the currently active user, render with a delete button.
    if (challenge.gameId === game.id && parseInt(sessionStorage.site_user) === challenge.user.id) {
        return (
            <section className="challenge">
                <h3 className="challenge__title">{challenge.title}</h3>
                <div className="challenge__rating"> Difficulty: {challenge.rating.rank}</div>
                <div className="challenge__poster"> Posted By: {challenge.user.username}</div>
                <div className="challenge__description">{challenge.description}</div>
                <button id={challenge.id} onClick={handleChallengeDelete}>Delete</button>
                <dialog className="dialog--form" ref={newChallengeForm}>
                    <ChallengeForm />
                    <button className="closeButton" onClick={e => newChallengeForm.current.close()}>Close</button>
                </dialog>
                <button className={"editBtn"} id={challenge.id} onClick={e => newChallengeForm.current.showModal()}>Edit</button>
                <button id={challenge.id} onClick={handleChallengeSave}>Save</button>
            </section>
        )
    } else if (challenge?.gameId === game?.id) {
        return (
            <section className="challenge">
                <h3 className="challenge__title">{challenge.title}</h3>
                <div className="challenge__rating"> Difficulty: {challenge.rating.rank}</div>
                <div className="challenge__poster"> Posted By: {challenge.user.username}</div>
                <div className="challenge__description">{challenge.description}</div>
                <button id={challenge.id} onClick={handleChallengeSave}>Save</button>
            </section>
        )
    } else {
        return ("")
    }
}