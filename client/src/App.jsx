import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useParams, useNavigate, Link } from 'react-router'
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
import { PaymentSuccess } from './components/PaymentSuccess'

function HomePage({ onShowLogin, onSubscribe }) {
  const [pendingOrderId, setPendingOrderId] = useState(null)

    useEffect(() => {
    function checkPendingPayment() {
      const orderId = sessionStorage.getItem('pendingPaymentOrderId')
      setPendingOrderId(orderId)
    }

    checkPendingPayment()

    // Check again when the customer returns to this browser tab.
    window.addEventListener('pageshow', checkPendingPayment)
    window.addEventListener('focus', checkPendingPayment)

    return () => {
      window.removeEventListener('pageshow', checkPendingPayment)
      window.removeEventListener('focus', checkPendingPayment)
    }
  }, [])
  
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

    {pendingOrderId && (
      <div className="bg-[#222222] px-4 py-4 text-center">
        <p className="mb-2 text-white">
          You have a payment that still needs confirmation.
        </p>

        <Link
          to={`/payment/success?orderId=${pendingOrderId}`}
          className="inline-block rounded-md bg-[#c8ff00] px-5 py-2 font-semibold text-black transition hover:bg-[#d8ff4d]"
        >
          Check Payment Status
        </Link>
      </div>
    )}

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

  // Browsers can restore this document from the back/forward cache without
  // remounting React. Reload that restored page so HomePage re-reads the saved
  // pending order from sessionStorage.
  useEffect(() => {
    function handlePageShow(event) {
      if (event.persisted) {
        window.location.reload()
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  // Start checkout through the backend.
  async function handleCheckout(membershipSlug) {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ membershipSlug }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to start checkout.')
      }

      if (!data.authorizationUrl) {
        throw new Error('Paystack did not return a checkout URL.')
      }

      // Remember the order so the customer can check its status later.
      sessionStorage.setItem('pendingPaymentOrderId', String(data.orderId))

      // Redirect the customer to Paystack's hosted checkout.
      window.location.href = data.authorizationUrl
    } catch (error) {
      console.error('Checkout error:', error)

      window.alert(
        error.message || 'Something went wrong during checkout.'
      )
    }
  }

  // Require login before starting checkout.
  function handleSubscribe(membershipSlug) {
    if (isPending) return

    if (!session) {
      setPendingMembership(membershipSlug)
      setShowLogin(true)
      return
    }

    handleCheckout(membershipSlug)
  }

  // Continue checkout after successful login.
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
      <Route path="/" element={ <HomePage onShowLogin={() => setShowLogin(true)} onSubscribe={handleSubscribe}/> }/>
      <Route path="/trainers/:slug" element={<TrainerPage />}/>
      <Route path="/memberships/:slug" element={ <MembershipPage onSubscribe={handleSubscribe} /> }/>
      <Route path="/payment/success" element={<PaymentSuccess />}/>
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
