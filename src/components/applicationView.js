import React from "react"
import { Route } from "react-router-dom"
import { ListProvider } from "./searchPage/GameListProvider"
import { GamesList } from "./searchPage/GamesList"

export const ApplicationViews = () => {
    return (
        <ListProvider>
            <Route exact path="/gameSearch">
                <GamesList />
            </Route>
        </ListProvider>
    )
}