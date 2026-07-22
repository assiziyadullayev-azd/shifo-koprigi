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
];

let encounters = [];
let selectedId = null;
let supabaseClient = null;

const els = {
  status: document.getElementById('connectionStatus'),
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
};

function hasSupabaseConfig() {
  const cfg = window.SHIFO_CONFIG;
  return Boolean(cfg?.supabaseUrl && cfg?.supabaseAnonKey && !cfg.supabaseUrl.includes('YOUR_PROJECT'));
}

async function loadEncounters() {
  if (!hasSupabaseConfig() || !window.supabase) {
    els.status.textContent = 'Demo rejim';
    return demoEncounters;
  }

  const { data, error } = await supabaseClient
    .from('doctor_encounter_details')
    .select('*')
    .order('encounter_created_at', { ascending: false });

  if (error) {
    els.status.textContent = 'Demo rejim: Supabase ulanmagan';
    console.warn(error);
    return demoEncounters;
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

  els.status.textContent = 'Supabase ulangan';
  return withSymptoms;
}

async function ensureSession() {
  if (!hasSupabaseConfig() || !window.supabase) return true;

  supabaseClient = window.supabase.createClient(
    window.SHIFO_CONFIG.supabaseUrl,
    window.SHIFO_CONFIG.supabaseAnonKey,
  );

  const { data } = await supabaseClient.auth.getSession();
  if (data.session) return true;

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

  els.loginOverlay.classList.add('hidden');
  await init();
}

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

function setStats(items) {
  els.total.textContent = items.length;
  els.urgent.textContent = items.filter((item) => item.risk_level === 'qizil').length;
  els.video.textContent = items.filter((item) => item.meet_url).length;
}

function renderList() {
  const query = els.search.value.trim().toLowerCase();
  const filtered = encounters.filter((item) => {
    const text = [
      patientName(item),
      item.patient_phone,
      item.nurse_name,
      item.risk_level,
      item.status,
    ].join(' ').toLowerCase();
    return text.includes(query);
  });

  els.list.innerHTML = '';
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
      <div class="meta">${formatDate(item.encounter_created_at)}</div>
    `;
    button.addEventListener('click', () => selectEncounter(item.encounter_id));
    els.list.appendChild(button);
  });
}

function field(root, name) {
  return root.querySelector(`[data-field="${name}"]`);
}

function valueOrDash(value, unit = '') {
  if (value === null || value === undefined || value === '') return '-';
  return `${value}${unit}`;
}

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

function isGoogleMeetUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'meet.google.com';
  } catch (_) {
    return false;
  }
}

async function saveMeetUrl(item, input, message, saveButton, openButton) {
  const meetUrl = input.value.trim();
  message.textContent = '';

  if (!isGoogleMeetUrl(meetUrl)) {
    message.textContent = 'Google Meet havolasini to\'liq kiriting.';
    message.classList.add('error');
    return;
  }

  if (!supabaseClient) {
    message.textContent = 'Demo rejimida havolani saqlab bo\'lmaydi.';
    message.classList.add('error');
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
    message.textContent = 'Havolani saqlab bo\'lmadi. Supabase ruxsatlarini tekshiring.';
    message.classList.add('error');
  } finally {
    saveButton.disabled = false;
  }
}

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
  field(content, 'status').textContent = item.status ?? '-';
  field(content, 'bp').textContent =
    item.blood_pressure_systolic && item.blood_pressure_diastolic
      ? `${item.blood_pressure_systolic}/${item.blood_pressure_diastolic}`
      : '-';
  field(content, 'pulse').textContent = valueOrDash(item.pulse, ' bpm');
  field(content, 'temperature').textContent = valueOrDash(item.temperature, ' C');
  field(content, 'spo2').textContent = valueOrDash(item.spo2, '%');
  field(content, 'glucose').textContent = valueOrDash(item.glucose, ' mmol/L');
  field(content, 'triageNote').textContent = item.triage_note ?? 'Triage natijasi kiritilmagan.';
  field(content, 'department').textContent = valueOrDash(item.recommended_department);
  field(content, 'ruleId').textContent = valueOrDash(item.rule_id);
  const meetInput = field(content, 'meetUrlInput');
  const videoMessage = field(content, 'videoMessage');
  meetInput.value = item.meet_url ?? '';

  const risk = field(content, 'riskLevel');
  risk.textContent = riskLabel(item.risk_level);
  risk.classList.add(item.risk_level ?? 'yashil');

  renderSymptoms(content, item.symptoms);

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

  els.detail.innerHTML = '';
  els.detail.appendChild(content);
  renderList();
}

async function init() {
  const hasSession = await ensureSession();
  if (!hasSession) return;

  encounters = await loadEncounters();
  setStats(encounters);
  renderList();
  if (encounters.length) selectEncounter(encounters[0].encounter_id);
}

els.search.addEventListener('input', renderList);
els.loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await signIn(els.email.value.trim(), els.password.value);
});
init();
