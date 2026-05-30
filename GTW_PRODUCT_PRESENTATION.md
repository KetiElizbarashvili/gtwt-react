# GTW Tbilisi App — Product Presentation
### Meeting: May 30, 2026

---

## What Is This Product?

**GTW Tbilisi** is a mobile-first web app for conference attendees.
It gives everyone at the event — speakers, founders, investors, volunteers — a single place to communicate, connect, and navigate the conference in real time.

Think of it as a **lightweight event community platform**: part Slack, part Speakers, part networking tool.

---

## What We Built (Current State)

### 4 Core Screens

---

### 1. Login Screen (`/login`)
The entry point to the app.

**What it does:**
- Branded login with the GTW wordmark logo
- Email + password form
- On submit → sets a session flag and enters the app
- Redirects back to login if not authenticated (auth guard on all pages)

**Current state:** Fully working UI, session-based (no real backend auth yet)

---

### 2. Community Chat (`/app`) — Main Screen
The heart of the product. A real-time messaging interface.

**Channels (left sidebar):**
| Channel | Purpose | Notes |
|---|---|---|
| #announcements | Official GTW updates | Read-only (admins only) |
| #general | Open conversation, 248 members | Writable |
| #tbilisi-tips | Local city tips | Writable |
| #side-events | Community events | Writable |
| #stage-ai | AI Stage track | Writable |
| #stage-fintech | FinTech Stage track | Writable |

**Direct Messages (DMs):**
- Can message any attendee directly
- Simulated typing indicator ("X is typing…")
- Auto-reply simulation (random replies after 1.5s)
- Unread badge counters per DM

**Composer (message input):**
- Text input with Enter to send
- Emoji picker (random emoji insert)
- Send button
- Disabled/readonly state for admin-only channels

**Topbar:**
- Channel name or DM person's name
- Online member count (desktop)
- Notification bell with unread dot
- Profile avatar → links to profile

**Mobile:**
- Hamburger → slide-in drawer (channels + DMs)
- Bottom navigation: Channels / DMs / Speakers / Profile
- Fully responsive, touch-optimized

---

### 3. Speakers (`/directory`)
Browse all conference speakers and attendees.

**What it shows:**
- Speaker card: avatar, name, occupation, company, country, bio
- Stage tag (AI / Fintech / Web3 / Venture / Creative Tech / Volunteer)
- Online presence indicator
- Filter by stage/track
- Search by name
- "Message" button → opens DM in chat
- "LinkedIn" button → external profile link

**Current speakers in data:**
- Keto Elizbarashvili (AI · DeepMind) — logged-in user persona
- Giorgi Kvaratskhelia (CEO · PayGe · Fintech)
- Nino Tabatadze (Founder · Chainhaus · Web3)
- David Lomidze (Managing Partner · Galt & Taggart · Venture)
- Luka Chikovaní (Creative Director · Studio Pixel · Creative Tech)
- Sophie Merabishvili (AI)
- Mari Jikia (Volunteer)
- Tato Sulakvelidze (Fintech)

---

### 4. Profile Page (`/profile`)
The logged-in user's own profile.

**What it shows:**
- Avatar, name, occupation
- Bio / about section
- Stage tag
- Social links (LinkedIn, Twitter/X, Website)
- Activity feed (talks, connections, etc.)
- "Message" button for other users viewing the profile

---

## User Flows

### Flow 1: Attendee Joins & Communicates
```
Open app → Login → Land on #general chat →
Browse channels → Post a message → Switch to #tbilisi-tips →
Open drawer (mobile) → Start a DM with a speaker
```

### Flow 2: Networking via Directory
```
Tap "Speakers" (bottom nav) → Browse speaker cards →
Filter by "AI" track → Find someone interesting →
Tap "Message" → Auto-redirected to DM in chat →
Conversation starts
```

### Flow 3: Announcements
```
Organizer posts in #announcements →
All attendees see notification dot on bell →
They open #announcements → Read-only, no reply (admin-controlled)
```

### Flow 4: Profile Discovery
```
See someone's message in chat →
Tap their name → View their profile →
Read bio, see their talks, click LinkedIn →
Or tap "Message" to DM them directly
```

---

## Tech Stack Summary (for non-technical stakeholders)

| What | How |
|---|---|
| Frontend framework | React 19 (component-based UI) |
| Routing | React Router 7 (4 pages, client-side) |
| Data | Static/mock data (no backend yet) |
| Auth | Session storage (no backend yet) |
| Hosting | Vercel (auto-deploy from GitHub) |
| Mobile | Fully responsive, works in WhatsApp/in-app browsers |

---

## What Is Working Right Now

| Feature | Status |
|---|---|
| Login screen with GTW branding | ✅ Done |
| Channel messaging (6 channels) | ✅ Done |
| Direct messaging (7 people) | ✅ Done |
| Typing indicator simulation | ✅ Done |
| Unread badge counters | ✅ Done |
| Read-only #announcements | ✅ Done |
| Speakers with filters + search | ✅ Done |
| DM from directory ("Message" button) | ✅ Done |
| Profile page | ✅ Done |
| Mobile bottom nav | ✅ Done |
| Mobile slide-in drawer | ✅ Done |
| iOS zoom/height fixes | ✅ Done |
| Vercel deployment / SPA routing | ✅ Done |

---

## What Is NOT There Yet (Open Questions for Today)

These are the items that need product decisions before we can build them:

### 🔴 Must Clarify Today

**1. Real Backend / Database**
- Right now all data is hardcoded. No real users, no real messages.
- Do we need a real database before launch?
- If yes: which service? (Supabase, Firebase, custom API?)
- Who manages it?

**2. Real Authentication**
- Login currently is fake (any email/password works).
- Do attendees get unique login links (magic link)? Or create accounts?
- Who controls the user list — organizers manually, or self-registration?

**3. Real-time Messaging**
- Messages disappear on refresh (no persistence).
- Do we need live messaging (WebSocket/Supabase realtime)?
- Or is a simpler "post to feed, refresh to see" approach okay for this event?

**4. Who Are the Users?**
- Is this app for speakers only? Or all attendees? Or everyone?
- How many people do we expect to use it simultaneously?
- Is it invite-only or public?

**5. Announcements / Admin Role**
- Who can post in #announcements?
- Is there an admin panel or do organizers message via a special account?
- Should organizers be able to create/delete channels?

---

### 🟡 Nice to Have (Decide Later)

**6. Speaker Profiles — Real Data**
- Who fills in speaker bios, LinkedIn links, photo?
- Is there a CMS/admin form for this, or do we hardcode from a spreadsheet?

**7. Push Notifications**
- Should the notification bell actually send mobile push alerts?
- Or is it just in-app?

**8. Schedule / Agenda**
- There's no schedule screen yet.
- Do we need a full agenda with stage timeslots inside the app?
- Or is this linked externally?

**9. Networking / Connection Requests**
- Right now "networking" = just DM.
- Do we need a "connect" / follow feature (like LinkedIn)?
- Or is DM enough for this event?

**10. Event Branding per Stage**
- Stage tracks have color coding (AI = purple, FinTech = teal).
- Are these the final brand colors? Need design sign-off.

---

## Summary: What We Have vs. What We Need

| Layer | Have | Need Decision |
|---|---|---|
| UI / Design | Complete MVP screens | Stage colors sign-off |
| Auth | Working (fake) | Real auth method |
| Messaging | Working (local) | Real-time + persistence? |
| Users | Mock data (8 people) | Real user list + onboarding |
| Speakers | Mock data | Real bios, photos, links |
| Notifications | Bell UI | Push notifications? |
| Admin | None | Who manages channels/announcements? |
| Schedule | None | Is it in-scope for this app? |
| Backend | None | Which service, who owns it? |

---

## Recommended Next Steps

1. **Decide on backend** (Supabase is simplest — gives auth + DB + realtime in one)
2. **Confirm user scope** — who gets access and how they log in
3. **Get real speaker data** — even a spreadsheet is fine to start
4. **Decide: real-time chat or async feed?** — real-time is harder but more impressive
5. **Design sign-off** on colors, logo usage, stage tags

---

*Built by Keti Elizbarashvili · GTW Tbilisi 2026 · May 30, 2026*
