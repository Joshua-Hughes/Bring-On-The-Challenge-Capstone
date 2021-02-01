import React, { useContext, useEffect } from "react"
import { ListContext } from "./GameListProvider"
import { GameCard } from "./GameCard"

export const GamesList = () => {
  const { games, getGamesList } = useContext(ListContext)

  useEffect(() => {
    getGamesList()

  }, [])


  return (
    <div className="games">
      {
        games.map(game => {
          return <GameCard key={game.id} game={game} />
        })
      }
    </div>
  )
}
