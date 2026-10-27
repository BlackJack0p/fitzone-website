import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route,useParams,useNavigate, } from 'react-router'
import { Header } from './components/Header'
import Login from './components/Login'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Trainers } from './components/Trainers'
import { ClassSchedule } from './components/ClassSchedule'
import { Memberships } from './components/Memberships'
import { Footer } from './components/Footer'
import { TrainerDetail } from './components/TrainerDetail'
import { MembershipDetail } from './components/MembershipDetail'

function HomePage({ onShowLogin }) {
  useEffect(() => {
    const targetId = window.location.hash.slice(1)

    if (!['membership', 'bio'].includes(targetId)) return

    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const timeoutId = setTimeout(() => {
      const targetSection = document.getElementById(targetId)

      if (!targetSection) return

      const top =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        90

      window.scrollTo({
        top,
        behavior: 'auto',
      })
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <Header onShowLogin={onShowLogin} />
      <main>
        <Hero />
        <About />
        <Trainers />
        <ClassSchedule />
        <Memberships />
      </main>
      <Footer />
    </>
  )
}


function TrainerPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  return (
    <TrainerDetail
      slug={slug}
      onBack={() => navigate('/#bio')}
    />
  )
}


function MembershipPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  return (
    <MembershipDetail
      slug={slug}
      onBack={() => navigate('/#membership')}
    />
  )
}

function AppRoutes() {
  const [showLogin, setShowLogin] = useState(false)

  if (showLogin) {
    return <Login onLogin={() => {
      setShowLogin(false)
      window.location.href = '/'
    }} />
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage onShowLogin={() => setShowLogin(true)} />}
      />
      <Route path="/trainers/:slug" element={<TrainerPage />} />
      <Route path="/memberships/:slug" element={<MembershipPage />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App