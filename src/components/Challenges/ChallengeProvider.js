import React, {useState, createContext} from "react"

export const ChallengeContext = createContext()

export const ChallengeProvider = (props) => {
    const  [challenges, setChallenges] = useState([])

    const getChallenges = () => {
        return fetch("http://localhost:8088/challenges?_expand=rating")
        .then(response => response.json)
        .then(setChallenges)
    }

    const addChallenge = (challengeObj) => {
        return fetch("http://localhost:8088/challenges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(challengeObj)
        })
        .then(getChallenges)
    }

    const deleteChallenge = (challengeId) => {
        return fetch(`http://localhost:8088/challenges/${challengeId}`, {
            method: "DELETE"
        })
        .then(getChallenges)
    }

    const updateChallenge = (challenge) => {
        return fetch(`http://localhost:8088/animals/${challenge.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(challenge)
        })
            .then(getChallenges)
    }

    return (
        <ChallengeContext.Provider value={{
            challenges, getChallenges, addChallenge, deleteChallenge, updateChallenge
        }}>
            {props.children}
        </ChallengeContext.Provider>
    )
}