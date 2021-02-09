import React, { useContext, useEffect, useState, useRef } from "react"
import { GameContext } from "../SearchPage/GamesProvider"
import { ChallengeContext } from "./ChallengeProvider"
import { useParams } from 'react-router-dom'

const refreshPage = () => {
    window.location.reload(false)
}

export const ChallengeForm = () => {
    const { addChallenge, getRatings } = useContext(ChallengeContext)

    const { getGameById } = useContext(GameContext)


    const [challenge, setChallenge] = useState({
        id: 0,
        userId: 0,
        title: "",
        ratingId: 0,
        description: ""
    })

    const [games, setGame] = useState({
        gameId: 0,
        game: "",
    })

    const [ratings, setRatings] = useState([])

    const { challengeId } = useParams()

    const { gameId } = useParams()

    const handleControlledInputChange = (event) => {
        const newChallenge = { ...challenge }
        newChallenge[event.target.name] = event.target.value
        setChallenge(newChallenge)
    }

    const handleSaveChallenge = () => {
        if (challenge.title === "" || challenge.ratingId === 0 || challenge.description === "") {
            window.alert("Please fill in all fields.")
        } else {

            addChallenge({
                id: challenge.id,
                userId: parseInt(sessionStorage.site_user),
                gameId: parseInt(games.id),
                game: games.name,
                title: challenge.title,
                ratingId: parseInt(challenge.ratingId),
                description: challenge.description
            })
            .then(refreshPage())
        }
    }

        useEffect(() => {
            getGameById(gameId)
                .then((response) => {
                    setGame(response)
                    return getRatings()
                        .then(setRatings)
                })
        }, [])

        return (
            <form className="challengeForm">
                <h2 className="challengeForm__title">{challengeId ? "Edit Challenge" : "Add Challenge"}</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="challengeTitle">Title </label>
                        <input type="text" id="challengeTitle" name="title" required autoFocus className="form-control"
                            placeholder="Title"
                            onChange={handleControlledInputChange}
                            value={challenge.title} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="rating">Difficulty </label>
                        <select value={challenge.ratingId} name="ratingId" id="challengeRating" className="form-control" onChange={handleControlledInputChange}>
                            <option value="0">Select a rating</option>
                            {ratings?.map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.rank}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Description" value={challenge.description} />
                    </div>
                </fieldset>
                <button className="btn btn-primary"
                    onClick={event => {
                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                        handleSaveChallenge()
                    }}
                >
                    {challengeId ? <>Save Challenge</> : <>Add Challenge</>}</button>
            </form>
        )
    }