import React, { useContext, useEffect, useState } from "react"
import { GameContext } from "./GamesProvider"
import { ChallengeContext } from "../Challenges/ChallengeProvider"
import { ChallengeCard } from "../Challenges/ChallengeCard"
import { useHistory, useParams } from "react-router-dom"

export const GameDetails = () => {
    const { getGameById } = useContext(GameContext)

    const { getChallenges } = useContext(ChallengeContext)

    const [game, setGame] = useState({})

    const [challenges, setChallenges] = useState({})

    const { gameId } = useParams()

    const history = useHistory()

    useEffect(() => {
        getGameById(gameId)
            .then((response) => {
                setGame(response)
            })
    }, [])

    useEffect(() => {
        getChallenges()
            // .then((response) => {
            //     setChallenges(response)
            // })
    }, [])

    console.log(challenges)

    let gamePlatforms = game.platforms?.map((platform) =>
        <div className="platform" key={platform.platform?.id}> {platform.platform?.name}</div>)

    let gameDevs = game.developers?.map((dev) =>
        <div className="dev" key={dev.id}> {dev.name}</div>)

    let gameGenres = game.genres?.map((genre) =>
        <div className="genre" key={genre.id}> {genre.name}</div>)

    let gameTags = game.tags?.map((tag) =>
        <div className="tag" key={tag.id}> {tag.name}</div>)

    let gamePubs = game.publishers?.map((publisher) =>
        <div className="publisher" key={publisher.id}> {publisher.name}</div>)

    return (
        <section className="game">
            <article className="game__information">
                <img src={game.background_image} width="500" alt="No image available"></img>
                <h3 className="game__title">Title: {game.name}</h3>
                <div className="game__metacritic"> Metacritic Score: {game.metacritic}</div>
                <div className="game__description" dangerouslySetInnerHTML={{ __html: game.description }} />
                <div className="game__platforms"> Platforms:{gamePlatforms}</div>
                <div className="game__releaseDate">Released: {game.released}</div>
                <div className="game__rating">Player Rating: {game.rating}</div>
                <div className="game__developers">Developers: {gameDevs}</div>
                <div className="game__genres">Genres: {gameGenres}</div>
                <div className="game__tags">Tags: {gameTags}</div>
                <div className="game__publishers">Publishers: {gamePubs}</div>
                <div className="game__esrb">ESRB Rating: {game.esrb_rating?.name}</div>
            </article>
            <article className="challenges">
                <h3 className="challenges__header">Challenges</h3>
            </article>
            {/* {challenges.map(challenge => {
                return <ChallengeCard key={challenge.id} challenge={challenge} />
            })} */}
        </section>
    )
}