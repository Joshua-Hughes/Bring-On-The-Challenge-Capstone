import React, { useContext, useEffect, useState, useRef } from "react"
import { SavedChallengeContext } from "../Challenges/SavedChallengeProvider"
import { SavedChallengeCard } from "./SavedChallengeCard"

export const UserDetails = () => {

    const { getSavedChallenges } = useContext(SavedChallengeContext)

    const [savedChallenges, setSavedChallenges] = useState([])

    useEffect(() => {
        getSavedChallenges()
    .then(setSavedChallenges)
      }, [])

        return (
            <section className="SavedChallengeCard">
            {savedChallenges.map((item) => {
                return <SavedChallengeCard key={item.id} challenge={item} />
            })}
            </section>
        )
    }