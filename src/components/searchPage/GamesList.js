import React, { useContext, useEffect } from "react"
import { ListContext } from "./GameListProvider"
import { GameCard } from "./GameCard"

export const GamesList = () => {

  const { games, getGamesList, nextList, prevList } = useContext(ListContext)


  useEffect(() => {
    getGamesList()

  }, [])


  return (
    <div className="games">
      {
        games.results?.map(game => {
          return <GameCard key={game.id} game={game} />
        })
      }
      <button className="nextPage" onClick={ nextList }>
        Next Page
      </button>

      <button className="prevPage" onClick={ prevList }>
        Previous Page
      </button>
    </div>
  )
}