/* ═══════════════════════════════════════════════════════════
   SHIFO KO'PRIGI — Doctor Panel  ·  App + AI Diagnosis Engine
   ═══════════════════════════════════════════════════════════ */

// ─── Disease Prediction Database ────────────────────────────
const DISEASE_DATABASE = [
  {
    id: 'arterial_gipertenziya',
    name: 'Arterial gipertenziya',
    emoji: '🫀',
    vitals: {
      systolic_gt: 140,
      diastolic_gt: 90,
    },
    symptoms: ['Bosh og\'rig\'i', 'Bosh aylanishi', 'Ko\'rish buzilishi', 'Ko\'krak og\'rig\'i'],
    symptomWeight: 0.3,
    vitalWeight: 0.7,
    baseScore: 30,
  },
  {
    id: 'gipertenziv_kriz',
    name: 'Gipertenziv kriz',
    emoji: '🚨',
    vitals: {
      systolic_gt: 180,
      diastolic_gt: 110,
    },
    symptoms: ['Bosh og\'rig\'i', 'Ko\'rish buzilishi', 'Ko\'krak og\'rig\'i', 'Ko\'ngil aynishi'],
    symptomWeight: 0.25,
    vitalWeight: 0.75,
    baseScore: 25,
  },
  {
    id: 'pnevmoniya',
    name: 'Pnevmoniya',
    emoji: '🫁',
    vitals: {
      temperature_gt: 38.0,
      spo2_lt: 96,
    },
    symptoms: ['Yo\'tal', 'Hansirash', 'Nafas qisilishi', 'Ko\'krak og\'rig\'i'],
    symptomWeight: 0.5,
    vitalWeight: 0.5,
    baseScore: 20,
  },
  {
    id: 'orvi_gripp',
    name: 'ORVI / Gripp',
    emoji: '🤒',
    vitals: {
      temperature_gt: 37.5,
    },
    symptoms: ['Yo\'tal', 'Tana og\'rig\'i', 'Kuchsizlik / Charchoq', 'Isitma', 'Bosh og\'rig\'i'],
    symptomWeight: 0.6,
    vitalWeight: 0.4,
    baseScore: 15,
  },
  {
    id: 'miokard_infarkti',
    name: 'Miokard infarkti xavfi',
    emoji: '💔',
    vitals: {
      pulse_gt: 100,
      systolic_gt: 140,
    },
    symptoms: ['Ko\'krak og\'rig\'i', 'Hansirash', 'Ko\'ngil aynishi', 'Hushdan ketish'],
    symptomWeight: 0.55,
    vitalWeight: 0.45,
    baseScore: 20,
  },
  {
    id: 'diabet_dekompensatsiya',
    name: 'Diabet dekompensatsiyasi',
    emoji: '💉',
    vitals: {
      glucose_gt: 11.0,
    },
    symptoms: ['Kuchsizlik / Charchoq', 'Bosh aylanishi', 'Ko\'ngil aynishi'],
    symptomWeight: 0.35,
    vitalWeight: 0.65,
    baseScore: 25,
  },
  {
    id: 'gipotoniya',
    name: 'Gipotoniya',
    emoji: '📉',
    vitals: {
      systolic_lt: 90,
    },
    symptoms: ['Bosh aylanishi', 'Kuchsizlik / Charchoq', 'Hushdan ketish'],
    symptomWeight: 0.4,
    vitalWeight: 0.6,
    baseScore: 25,
  },
  {
    id: 'bradikardiya',
    name: 'Bradikardiya',
    emoji: '🐢',
    vitals: {
      pulse_lt: 50,
    },
    symptoms: ['Bosh aylanishi', 'Hushdan ketish', 'Kuchsizlik / Charchoq'],
    symptomWeight: 0.3,
    vitalWeight: 0.7,
    baseScore: 30,
  },
  {
    id: 'taxikardiya',
    name: 'Taxikardiya',
    emoji: '⚡',
    vitals: {
      pulse_gt: 120,
    },
    symptoms: ['Hansirash', 'Ko\'krak og\'rig\'i', 'Bosh aylanishi'],
    symptomWeight: 0.35,
    vitalWeight: 0.65,
    baseScore: 25,
  },
  {
    id: 'bronxial_astma',
    name: 'Bronxial astma',
    emoji: '🌬️',
    vitals: {
      spo2_lt: 95,
    },
    symptoms: ['Hansirash', 'Nafas qisilishi', 'Yo\'tal'],
    symptomWeight: 0.6,
    vitalWeight: 0.4,
    baseScore: 15,
  },
  {
    id: 'respirator_insuffitsiyensiya',
    name: 'Respirator insuffitsiyensiya',
    emoji: '🔴',
    vitals: {
      spo2_lt: 92,
    },
    symptoms: ['Hansirash', 'Nafas qisilishi'],
    symptomWeight: 0.3,
    vitalWeight: 0.7,
    baseScore: 30,
  },
  {
    id: 'gastroenterit',
    name: 'Gastroenterit',
    emoji: '🤢',
    vitals: {
      temperature_gt: 37.5,
    },
    symptoms: ['Qorin og\'rig\'i', 'Ich ketishi', 'Qusish', 'Ko\'ngil aynishi', 'Isitma'],
    symptomWeight: 0.7,
    vitalWeight: 0.3,
    baseScore: 10,
  },
  {
    id: 'oshqozon_yarasi',
    name: 'Oshqozon yarasi',
    emoji: '🩹',
    vitals: {},
    symptoms: ['Qorin og\'rig\'i', 'Ko\'ngil aynishi', 'Qusish'],
    symptomWeight: 0.9,
    vitalWeight: 0.1,
    baseScore: 10,
  },
  {
    id: 'siydik_yollari_infeksiyasi',
    name: 'Siydik yo\'llari infeksiyasi',
    emoji: '🔥',
    vitals: {
      temperature_gt: 37.5,
    },
    symptoms: ['Siydik yo\'llari muammosi', 'Isitma', 'Qorin og\'rig\'i'],
    symptomWeight: 0.65,
    vitalWeight: 0.35,
    baseScore: 15,
  },
  {
    id: 'allergik_reaktsiya',
    name: 'Allergik reaktsiya',
    emoji: '🌸',
    vitals: {},
    symptoms: ['Teri toshmasi', 'Hansirash', 'Ko\'ngil aynishi', 'Nafas qisilishi'],
    symptomWeight: 0.85,
    vitalWeight: 0.15,
    baseScore: 10,
  },
  {
    id: 'artrit_artralgiya',
    name: 'Artrit / Artralgiya',
    emoji: '🦵',
    vitals: {},
    symptoms: ['Bo\'g\'im og\'rig\'i', 'Tana og\'rig\'i', 'Kuchsizlik / Charchoq'],
    symptomWeight: 0.9,
    vitalWeight: 0.1,
    baseScore: 10,
  },
];

// ─── Diagnosis Prediction Engine ────────────────────────────
class DiagnosisEngine {
  /**
   * Evaluate vitals and symptoms against all diseases.
   * Returns top predictions with confidence scores and reasoning.
   */
  predict(item) {
    const systolic = item.blood_pressure_systolic;
    const diastolic = item.blood_pressure_diastolic;
    const pulse = item.pulse;
    const temperature = item.temperature;
    const spo2 = item.spo2;
    const glucose = item.glucose;
    const symptoms = (item.symptoms || []).map((s) => s.name);

    const results = [];

    for (const disease of DISEASE_DATABASE) {
      let vitalScore = 0;
      let vitalMatches = 0;
      let vitalTotal = 0;
      const matchedVitals = [];
      const matchedSymptoms = [];

      // ── Evaluate vital conditions ──
      const v = disease.vitals;
      const vitalChecks = [];

      if (v.systolic_gt != null) vitalChecks.push({ check: systolic > v.systolic_gt, val: systolic, label: `Sistolik ${systolic}`, ref: `>${v.systolic_gt}` });
      if (v.systolic_lt != null) vitalChecks.push({ check: systolic != null && systolic < v.systolic_lt, val: systolic, label: `Sistolik ${systolic}`, ref: `<${v.systolic_lt}` });
      if (v.diastolic_gt != null) vitalChecks.push({ check: diastolic > v.diastolic_gt, val: diastolic, label: `Diastolik ${diastolic}`, ref: `>${v.diastolic_gt}` });
      if (v.pulse_gt != null) vitalChecks.push({ check: pulse > v.pulse_gt, val: pulse, label: `Puls ${pulse}`, ref: `>${v.pulse_gt}` });
      if (v.pulse_lt != null) vitalChecks.push({ check: pulse != null && pulse < v.pulse_lt, val: pulse, label: `Puls ${pulse}`, ref: `<${v.pulse_lt}` });
      if (v.temperature_gt != null) vitalChecks.push({ check: temperature > v.temperature_gt, val: temperature, label: `Harorat ${temperature}°C`, ref: `>${v.temperature_gt}` });
      if (v.spo2_lt != null) vitalChecks.push({ check: spo2 != null && spo2 < v.spo2_lt, val: spo2, label: `SpO₂ ${spo2}%`, ref: `<${v.spo2_lt}` });
      if (v.glucose_gt != null) vitalChecks.push({ check: glucose > v.glucose_gt, val: glucose, label: `Glyukoza ${glucose}`, ref: `>${v.glucose_gt}` });

      vitalTotal = vitalChecks.length;

      for (const vc of vitalChecks) {
        if (vc.check) {
          vitalMatches++;
          matchedVitals.push(vc.label);
        }
      }

      // If disease requires vitals but none match, skip
      if (vitalTotal > 0 && vitalMatches === 0) continue;

      vitalScore = vitalTotal > 0 ? (vitalMatches / vitalTotal) : 0;

      // ── Evaluate symptom conditions ──
      let symptomScore = 0;
      const totalSymptoms = disease.symptoms.length;

      for (const ds of disease.symptoms) {
        if (symptoms.includes(ds)) {
          matchedSymptoms.push(ds);
        }
      }

      symptomScore = totalSymptoms > 0 ? (matchedSymptoms.length / totalSymptoms) : 0;

      // Require at least one match overall
      if (matchedVitals.length === 0 && matchedSymptoms.length === 0) continue;

      // ── Calculate combined confidence ──
      const weightedScore =
        vitalScore * disease.vitalWeight +
        symptomScore * disease.symptomWeight;

      // bonus for having both vital and symptom matches
      const comboBonus = (matchedVitals.length > 0 && matchedSymptoms.length > 0) ? 8 : 0;

      // severity bonus from symptom severity
      let severityBonus = 0;
      for (const sym of (item.symptoms || [])) {
        if (matchedSymptoms.includes(sym.name) && sym.severity >= 7) {
          severityBonus += 3;
        }
      }

      const rawConfidence = disease.baseScore + weightedScore * 60 + comboBonus + Math.min(severityBonus, 10);
      const confidence = Math.min(Math.round(rawConfidence), 97); // cap at 97%

      if (confidence >= 15) {
        results.push({
          id: disease.id,
          name: disease.name,
          emoji: disease.emoji,
          confidence,
          matchedVitals,
          matchedSymptoms,
          basis: [...matchedVitals, ...matchedSymptoms].join(', '),
        });
      }
    }

    // Sort by confidence, return top 3
    results.sort((a, b) => b.confidence - a.confidence);
    return results.slice(0, 3);
  }
}

// ─── Demo Data ──────────────────────────────────────────────
const demoEncounters = [
  {
    encounter_id: 'demo-1',
    status: 'yuborilgan',
    encounter_created_at: new Date().toISOString(),
    first_name: 'Aziza',
    last_name: 'Rahimova',
    age: 54,
    gender: 'ayol',
    patient_phone: '+998 90 123 45 67',
    nurse_name: 'Malika Yusupova',
    blood_pressure_systolic: 170,
    blood_pressure_diastolic: 105,
    pulse: 108,
    temperature: 38.2,
    spo2: 94,
    glucose: 7.4,
    risk_level: 'qizil',
    recommended_department: 'Terapevt / shoshilinch ko\'rik',
    triage_note: 'Qon bosimi va puls yuqori. Shifokor tezda ko\'rib chiqishi kerak.',
    rule_id: 'bp_high_pulse_high',
    meet_url: 'https://meet.google.com/new',
    symptoms: [
      { name: 'Bosh og\'rig\'i', group_name: 'Bosh / Asab', severity: 7, duration_days: 2 },
      { name: 'Hansirash', group_name: 'Nafas olish tizimi', severity: 6, duration_days: 1 },
    ],
  },
  {
    encounter_id: 'demo-2',
    status: 'yangi',
    encounter_created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    first_name: 'Javohir',
    last_name: 'Saidov',
    age: 31,
    gender: 'erkak',
    patient_phone: '+998 93 222 10 10',
    nurse_name: 'Dilnoza Karimova',
    blood_pressure_systolic: 118,
    blood_pressure_diastolic: 78,
    pulse: 76,
    temperature: 36.8,
    spo2: 98,
    glucose: null,
    risk_level: 'yashil',
    recommended_department: 'Oilaviy shifokor',
    triage_note: 'Ko\'rsatkichlar barqaror. Rejali ko\'rik tavsiya qilinadi.',
    rule_id: 'default_green',
    meet_url: null,
    symptoms: [
      { name: 'Kuchsizlik / Charchoq', group_name: 'Umumiy holat', severity: 3, duration_days: 4 },
    ],
  },
  {
    encounter_id: 'demo-3',
    status: 'yuborilgan',
    encounter_created_at: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    first_name: 'Nodira',
    last_name: 'Xalilova',
    age: 42,
    gender: 'ayol',
    patient_phone: '+998 91 555 33 22',
    nurse_name: 'Malika Yusupova',
    blood_pressure_systolic: 125,
    blood_pressure_diastolic: 82,
    pulse: 88,
    temperature: 39.1,
    spo2: 95,
    glucose: 5.8,
    risk_level: 'sariq',
    recommended_department: 'Terapevt',
    triage_note: 'Yuqori harorat va yo\'tal. Nafas yoʻllari infeksiyasi ehtimoli.',
    rule_id: 'rule_001',
    meet_url: null,
    symptoms: [
      { name: 'Yo\'tal', group_name: 'Nafas olish tizimi', severity: 6, duration_days: 3 },
      { name: 'Isitma', group_name: 'Umumiy holat', severity: 7, duration_days: 2 },
      { name: 'Tana og\'rig\'i', group_name: 'Umumiy holat', severity: 5, duration_days: 2 },
      { name: 'Kuchsizlik / Charchoq', group_name: 'Umumiy holat', severity: 6, duration_days: 3 },
    ],
  },
];

// ─── App State ──────────────────────────────────────────────
let encounters = [];
let selectedId = null;
let supabaseClient = null;
let currentTab = 'encounters'; // 'encounters' | 'video' | 'patients'
const diagnosisEngine = new DiagnosisEngine();

const els = {
  total: document.getElementById('totalCount'),
  urgent: document.getElementById('urgentCount'),
  video: document.getElementById('videoCount'),
  list: document.getElementById('encounterList'),
  detail: document.getElementById('detailPanel'),
  search: document.getElementById('searchInput'),
  template: document.getElementById('detailTemplate'),
  loginOverlay: document.getElementById('loginOverlay'),
  loginForm: document.getElementById('loginForm'),
  email: document.getElementById('emailInput'),
  password: document.getElementById('passwordInput'),
  loginError: document.getElementById('loginError'),
  togglePasswordBtn: document.getElementById('togglePasswordBtn'),
  eyeIcon: document.getElementById('eyeIcon'),
  demoLoginBtn: document.getElementById('demoLoginBtn'),
  navEncounters: document.getElementById('navEncounters'),
  navVideo: document.getElementById('navVideo'),
  navPatients: document.getElementById('navPatients'),
  titleHeader: document.querySelector('.topbar h1'),
  subtitleHeader: document.querySelector('.topbar p'),
};

// ─── Supabase helpers ───────────────────────────────────────
function hasSupabaseConfig() {
  const cfg = window.SHIFO_CONFIG;
  return Boolean(cfg?.supabaseUrl && cfg?.supabaseAnonKey && !cfg.supabaseUrl.includes('YOUR_PROJECT'));
}

async function loadEncounters() {
  if (!hasSupabaseConfig() || !window.supabase) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from('doctor_encounter_details')
    .select('*')
    .order('encounter_created_at', { ascending: false });

  if (error) {
    console.warn(error);
    return [];
  }

  const withSymptoms = await Promise.all(
    data.map(async (item) => {
      const { data: symptoms, error: symptomsError } = await supabaseClient
        .from('symptoms')
        .select('name, group_name, duration_days, severity')
        .eq('encounter_id', item.encounter_id)
        .order('created_at', { ascending: true });

      if (symptomsError) console.warn(symptomsError);
      return { ...item, symptoms: symptoms ?? [] };
    }),
  );

  return withSymptoms;
}

async function isDoctor(userId) {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();
  return !error && (data?.role === 'doctor' || data?.role === 'admin');
}

async function ensureSession() {
  if (!hasSupabaseConfig() || !window.supabase) return true;

  supabaseClient = window.supabase.createClient(
    window.SHIFO_CONFIG.supabaseUrl,
    window.SHIFO_CONFIG.supabaseAnonKey,
  );

  const { data } = await supabaseClient.auth.getSession();
  if (data.session && await isDoctor(data.session.user.id)) return true;

  if (data.session) await supabaseClient.auth.signOut();

  els.loginOverlay.classList.remove('hidden');
  return false;
}

async function signIn(email, password) {
  els.loginError.textContent = '';
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    els.loginError.textContent = 'Email yoki parol noto\'g\'ri.';
    return;
  }

  const { data } = await supabaseClient.auth.getUser();
  if (!data.user || !await isDoctor(data.user.id)) {
    await supabaseClient.auth.signOut();
    els.loginError.textContent = 'Bu sahifaga faqat shifokor hisobi bilan kirish mumkin.';
    return;
  }

  els.loginOverlay.classList.add('hidden');
  await init();
}

// ─── Formatters ─────────────────────────────────────────────
function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function patientName(item) {
  return `${item.first_name ?? ''} ${item.last_name ?? ''}`.trim();
}

function riskLabel(risk) {
  if (risk === 'qizil') return 'Shoshilinch';
  if (risk === 'sariq') return 'O\'rtacha';
  return 'Kuzatuv';
}

function statusLabel(status) {
  if (status === 'yuborilgan') return '📨 Yuborilgan';
  if (status === 'korib_chiqilgan' || status === 'koribChiqilgan') return '✅ Ko\'rib chiqilgan';
  return '🆕 Yangi';
}

function valueOrDash(value, unit = '') {
  if (value === null || value === undefined || value === '') return '-';
  return `${value}${unit}`;
}

// ─── Stats ──────────────────────────────────────────────────
function setStats(items) {
  els.total.textContent = items.length;
  els.urgent.textContent = items.filter((item) => item.risk_level === 'qizil').length;
  els.video.textContent = items.filter((item) => item.meet_url).length;
}

// ─── Tab Navigation ──────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;

  [els.navEncounters, els.navVideo, els.navPatients].forEach((btn) => btn?.classList.remove('active'));

  if (tab === 'encounters') {
    els.navEncounters?.classList.add('active');
    if (els.titleHeader) els.titleHeader.textContent = 'Qabullar nazorati';
    if (els.subtitleHeader) els.subtitleHeader.textContent = 'Hamshiralar kiritgan bemor holati va ko\'rsatkichlari';
  } else if (tab === 'video') {
    els.navVideo?.classList.add('active');
    if (els.titleHeader) els.titleHeader.textContent = 'Video vizitlar';
    if (els.subtitleHeader) els.subtitleHeader.textContent = 'Google Meet havolasi biriktirilgan video qabullar';
  } else if (tab === 'patients') {
    els.navPatients?.classList.add('active');
    if (els.titleHeader) els.titleHeader.textContent = 'Bemorlar ro\'yxati';
    if (els.subtitleHeader) els.subtitleHeader.textContent = 'Barcha bemorlar va ularning klinik ma\'lumotlari';
  }

  renderList();

  // Auto select first match in tab if available
  const filtered = getFilteredEncounters();
  if (filtered.length > 0) {
    selectEncounter(filtered[0].encounter_id);
  }
}

function getFilteredEncounters() {
  const query = els.search.value.trim().toLowerCase();
  return encounters.filter((item) => {
    if (currentTab === 'video' && !item.meet_url) return false;
    const text = [
      patientName(item),
      item.patient_phone,
      item.nurse_name,
      item.risk_level,
      item.status,
    ].join(' ').toLowerCase();
    return text.includes(query);
  });
}

// ─── List rendering ─────────────────────────────────────────
function renderList() {
  const filtered = getFilteredEncounters();

  els.list.innerHTML = '';

  if (filtered.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style.cssText = 'padding: 24px 16px; text-align: center; color: var(--text-dim); font-size: 13px;';
    emptyMsg.textContent = currentTab === 'video'
      ? 'Video vizit biriktirilgan bemorlar yo\'q'
      : 'Bemorlar topilmadi';
    els.list.appendChild(emptyMsg);
    return;
  }

  filtered.forEach((item) => {
    const button = document.createElement('button');
    button.className = `encounter-item ${item.encounter_id === selectedId ? 'active' : ''}`;
    button.type = 'button';
    button.innerHTML = `
      <div class="encounter-row">
        <span class="patient-name">${patientName(item)}</span>
        <span class="risk-dot ${item.risk_level ?? 'yashil'}"></span>
      </div>
      <div class="encounter-row meta">
        <span>${item.age} yosh · ${item.gender}</span>
        <span>${riskLabel(item.risk_level)}</span>
      </div>
      <div class="meta">${formatDate(item.encounter_created_at)} ${item.meet_url ? '· 📹 Video' : ''}</div>
    `;
    button.addEventListener('click', () => selectEncounter(item.encounter_id));
    els.list.appendChild(button);
  });
}

// ─── Helper: get data-field element ─────────────────────────
function field(root, name) {
  return root.querySelector(`[data-field="${name}"]`);
}

// ─── Render symptoms ────────────────────────────────────────
function renderSymptoms(root, symptoms) {
  const container = field(root, 'symptoms');
  container.innerHTML = '';

  if (!symptoms?.length) {
    container.textContent = 'Simptom kiritilmagan';
    return;
  }

  symptoms.forEach((symptom) => {
    const chip = document.createElement('span');
    chip.className = 'symptom-chip';
    const days = symptom.duration_days ? ` · ${symptom.duration_days} kun` : '';
    chip.textContent = `${symptom.name} · ${symptom.severity}/10${days}`;
    container.appendChild(chip);
  });
}

// ─── Render AI Diagnosis Predictions ────────────────────────
function renderDiagnosis(root, item) {
  const card = field(root, 'diagnosisCard');
  const list = field(root, 'diagnosisList');

  const predictions = diagnosisEngine.predict(item);

  if (predictions.length === 0) {
    list.innerHTML = `
      <div class="diagnosis-item" style="justify-content: center; opacity: 0.6;">
        <div class="diagnosis-info" style="text-align: center;">
          <div class="diagnosis-name">Ma'lumotlar yetarli emas</div>
          <div class="diagnosis-basis">Prognoz uchun ko'proq vital ko'rsatkichlar yoki simptomlar kerak</div>
        </div>
      </div>
    `;
    return;
  }

  list.innerHTML = '';
  predictions.forEach((pred, index) => {
    const level = pred.confidence >= 60 ? 'high' : pred.confidence >= 35 ? 'medium' : 'low';
    const div = document.createElement('div');
    div.className = 'diagnosis-item';
    div.style.animationDelay = `${(index + 1) * 0.12}s`;
    div.innerHTML = `
      <div class="diagnosis-rank ${level}">${index + 1}</div>
      <div class="diagnosis-info">
        <div class="diagnosis-name">${pred.emoji} ${pred.name}</div>
        <div class="diagnosis-basis">Asoslanish: ${pred.basis}</div>
        <div class="confidence-bar">
          <div class="confidence-fill ${level}" style="width: ${pred.confidence}%;"></div>
        </div>
      </div>
      <div class="diagnosis-confidence ${level}">${pred.confidence}%</div>
    `;
    list.appendChild(div);
  });
}

// ─── Google Meet URL validation ─────────────────────────────
function isGoogleMeetUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'meet.google.com';
  } catch (_) {
    return false;
  }
}

// ─── Save Meet URL ──────────────────────────────────────────
async function saveMeetUrl(item, input, message, saveButton, openButton) {
  const meetUrl = input.value.trim();
  message.textContent = '';

  if (!isGoogleMeetUrl(meetUrl)) {
    message.textContent = 'Google Meet havolasini to\'liq kiriting.';
    message.classList.add('error');
    return;
  }

  if (!supabaseClient) {
    item.meet_url = meetUrl;
    message.textContent = 'Havola saqlandi (lokal).';
    message.classList.remove('error');
    openButton.disabled = false;
    setStats(encounters);
    return;
  }

  saveButton.disabled = true;
  try {
    const { data: authData, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !authData.user) throw authError ?? new Error('Shifokor sessiyasi topilmadi.');

    const { error } = await supabaseClient
      .from('video_visits')
      .upsert(
        {
          encounter_id: item.encounter_id,
          meet_url: meetUrl,
          created_by: authData.user.id,
        },
        { onConflict: 'encounter_id' },
      );
    if (error) throw error;

    item.meet_url = meetUrl;
    message.textContent = 'Video qabul havolasi saqlandi.';
    message.classList.remove('error');
    openButton.disabled = false;
    setStats(encounters);
  } catch (error) {
    console.error(error);
    message.textContent = 'Havolani saqlab bo\'lmadi.';
    message.classList.add('error');
  } finally {
    saveButton.disabled = false;
  }
}

// ─── Save Assessment ────────────────────────────────────────
async function saveAssessment(item, fields, message, saveButton) {
  const diagnosis = fields.diagnosis.value.trim();
  const clinicalNote = fields.clinicalNote.value.trim();
  const plan = fields.plan.value.trim();
  message.textContent = '';
  message.classList.remove('error');

  if (!diagnosis) {
    message.textContent = 'Klinik xulosa yoki tashxisni kiriting.';
    message.classList.add('error');
    return;
  }

  if (!supabaseClient) {
    item.diagnosis = diagnosis;
    item.clinical_note = clinicalNote;
    item.treatment_plan = plan;
    item.status = 'korib_chiqilgan';
    message.textContent = 'Klinik xulosa saqlandi (lokal).';
    renderList();
    return;
  }

  saveButton.disabled = true;
  try {
    const { data: authData, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !authData.user) throw authError ?? new Error('Shifokor sessiyasi topilmadi.');

    const { error } = await supabaseClient
      .from('doctor_assessments')
      .upsert(
        {
          encounter_id: item.encounter_id,
          diagnosis,
          clinical_note: clinicalNote || null,
          plan: plan || null,
          diagnosed_by: authData.user.id,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'encounter_id' },
      );
    if (error) throw error;

    const { error: encounterError } = await supabaseClient
      .from('encounters')
      .update({ status: 'korib_chiqilgan', updated_at: new Date().toISOString() })
      .eq('id', item.encounter_id);
    if (encounterError) throw encounterError;

    item.diagnosis = diagnosis;
    item.clinical_note = clinicalNote;
    item.treatment_plan = plan;
    item.status = 'korib_chiqilgan';
    message.textContent = 'Klinik xulosa saqlandi.';
    renderList();
  } catch (error) {
    console.error(error);
    message.textContent = 'Klinik xulosani saqlab bo\'lmadi.';
    message.classList.add('error');
  } finally {
    saveButton.disabled = false;
  }
}

// ─── Select & Render Encounter Detail ───────────────────────
function selectEncounter(id) {
  selectedId = id;
  const item = encounters.find((encounter) => encounter.encounter_id === id);
  if (!item) return;

  const content = els.template.content.cloneNode(true);

  field(content, 'patientName').textContent = patientName(item);
  field(content, 'patientMeta').textContent =
    `${item.age} yosh · ${item.gender} · ${valueOrDash(item.patient_phone)}`;
  field(content, 'nurseName').textContent = valueOrDash(item.nurse_name);
  field(content, 'createdAt').textContent = formatDate(item.encounter_created_at);
  field(content, 'status').textContent = statusLabel(item.status);
  field(content, 'bp').textContent =
    item.blood_pressure_systolic && item.blood_pressure_diastolic
      ? `${item.blood_pressure_systolic}/${item.blood_pressure_diastolic}`
      : '-';
  field(content, 'pulse').textContent = valueOrDash(item.pulse, ' bpm');
  field(content, 'temperature').textContent = valueOrDash(item.temperature, '°C');
  field(content, 'spo2').textContent = valueOrDash(item.spo2, '%');
  field(content, 'glucose').textContent = valueOrDash(item.glucose, ' mmol/L');
  field(content, 'triageNote').textContent = item.triage_note ?? 'Triage natijasi kiritilmagan.';
  field(content, 'department').textContent = valueOrDash(item.recommended_department);
  field(content, 'ruleId').textContent = valueOrDash(item.rule_id);

  const meetInput = field(content, 'meetUrlInput');
  const videoMessage = field(content, 'videoMessage');
  const diagnosisInput = field(content, 'diagnosisInput');
  const clinicalNoteInput = field(content, 'clinicalNoteInput');
  const planInput = field(content, 'planInput');
  const assessmentMeta = field(content, 'assessmentMeta');
  const assessmentMessage = field(content, 'assessmentMessage');
  meetInput.value = item.meet_url ?? '';
  diagnosisInput.value = item.diagnosis ?? '';
  clinicalNoteInput.value = item.clinical_note ?? '';
  planInput.value = item.treatment_plan ?? '';
  assessmentMeta.textContent = item.assessment_updated_at
    ? `Yangilangan: ${formatDate(item.assessment_updated_at)}`
    : 'Hali klinik xulosa kiritilmagan';

  const risk = field(content, 'riskLevel');
  risk.textContent = riskLabel(item.risk_level);
  risk.classList.add(item.risk_level ?? 'yashil');

  renderSymptoms(content, item.symptoms);

  // ── Render AI Diagnosis ──
  renderDiagnosis(content, item);

  const meetButton = content.querySelector('[data-action="openMeet"]');
  const createMeetButton = content.querySelector('[data-action="createMeet"]');
  const saveMeetButton = content.querySelector('[data-action="saveMeet"]');
  meetButton.disabled = !item.meet_url;
  meetButton.addEventListener('click', () => {
    if (item.meet_url) window.open(item.meet_url, '_blank', 'noopener');
  });
  createMeetButton.addEventListener('click', () => {
    window.open('https://meet.google.com/new', '_blank', 'noopener');
    videoMessage.textContent = 'Meet oynasidan havolani nusxalab, shu maydonga qo\'ying.';
    videoMessage.classList.remove('error');
  });
  saveMeetButton.addEventListener('click', () =>
    saveMeetUrl(item, meetInput, videoMessage, saveMeetButton, meetButton),
  );

  const saveAssessmentButton = content.querySelector('[data-action="saveAssessment"]');
  saveAssessmentButton.addEventListener('click', () =>
    saveAssessment(
      item,
      {
        diagnosis: diagnosisInput,
        clinicalNote: clinicalNoteInput,
        plan: planInput,
      },
      assessmentMessage,
      saveAssessmentButton,
    ),
  );

  els.detail.innerHTML = '';
  els.detail.appendChild(content);
  renderList();
}

// ─── Initialization ─────────────────────────────────────────
async function init() {
  const hasSession = await ensureSession();
  if (!hasSession) return;

  const liveData = await loadEncounters();
  encounters = liveData.length > 0 ? liveData : demoEncounters;

  setStats(encounters);
  renderList();
  if (encounters.length) selectEncounter(encounters[0].encounter_id);
}

els.search.addEventListener('input', renderList);
els.navEncounters?.addEventListener('click', () => switchTab('encounters'));
els.navVideo?.addEventListener('click', () => switchTab('video'));
els.navPatients?.addEventListener('click', () => switchTab('patients'));

// Password visibility toggle (Show / Hide password)
els.togglePasswordBtn?.addEventListener('click', () => {
  const isPassword = els.password.type === 'password';
  els.password.type = isPassword ? 'text' : 'password';

  if (isPassword) {
    // Hidden eye icon (slash)
    els.eyeIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;
  } else {
    // Visible eye icon
    els.eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
  }
});

// Demo mode login button handler
els.demoLoginBtn?.addEventListener('click', () => {
  els.loginOverlay.classList.add('hidden');
  encounters = demoEncounters;
  setStats(encounters);
  renderList();
  if (encounters.length) selectEncounter(encounters[0].encounter_id);
});

els.loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await signIn(els.email.value.trim(), els.password.value);
});
init();
