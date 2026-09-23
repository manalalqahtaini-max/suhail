# سُهيل / Suhail — University Indoor Navigation Prototype Plan

## Context

Build a complete, highly interactive mobile prototype for "Suhail" — a smart university indoor navigation platform. This is a hackathon demo targeting iPhone 17 Pro Max (440×956pt). The prototype must cover: splash, map/home, search, indoor navigation with animation, floor transitions, arrival/check-in, gamification, AI assistant overlay, schedule, faculty appointment booking, and profile. Everything driven by realistic mock data. The map is the hero of the experience.

---

## Aesthetic & Visual System

**Stance:** Premium, modern, student-friendly. Not a SaaS dashboard. The map occupies most of the viewport — UI floats on top.

**Colors:**
- Primary: `#0D6B5E` (deep teal/green)
- Primary light: `#E8F5F3`
- Background: `#FFFFFF`
- Surface/Card: `#F8FAF9`
- Text: `#0F1F1C`
- Muted text: `#6B7F7C`
- Border: `#E0EBEBEB`
- Success: `#10B981`
- Accent gold: `#D4A853` (for points/rewards)

**Fonts (Google Fonts via CSS `@import` in `src/index.css`):**
- `Plus Jakarta Sans` — headings, brand name, UI labels (weights: 400, 500, 600, 700, 800)
- `Inter` — body text, descriptions (weights: 400, 500)

**Device Frame:** Render the entire app inside an iPhone 17 Pro Max shell (440×956pt) centered in the browser. Use fixed dimensions, overflow-hidden, rounded-[3rem], with Dynamic Island cutout at top and home indicator at bottom.

---

## File Structure

**Modify/create:**
- `src/index.css` — Add Google Font imports (top), define CSS custom properties for tokens
- `src/App.tsx` — Root state machine + screen router
- `src/components/SplashScreen.tsx`
- `src/components/MapScreen.tsx` — Map + search bar + floating AI btn + bottom nav
- `src/components/IndoorMap.tsx` — SVG floor plan (Floor 1 + Floor 2)
- `src/components/SearchSheet.tsx` — Bottom sheet search results
- `src/components/NavigationOverlay.tsx` — Active navigation banner + animated route
- `src/components/FloorTransitionOverlay.tsx`
- `src/components/ArrivalScreen.tsx` — Check-in celebration
- `src/components/GameScreen.tsx`
- `src/components/AISheet.tsx` — Bottom sheet AI chat overlay
- `src/components/ScheduleScreen.tsx` — Classes + Appointments tabs
- `src/components/AppointmentBooking.tsx`
- `src/components/AppointmentConfirmed.tsx`
- `src/components/ProfileScreen.tsx`
- `src/components/BottomNav.tsx`
- `src/data/mockData.ts` — All structured mock data

---

## State Machine

Top-level `screen` state in `App.tsx` drives rendering:

```
'splash' | 'map' | 'search' | 'navigating-b203' | 'floor-transition' 
| 'arrival-b203' | 'game' | 'ai-overlay' | 'navigating-hackathon' 
| 'arrival-innovation' | 'schedule' | 'appointment-booking' 
| 'appointment-confirmed' | 'profile'
```

Additional sub-states:
- `navStep: number` — animation frame index for navigation route
- `currentFloor: 1 | 2`
- `activeTab: 'map' | 'schedule' | 'game' | 'profile'` — bottom nav
- `scheduleTab: 'classes' | 'appointments'`

---

## Indoor Map (SVG)

Draw a realistic university floor plan entirely in SVG inside `IndoorMap.tsx`.

**Floor 1 rooms:**
- Main Lobby (large, center entrance)
- Student Area / Lounge
- Innovation Hall (large, Building C right side)
- Computer Lab A1
- Faculty Offices row (C201, C202, C214 — Dr. Ahmad)
- Library entrance
- Restrooms
- Stairs (2 locations)
- Elevators (1 location)
- Entrances (3)
- Corridors connecting all spaces

**Floor 2 rooms:**
- B201, B203 (destination classroom), B204, B205
- Lecture Hall B210 (large)
- Faculty offices row
- Study area
- Stairs / elevator (same relative position as floor 1)
- Corridors

**Map visual style:**
- Room fill: `#F0F5F4` (very light teal-tinted white)
- Wall stroke: `#C5D4D1` (soft teal-gray)
- Corridor fill: `#FAFCFC`
- Special rooms (Innovation Hall, Library): slightly warmer fill
- Room labels: 10–11px, `#4A6360`, Plus Jakarta Sans
- Navigation route: animated dashed `#0D6B5E` stroke with glowing dot

**User position indicator:** Pulsing circle `#0D6B5E` with white center dot, animated with CSS keyframes.

**Destination pin:** Drop pin SVG in primary teal.

---

## Navigation Animation

In `NavigationOverlay.tsx`:
- Define `navSteps` array for B203 route: each step has `instruction`, `distance`, `userPosition: {x, y}`, `floor`
- `useEffect` interval at 2500ms advances `navStep` through the array
- Map redraws user position at each step
- Route path reveals progressively (stroke-dasharray animation)
- Steps for B203:
  1. "Head toward Building B entrance" — Floor 1
  2. "Take the stairs to Floor 2" — triggers floor transition overlay
  3. "Continue straight – 30m" — Floor 2
  4. "Turn right at corridor B" — Floor 2
  5. "B203 is on your right" — Floor 2
  6. → Arrival

For FARQ Hackathon navigation (Innovation Hall, Floor 1):
- Similar step array, stays on Floor 1, ends at Innovation Hall

---

## Key Component Details

### SplashScreen
- Full-screen teal-to-dark-green gradient background
- Subtle SVG geometric pattern (arcs/grid lines) for depth
- Centered: Arabic brand `سُهيل` (large, 800 weight), `Suhail` below in lighter weight
- Tagline: "Your smart guide across campus."
- Unsplash background image (campus/architecture): `https://images.unsplash.com/photo-1562774053-701939374585?w=440&h=956&fit=crop&auto=format` overlaid with dark teal gradient at 80% opacity
- `Let's Get Started` button — white, rounded-full, prominent

### MapScreen
- Map occupies full height minus top safe area (Dynamic Island ~44px) and bottom nav (~80px)
- Floating search bar at top: `"Where do you want to go?"`, rounded-full, white with shadow
- Floor selector pill (right side): `F1` / `F2` toggle
- Map controls (bottom-right): zoom +/−, locate-me button
- Ask Suhail FAB: above bottom nav, right-aligned, teal background, sparkle icon + label

### SearchSheet
- Bottom sheet slides up, map remains visible above
- Search input active, shows: B203 result card (room thumbnail placeholder, name, building, floor, walk time)
- Nearby: B201, B204, B205 in compact list
- Primary CTA: "Start Navigation" teal button

### ArrivalScreen (B203)
- Full-screen overlay with confetti-like subtle particle animation (CSS)
- ✓ checkmark in teal circle
- "You made it!" heading
- "You arrived at B203 before class starts."
- Time comparison: Arrival 9:54 AM / Class starts 10:00 AM
- Points badge: +50 Points (animated count-up)
- "View in Game" button

### GameScreen
- Clean progress card at top: Level 4 · Explorer · 650/1000 pts · progress bar
- Streak badge: 3-Day Streak 🔥
- Achievements grid: 3 cards with icon, name, description
- Points history: Recent earned (includes the +50 from B203 arrival)

### AISheet
- Bottom sheet slides up 70% of screen height, map dimmed + visible behind
- Header: "Suhail AI" + sparkle icon, subtitle "Your campus assistant"
- Chat bubble area: shows user question + AI response
- Location card for Innovation Hall (teal border, building info)
- Action buttons: "Navigate There" (primary), "Show on Map" (secondary)

### ScheduleScreen
- `Classes` | `Appointments` tab switcher
- Timeline layout: time slot → course card with room chip
- Classes: 4 items including FARQ Hackathon at 4:00 PM
- "Book Appointment" floating button or section header button

### AppointmentBooking
- Faculty card: Dr. Ahmad Alqahtani, CS, Office C214
- Date selector: Tuesday Sep 23 (pre-selected)
- Time grid: 5 slots, `11:30 AM` selectable
- Meeting purpose input (optional)
- "Book Appointment" CTA

### AppointmentConfirmed
- Success state: ✓ "Appointment Confirmed"
- Summary card with all details
- "View Office on Map" → returns to map + starts navigation to C214

### ProfileScreen
- Student avatar area (placeholder initials circle)
- Name, ID, Level 4 Explorer badge
- Stats row: Points, Achievements, Navigations
- Upcoming appointments list
- Recent navigation history

---

## Mock Data (`src/data/mockData.ts`)

```ts
export const student = { name: "Layan Alharbi", id: "S2021-4892", level: 4, title: "Explorer", points: 650, maxPoints: 1000 }
export const schedule = [...] // 4 classes
export const achievements = [...] // Early Bird, Campus Explorer, 3-Day Streak
export const buildings = { A: {...}, B: {...}, C: {...} }
export const rooms = { B203: { name: "B203", type: "Classroom", building: "B", floor: 2, walkTime: 4 }, ... }
export const faculty = [{ name: "Dr. Ahmad Alqahtani", dept: "Computer Science", office: "C214", building: "C" }]
export const events = [{ name: "FARQ Hackathon", venue: "Innovation Hall", building: "C", floor: 0, time: "1:00 PM" }]
```

---

## CSS Tokens (`src/index.css`)

```css
/* Google Fonts — must be first */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

@import 'tailwindcss';

@theme {
  --color-primary: #0D6B5E;
  --color-primary-light: #E8F5F3;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

---

## Demo Flow Support

The prototype must support this exact tap path:
1. Splash → tap "Let's Get Started" → Map
2. Map → tap search bar → Search sheet → type B203 → result → "Start Navigation"
3. Navigation animation (steps) → floor transition overlay → continue → "B203 on right"
4. Arrival screen → "+50 Points" → "View in Game" → Game screen
5. Bottom nav → Map → tap "Ask Suhail" → AI sheet
6. Type question → Suhail responds with Innovation Hall → "Navigate There"
7. Navigation to Innovation Hall → Arrival
8. Bottom nav → Schedule → view classes → "Book Appointment"
9. Booking flow (Dr. Ahmad, 11:30 AM) → Confirmed → "View Office on Map"

All transitions use CSS `transition` / `transform` for smooth slide-up/fade effects.

---

## Verification

1. App loads in preview showing iPhone frame with splash screen
2. Tap "Let's Get Started" → Map with SVG floor plan visible
3. Tap search → sheet slides up, type B203 → result shows
4. Start Navigation → nav banner appears, user dot animates along route
5. Floor transition overlay appears, then Floor 2 map loads
6. Arrival animation fires with points counter
7. Game tab shows updated points
8. AI sheet slides up, question/response renders
9. Navigate There → hackathon nav → arrival
10. Schedule tab shows 4 items
11. Appointment booking → confirmation → back to map
12. Profile tab renders cleanly
13. No overflow/clipping on iPhone frame at any screen
