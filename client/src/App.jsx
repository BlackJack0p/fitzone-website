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
import { useSession } from './lib/auth-client'

function HomePage({ onShowLogin, onSubscribe }) {
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
        <Memberships onSubscribe={onSubscribe} />
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

function MembershipPage({ onSubscribe }) {
  const { slug } = useParams()
  const navigate = useNavigate()

  return (
    <MembershipDetail
      slug={slug}
      onBack={() => navigate('/#membership')}
      onSubscribe={onSubscribe}
    />
  )
}

function AppRoutes() {
  const [showLogin, setShowLogin] = useState(false)
  const [pendingMembership, setPendingMembership] = useState(null)

  const { data: session, isPending } = useSession()

  function handleCheckout(membershipSlug) {
    window.alert(
      `Checkout for the ${membershipSlug} membership will be available once payment integration is configured.`
    )
  }

  function handleSubscribe(membershipSlug) {
    if (isPending) return

    if (!session) {
      setPendingMembership(membershipSlug)
      setShowLogin(true)
      return
    }

    handleCheckout(membershipSlug)
  }

  function handleLogin() {
    const selectedMembership = pendingMembership

    setShowLogin(false)
    setPendingMembership(null)

    if (selectedMembership) {
      handleCheckout(selectedMembership)
    }
  }

  if (showLogin) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            onShowLogin={() => setShowLogin(true)}
            onSubscribe={handleSubscribe}
          />
        }
      />

      <Route path="/trainers/:slug" element={<TrainerPage />} />

      <Route
        path="/memberships/:slug"
        element={<MembershipPage onSubscribe={handleSubscribe} />}
      />
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