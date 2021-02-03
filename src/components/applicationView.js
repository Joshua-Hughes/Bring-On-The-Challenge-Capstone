import React from "react"
import { Route } from "react-router-dom"
import { GamesProvider } from "./SearchPage/GameListProvider"
import { GamesList } from "./SearchPage/GamesList"
import { GameDetails } from "./SearchPage/GameDetails"

export const ApplicationViews = () => {
    return (
        <GamesProvider>
            <Route path="/games">
                <GamesList />
            </Route>

            <Route path="/game-:gameId(\d+)">
                <GameDetails />
            </Route>
        </GamesProvider>
    )
}