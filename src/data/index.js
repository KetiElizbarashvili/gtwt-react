export const PEOPLE = {
  giorgi: { name: 'Giorgi Kvaratskhelia', role: 'FinTech', avatar: 'https://i.pravatar.cc/36?img=12', online: true },
  nino:   { name: 'Nino Tabatadze',       role: 'Web3',    avatar: 'https://i.pravatar.cc/36?img=32', online: true },
  david:  { name: 'David Lomidze',        role: 'Venture', avatar: 'https://i.pravatar.cc/36?img=55', online: false },
  luka:   { name: 'Luka Chikovaní',       role: 'Creative Tech', avatar: 'https://i.pravatar.cc/36?img=22', online: true },
  sophie: { name: 'Sophie Merabishvili',  role: 'AI',      avatar: 'https://i.pravatar.cc/36?img=61', online: true },
  mari:   { name: 'Mari Jikia',           role: 'Volunteer', avatar: 'https://i.pravatar.cc/36?img=44', online: true,  volunteer: true },
  tato:   { name: 'Tato Sulakvelidze',    role: 'FinTech', avatar: 'https://i.pravatar.cc/36?img=68', online: true },
};

export const CHANNELS = {
  announcements: { label: 'announcements', desc: 'Official GTW announcements', readonly: true, badge: 2 },
  general:       { label: 'general',       desc: 'Open conversation — 248 members', badge: 0 },
  'tbilisi-tips':{ label: 'tbilisi-tips',  desc: 'Local tips for Tbilisi', badge: 5 },
  'side-events': { label: 'side-events',   desc: 'Community side events', badge: 0 },
  'stage-ai':    { label: 'stage-ai',      desc: 'AI Stage track', color: 'var(--stage-ai)', badge: 1 },
  'stage-fintech':{ label: 'stage-fintech',desc: 'FinTech Stage track', color: 'var(--stage-fintech)', badge: 0 },
};

export const MESSAGES = {
  general: [
    { id: 1, author: 'giorgi', text: "Hey everyone! So excited to be here. First time at GTW and it's already incredible 🙌 Quick question — does anyone know if there's a quiet space to prep before my talk at 14:00?", time: '10:14' },
    { id: 2, author: 'nino',   text: "There's a speaker lounge on the 2nd floor, Giorgi! Quiet area, good wifi, comfy chairs 👍", time: '10:17' },
    { id: 3, author: 'david',  text: "Anyone grabbing coffee before the opening keynote? There's a great place 2 min away — posted it in #tbilisi-tips 😄", time: '10:21' },
    { id: 4, author: 'luka',   text: "Who's doing the AI stage this afternoon? Would love to grab 5 min to chat about the intersection with creative tools — very relevant for my talk too", time: '10:25' },
    { id: 5, author: 'giorgi', text: "Perfect, thanks @Nino and @Ana! Heading there now 🏃", time: '10:28' },
  ],
  announcements: [
    { id: 1, author: 'nino', text: "🎉 Welcome to GTW Tbilisi 2026! All speakers please check your schedule in the app. Opening keynote at 10:00 on Main Stage.", time: '09:00', announcement: true },
    { id: 2, author: 'david', text: "📍 Speaker check-in is open at the Factory Tbilisi main entrance. Bring your QR code from your confirmation email.", time: '09:15' },
  ],
  'tbilisi-tips': [
    { id: 1, author: 'luka',   text: "Coffee spot: Fabrika yard has amazing espresso, 2 min walk from Factory Tbilisi ☕", time: '08:30' },
    { id: 2, author: 'sophie', text: "Pro tip: get a day pass for the metro — covers all your travel around the city for ₾2!", time: '08:45' },
    { id: 3, author: 'giorgi', text: "Shavi Lomi restaurant for dinner — book ahead, it gets packed. Best Georgian food near the venue 🍷", time: '09:10' },
  ],
  'side-events': [
    { id: 1, author: 'mari', text: "GTW Startup Pitch Night — June 20, 19:00 at Fabrika. 10 startups pitching, free to attend with your badge!", time: '10:00' },
  ],
  'stage-ai': [
    { id: 1, author: 'sophie', text: "AI Stage schedule is live! My talk 'Building Production LLM Apps' is at 14:30. See you there 🤖", time: '10:05' },
  ],
  'stage-fintech': [],
  'dm-giorgi': [
    { id: 1, author: 'giorgi', text: "Hey Ana! Really looking forward to your talk today 🙌", time: '09:00' },
    { id: 2, author: 'self',   text: "Thanks Giorgi! Same for yours — the FinTech panel looks great", time: '09:05' },
    { id: 3, author: 'giorgi', text: "See you at the venue!", time: '09:10' },
  ],
  'dm-nino': [
    { id: 1, author: 'self',   text: "Nino! Are you around for a quick chat before our sessions?", time: '08:45' },
    { id: 2, author: 'nino',   text: "Sure, let's connect tomorrow", time: '08:47' },
  ],
  'dm-david': [
    { id: 1, author: 'david', text: "What time is your talk?", time: '09:30' },
    { id: 2, author: 'self',  text: "14:30 on AI stage! You?", time: '09:32' },
  ],
  'dm-luka': [
    { id: 1, author: 'luka', text: "See you there 🙌", time: '10:00' },
  ],
  'dm-sophie': [
    { id: 1, author: 'sophie', text: "Let's grab dinner after 🍷", time: '10:15' },
  ],
  'dm-mari':  [],
  'dm-tato':  [],
};
