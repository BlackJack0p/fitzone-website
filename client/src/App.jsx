import { useState } from 'react'
import { Header } from './components/Header'
import Login from './components/Login'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Trainers } from './components/Trainers'
import { ClassSchedule } from './components/ClassSchedule'
import { Memberships } from './components/Memberships'
import { Footer } from './components/Footer'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  function handleLoginSuccess() {
    setShowLogin(false)
    window.location.hash = 'home'
  }

  if (showLogin) {
    return (
      <Login onLogin={handleLoginSuccess} />
    )
  }

  return (
    <div>
      <Header onShowLogin={() => setShowLogin(true)} />

      <main>
        <Hero />
        <About />
        <Trainers />
        <ClassSchedule />
        <Memberships />
      </main>

      <Footer />
    </div>
  )
}

export default App
