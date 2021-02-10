import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
//Renders the registration page
export const Register = (props) => {
    const name = useRef()
    const username = useRef()
    const email = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    //Checks for an existing user.
    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    //If username does not exist in the database, enter the information given into the database and push the new user through.
    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: name.current.value,
                            username: username.current.value
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                sessionStorage.setItem("site_user", createdUser.id)
                                history.push("/games")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })

    }

    //render registration form
    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that username already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register Here</h1>
                <fieldset>
                    <label htmlFor="inputName"> Name </label>
                    <input ref={name} type="text" name="name" className="form-control" placeholder="Name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername"> Username </label>
                    <input ref={username} type="username" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

