import './App.css';
import { useEffect, useState } from 'react'

import LoginModal from './components/loginModal/loginModal'

function App() {
  const [user, setUser] = useState({
    username: '',
    movies: [],
    books: [],
    friends: []
  })

  const [modalState, setModal] = useState(true)

  useEffect(() => {
    if (user.username) setModal(false)
  }, [user.username])

  // Friends toggleable
  // Get fire crackling sound
  return (
    <div className="App">
      <div className="main-container">
        {modalState &&
          <LoginModal setUser={setUser}/>
        }
      </div>  
    </div>
  );
}

export default App;
