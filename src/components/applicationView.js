import React from "react"
import { Route } from "react-router-dom"
import { GamesProvider } from "./SearchPage/GamesProvider"
import { GamesList } from "./SearchPage/GamesList"
import { GameDetails } from "./SearchPage/GameDetails"
import { ChallengeProvider } from "./Challenges/ChallengeProvider"
import { SavedChallengeProvider } from "./Challenges/SavedChallengeProvider"
import { UserDetails } from "./UserPage/UserPage"

export const ApplicationViews = () => {
    return (
        <GamesProvider>
            <ChallengeProvider>
                <SavedChallengeProvider>
                <Route path="/games">
                    <GamesList />
                </Route>

                <Route exact path="/game-:gameId(\d+)">
                    <GameDetails />
                </Route>

                <Route path="/userPage">
                    <UserDetails />
                </Route>
                </SavedChallengeProvider>
            </ChallengeProvider>
        </GamesProvider>
    )
}