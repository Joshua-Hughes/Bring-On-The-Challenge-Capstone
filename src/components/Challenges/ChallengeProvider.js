import React, {useState, createContext} from "react"

export const ChallengeContext = createContext()

export const ChallengeProvider = (props) => {
    const  [challenges, setChallenges] = useState([])
    const  [ratings, setRatings] = useState([])

    const getChallenges = () => {
        return fetch("http://localhost:8088/challenges?_expand=rating&_expand=user")
        .then(response => response.json())
        .then(setChallenges)
    }
    
    const getRatings = () => {
        return fetch("http://localhost:8088/ratings")
        .then(response => response.json())
    }

    const saveChallenge = saveObj => {
        return fetch("http://localhost:8088/savedChallenges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saveObj)
        })
        .then(getChallenges)
    }

    const getSavedChallenges = () => {
        return fetch("http://localhost:8088/savedChallenges?_expand=user&_expand=challenge")
        .then(response => response.json())
        .then(setChallenges)
    }

    const addChallenge = challengeObj => {
        return fetch("http://localhost:8088/challenges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(challengeObj)
        })
    }

    const getChallengeById = (id) => {
        return fetch(`http://localhost:8088/challenges/${id}`)
            .then(response => response.json())
    }

    const deleteChallenge = (challengeId) => {
        return fetch(`http://localhost:8088/challenges/${challengeId}`, {
            method: "DELETE"
        })
        .then(getChallenges)
    }

    return (
        <ChallengeContext.Provider value={{
            challenges, ratings, getChallenges, getRatings, addChallenge, deleteChallenge, getChallengeById, saveChallenge, getSavedChallenges
        }}>
            {props.children}
        </ChallengeContext.Provider>
    )
}