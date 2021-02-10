import React, { useContext, useRef } from "react"
import { ChallengeContext } from "./ChallengeProvider"
import { SavedChallengeContext } from "./SavedChallengeProvider"



export const ChallengeCard = ({ challenge, game }) => {

    const { deleteChallenge } = useContext(ChallengeContext)

    const { saveChallenge } = useContext(SavedChallengeContext)

    const savedSuccess = useRef()

    const handleChallengeDelete = () => {
        deleteChallenge(challenge.id)
    }

    const handleChallengeSave = () => {
        {
            saveChallenge({
                userId: parseInt(sessionStorage.site_user),
                challengeId: challenge.id,
                isComplete: false
            })
            window.alert("Challenge Saved!")
        }

    }

    if (challenge.gameId === game.id && parseInt(sessionStorage.site_user) === challenge.user.id) {
        return (
            <section className="challenge">
                <dialog className="dialog dialog--auth" ref={savedSuccess}>
                    <div>Challenge Saved!</div>
                    <button className="button--close" onClick={e => savedSuccess.current.close()}>Close</button>
                </dialog>
                <h3 className="challenge__title">{challenge.title}</h3>
                <div className="challenge__rating"> Difficulty: {challenge.rating.rank}</div>
                <div className="challenge__poster"> Posted By: {challenge.user.username}</div>
                <div className="challenge__description">{challenge.description}</div>
                <button id={challenge.id} onClick={handleChallengeDelete}>Delete</button>
                <button id={challenge.id} onClick={handleChallengeSave}>Save</button>
            </section>
        )
    } else if (challenge?.gameId === game?.id) {
        return (
            <section className="challenge">
                <dialog className="dialog dialog--auth" ref={savedSuccess}>
                    <div>Challenge Saved!</div>
                    <button className="button--close" onClick={e => savedSuccess.current.close()}>Close</button>
                </dialog>
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