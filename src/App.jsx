import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import TabBar from './components/TabBar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Stores from './pages/Stores'
import Appointments from './pages/Appointments'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [preselectedStoreId, setPreselectedStoreId] = useState(null)

  function navigateTo(tab) {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function navigateToAppointmentsWithStore(storeId) {
    setPreselectedStoreId(storeId)
    setActiveTab('appointments')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleTabChange(tab) {
    if (tab !== 'appointments') {
      setPreselectedStoreId(null)
    }
    navigateTo(tab)
  }

  return (
    <div className="app">
      <Navbar />
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="page-content">
        {activeTab === 'home' && (
          <Home onNavigate={navigateTo} />
        )}
        {activeTab === 'catalog' && (
          <Catalog onNavigate={navigateTo} />
        )}
        {activeTab === 'stores' && (
          <Stores onNavigateToAppointments={navigateToAppointmentsWithStore} />
        )}
        {activeTab === 'appointments' && (
          <Appointments preselectedStoreId={preselectedStoreId} />
        )}
      </main>
    </div>
  )
}

export default App
