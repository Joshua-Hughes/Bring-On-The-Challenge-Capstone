import React, { useContext, useEffect, useState, useRef } from "react"
import { GameContext } from "./GamesProvider"
import { ChallengeContext } from "../Challenges/ChallengeProvider"
import { ChallengeCard } from "../Challenges/ChallengeCard"
import { useParams } from "react-router-dom"
import { ChallengeForm } from "../Challenges/ChallengeForm"


export const GameDetails = () => {

    const newChallengeForm = useRef()

    const { getGameById } = useContext(GameContext)

    const { getChallenges, challenges } = useContext(ChallengeContext)

    const [game, setGame] = useState({})

    const { gameId } = useParams()


    useEffect(() => {
        getGameById(gameId)
            .then((response) => {
                setGame(response)
                return getChallenges()
            })
    }, [])

    let gamePlatforms = game.platforms?.map((platform) =>
        <li className="platform" key={platform.platform?.id}> {platform.platform?.name}</li>)

    let gameDevs = game.developers?.map((dev) =>
        <li className="dev" key={dev.id}> {dev.name}</li>)

    let gameGenres = game.genres?.map((genre) =>
        <li className="genre" key={genre.id}> {genre.name}</li>)

    let gameTags = game.tags?.map((tag) =>
        <li className="tag" key={tag.id}> {tag.name}</li>)

    let gamePubs = game.publishers?.map((publisher) =>
        <li className="publisher" key={publisher.id}> {publisher.name}</li>)

    return (
        <section className="game">
            <article className="game__information">
                <img src={game.background_image} width="500" alt="No image available"></img>
                <h3 className="game__title">Title: {game.name}</h3>
                <div className="game__description" dangerouslySetInnerHTML={{ __html: game.description }} />
                <ul className="game__platforms"> Platforms:{gamePlatforms}</ul>
                <div className="game__releaseDate">Released: {game.released}</div>
                <div className="game__rating">Player Rating: {game.rating}</div>
                <ul className="game__developers">Developers: {gameDevs}</ul>
                <ul className="game__genres">Genres: {gameGenres}</ul>
                <ul className="game__tags">Tags: {gameTags}</ul>
                <ul className="game__publishers">Publishers: {gamePubs}</ul>
            </article>
            <h3 className="challenges__header">Challenges</h3>
            <article className="challenges">
                <dialog className="dialog--form" ref={newChallengeForm}>
                    <ChallengeForm />
                    <button className="closeButton" onClick={e => newChallengeForm.current.close()}>Close</button>
                </dialog>
                <button className="addChallenge" id={game.id} onClick={e => newChallengeForm.current.showModal()}>Add Challenge</button>
            </article>
            {challenges.map((item) => {
                return <ChallengeCard key={item.id} challenge={item} game={game} />
            })}
        </section>
    )
}