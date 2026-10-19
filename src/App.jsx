import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Trainers } from './components/Trainers'
import { ClassSchedule } from './components/ClassSchedule'
import { Memberships } from './components/Memberships'
import { Footer } from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Hero />
      <Trainers />
      <ClassSchedule />
      <Memberships />
      <Footer />
    </div>
    
  )
}


export default App