export const PEOPLE = {
  nino:     { name: 'Nino Eliava',                 role: 'Speaker',                     avatar: '/speakers/nino-eliava.jpg',          online: true },
  tarik:    { name: 'Tarik Sultan',                role: 'Builders VC',                 avatar: '/speakers/tarik-sultan.png',         online: true },
  sven:     { name: 'Sven Gerst',                  role: 'Speaker',                     avatar: '/speakers/Sven-Gerst.jpg',           online: false },
  tsitsi:   { name: 'Tsitsi Iashvili',             role: 'Starring Georgia',            avatar: '/speakers/Tsitsi-Iashvili.jpg',      online: true },
  saba:     { name: 'Saba Bakhia',                 role: 'Speaker',                     avatar: '/speakers/Saba-Bakhia.png',          online: true },
  abhishek: { name: 'Abhishek Das, PhD',           role: 'Concentric AI',               avatar: '/speakers/Abhishek-Das-PhD.jpg',     online: true },
  arman:    { name: 'Arman Mamyan',                role: 'Coverant.xyz · Moca Network', avatar: '/speakers/Arman-Mamyan.jpg',         online: true },
  nana:     { name: 'Nana Berdzenishvili',         role: 'CCEH',                        avatar: '/speakers/Nana-Berdzenishvili.jpg',  online: false },
  jeremy:   { name: 'Jeremy Allan Bauman',         role: 'New Dominion Angels',         avatar: '/speakers/Jeremy-Allan-Bauman.jpg',  online: true },
  samson:   { name: 'Dr. Samson (Soso) Pkhakadze', role: 'Wissol Group · BAG',          avatar: '/speakers/Dr-Samson-Pkhakadze.jpeg', online: true },
  iiro:     { name: 'Iiro Jussila',                role: 'Capital Six Ltd',             avatar: '/speakers/Iiro-Jussila.jpg',         online: true },
  fran:     { name: 'Fran Mikuličić',              role: 'FM Advisory & Solutions',     avatar: '/speakers/Fran-Mikuličić.png',       online: false },
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
    { id: 1, author: 'nino',     text: "Hey everyone — landed in Tbilisi last night. Super excited for the next 3 days 🙌", time: '10:14' },
    { id: 2, author: 'tarik',    text: "Welcome! Speaker lounge is on the 2nd floor if you need to prep. Decent wifi and quiet 👍", time: '10:17' },
    { id: 3, author: 'abhishek', text: "Anyone doing the AI stage this afternoon? Would love to compare notes before our sessions", time: '10:21' },
    { id: 4, author: 'tsitsi',   text: "If you have a free evening, the old town is 5 min from the venue — happy to share spots in #tbilisi-tips ✨", time: '10:25' },
    { id: 5, author: 'arman',    text: "Web3 folks — let's grab lunch tomorrow. Drop a message if you're in", time: '10:28' },
  ],
  announcements: [
    { id: 1, author: 'nana', text: "🎉 Welcome to GTW Tbilisi 2026! Opening keynote at 10:00 on Main Stage. All speakers please check your schedule.", time: '09:00', announcement: true },
    { id: 2, author: 'nana', text: "📍 Speaker check-in is open at Factory Tbilisi main entrance. Bring the QR code from your confirmation email.", time: '09:15' },
  ],
  'tbilisi-tips': [
    { id: 1, author: 'saba',   text: "Coffee: Fabrika yard. 2 min from Factory, best espresso nearby ☕", time: '08:30' },
    { id: 2, author: 'tsitsi', text: "Day pass for the metro covers all city travel for ₾2 — Bolt is also super cheap if you prefer", time: '08:45' },
    { id: 3, author: 'iiro',   text: "Shavi Lomi for dinner — book ahead, it gets packed. Best Georgian food near the venue 🍷", time: '09:10' },
  ],
  'side-events': [
    { id: 1, author: 'jeremy', text: "GTW Startup Pitch Night — June 20, 19:00 at Fabrika. 10 startups pitching, free with your badge!", time: '10:00' },
  ],
  'stage-ai': [
    { id: 1, author: 'abhishek', text: "AI Stage schedule is live! My talk 'Production-Ready LLMs' is at 14:30. See you there 🤖", time: '10:05' },
  ],
  'stage-fintech': [
    { id: 1, author: 'samson', text: "FinTech stage opens at 11:00. Looking forward to the panel on payments in emerging markets 💳", time: '09:50' },
  ],
  'dm-nino': [
    { id: 1, author: 'nino', text: "Hey Ana! Really looking forward to your talk today 🙌", time: '09:00' },
    { id: 2, author: 'self', text: "Thanks Nino! Same for yours — see you at the venue", time: '09:05' },
  ],
  'dm-tarik': [
    { id: 1, author: 'self',  text: "Tarik — would love to chat about your portfolio plays in EMEA", time: '08:45' },
    { id: 2, author: 'tarik', text: "Definitely. Free after my panel at 15:00?", time: '08:47' },
  ],
  'dm-sven': [],
  'dm-tsitsi': [
    { id: 1, author: 'tsitsi', text: "Ana — let me know if you want a tour of the venue beforehand", time: '09:30' },
    { id: 2, author: 'self',   text: "Yes please! Meeting in the lobby at 10?", time: '09:32' },
  ],
  'dm-saba': [
    { id: 1, author: 'saba', text: "See you at the AI stage 🙌", time: '10:00' },
  ],
  'dm-abhishek': [
    { id: 1, author: 'abhishek', text: "Let's grab dinner after the AI track 🍷", time: '10:15' },
  ],
  'dm-arman':  [],
  'dm-nana':   [],
  'dm-jeremy': [],
  'dm-samson': [],
  'dm-iiro':   [],
  'dm-fran':   [],
};
