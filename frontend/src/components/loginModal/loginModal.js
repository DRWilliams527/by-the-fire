import './loginModal.scss'
import { useState } from 'react'

import submit from '../../onClickFunctions/submit'


function LoginModal( {setUser} ) {
    const [formType, setFormType] = useState(true)
    const [error, setError] = useState('')

    return (
        <div className="backdrop">
            <div className="popup">
                <div className="popup-header">
                    <h3 className={formType ? 'active-modal-tab' : ''} onClick={() => setFormType(true)}>Login</h3>
                    <h3 className={!formType ? 'active-modal-tab' : ''} onClick={() => setFormType(false)}>Register</h3>
                </div>
                <form className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username"></input>
                    <label htmlFor="password">Password</label>
                    <input id="password"></input>
                    {error && 
                        <div className="error-msg">
                            {error}
                        </div>
                    }
                    <button id="submit" onClick={e => {e.preventDefault(); submit(formType, setError, setUser)}}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal