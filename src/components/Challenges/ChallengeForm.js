import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "../SearchPage/GamesProvider"
import { ChallengeContext } from "./ChallengeProvider"
import { useParams } from 'react-router-dom'



//Renders the form for submitting challenges
export const ChallengeForm = () => {

    const { addChallenge, getRatings } = useContext(ChallengeContext)

    const { getGameById } = useContext(GameContext)

    //sets the default state of the form
    const [challenge, setChallenge] = useState({
        id: 0,
        userId: 0,
        title: "",
        ratingId: 0,
        description: ""
    })

    //sets the default state of the game information needing to be saved, as well.
    const [games, setGame] = useState({
        gameId: 0,
        game: "",
    })

    const [ratings, setRatings] = useState([])

    const { gameId } = useParams()

    //handles the state change when typing
    const handleControlledInputChange = (event) => {
        const newChallenge = { ...challenge }
        newChallenge[event.target.name] = event.target.value
        setChallenge(newChallenge)
    }

    //handles the saving and updating of challenges
    const handleSaveChallenge = (button) => {
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
                .then(() => setChallenge,
                    window.alert("Challenge saved, why not another?"),
                    challenge.title = "",
                    challenge.ratingid = 0,
                    challenge.description = "")
        }
    }

    //fetches the currently viewed game and the list of ratings
    useEffect(() => {
        getGameById(gameId)
            .then((response) => {
                setGame(response)
                return getRatings()
                    .then(setRatings)
            })
    }, [])

    //renders the form
    return (
        <form className="challengeForm">
            <h2 className="challengeForm__title">Add Challenge</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="challengeTitle">Title </label>
                    <input type="text" id="challengeTitle" name="title" required autoFocus className="form-control" placeholder="Title" onChange={handleControlledInputChange} value={challenge.title} />
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
                    handleSaveChallenge(document.querySelector(".editBtn")?.id)
                }}
            >
                Add Challenge</button>
        </form>
    )
}