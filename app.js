
'use strict'; 


const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem('unlocked_' + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('unlocked_' + key, JSON.stringify(value)); } catch (e) { /* storage full or blocked */ }
  }
};


function esc(text) {
  return String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}


function toast(message) {
  let box = $('#toast');
  if (!box) { box = document.createElement('div'); box.id = 'toast'; box.className = 'toast'; document.body.appendChild(box); }
  box.textContent = message;
  box.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => box.classList.remove('show'), 2600);
}

function confetti() {
  const colours = ['#4f46e5', '#7c3aed', '#f59e0b', '#14b8a6', '#ef6a5b'];
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement('i');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colours[i % colours.length];
    piece.style.animationDuration = 2 + Math.random() * 2 + 's';
    piece.style.animationDelay = Math.random() * 0.6 + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}


function fillBars(root = document) {
  requestAnimationFrame(() => setTimeout(() => {
    $$('.bar[data-w]', root).forEach(b => b.style.width = b.dataset.w + '%');
  }, 60));
}



   


const TEAM = [
  { name: 'Preetham HB' },
  { name: 'Preetham BT' },
  { name: 'Nidhi BS' },
  { name: 'NehaShree N' }
];


const SUBJECTS = [
  { id: 'prog', icon: '💻', name: 'Programming Basics',
    desc: 'Learn how computers follow instructions, from your first variable to a small project.',
    topics: ['Variables & data types', 'Decisions (if / else)', 'Loops', 'Functions', 'Lists & arrays', 'Mini project'],
    res: [['freeCodeCamp (free)', 'https://www.freecodecamp.org'], ['NPTEL courses', 'https://nptel.ac.in'], ['SWAYAM', 'https://swayam.gov.in']],
    quiz: [
      { q: 'Which language is mainly used to style a web page?', o: ['SQL', 'CSS', 'C', 'Python'], a: 1 },
      { q: 'What does a loop do?', o: ['Deletes code', 'Repeats instructions', 'Draws a picture', 'Turns off the computer'], a: 1 },
      { q: 'Which symbol starts a single-line comment in JavaScript?', o: ['//', '##', '<!--', '**'], a: 0 },
      { q: 'A variable is best described as…', o: ['A broken program', 'A named place to store a value', 'A type of keyboard', 'A web browser'], a: 1 }
    ] },
  { id: 'math', icon: '➗', name: 'Mathematics',
    desc: 'Build confidence with numbers, percentages, algebra and shapes, step by step.',
    topics: ['Fractions & number sense', 'Percentages & ratios', 'Algebra basics', 'Geometry & area', 'Data & probability', 'Practice test'],
    res: [['NPTEL', 'https://nptel.ac.in'], ['DIKSHA', 'https://diksha.gov.in'], ['SWAYAM', 'https://swayam.gov.in']],
    quiz: [
      { q: 'What is 15% of 200?', o: ['15', '20', '30', '45'], a: 2 },
      { q: 'Solve: 2x + 6 = 14', o: ['x = 3', 'x = 4', 'x = 5', 'x = 10'], a: 1 },
      { q: 'Area of a rectangle 8 cm by 5 cm?', o: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'], a: 2 },
      { q: 'Next number: 2, 4, 8, 16, …', o: ['18', '24', '32', '30'], a: 2 }
    ] },
  { id: 'sci', icon: '🔬', name: 'Science',
    desc: 'Understand the world around you: matter, motion, energy and living things.',
    topics: ['Matter & materials', 'Force & motion', 'Energy', 'The living world', 'Earth & space', 'Science project'],
    res: [['DIKSHA', 'https://diksha.gov.in'], ['SWAYAM', 'https://swayam.gov.in'], ['NPTEL', 'https://nptel.ac.in']],
    quiz: [
      { q: 'Which gas do plants take in for photosynthesis?', o: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Helium'], a: 2 },
      { q: 'The SI unit of force is the…', o: ['Joule', 'Newton', 'Watt', 'Pascal'], a: 1 },
      { q: 'Which planet is closest to the Sun?', o: ['Venus', 'Earth', 'Mars', 'Mercury'], a: 3 },
      { q: 'Chemical formula of water?', o: ['CO2', 'H2O', 'O2', 'NaCl'], a: 1 }
    ] },
  { id: 'eng', icon: '🗣️', name: 'English Communication',
    desc: 'Speak, read and write with confidence for classes, interviews and everyday life.',
    topics: ['Grammar basics', 'Vocabulary building', 'Reading comprehension', 'Writing emails', 'Speaking practice', 'Interview English'],
    res: [['SWAYAM', 'https://swayam.gov.in'], ['NPTEL', 'https://nptel.ac.in'], ['DIKSHA', 'https://diksha.gov.in']],
    quiz: [
      { q: 'Which sentence is correct?', o: ['She don\'t like tea.', 'She doesn\'t like tea.', 'She not like tea.', 'She doesn\'t likes tea.'], a: 1 },
      { q: 'A synonym of "begin" is…', o: ['End', 'Start', 'Stop', 'Wait'], a: 1 },
      { q: 'Best greeting for a formal email?', o: ['Hey buddy', 'Yo!', 'Dear Sir/Madam', 'Sup'], a: 2 },
      { q: 'Plural of "child"?', o: ['Childs', 'Childes', 'Children', 'Childrens'], a: 2 }
    ] },
  { id: 'dig', icon: '🌐', name: 'Digital Skills',
    desc: 'Use computers, the internet and online tools safely and productively.',
    topics: ['Computer basics', 'Internet & safety', 'Spreadsheets', 'Documents & slides', 'Digital payments', 'Online job tools'],
    res: [['Skill India Digital', 'https://www.skillindiadigital.gov.in'], ['SWAYAM', 'https://swayam.gov.in'], ['freeCodeCamp', 'https://www.freecodecamp.org']],
    quiz: [
      { q: 'Which makes the strongest password?', o: ['12345678', 'your name', 'A long mix of letters, numbers & symbols', 'password'], a: 2 },
      { q: 'Phishing is…', o: ['A fishing sport', 'Fake messages that trick you into sharing data', 'A type of keyboard', 'A video format'], a: 1 },
      { q: 'Which tool organises data in rows and columns?', o: ['Spreadsheet', 'Calculator', 'Media player', 'Browser'], a: 0 },
      { q: 'Secure websites start with…', o: ['http://', 'ftp://', 'https://', 'mail://'], a: 2 }
    ] },
  { id: 'money', icon: '💰', name: 'Money & Commerce',
    desc: 'Understand budgets, savings, interest and safe digital payments.',
    topics: ['Budgeting', 'Saving & banking', 'Interest', 'UPI & payment safety', 'Insurance & loans basics', 'Starting a small business'],
    res: [['SWAYAM', 'https://swayam.gov.in'], ['NPTEL', 'https://nptel.ac.in'], ['Skill India Digital', 'https://www.skillindiadigital.gov.in']],
    quiz: [
      { q: 'Simple interest on ₹1000 at 10% per year for 2 years?', o: ['₹100', '₹200', '₹210', '₹1200'], a: 1 },
      { q: 'A savings account is mainly for…', o: ['Keeping money safely while earning small interest', 'Buying shares only', 'Paying taxes only', 'Nothing'], a: 0 },
      { q: 'UPI stands for…', o: ['Unified Payments Interface', 'United Pay Index', 'Universal Price Info', 'User Pin Input'], a: 0 },
      { q: 'A budget is…', o: ['A plan for income and spending', 'A bank loan', 'A kind of tax', 'A credit card'], a: 0 }
    ] }
];

// Regional-language labels for the Learning Hub (English, Hindi, Kannada).
// Add another language by adding another block with the same keys.
const I18N = {
  en: { lang: 'Language', pick: 'Choose what to learn', resources: 'Free resources', plan: 'Make my study plan', hours: 'Hours per day', weeks: 'Number of weeks', make: 'Create plan', practice: 'Practice quiz', start: 'Start quiz', next: 'Next', finish: 'See result', best: 'Best score', topics: 'You will cover', yourplan: 'Your plan', retry: 'Try again' },
  hi: { lang: 'भाषा', pick: 'क्या सीखना है चुनें', resources: 'मुफ़्त संसाधन', plan: 'मेरी अध्ययन योजना', hours: 'प्रतिदिन घंटे', weeks: 'सप्ताहों की संख्या', make: 'योजना बनाएँ', practice: 'अभ्यास प्रश्नोत्तरी', start: 'क्विज़ शुरू करें', next: 'आगे', finish: 'परिणाम देखें', best: 'सर्वश्रेष्ठ स्कोर', topics: 'आप ये सीखेंगे', yourplan: 'आपकी योजना', retry: 'फिर से करें' },
  kn: { lang: 'ಭಾಷೆ', pick: 'ಏನು ಕಲಿಯಬೇಕೆಂದು ಆಯ್ಕೆಮಾಡಿ', resources: 'ಉಚಿತ ಸಂಪನ್ಮೂಲಗಳು', plan: 'ನನ್ನ ಅಧ್ಯಯನ ಯೋಜನೆ', hours: 'ದಿನಕ್ಕೆ ಗಂಟೆಗಳು', weeks: 'ವಾರಗಳ ಸಂಖ್ಯೆ', make: 'ಯೋಜನೆ ರಚಿಸಿ', practice: 'ಅಭ್ಯಾಸ ರಸಪ್ರಶ್ನೆ', start: 'ರಸಪ್ರಶ್ನೆ ಪ್ರಾರಂಭಿಸಿ', next: 'ಮುಂದೆ', finish: 'ಫಲಿತಾಂಶ ನೋಡಿ', best: 'ಅತ್ಯುತ್ತಮ ಅಂಕ', topics: 'ನೀವು ಕಲಿಯುವುದು', yourplan: 'ನಿಮ್ಮ ಯೋಜನೆ', retry: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' }
};

/* ---- 1c. Career Navigator ---- */
const INTERESTS = [
  ['tech', '💻 Technology'], ['math', '➗ Maths & logic'], ['science', '🔬 Science'], ['art', '🎨 Art & design'],
  ['people', '🤝 Working with people'], ['language', '🗣️ Languages & writing'], ['business', '💼 Business & money'],
  ['nature', '🌾 Nature & farming'], ['health', '🩺 Health & care'], ['sports', '🏅 Fitness & discipline'], ['hands', '🔧 Hands-on work']
];
const EDU_LEVELS = [['10', '10th pass', 0], ['12', '12th pass', 1], ['diploma', 'Diploma / ITI', 1], ['grad', 'Graduate or studying for a degree', 2]];
const PREFS = [['any', 'Open to anything'], ['govt', 'Government job'], ['private', 'Private sector job'], ['creative', 'Creative / freelance'], ['own', 'My own business']];

// minEdu: 0 = 10th, 1 = 12th/diploma, 2 = graduate
const CAREERS = [
  { id: 'dev', icon: '👩‍💻', title: 'Software Developer', group: 'Technical skills', minEdu: 1, pref: ['private', 'own', 'creative'], tags: ['tech', 'math'],
    skills: ['programming', 'problem solving', 'logic', 'web development', 'python', 'javascript'],
    path: ['Learn programming basics (variables, loops, functions)', 'Build 3 small projects and put them online', 'Learn one stack deeply, such as web or Android', 'Apply for internships and entry-level roles'],
    res: [['freeCodeCamp', 'https://www.freecodecamp.org'], ['NPTEL', 'https://nptel.ac.in']] },
  { id: 'data', icon: '📊', title: 'Data Analyst', group: 'Degree-based', minEdu: 1, pref: ['private', 'govt'], tags: ['math', 'tech', 'business'],
    skills: ['excel', 'statistics', 'sql', 'data', 'python', 'maths'],
    path: ['Master spreadsheets', 'Learn basic statistics', 'Learn SQL and a little Python', 'Make a small portfolio with real public data'],
    res: [['SWAYAM', 'https://swayam.gov.in'], ['NPTEL', 'https://nptel.ac.in']] },
  { id: 'upsc', icon: '🏛️', title: 'Civil Services (UPSC)', group: 'Government exam', minEdu: 2, pref: ['govt'], tags: ['people', 'language', 'business'],
    skills: ['reading', 'writing', 'current affairs', 'discipline', 'general knowledge'],
    path: ['Complete your graduation', 'Read the official syllabus and previous papers', 'Build a daily reading and answer-writing habit', 'Attempt prelims, mains and interview'],
    res: [['UPSC official site', 'https://upsc.gov.in']] },
  { id: 'ssc', icon: '📝', title: 'SSC & Banking Exams', group: 'Government exam', minEdu: 1, pref: ['govt'], tags: ['math', 'business', 'language'],
    skills: ['quantitative aptitude', 'reasoning', 'english', 'speed', 'maths'],
    path: ['Check which exam matches your qualification', 'Practise aptitude and reasoning daily', 'Take timed mock tests', 'Apply on the official notification'],
    res: [['SSC', 'https://ssc.gov.in'], ['IBPS', 'https://www.ibps.in']] },
  { id: 'teach', icon: '🍎', title: 'Teacher / Educator', group: 'Degree-based', minEdu: 2, pref: ['govt', 'private'], tags: ['people', 'language', 'science'],
    skills: ['communication', 'patience', 'subject knowledge', 'presentation'],
    path: ['Complete a degree in your subject', 'Do a teacher-training course (such as B.Ed.)', 'Prepare for teacher eligibility tests like CTET/TET', 'Practise tutoring or volunteer teaching'],
    res: [['CTET', 'https://ctet.nic.in'], ['DIKSHA', 'https://diksha.gov.in']] },
  { id: 'health', icon: '🩺', title: 'Healthcare & Allied Health', group: 'Vocational / degree', minEdu: 1, pref: ['govt', 'private'], tags: ['health', 'science', 'people'],
    skills: ['biology', 'empathy', 'first aid', 'care', 'patience'],
    path: ['Pick a stream: nursing, lab technology, pharmacy, physiotherapy…', 'Check approved colleges and entrance rules', 'Get hands-on training in a hospital', 'Register with the relevant council if required'],
    res: [['National Career Service', 'https://www.ncs.gov.in']] },
  { id: 'iti', icon: '⚡', title: 'ITI Technician (Electrician, Fitter, etc.)', group: 'Vocational', minEdu: 0, pref: ['private', 'govt', 'own'], tags: ['hands', 'tech'],
    skills: ['practical skills', 'safety', 'repair', 'tools', 'wiring'],
    path: ['Join an ITI trade after 10th', 'Do an apprenticeship for real workplace experience', 'Earn a skill certificate', 'Work, upskill, or start your own workshop'],
    res: [['Apprenticeship India', 'https://www.apprenticeshipindia.gov.in'], ['Skill India Digital', 'https://www.skillindiadigital.gov.in']] },
  { id: 'design', icon: '🎨', title: 'Graphic / UI Designer', group: 'Creative', minEdu: 1, pref: ['creative', 'private', 'own'], tags: ['art', 'tech'],
    skills: ['design', 'drawing', 'creativity', 'figma', 'colour', 'typography'],
    path: ['Learn design basics: layout, colour, type', 'Practise with free tools', 'Build a portfolio of 5 projects', 'Take freelance gigs or apply for junior roles'],
    res: [['Figma Learn', 'https://www.figma.com/resources/learn-design/']] },
  { id: 'creator', icon: '🎬', title: 'Content Creator / Writer', group: 'Creative', minEdu: 0, pref: ['creative', 'own'], tags: ['art', 'language', 'people'],
    skills: ['writing', 'video', 'storytelling', 'editing', 'creativity'],
    path: ['Pick a topic you can talk about for years', 'Post consistently for 90 days', 'Learn basic editing and audience insights', 'Earn through brand work, courses or services'],
    res: [['Skill India Digital', 'https://www.skillindiadigital.gov.in']] },
  { id: 'marketing', icon: '📣', title: 'Digital Marketing Specialist', group: 'Technical skills', minEdu: 1, pref: ['private', 'own', 'creative'], tags: ['business', 'language', 'tech'],
    skills: ['marketing', 'social media', 'writing', 'analytics', 'seo'],
    path: ['Learn how search and social media work', 'Run a small campaign for a local shop', 'Learn analytics', 'Apply for agency roles or freelance'],
    res: [['SWAYAM', 'https://swayam.gov.in']] },
  { id: 'biz', icon: '🏪', title: 'Entrepreneur / Small Business Owner', group: 'Entrepreneurship', minEdu: 0, pref: ['own'], tags: ['business', 'people'],
    skills: ['selling', 'budgeting', 'communication', 'leadership', 'money'],
    path: ['Spot a real local problem', 'Test your idea with 5 customers', 'Learn basic accounting and registration', 'Look into government support schemes for small businesses'],
    res: [['Skill India Digital', 'https://www.skillindiadigital.gov.in']] },
  { id: 'agri', icon: '🌾', title: 'Agriculture & Agri-Tech', group: 'Degree / vocational', minEdu: 1, pref: ['govt', 'own', 'private'], tags: ['nature', 'science', 'business'],
    skills: ['farming', 'soil', 'plants', 'sustainability', 'biology'],
    path: ['Learn modern farming methods', 'Look at agriculture diplomas and degrees', 'Explore agri-tech tools like sensors and apps', 'Connect with local farmer groups'],
    res: [['ICAR', 'https://icar.org.in']] },
  { id: 'defence', icon: '🎖️', title: 'Defence Services', group: 'Government exam', minEdu: 1, pref: ['govt'], tags: ['sports', 'people'],
    skills: ['fitness', 'discipline', 'teamwork', 'leadership', 'maths'],
    path: ['Read the official eligibility for each entry', 'Start a daily fitness routine', 'Prepare for written tests', 'Apply on the official notification'],
    res: [['UPSC (NDA)', 'https://upsc.gov.in'], ['Join Indian Army', 'https://joinindianarmy.nic.in']] },
  { id: 'eng', icon: '🏗️', title: 'Engineer (Civil / Mechanical / Electrical)', group: 'Degree-based', minEdu: 1, pref: ['private', 'govt'], tags: ['math', 'science', 'tech', 'hands'],
    skills: ['maths', 'physics', 'drawing', 'problem solving', 'design'],
    path: ['Prepare for entrance exams or a diploma route', 'Choose a branch that excites you', 'Do internships every year', 'Consider government and private recruitment'],
    res: [['NPTEL', 'https://nptel.ac.in'], ['AICTE Internships', 'https://internship.aicte-india.org']] },
  { id: 'acct', icon: '🧾', title: 'Accountant / Finance Professional', group: 'Degree-based', minEdu: 1, pref: ['private', 'govt', 'own'], tags: ['math', 'business'],
    skills: ['accounting', 'excel', 'tax', 'numbers', 'detail'],
    path: ['Study commerce basics', 'Learn accounting software and spreadsheets', 'Look at professional courses like CA/CMA', 'Do articleship or internships'],
    res: [['ICAI', 'https://www.icai.org'], ['SWAYAM', 'https://swayam.gov.in']] }
];


const OPPS = [
  { id: 'nsp', type: 'Scholarship', title: 'National Scholarship Portal', org: 'Government of India', levels: ['10', '12', 'diploma', 'grad'],
    elig: 'Many central and state schemes for school and college students. Income, category and marks rules differ for each scheme.',
    apply: 'Register on the portal, pick a scheme you qualify for, upload documents, submit and track.', deadline: 'Opens every academic year, so check the portal notices.', url: 'https://scholarships.gov.in' },
  { id: 'b4s', type: 'Scholarship', title: 'Buddy4Study Scholarship Listings', org: 'Buddy4Study (private platform)', levels: ['10', '12', 'diploma', 'grad'],
    elig: 'Scholarships from companies, trusts and foundations. Every listing has its own rules.',
    apply: 'Search by class or course, read the listing, then apply through its official link.', deadline: 'Each listing shows its own last date.', url: 'https://www.buddy4study.com' },
  { id: 'aicte', type: 'Internship', title: 'AICTE Internship Portal', org: 'AICTE', levels: ['diploma', 'grad'],
    elig: 'Students in technical and higher education. Check the portal for current rules.',
    apply: 'Create a student profile, browse internships, apply to the ones that match.', deadline: 'Rolling, with new internships added regularly.', url: 'https://internship.aicte-india.org' },
  { id: 'pmi', type: 'Internship', title: 'PM Internship Scheme', org: 'Ministry of Corporate Affairs', levels: ['10', '12', 'diploma', 'grad'],
    elig: 'Young people who meet the scheme\'s age and education criteria. Please verify on the portal.',
    apply: 'Register on the portal, build a profile, and apply to listed internships.', deadline: 'Application windows are announced on the portal.', url: 'https://pminternship.mca.gov.in' },
  { id: 'swayam', type: 'Skill Programme', title: 'SWAYAM Free Online Courses', org: 'Ministry of Education', levels: ['10', '12', 'diploma', 'grad'],
    elig: 'Anyone can learn. Proctored certificate exams may have a fee.',
    apply: 'Create a free account, enrol in a course, learn at your pace.', deadline: 'Courses open in semesters. Enrolment dates are on each course page.', url: 'https://swayam.gov.in' },
  { id: 'nptel', type: 'Skill Programme', title: 'NPTEL Courses', org: 'IITs & IISc', levels: ['12', 'diploma', 'grad'],
    elig: 'Open to everyone; best for students interested in engineering, science and management topics.',
    apply: 'Pick a course, enrol, watch lectures free, optionally take the certification exam.', deadline: 'New batches start every semester.', url: 'https://nptel.ac.in' },
  { id: 'skill', type: 'Skill Programme', title: 'Skill India Digital Hub', org: 'Ministry of Skill Development & Entrepreneurship', levels: ['10', '12', 'diploma', 'grad'],
    elig: 'Open to learners looking for skill courses and training programmes.',
    apply: 'Create a profile and browse courses and training centres.', deadline: 'Programmes list their own dates.', url: 'https://www.skillindiadigital.gov.in' },
  { id: 'appr', type: 'Skill Programme', title: 'Apprenticeship India', org: 'Government of India', levels: ['10', '12', 'diploma'],
    elig: 'Learners who want to earn while learning a trade. Trade-wise rules apply.',
    apply: 'Register as a candidate, build a profile, apply to apprenticeship openings.', deadline: 'Openings are posted throughout the year.', url: 'https://www.apprenticeshipindia.gov.in' },
  { id: 'fcc', type: 'Skill Programme', title: 'freeCodeCamp', org: 'Non-profit', levels: ['10', '12', 'diploma', 'grad'],
    elig: 'Anyone. It is completely free.', apply: 'Open the site and start the first lesson. No sign-up barrier.', deadline: 'None. Learn whenever you like.', url: 'https://www.freecodecamp.org' },
  { id: 'diksha', type: 'Skill Programme', title: 'DIKSHA Learning Platform', org: 'Ministry of Education', levels: ['10', '12'],
    elig: 'School learners and teachers, with content linked to school curricula.', apply: 'Open DIKSHA, choose your board and class, and start learning.', deadline: 'None. Available any time.', url: 'https://diksha.gov.in' },
  { id: 'ncs', type: 'Career Support', title: 'National Career Service', org: 'Ministry of Labour & Employment', levels: ['10', '12', 'diploma', 'grad'],
    elig: 'Job seekers, with career counselling and job listings.', apply: 'Register, build a profile and explore jobs and counselling.', deadline: 'Rolling.', url: 'https://www.ncs.gov.in' },
  { id: 'ssc', type: 'Government Exam', title: 'SSC Exams (MTS, CHSL, CGL…)', org: 'Staff Selection Commission', levels: ['10', '12', 'grad'],
    elig: 'Different exams need different qualifications, for example MTS (10th), CHSL (12th), CGL (graduation). Age limits apply.',
    apply: 'Read the notification, register on the official site, pay the fee if applicable, fill the form.', deadline: 'Notified in the exam calendar and each notification.', url: 'https://ssc.gov.in' },
  { id: 'upsc', type: 'Government Exam', title: 'UPSC Civil Services Examination', org: 'Union Public Service Commission', levels: ['grad'],
    elig: 'Graduates within the age and attempt limits given in the notification.', apply: 'Apply online through the UPSC portal when the notification is released.', deadline: 'Announced yearly by UPSC.', url: 'https://upsc.gov.in' },
  { id: 'nda', type: 'Government Exam', title: 'NDA & NA Examination', org: 'UPSC', levels: ['12'],
    elig: 'Class 12 pass or appearing; stream rules differ for each wing; age limits apply.', apply: 'Apply online via UPSC when the notification is out.', deadline: 'Announced twice a year by UPSC, so check the official notice.', url: 'https://upsc.gov.in' },
  { id: 'ibps', type: 'Government Exam', title: 'IBPS Bank Recruitment', org: 'IBPS', levels: ['grad'],
    elig: 'Graduates meeting the age and language criteria of the notification.', apply: 'Register on the IBPS website during the application window.', deadline: 'Dates are published in the yearly calendar.', url: 'https://www.ibps.in' },
  { id: 'rrb', type: 'Government Exam', title: 'Railway Recruitment (RRB)', org: 'Indian Railways', levels: ['10', '12', 'diploma', 'grad'],
    elig: 'Different posts need different qualifications. See each notification.', apply: 'Apply on the official regional RRB website once notified.', deadline: 'Per recruitment notification.', url: 'https://indianrailways.gov.in' },
  { id: 'ctet', type: 'Government Exam', title: 'CTET (Teacher Eligibility Test)', org: 'CBSE', levels: ['grad'],
    elig: 'Aspiring teachers with the required qualification for the class level they want to teach.', apply: 'Apply online on the CTET site when registration opens.', deadline: 'Announced before each exam session.', url: 'https://ctet.nic.in' }
];


const REGIONS = [
  { id: 'JK', n: 'Jammu & Kashmir', c: 3, r: 0, lit: 67.2, ut: true }, { id: 'LA', n: 'Ladakh', c: 4, r: 0, lit: 77.2, ut: true },
  { id: 'PB', n: 'Punjab', c: 3, r: 1, lit: 75.8 }, { id: 'HP', n: 'Himachal Pradesh', c: 4, r: 1, lit: 82.8 }, { id: 'UK', n: 'Uttarakhand', c: 5, r: 1, lit: 78.8 },
  { id: 'CH', n: 'Chandigarh', c: 2, r: 2, lit: 86.0, ut: true }, { id: 'HR', n: 'Haryana', c: 3, r: 2, lit: 75.6 }, { id: 'DL', n: 'Delhi', c: 4, r: 2, lit: 86.2, ut: true },
  { id: 'UP', n: 'Uttar Pradesh', c: 5, r: 2, lit: 67.7 }, { id: 'SK', n: 'Sikkim', c: 7, r: 2, lit: 81.4 }, { id: 'AR', n: 'Arunachal Pradesh', c: 9, r: 2, lit: 65.4 },
  { id: 'RJ', n: 'Rajasthan', c: 3, r: 3, lit: 66.1 }, { id: 'MP', n: 'Madhya Pradesh', c: 4, r: 3, lit: 69.3 }, { id: 'BR', n: 'Bihar', c: 6, r: 3, lit: 61.8 },
  { id: 'WB', n: 'West Bengal', c: 7, r: 3, lit: 76.3 }, { id: 'AS', n: 'Assam', c: 8, r: 3, lit: 72.2 }, { id: 'NL', n: 'Nagaland', c: 9, r: 3, lit: 79.6 },
  { id: 'GJ', n: 'Gujarat', c: 3, r: 4, lit: 78.0 }, { id: 'MH', n: 'Maharashtra', c: 4, r: 4, lit: 82.3 }, { id: 'CG', n: 'Chhattisgarh', c: 5, r: 4, lit: 70.3 },
  { id: 'JH', n: 'Jharkhand', c: 6, r: 4, lit: 66.4 }, { id: 'ML', n: 'Meghalaya', c: 8, r: 4, lit: 74.4 }, { id: 'MN', n: 'Manipur', c: 9, r: 4, lit: 76.9 },
  { id: 'DN', n: 'Dadra & Nagar Haveli and Daman & Diu', c: 3, r: 5, lit: 80.6, ut: true }, { id: 'TG', n: 'Telangana', c: 5, r: 5, lit: 66.5 },
  { id: 'OD', n: 'Odisha', c: 6, r: 5, lit: 72.9 }, { id: 'TR', n: 'Tripura', c: 8, r: 5, lit: 87.2 }, { id: 'MZ', n: 'Mizoram', c: 9, r: 5, lit: 91.3 },
  { id: 'GA', n: 'Goa', c: 3, r: 6, lit: 88.7 }, { id: 'KA', n: 'Karnataka', c: 4, r: 6, lit: 75.4 }, { id: 'AP', n: 'Andhra Pradesh', c: 5, r: 6, lit: 67.0 },
  { id: 'LD', n: 'Lakshadweep', c: 2, r: 7, lit: 91.9, ut: true }, { id: 'KL', n: 'Kerala', c: 4, r: 7, lit: 94.0 }, { id: 'TN', n: 'Tamil Nadu', c: 5, r: 7, lit: 80.1 },
  { id: 'PY', n: 'Puducherry', c: 6, r: 7, lit: 85.8, ut: true }, { id: 'AN', n: 'Andaman & Nicobar Islands', c: 9, r: 7, lit: 86.6, ut: true }
];
const NATIONAL_LIT = 74.0; // India's literacy rate, Census 2011



const NAV = [
  ['index.html', 'home', 'Home'], ['about.html', 'about', 'About'], ['learning-hub.html', 'learn', 'Learn'],
  ['career-navigator.html', 'career', 'Career AI'], ['opportunities.html', 'opps', 'Opportunities'],
  ['india-map.html', 'map', 'India Map'], ['skill-passport.html', 'passport', 'Passport'],
  ['dashboard.html', 'dashboard', 'Dashboard'], ['feedback.html', 'feedback', 'Feedback']
];
const PAGE = document.body.dataset.page; 

function buildLayout() {
  const user = store.get('user', null);

 
  const header = $('#site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = `
      <div class="container nav">
        <a class="logo" href="index.html"><strong>Munnade</strong></a>
        <ul class="nav-links" id="navLinks">
          ${NAV.map(([file, key, label]) => `<li><a href="${file}" class="${key === PAGE ? 'active' : ''}">${label}</a></li>`).join('')}
        </ul>
        <div class="nav-tools">
          <button class="btn btn-ghost btn-small" id="loginBtn">${user ? '👋 ' + esc(user.name.split(' ')[0]) : 'Sign in'}</button>
          <button class="icon-btn" id="themeBtn" title="Switch light / dark" aria-label="Switch theme">🌓</button>
          <button class="icon-btn burger" id="burger" aria-label="Open menu">☰</button>
        </div>
      </div>`;
  }


  const footer = $('#site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container">
        <strong>Munnade </strong> &nbsp;·&nbsp; Your potential. Your opportunities. Your future.
        <div class="links">${NAV.map(([f, , l]) => `<a href="${f}">${l}</a>`).join('')}<a href="closing.html">Our Story</a></div>
        <p class="disclaimer">MADE WITH LOVE BY PREETHAM HB .</p>
      </div>`;
  }


  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'loginModal';
  document.body.appendChild(modal);

  function renderModal() {
    const u = store.get('user', null);
    modal.innerHTML = u
      ? `<div class="modal"><h2>Hi, ${esc(u.name)} 👋</h2><p>You're signed in on this device. (Prototype account, stored only in your browser.)</p>
         <div class="row"><button class="btn btn-ghost" id="closeModal">Close</button><button class="btn btn-danger" id="logout">Sign out</button></div></div>`
      : `<form class="modal" id="loginForm"><h2>Welcome to UnlockED</h2><p>Tell us your name so we can personalise your dashboard. This is a prototype account, stored only in your browser.</p>
         <div class="field"><label for="uname">Your name</label><input id="uname" required maxlength="40" placeholder="e.g. Asha"></div>
         <div class="field"><label for="uemail">Email (optional)</label><input id="uemail" type="email" placeholder="you@example.com"></div>
         <div class="row"><button type="button" class="btn btn-ghost" id="closeModal">Not now</button><button class="btn btn-primary">Sign in</button></div></form>`;
  }
  renderModal();

  const openModal = () => { renderModal(); modal.classList.add('open'); };
  const closeModal = () => modal.classList.remove('open');

  document.addEventListener('click', e => {
    if (e.target.closest('#loginBtn')) openModal();
    if (e.target.closest('#closeModal') || e.target === modal) closeModal();
    
    if (e.target.closest('#logout')) { localStorage.removeItem('unlocked_user'); closeModal(); toast('Signed out. See you soon!'); setTimeout(() => location.reload(), 700); }

    if (e.target.closest('#burger')) $('#navLinks').classList.toggle('open');
  });
  document.addEventListener('submit', e => {
    if (e.target.id === 'loginForm') {
      e.preventDefault(); 
      store.set('user', { name: $('#uname').value.trim(), email: $('#uemail').value.trim() });
      toast('Welcome aboard! 🎉'); confetti(); closeModal();
      setTimeout(() => location.reload(), 900);
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

 
  document.documentElement.dataset.theme = store.get('theme', 'light');
  document.addEventListener('click', e => {
    if (e.target.closest('#themeBtn')) {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      store.set('theme', next);
    }
  });
}


let revealObserver;
function observeReveals(root = document) {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
  }
  $$('.reveal:not(.visible)', root).forEach((el, i) => {
    el.style.setProperty('--d', (i % 6) * 0.08 + 's'); 
    revealObserver.observe(el);
  });
}


  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.tilt');
    $$('.tilt').forEach(c => { if (c !== card) c.style.transform = ''; });
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${(-y * 7).toFixed(1)}deg) rotateY(${(x * 9).toFixed(1)}deg) translateY(-4px)`;
  });
  document.addEventListener('mouseleave', () => $$('.tilt').forEach(c => c.style.transform = ''));
}


function enableRipple() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    btn.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  });
}


function enablePageTransitions() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || e.ctrlKey || e.metaKey) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => (location.href = href), 240);
  });
}


function countUp(el, target) {
  const start = performance.now(), duration = 1400;
  (function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))); 
    if (t < 1) requestAnimationFrame(frame);
  })(start);
}


function renderTeam() {
  const mount = $('#team-mount');
  if (!mount) return;
  mount.innerHTML = TEAM.map(m => {
    const initials = m.placeholder ? '＋' : m.name.split(' ').map(w => w[0]).join('');
    return `<div class="card team-card tilt reveal center ${m.placeholder ? 'placeholder' : ''}">
      <div class="avatar">${initials}</div><h3>${esc(m.name)}</h3><p>${m.placeholder ? 'Team member' : 'FAB-FOUR'}</p></div>`;
  }).join('');
  observeReveals(mount);
}


function trackVisit() {
  const today = new Date().toISOString().slice(0, 10);
  const days = store.get('visits', []);
  if (!days.includes(today)) { days.push(today); store.set('visits', days.slice(-60)); }
  if (PAGE !== 'dashboard') store.set('last', { title: document.title.replace(' | UnlockED', ''), url: location.pathname.split('/').pop() || 'index.html' });
}
function visitStreak() {
  const days = new Set(store.get('visits', []));
  let streak = 0; const d = new Date();
  while (days.has(d.toISOString().slice(0, 10))) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}



function initHome() {
 
  const el = $('#typed');
  if (el) {
    const words = ['learn.', 'grow.', 'explore.', 'unlock.'];
    let w = 0, c = 0, deleting = false;
    (function tick() {
      const word = words[w];
      el.textContent = word.slice(0, c);
      if (!deleting && c < word.length) { c++; setTimeout(tick, 110); }
      else if (!deleting) { deleting = true; setTimeout(tick, 1400); }
      else if (c > 0) { c--; setTimeout(tick, 55); }
      else { deleting = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
    })();
  }
 
  const numbers = { careers: CAREERS.length, opps: OPPS.length, subjects: SUBJECTS.length, regions: REGIONS.length };
  $$('.count').forEach(c => {
    const obs = new IntersectionObserver(([en]) => { if (en.isIntersecting) { countUp(c, numbers[c.dataset.key]); obs.disconnect(); } });
    obs.observe(c);
  });
}



function initLearn() {
  const app = $('#hub-app');
  let lang = store.get('lang', 'en');
  let subjectId = store.get('subject', SUBJECTS[0].id);
  let quiz = null;
  const t = key => (I18N[lang] && I18N[lang][key]) || I18N.en[key]; 

  const subject = () => SUBJECTS.find(s => s.id === subjectId);
  const plans = () => store.get('plans', {});         
  const scores = () => store.get('quizBest', {});   
  function render() {
    const s = subject();
    const plan = plans()[s.id];
    const best = scores()[s.id];
    app.innerHTML = `
      <div class="field" style="max-width:220px"><label for="langSel">🌐 ${t('lang')}</label>
        <select id="langSel"><option value="en">English</option><option value="hi">हिन्दी</option><option value="kn">ಕನ್ನಡ</option></select></div>

      <h2>${t('pick')}</h2>
      <div class="grid grid-3" id="subjectGrid">
        ${SUBJECTS.map(x => `<button class="card subject-card tilt ${x.id === subjectId ? 'active' : ''}" data-id="${x.id}">
          <span class="icon">${x.icon}</span><h3>${x.name}</h3><p>${x.desc}</p></button>`).join('')}
      </div>

      <div class="grid grid-2" style="margin-top:1.6rem">
        <div class="card fade-in">
          <h3>${s.icon} ${s.name}</h3>
          <p><strong>${t('topics')}:</strong></p>
          <ol style="padding-left:1.2rem;color:var(--muted)">${s.topics.map(x => `<li>${x}</li>`).join('')}</ol>
          <h3 style="margin-top:1rem">📚 ${t('resources')}</h3>
          ${s.res.map(([n, u]) => `<div class="list-item"><span>${n}</span><a class="btn btn-ghost btn-small" href="${u}" target="_blank" rel="noopener">Open ↗</a></div>`).join('')}
        </div>

        <div class="card fade-in">
          <h3>🗓️ ${t('plan')}</h3>
          <form id="planForm" class="row">
            <div class="field"><label>${t('hours')}</label><input type="number" id="pHours" min="1" max="8" value="2"></div>
            <div class="field"><label>${t('weeks')}</label><select id="pWeeks"><option>2</option><option selected>4</option><option>6</option><option>8</option></select></div>
          </form>
          <button class="btn btn-primary" id="makePlan">${t('make')}</button>
          <div id="planOut" style="margin-top:1rem">${plan ? planHTML(plan) : ''}</div>
        </div>
      </div>

      <div class="card fade-in" style="margin-top:1.2rem">
        <h3>🎯 ${t('practice')} ${best !== undefined ? `<span class="tag alt">${t('best')}: ${best}/${s.quiz.length}</span>` : ''}</h3>
        <div id="quizBox">${quizHTML()}</div>
      </div>`;
    $('#langSel').value = lang;
    fillBars(app);
    observeReveals(app);
  }

 
  function makePlan(weeks, hours) {
    const topics = subject().topics, n = topics.length, list = [];
    for (let i = 0; i < weeks; i++) {
      const from = Math.floor(i * n / weeks), to = Math.floor((i + 1) * n / weeks);
      let chosen = topics.slice(from, to);
      if (!chosen.length) chosen = ['Revision & practice quiz'];
      list.push({ title: 'Week ' + (i + 1), topics: chosen, hours: hours * 6, done: false });
    }
    return { weeks: list };
  }
  function planHTML(plan) {
    const done = plan.weeks.filter(w => w.done).length, pct = Math.round(done / plan.weeks.length * 100);
    return `<strong>${t('yourplan')}: ${pct}%</strong>
      <div class="progress" style="margin:.4rem 0 .8rem"><div class="bar" data-w="${pct}"></div></div>
      ${plan.weeks.map((w, i) => `<label class="week ${w.done ? 'done' : ''}"><input type="checkbox" data-week="${i}" ${w.done ? 'checked' : ''}>
        <span><b>${w.title}</b> · ~${w.hours} hrs<p>${w.topics.join(' · ')}</p></span></label>`).join('')}`;
  }

  
  function quizHTML() {
    const s = subject();
    if (!quiz) return `<p>${s.quiz.length} quick questions. No pressure, it's just practice.</p><button class="btn btn-primary" id="startQuiz">${t('start')}</button>`;
    if (quiz.i >= s.quiz.length) {
      const great = quiz.score >= s.quiz.length - 1;
      return `<div class="center"><span style="font-size:3rem">${great ? '🎉' : '💪'}</span>
        <h3>${quiz.score} / ${s.quiz.length}</h3><p>${great ? 'Brilliant work! Keep that momentum going.' : 'Good effort. Every attempt makes you stronger.'}</p>
        <button class="btn btn-primary" id="startQuiz">${t('retry')}</button></div>`;
    }
    const q = s.quiz[quiz.i];
    return `<p><strong>Q${quiz.i + 1}/${s.quiz.length}.</strong> ${q.q}</p>
      ${q.o.map((o, k) => `<button class="quiz-opt" data-k="${k}">${esc(o)}</button>`).join('')}
      <button class="btn btn-ghost hidden" id="nextQ">${quiz.i === s.quiz.length - 1 ? t('finish') : t('next')} →</button>`;
  }

 
  
  app.addEventListener('click', e => {
    const card = e.target.closest('.subject-card');
    if (card) { subjectId = card.dataset.id; store.set('subject', subjectId); quiz = null; render(); return; }

    if (e.target.id === 'makePlan') {
      const hours = Math.min(8, Math.max(1, +$('#pHours').value || 2));
      const weeks = +$('#pWeeks').value;
      const all = plans(); all[subjectId] = makePlan(weeks, hours); store.set('plans', all);
      $('#planOut').innerHTML = planHTML(all[subjectId]); fillBars(app);
      toast('Study plan ready ✨');
    }
    if (e.target.id === 'startQuiz') { quiz = { i: 0, score: 0 }; $('#quizBox').innerHTML = quizHTML(); }

    const opt = e.target.closest('.quiz-opt');
    if (opt && !opt.disabled) {
      const q = subject().quiz[quiz.i], picked = +opt.dataset.k;
      $$('.quiz-opt').forEach((b, k) => { b.disabled = true; if (k === q.a) b.classList.add('correct'); });
      if (picked === q.a) quiz.score++; else opt.classList.add('wrong');
      $('#nextQ').classList.remove('hidden');
    }
    if (e.target.id === 'nextQ') {
      quiz.i++;
      const s = subject();
      if (quiz.i >= s.quiz.length) {
        const best = scores();
        if (best[s.id] === undefined || quiz.score > best[s.id]) { best[s.id] = quiz.score; store.set('quizBest', best); }
        if (quiz.score >= s.quiz.length - 1) confetti();
      }
      $('#quizBox').innerHTML = quizHTML();
    }
  });
  app.addEventListener('change', e => {
    if (e.target.id === 'langSel') { lang = e.target.value; store.set('lang', lang); render(); }
    if (e.target.dataset.week !== undefined) {            
      const all = plans(); all[subjectId].weeks[+e.target.dataset.week].done = e.target.checked; store.set('plans', all);
      $('#planOut').innerHTML = planHTML(all[subjectId]); fillBars(app);
      if (all[subjectId].weeks.every(w => w.done)) { confetti(); toast('Plan complete! 🏆'); }
    }
  });
  render();
}



function initCareer() {
  const app = $('#career-app');
  const saved = store.get('careerProfile', { edu: '12', pref: 'any', interests: [], skills: '' });
  let chosen = new Set(saved.interests);

  app.innerHTML = `
    <form class="card" id="careerForm" novalidate>
      <h3>Tell us a little about you</h3>
      <div class="row">
        <div class="field"><label for="edu">Where are you in your learning journey?</label>
          <select id="edu">${EDU_LEVELS.map(([v, l]) => `<option value="${v}" ${v === saved.edu ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
        <div class="field"><label for="pref">What kind of work feels right?</label>
          <select id="pref">${PREFS.map(([v, l]) => `<option value="${v}" ${v === saved.pref ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      </div>
      <div class="field"><label>What are you curious about? (pick one or more)</label>
        <div class="chips" id="interestChips">${INTERESTS.map(([k, l]) => `<button type="button" class="chip ${chosen.has(k) ? 'active' : ''}" data-k="${k}">${l}</button>`).join('')}</div></div>
      <div class="field"><label for="skills">Skills you already have (optional, comma separated)</label>
        <input id="skills" placeholder="e.g. excel, drawing, writing, python" value="${esc(saved.skills)}"></div>
      <p class="error" id="careerErr"></p>
      <button class="btn btn-primary">✨ Show my career directions</button>
    </form>
    <div id="careerOut" style="margin-top:1.6rem"></div>`;

  
  $('#interestChips').addEventListener('click', e => {
    const chip = e.target.closest('.chip'); if (!chip) return;
    chip.classList.toggle('active');
    chip.classList.contains('active') ? chosen.add(chip.dataset.k) : chosen.delete(chip.dataset.k);
  });

  $('#careerForm').addEventListener('submit', e => {
    e.preventDefault();
    if (chosen.size === 0) { $('#careerErr').textContent = 'Please pick at least one interest, it helps us a lot 🙂'; return; }
    $('#careerErr').textContent = '';
    const profile = { edu: $('#edu').value, pref: $('#pref').value, interests: [...chosen], skills: $('#skills').value };
    store.set('careerProfile', profile);

  
    $('#careerOut').innerHTML = '<div class="thinking"><i></i><i></i><i></i></div><p class="center">Exploring directions for you…</p>';
    setTimeout(() => showResults(profile), 1300);
  });

  function score(career, p) {
    const userRank = EDU_LEVELS.find(l => l[0] === p.edu)[2];
    const overlap = career.tags.filter(t => p.interests.includes(t));
    const tokens = p.skills.toLowerCase().split(/[,\s]+/).filter(w => w.length >= 3);
    const skillHits = tokens.filter(tok => career.skills.some(s => s.includes(tok))).length;
    let pts = overlap.length * 3 + (p.pref === 'any' || career.pref.includes(p.pref) ? 2 : 0) + Math.min(skillHits, 3) * 1.5;
    const needsMore = userRank < career.minEdu;
    if (needsMore) pts -= 4;
    return { career, pts, overlap, needsMore, pct: Math.max(25, Math.min(97, Math.round(35 + pts * 6.5))) };
  }

  function showResults(p) {
    const top = CAREERS.map(c => score(c, p)).sort((a, b) => b.pts - a.pts).slice(0, 5);
    store.set('careerResults', top.map(r => ({ id: r.career.id, pct: r.pct })));
    const label = k => INTERESTS.find(i => i[0] === k)[1].replace(/^\S+\s/, '');
    $('#careerOut').innerHTML = `<h2>Directions worth exploring</h2>
      <p>These are suggestions to explore, not decisions. You stay in charge of your future.</p>
      <div class="grid grid-2">${top.map((r, i) => {
        const c = r.career;
        return `<div class="card reveal tilt">
          <div class="match"><div class="ring" data-label="${r.pct}%" style="--p:${r.pct}"></div>
            <div><span class="tag">${c.group}</span><h3>${c.icon} ${c.title}</h3></div></div>
          <p style="margin-top:.8rem">${r.overlap.length ? 'Fits your interest in ' + r.overlap.map(label).join(', ').toLowerCase() + '.' : 'A different direction you might not have considered.'}
            ${r.needsMore ? ' <strong>Needs a bit more qualification, and the path below shows how to get there.</strong>' : ''}</p>
          <details><summary>Skills you may need</summary><ul>${c.skills.map(s => `<li>${s}</li>`).join('')}</ul></details>
          <details><summary>A possible learning path</summary><ol>${c.path.map(s => `<li>${s}</li>`).join('')}</ol></details>
          <details><summary>Useful resources</summary><ul>${c.res.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n} ↗</a></li>`).join('')}</ul></details>
        </div>`; }).join('')}</div>`;
    observeReveals($('#careerOut'));
    toast('Here are your career directions 🧭');
  }

 
  if (store.get('careerResults', []).length) $('#careerOut').innerHTML = '<p class="center">👆 Update your answers and press the button to refresh your suggestions.</p>';
}



function initOpps() {
  const app = $('#opps-app');
  const types = [...new Set(OPPS.map(o => o.type))];
  app.innerHTML = `
    <p class="disclaimer">ℹ️ Details are short summaries for this prototype. Always confirm eligibility, dates and fees on the <strong>official website</strong> before applying.</p>
    <div class="card" style="margin:1rem 0"><div class="row">
      <div class="field"><label for="q">Search</label><input id="q" placeholder="e.g. scholarship, bank, free…"></div>
      <div class="field"><label for="ftype">Type</label><select id="ftype"><option value="">All types</option>${types.map(t => `<option>${t}</option>`).join('')}</select></div>
      <div class="field"><label for="flevel">My qualification</label><select id="flevel"><option value="">Any</option>${EDU_LEVELS.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select></div>
      <div class="field"><label>&nbsp;</label><label style="font-weight:500"><input type="checkbox" id="onlySaved" style="width:auto"> ♥ Saved only</label></div>
    </div></div>
    <p id="count"></p><div class="grid grid-2" id="oppList"></div>`;

  const savedIds = () => store.get('savedOpps', []);

  function draw() {
    const q = $('#q').value.toLowerCase().trim(), type = $('#ftype').value, level = $('#flevel').value, onlySaved = $('#onlySaved').checked;
    const list = OPPS.filter(o =>
      (!type || o.type === type) && (!level || o.levels.includes(level)) &&
      (!onlySaved || savedIds().includes(o.id)) &&
      (!q || (o.title + o.org + o.type + o.elig).toLowerCase().includes(q)));
    $('#count').textContent = `Showing ${list.length} of ${OPPS.length} opportunities`;
    $('#oppList').innerHTML = list.length ? list.map(o => `
      <div class="card reveal">
        <span class="tag">${o.type}</span><span class="tag alt">${o.org}</span>
        <h3 style="margin-top:.6rem">${o.title}</h3>
        <p><strong>Who can apply:</strong> ${o.elig}</p>
        <p><strong>How to apply:</strong> ${o.apply}</p>
        <p><strong>Deadline:</strong> ${o.deadline}</p>
        <div class="row" style="gap:.5rem">
          <a class="btn btn-primary btn-small" href="${o.url}" target="_blank" rel="noopener">Official source ↗</a>
          <button class="btn btn-ghost btn-small" data-save="${o.id}">${savedIds().includes(o.id) ? '♥ Saved' : '♡ Save'}</button>
        </div></div>`).join('')
      : `<div class="empty card" style="grid-column:1/-1"><span class="icon">🔍</span>Nothing matches yet. Try clearing a filter, because the right door may be one search away.</div>`;
    observeReveals($('#oppList'));
  }
  app.addEventListener('input', draw);
  app.addEventListener('change', draw);
  app.addEventListener('click', e => {
    const b = e.target.closest('[data-save]'); if (!b) return;
    let ids = savedIds();
    if (ids.includes(b.dataset.save)) { ids = ids.filter(i => i !== b.dataset.save); toast('Removed from saved'); }
    else { ids.push(b.dataset.save); toast('Saved to your dashboard ♥'); }
    store.set('savedOpps', ids); draw();
  });
  draw();
}



function initMap() {
  const app = $('#map-app');
  let lens = 'lit';       
  let selected = null;

  const tier = lit => lit < 70 ? 0 : lit < 80 ? 1 : 2;
  const TIERS = [
    { colour: '#ef6a5b', label: 'Awareness & access drive', text: 'Literacy here was below the national average in Census 2011. Awareness drives, scholarships, bridge courses and regional-language learning tools could make the biggest difference.' },
    { colour: '#f5a524', label: 'Skills & scholarships', text: 'Close to the national picture. Skill-development programmes, scholarships and career guidance can help turn education into opportunity.' },
    { colour: '#14b8a6', label: 'Advanced pathways & jobs', text: 'Strong literacy levels. The focus can shift to education quality, higher-education access, jobs and skills that match them.' }
  ];
  
  const heat = lit => `hsl(${Math.round(20 + Math.min(Math.max((lit - 60) / 35, 0), 1) * 140)} 65% 45%)`;
  const ranked = [...REGIONS].sort((a, b) => b.lit - a.lit);

  app.innerHTML = `
    <div class="tabs" id="lensTabs">
      <button class="tab active" data-lens="lit">📚 Education (literacy)</button>
      <button class="tab" data-lens="focus">🌱 Opportunity focus</button>
    </div>
    <div class="map-layout">
      <div class="card"><div class="map-grid" id="tiles"></div><div class="legend" id="legend"></div>
        <p style="font-size:.8rem;margin:.8rem 0 0">Each tile is one State or Union Territory, arranged roughly like India. Literacy is approximate, from Census 2011.</p></div>
      <div class="card" id="detail"><div class="empty"><span class="icon">👆</span>Tap any state or Union Territory to explore.</div></div>
    </div>`;

  function paint() {
    $('#tiles').innerHTML = REGIONS.map((r, i) => `<button class="tile ${selected === r.id ? 'selected' : ''}" data-id="${r.id}" title="${r.n}"
      style="grid-column:${r.c + 1};grid-row:${r.r + 1};--tc:${lens === 'lit' ? heat(r.lit) : TIERS[tier(r.lit)].colour};animation-delay:${i * 0.03}s">${r.id}</button>`).join('');
    $('#legend').innerHTML = lens === 'lit'
      ? `<span><i style="background:${heat(60)}"></i>Lower literacy</span><span><i style="background:${heat(78)}"></i>Mid</span><span><i style="background:${heat(94)}"></i>Higher literacy</span>`
      : TIERS.map(t => `<span><i style="background:${t.colour}"></i>${t.label}</span>`).join('');
  }

  function showDetail(id) {
    const r = REGIONS.find(x => x.id === id), rank = ranked.indexOf(r) + 1, t = TIERS[tier(r.lit)];
    const diff = (r.lit - NATIONAL_LIT).toFixed(1);
    $('#detail').innerHTML = `<div class="fade-in">
      <span class="tag">${r.ut ? 'Union Territory' : 'State'}</span><h2>${r.n}</h2>
      <p><strong>Literacy (Census 2011, approx.):</strong> ${r.lit}%</p>
      <div class="progress"><div class="bar" data-w="${r.lit}"></div></div>
      <p style="margin-top:.6rem">Rank <strong>#${rank}</strong> of ${REGIONS.length} · ${diff >= 0 ? '+' : ''}${diff} points vs national average (${NATIONAL_LIT}%)</p>
      <div class="quote" style="border-color:${t.colour}"><span class="tag alt">${t.label}</span><br>${t.text}</div>
      <p style="font-size:.85rem">This note is a simple prototype insight based on one indicator. Real planning needs many more.</p>
      <a class="btn btn-primary btn-small" href="opportunities.html">Find opportunities →</a></div>`;
    fillBars($('#detail'));
  }

  $('#tiles').addEventListener('click', e => {
    const tile = e.target.closest('.tile'); if (!tile) return;
    selected = tile.dataset.id; paint(); showDetail(selected);
  });
  $('#lensTabs').addEventListener('click', e => {
    const tab = e.target.closest('.tab'); if (!tab) return;
    $$('.tab', app).forEach(x => x.classList.toggle('active', x === tab));
    lens = tab.dataset.lens; paint();
  });
  paint();
}



function initPassport() {
  const app = $('#passport-app');
  const blank = { name: '', headline: '', skills: [], projects: [], certs: [], wins: [] };
  let data = Object.assign({}, blank, store.get('passport', {}));
  if (!data.name) data.name = (store.get('user', {}) || {}).name || '';
  const LEVELS = ['Beginner', 'Learning', 'Confident', 'Expert'];
  const save = () => store.set('passport', data);
  const strength = () => Math.min(100, data.skills.length * 8 + data.projects.length * 12 + data.certs.length * 10 + data.wins.length * 8);

  app.innerHTML = `
    <div class="grid grid-2">
      <div class="no-print">
        <div class="card"><h3>👤 About you</h3>
          <div class="field"><label for="pName">Name</label><input id="pName" maxlength="50" value="${esc(data.name)}" placeholder="Your name"></div>
          <div class="field"><label for="pHead">One-line headline</label><input id="pHead" maxlength="90" value="${esc(data.headline)}" placeholder="e.g. Curious learner who loves building things"></div></div>
        <div class="tabs" style="margin-top:1rem" id="addTabs">
          <button class="tab active" data-t="skills">⚡ Skill</button><button class="tab" data-t="projects">🛠️ Project</button>
          <button class="tab" data-t="certs">📜 Certificate</button><button class="tab" data-t="wins">🏆 Achievement</button></div>
        <form class="card" id="addForm"></form>
      </div>
      <div>
        <div class="passport" id="passportCard"></div>
        <div class="row no-print" style="margin-top:1rem">
          <button class="btn btn-primary" id="printBtn">🖨️ Print / Save as PDF</button>
          <button class="btn btn-ghost" id="dlBtn">⬇️ Download text</button></div>
      </div>
    </div>`;

  let tab = 'skills';
  const forms = {
    skills: `<h3>Add a skill</h3><div class="field"><label>Skill</label><input id="f1" required maxlength="40" placeholder="e.g. Video editing"></div>
             <div class="field"><label>How would you describe your level?</label><select id="f2">${LEVELS.map((l, i) => `<option value="${i}">${l}</option>`).join('')}</select></div>`,
    projects: `<h3>Add a project</h3><div class="field"><label>Project name</label><input id="f1" required maxlength="60"></div>
             <div class="field"><label>What did you do or learn?</label><textarea id="f2" maxlength="300"></textarea></div>
             <div class="field"><label>Link (optional)</label><input id="f3" type="url" placeholder="https://"></div>`,
    certs: `<h3>Add a certificate</h3><div class="field"><label>Certificate / course</label><input id="f1" required maxlength="70"></div>
             <div class="row"><div class="field"><label>Issued by</label><input id="f2" maxlength="50"></div><div class="field"><label>Year</label><input id="f3" type="number" min="1990" max="2100" placeholder="2026"></div></div>`,
    wins: `<h3>Add an achievement</h3><div class="field"><label>What did you achieve?</label><textarea id="f1" required maxlength="200" placeholder="e.g. Won 2nd place in the school science fair"></textarea></div>`
  };
  const drawForm = () => { $('#addForm').innerHTML = forms[tab] + '<button class="btn btn-primary">＋ Add to my passport</button>'; };

  function drawCard() {
    const pct = strength();
    $('#passportCard').innerHTML = `
      <p style="margin:0;font-size:.8rem;letter-spacing:.12em">UNLOCKED · SKILL PASSPORT</p>
      <h2 style="margin:.3rem 0">${esc(data.name || 'Your name')}</h2>
      <p>${esc(data.headline || 'Add a headline to tell your story.')}</p>
      <p><strong>Passport strength: ${pct}%</strong></p>
      <div class="progress" style="background:rgba(255,255,255,.25)"><div class="bar" data-w="${pct}" style="background:#fff"></div></div>
      ${section('⚡ Skills', 'skills', s => `<span class="pill">${esc(s.n)} · ${LEVELS[s.l]}</span>`, true)}
      ${section('🛠️ Projects', 'projects', p => `<div><strong>${esc(p.n)}</strong>${p.link ? ` <a href="${esc(p.link)}" target="_blank" rel="noopener" style="color:#ffe9a8">↗</a>` : ''}<br><small>${esc(p.d)}</small></div>`)}
      ${section('📜 Certificates', 'certs', c => `<div>${esc(c.n)}${c.by ? ' · ' + esc(c.by) : ''}${c.y ? ' · ' + esc(c.y) : ''}</div>`)}
      ${section('🏆 Achievements', 'wins', w => `<div>${esc(w.t)}</div>`)}`;
    fillBars($('#passportCard'));
  }
 
  function section(title, key, fmt, inline) {
    if (!data[key].length) return `<p style="margin-top:1rem"><strong>${title}</strong><br><small>Nothing yet. Add your first one!</small></p>`;
    return `<p style="margin:1rem 0 .3rem"><strong>${title}</strong></p>` +
      data[key].map((item, i) => `<div style="display:${inline ? 'inline-flex' : 'flex'};gap:.4rem;align-items:flex-start;margin:.2rem .3rem .2rem 0">
        ${fmt(item)}<button class="no-print" data-del="${key}:${i}" style="background:none;border:0;color:#fff;cursor:pointer;opacity:.7" title="Remove">✕</button></div>`).join('');
  }

  $('#addTabs').addEventListener('click', e => {
    const b = e.target.closest('.tab'); if (!b) return;
    tab = b.dataset.t; $$('#addTabs .tab').forEach(x => x.classList.toggle('active', x === b)); drawForm();
  });
  $('#addForm').addEventListener('submit', e => {
    e.preventDefault();
    const v = id => ($('#' + id) ? $('#' + id).value.trim() : '');
    if (tab === 'skills') data.skills.push({ n: v('f1'), l: +v('f2') });
    if (tab === 'projects') data.projects.push({ n: v('f1'), d: v('f2'), link: v('f3') });
    if (tab === 'certs') data.certs.push({ n: v('f1'), by: v('f2'), y: v('f3') });
    if (tab === 'wins') data.wins.push({ t: v('f1') });
    save(); drawForm(); drawCard(); toast('Added to your passport ✅');
    if (strength() >= 100) confetti();
  });
  ['pName', 'pHead'].forEach(id => $('#' + id).addEventListener('input', () => {
    data.name = $('#pName').value; data.headline = $('#pHead').value; save(); drawCard();
  }));
  $('#passportCard').addEventListener('click', e => {
    const d = e.target.closest('[data-del]'); if (!d) return;
    const [key, i] = d.dataset.del.split(':'); data[key].splice(+i, 1); save(); drawCard();
  });
  $('#printBtn').addEventListener('click', () => window.print());
  $('#dlBtn').addEventListener('click', () => {
   
    const lines = [`UnlockED Skill Passport`, `Name: ${data.name}`, `${data.headline}`, '',
      'SKILLS', ...data.skills.map(s => `- ${s.n} (${LEVELS[s.l]})`), '',
      'PROJECTS', ...data.projects.map(p => `- ${p.n}: ${p.d} ${p.link}`), '',
      'CERTIFICATES', ...data.certs.map(c => `- ${c.n} ${c.by} ${c.y}`), '',
      'ACHIEVEMENTS', ...data.wins.map(w => `- ${w.t}`)];
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    a.download = 'my-skill-passport.txt'; a.click();
  });
  drawForm(); drawCard();
}



function initDashboard() {
  const app = $('#dash-app');
  const user = store.get('user', null);
  const plans = store.get('plans', {}), bests = store.get('quizBest', {});
  const savedIds = store.get('savedOpps', []), careers = store.get('careerResults', []);
  const pass = store.get('passport', { skills: [], projects: [], certs: [], wins: [] });
  const last = store.get('last', null);
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const trackIds = [...new Set([...Object.keys(plans), ...Object.keys(bests)])];
  const strength = Math.min(100, (pass.skills || []).length * 8 + (pass.projects || []).length * 12 + (pass.certs || []).length * 10 + (pass.wins || []).length * 8);

  app.innerHTML = `
    <div class="card" style="margin-bottom:1.2rem"><div class="row" style="align-items:center">
      <div><h2 style="margin:0">${greet}${user ? ', ' + esc(user.name.split(' ')[0]) : ''}! 👋</h2>
        <p style="margin:.3rem 0 0">${user ? 'Ready to pick up where you left off?' : 'Sign in (top right) to personalise your space. It takes 5 seconds.'}</p></div>
      <div class="center"><span class="stat"><b>🔥 ${visitStreak()}</b></span><small>day streak</small></div>
      ${last ? `<div><a class="btn btn-primary" href="${last.url}">Continue: ${esc(last.title)} →</a></div>` : ''}
    </div></div>

    <div class="grid grid-2">
      <div class="card reveal"><h3>📚 Learning tracks</h3>
        ${trackIds.length ? trackIds.map(id => {
          const s = SUBJECTS.find(x => x.id === id); if (!s) return '';
          const p = plans[id]; const pct = p ? Math.round(p.weeks.filter(w => w.done).length / p.weeks.length * 100) : 0;
          return `<div style="margin:.8rem 0"><div class="list-item" style="border:0;padding:0"><strong>${s.icon} ${s.name}</strong><small>${bests[id] !== undefined ? 'Quiz best ' + bests[id] + '/' + s.quiz.length : 'No quiz yet'}</small></div>
          <div class="progress"><div class="bar" data-w="${pct}"></div></div><small>${p ? pct + '% of plan done' : 'No plan yet'}</small></div>`;
        }).join('') : `<div class="empty"><span class="icon">🌱</span>No tracks yet.<br><a href="learning-hub.html">Start in the Learning Hub →</a></div>`}</div>

      <div class="card reveal"><h3>♥ Saved opportunities</h3>
        ${savedIds.length ? savedIds.map(id => { const o = OPPS.find(x => x.id === id); return o ? `<div class="list-item"><div><strong>${o.title}</strong><p>${o.type} · ${o.org}</p></div><a class="btn btn-ghost btn-small" href="${o.url}" target="_blank" rel="noopener">Open ↗</a></div>` : ''; }).join('')
          : `<div class="empty"><span class="icon">🎯</span>Nothing saved yet.<br><a href="opportunities.html">Explore opportunities →</a></div>`}</div>

      <div class="card reveal"><h3>🧭 Career suggestions</h3>
        ${careers.length ? careers.slice(0, 3).map(r => { const c = CAREERS.find(x => x.id === r.id); return `<div class="list-item"><strong>${c.icon} ${c.title}</strong><span class="tag">${r.pct}% fit</span></div>`; }).join('') + '<p style="margin-top:.6rem"><a href="career-navigator.html">Refresh my suggestions →</a></p>'
          : `<div class="empty"><span class="icon">🔭</span>No suggestions yet.<br><a href="career-navigator.html">Try the Career Navigator →</a></div>`}</div>

      <div class="card reveal"><h3>🛂 Skill Passport</h3>
        <div class="progress"><div class="bar" data-w="${strength}"></div></div>
        <p style="margin-top:.6rem">${strength}% strength · ${(pass.skills || []).length} skills · ${(pass.projects || []).length} projects · ${(pass.certs || []).length} certificates · ${(pass.wins || []).length} achievements</p>
        <a class="btn btn-ghost btn-small" href="skill-passport.html">Open passport →</a></div>
    </div>`;
  observeReveals(app); fillBars(app);
}



function initFeedback() {
  const app = $('#feedback-app');
  let rating = 0;
  app.innerHTML = `
    <div class="grid grid-2">
      <form class="card" id="fbForm" novalidate>
        <h3>Share your thoughts</h3>
        <div class="row"><div class="field"><label for="fbName">Name (optional)</label><input id="fbName" maxlength="40" value="${esc((store.get('user', {}) || {}).name || '')}"></div>
          <div class="field"><label for="fbCat">What is this about?</label><select id="fbCat"><option>Learning Hub</option><option>Career recommendations</option><option>Opportunities</option><option>Website design</option><option>Technical issue</option><option>New feature idea</option></select></div></div>
        <div class="field"><label>How was your experience?</label><div class="stars" id="stars">${[1, 2, 3, 4, 5].map(n => `<button type="button" class="star" data-n="${n}" aria-label="${n} stars">★</button>`).join('')}</div></div>
        <div class="field"><label for="fbMsg">Your feedback</label><textarea id="fbMsg" maxlength="600" placeholder="What worked? What could be better?"></textarea></div>
        <div class="field"><label for="fbIdea">A feature you'd love to see (optional)</label><textarea id="fbIdea" style="min-height:70px" maxlength="300"></textarea></div>
        <p class="error" id="fbErr"></p>
        <button class="btn btn-primary">Send feedback 💌</button>
      </form>
      <div class="card"><h3>Your recent feedback on this device</h3><div id="fbList"></div></div>
    </div>`;

  const stars = () => $$('.star').forEach(s => s.classList.toggle('on', +s.dataset.n <= rating));
  $('#stars').addEventListener('click', e => { const s = e.target.closest('.star'); if (s) { rating = +s.dataset.n; stars(); } });

  function list() {
    const items = store.get('feedback', []);
    $('#fbList').innerHTML = items.length ? items.slice().reverse().map((f, i) => `
      <div class="list-item"><div><strong>${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)}</strong> <span class="tag">${esc(f.cat)}</span>
        <p>${esc(f.msg)}</p>${f.idea ? `<p>💡 ${esc(f.idea)}</p>` : ''}<p><small>${esc(f.name || 'Anonymous')} · ${esc(f.date)}</small></p></div>
        <button class="btn btn-danger btn-small" data-del="${items.length - 1 - i}">Delete</button></div>`).join('')
      : `<div class="empty"><span class="icon">💬</span>Nothing yet. Your voice matters here.</div>`;
  }
  $('#fbList').addEventListener('click', e => {
    const d = e.target.closest('[data-del]'); if (!d) return;
    const items = store.get('feedback', []); items.splice(+d.dataset.del, 1); store.set('feedback', items); list();
  });
  $('#fbForm').addEventListener('submit', e => {
    e.preventDefault();
    const msg = $('#fbMsg').value.trim();
    if (!rating) { $('#fbErr').textContent = 'Please tap a star rating first ⭐'; return; }
    if (msg.length < 10) { $('#fbErr').textContent = 'Could you tell us a little more? (at least 10 characters)'; return; }
    $('#fbErr').textContent = '';
    const items = store.get('feedback', []);
    items.push({ name: $('#fbName').value.trim(), cat: $('#fbCat').value, rating, msg, idea: $('#fbIdea').value.trim(), date: new Date().toLocaleDateString('en-IN') });
    store.set('feedback', items);
    $('#fbForm').reset(); rating = 0; stars(); list();
    confetti(); toast('Thank you! Your feedback helps us grow 💜');
  });
  list();
}



function initClosing() {
  const btn = $('#replay');
  if (btn) btn.addEventListener('click', () => { confetti(); toast('UnlockED – your potential, your future ✨'); });
}


buildLayout();
trackVisit();
enableTilt();
enableRipple();
enablePageTransitions();
renderTeam();

const PAGE_STARTERS = {
  home: initHome, learn: initLearn, career: initCareer, opps: initOpps,
  map: initMap, passport: initPassport, dashboard: initDashboard,
  feedback: initFeedback, closing: initClosing
};
if (PAGE_STARTERS[PAGE]) PAGE_STARTERS[PAGE]();

observeReveals(); 
