import React, { useState, createContext } from "react"

export const SavedChallengeContext = createContext()

export const SavedChallengeProvider = (props) => {
    const [savedChallenges, setSavedChallenges] = useState([])

    //allows the saving of challenges to a single user
    const saveChallenge = saveObj => {
        return fetch("http://localhost:8088/savedChallenges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saveObj)
        })
            .then(getSavedChallenges)
    }

    //fetches all saved challenges
    const getSavedChallenges = () => {
        return fetch("http://localhost:8088/savedChallenges?_expand=user&_expand=challenge")
            .then(response => response.json())
    }

    //allows for the deleting of challenges from a user's saved challenges
    const deleteSavedChallenge = (challengeId) => {
        return fetch(`http://localhost:8088/savedChallenges/${challengeId}`, {
            method: "DELETE"
        })
            .then(getSavedChallenges)
    }

    //returns all provider functions
    return (
        <SavedChallengeContext.Provider value={{
            savedChallenges, saveChallenge, getSavedChallenges, deleteSavedChallenge
        }}>
            {props.children}
        </SavedChallengeContext.Provider>
    )
}