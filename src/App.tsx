import { useState, useCallback } from 'react'
import SplashScreen from './components/SplashScreen'
import MapScreen from './components/MapScreen'
import SearchSheet from './components/SearchSheet'
import NavigationOverlay from './components/NavigationOverlay'
import FloorTransitionOverlay from './components/FloorTransitionOverlay'
import ArrivalScreen from './components/ArrivalScreen'
import GameScreen from './components/GameScreen'
import AISheet from './components/AISheet'
import ScheduleScreen from './components/ScheduleScreen'
import AppointmentBooking from './components/AppointmentBooking'
import AppointmentConfirmed from './components/AppointmentConfirmed'
import ProfileScreen from './components/ProfileScreen'

type Screen =
  | 'splash'
  | 'map'
  | 'search'
  | 'navigating-b203'
  | 'floor-transition'
  | 'arrival-b203'
  | 'game'
  | 'ai-overlay'
  | 'navigating-hackathon'
  | 'arrival-innovation'
  | 'schedule'
  | 'appointment-booking'
  | 'appointment-confirmed'
  | 'profile'

type Tab = 'map' | 'schedule' | 'game' | 'profile'

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [activeTab, setActiveTab] = useState<Tab>('map')
  const [floor, setFloor] = useState<1 | 2>(1)
  const [navStep, setNavStep] = useState(0)
  const [navDest, setNavDest] = useState<'b203' | 'innovation'>('b203')
  const [schedTab, setSchedTab] = useState<'classes' | 'appointments'>('classes')
  const [bonusPoints, setBonusPoints] = useState(0)
  const [confirmedTime, setConfirmedTime] = useState('')
  const [hasAppointment, setHasAppointment] = useState(false)

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab)
    if (tab === 'map') setScreen('map')
    else if (tab === 'schedule') setScreen('schedule')
    else if (tab === 'game') setScreen('game')
    else if (tab === 'profile') setScreen('profile')
  }, [])

  const startNavB203 = () => {
    setNavDest('b203')
    setNavStep(0)
    setFloor(1)
    setScreen('navigating-b203')
  }

  const startNavHackathon = () => {
    setNavDest('innovation')
    setNavStep(0)
    setFloor(1)
    setScreen('navigating-hackathon')
  }

  const handleStepAdvance = useCallback(() => {
    setNavStep((s) => s + 1)
  }, [])

  const handleFloorTransition = useCallback(() => {
    setScreen('floor-transition')
  }, [])

  const handleFloorTransitionComplete = useCallback(() => {
    setFloor(2)
    setNavStep(0)
    setScreen('navigating-b203')
  }, [])

  const handleB203Arrival = useCallback(() => {
    setBonusPoints((p) => p + 50)
    setScreen('arrival-b203')
  }, [])

  const handleInnovationArrival = useCallback(() => {
    setBonusPoints((p) => p + 50)
    setScreen('arrival-innovation')
  }, [])

  // Map user positions per screen
  const mapUserPos = (() => {
    if (screen === 'map' && navDest === 'b203') return { x: 200, y: 500 }
    if (screen === 'map' && navDest === 'innovation') return { x: 200, y: 500 }
    return { x: 200, y: 500 }
  })()

  const mapDestPin = screen === 'ai-overlay'
    ? { x: 278, y: 252, label: 'Innovation Hall' }
    : undefined

  // Screen router
  const renderScreen = () => {
    // Navigating B203
    if (screen === 'navigating-b203') {
      return (
        <NavigationOverlay
          destination="b203"
          navStep={navStep}
          floor={floor}
          onStepAdvance={handleStepAdvance}
          onFloorTransition={handleFloorTransition}
          onArrival={handleB203Arrival}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )
    }

    // Floor transition
    if (screen === 'floor-transition') {
      return (
        <>
          <MapScreen
            floor={1}
            onFloorChange={setFloor}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onSearchTap={() => {}}
            onAskSuhail={() => {}}
            userPos={{ x: 366, y: 160 }}
            showRoute
            destination="b203"
          />
          <FloorTransitionOverlay
            fromFloor={1}
            toFloor={2}
            onComplete={handleFloorTransitionComplete}
          />
        </>
      )
    }

    // Arrival B203
    if (screen === 'arrival-b203') {
      return (
        <ArrivalScreen
          destination="b203"
          onViewGame={() => { setActiveTab('game'); setScreen('game') }}
          onContinue={() => { setActiveTab('map'); setScreen('map') }}
        />
      )
    }

    // Game
    if (screen === 'game') {
      return (
        <GameScreen
          activeTab="game"
          onTabChange={handleTabChange}
          bonusPoints={bonusPoints}
        />
      )
    }

    // Navigating Hackathon
    if (screen === 'navigating-hackathon') {
      return (
        <NavigationOverlay
          destination="innovation"
          navStep={navStep}
          floor={floor}
          onStepAdvance={handleStepAdvance}
          onFloorTransition={handleFloorTransition}
          onArrival={handleInnovationArrival}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )
    }

    // Arrival Innovation Hall
    if (screen === 'arrival-innovation') {
      return (
        <ArrivalScreen
          destination="innovation"
          onViewGame={() => { setActiveTab('game'); setScreen('game') }}
          onContinue={() => { setActiveTab('map'); setScreen('map') }}
        />
      )
    }

    // Schedule
    if (screen === 'schedule') {
      return (
        <ScheduleScreen
          activeTab="schedule"
          onTabChange={handleTabChange}
          schedTab={schedTab}
          onSchedTabChange={setSchedTab}
          onBookAppointment={() => setScreen('appointment-booking')}
          hasAppointment={hasAppointment}
        />
      )
    }

    // Appointment Booking
    if (screen === 'appointment-booking') {
      return (
        <AppointmentBooking
          onConfirm={(time) => {
            setConfirmedTime(time)
            setHasAppointment(true)
            setScreen('appointment-confirmed')
          }}
          onBack={() => setScreen('schedule')}
        />
      )
    }

    // Appointment Confirmed
    if (screen === 'appointment-confirmed') {
      return (
        <AppointmentConfirmed
          time={confirmedTime}
          onViewOnMap={() => {
            setNavDest('b203')
            setNavStep(0)
            setFloor(2)
            setActiveTab('map')
            setScreen('map')
          }}
          onDone={() => {
            setActiveTab('schedule')
            setSchedTab('appointments')
            setScreen('schedule')
          }}
        />
      )
    }

    // Profile
    if (screen === 'profile') {
      return (
        <ProfileScreen
          activeTab="profile"
          onTabChange={handleTabChange}
          bonusPoints={bonusPoints}
        />
      )
    }

    // Default: Map (+ overlays)
    return (
      <>
        <MapScreen
          floor={floor}
          onFloorChange={setFloor}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onSearchTap={() => setScreen('search')}
          onAskSuhail={() => setScreen('ai-overlay')}
          userPos={mapUserPos}
          showRoute={false}
          destination={null}
          destPin={mapDestPin}
        />

        {/* Search sheet */}
        {screen === 'search' && (
          <SearchSheet
            onStartNavigation={startNavB203}
            onClose={() => setScreen('map')}
          />
        )}

        {/* AI sheet */}
        {screen === 'ai-overlay' && (
          <AISheet
            onNavigateThere={() => {
              startNavHackathon()
            }}
            onClose={() => setScreen('map')}
          />
        )}
      </>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A3535',
        padding: '16px',
      }}
    >
      {/* iPhone 17 Pro Max frame */}
      <div
        style={{
          width: 390,
          height: 844,
          maxWidth: '100%',
          maxHeight: '100vh',
          borderRadius: '52px',
          background: '#0A3535',
          padding: '12px',
          boxShadow: '0 40px 120px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.12)',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Screen area */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '42px',
            overflow: 'hidden',
            position: 'relative',
            background: '#F8F7F2',
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 34,
              borderRadius: '20px',
              background: '#000',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {/* Camera dot */}
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #333' }} />
            {/* Face ID bar */}
            <div style={{ width: 48, height: 6, borderRadius: '3px', background: '#1a1a1a' }} />
          </div>

          {/* Home indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 5,
              borderRadius: '3px',
              background: 'rgba(0,0,0,0.3)',
              zIndex: 100,
            }}
          />

          {/* App content */}
          {screen === 'splash' ? (
            <SplashScreen onStart={() => { setScreen('map'); setActiveTab('map') }} />
          ) : (
            renderScreen()
          )}
        </div>
      </div>
    </div>
  )
}
