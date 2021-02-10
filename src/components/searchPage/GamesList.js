import React, { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { GameContext } from "./GamesProvider"
import { GameCard } from "./GameCard"

export const GamesList = () => {

  const { games, getGames, nextList, prevList, searchList } = useContext(GameContext)

  const [list, setGamesList] = useState({
    name: ""
  });

  //fetches the list of games
  useEffect(() => {
    getGames()

  }, [])

  //scrolls to the top of the page when the next or previous page buttons are clicked
  const scrollToRef = (ref) =>
    window.scrollTo(0, ref.current)

    //handles the search fuction for the list of games
  const handleClickSearchList = (event) => {
    event.preventDefault()

    const searchTerm = document.querySelector("#title").value

    if (searchTerm === "") {
      getGames()
        .then(setGamesList)
    } else {
      searchList(searchTerm)
        .then(setGamesList)
    }
  }

  //renders the list of games
  return (
    <div className="games">
      <Link to={`/userPage`}>
        View saved challenges!
      </Link>
      <fieldset>
        <input type="text" id="title" autoFocus className="form-search" placeholder="Title" />
        <button className="search-button" onClick={handleClickSearchList}>Search Games</button>
      </fieldset>
      <h1 className="title">Games</h1>
      {
        games.results?.map(game => {
          return <GameCard key={game.id} game={game} />
        })
      }
      <button className="prevPage" onClick={prevList}>
        Previous Page
      </button>

      <button className="nextPage" onClick={(event) => { nextList(); scrollToRef(games) }}>
        Next Page
      </button>


    </div>
  )
}
