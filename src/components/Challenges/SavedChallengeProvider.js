import React, { useState, createContext } from "react"

export const SavedChallengeContext = createContext()

export const SavedChallengeProvider = (props) => {
    const [savedChallenges, setSavedChallenges] = useState([])

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

    const getSavedChallenges = () => {
        return fetch("http://localhost:8088/savedChallenges?_expand=user&_expand=challenge")
            .then(response => response.json())
            .then(setSavedChallenges)
    }

    return (
        <SavedChallengeContext.Provider value={{
            savedChallenges, saveChallenge, getSavedChallenges
        }}>
            {props.children}
        </SavedChallengeContext.Provider>
    )
}