import React, { useRef } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const Login = props => {
    const username = useRef()
    const existsDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(response => response.json())
            .then(user => user.length ? user[0] : false)
    }
    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    sessionStorage.setItem("site_user", exists.id)
                    history.push("/games")
                } else {
                    existsDialog.current.showModal()
                }
            })
    }
    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existsDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existsDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h2 className="header">Sign In</h2>
                    <fieldset>
                        <label htmlFor="inputUsername">Username</label>
                        <input ref={username} type="username"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign In
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">No Account?</Link>
            </section>
        </main>
    )
}