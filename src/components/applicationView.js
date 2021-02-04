import React from "react"
import { Route } from "react-router-dom"
import { GamesProvider } from "./SearchPage/GamesProvider"
import { GamesList } from "./SearchPage/GamesList"
import { GameDetails } from "./SearchPage/GameDetails"
import { ChallengeProvider } from "./Challenges/ChallengeProvider"

export const ApplicationViews = () => {
    return (
        <GamesProvider>
            <ChallengeProvider>
                <Route path="/games">
                    <GamesList />
                </Route>

                <Route exact path="/game-:gameId(\d+)">
                    <GameDetails />
                </Route>
            </ChallengeProvider>
        </GamesProvider>
    )
}