import React, { useState, createContext } from "react"

export const ChallengeContext = createContext()

export const ChallengeProvider = (props) => {
    const [challenges, setChallenges] = useState([])
    const [ratings, setRatings] = useState([])

    //fetches all challenges
    const getChallenges = () => {
        return fetch("http://localhost:8088/challenges?_expand=rating&_expand=user")
            .then(response => response.json())
            .then(setChallenges)
    }

    //fetches all ratings
    const getRatings = () => {
        return fetch("http://localhost:8088/ratings")
            .then(response => response.json())
    }

    //allows the addition of challenges
    const addChallenge = challengeObj => {
        return fetch("http://localhost:8088/challenges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(challengeObj)
        })
        .then(getChallenges)
    }

    //fetches challenges based on id
    const getChallengeById = (id) => {
        return fetch(`http://localhost:8088/challenges/${id}`)
            .then(response => response.json())
    }

    //allows the deleting of a specific challenge by id
    const deleteChallenge = (challengeId) => {
        return fetch(`http://localhost:8088/challenges/${challengeId}`, {
            method: "DELETE"
        })
            .then(getChallenges)
    }

    //allows for editing a challenge
    const updateChallenge = challenge => {
        return fetch(`http://localhost:8088/challenges/${challenge.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(challenge)
        })
            .then(getChallenges)
    }

    //returns all provider functions
    return (
        <ChallengeContext.Provider value={{
            challenges, ratings, getChallenges, getRatings, addChallenge, deleteChallenge, getChallengeById, updateChallenge
        }}>
            {props.children}
        </ChallengeContext.Provider>
    )
}