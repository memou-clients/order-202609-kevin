// --- USER CUSTOMIZATION CONFIG (nama wajib berakhiran CONFIG) ---
// Pertahankan nama BASIC_CONFIG, key utama, dan ID HTML untuk integrasi controller.
const BASIC_CONFIG = {
  "recipientName": "Sayangku",
  "nickname": "Sayang",
  "eventDate": "30 September 2026",
  "senderName": "Aku",
  "loveLetter": "Makasih ya, udah mau nemenin aku. Buat obrolan yang kadang nggak penting, buat sabarnya kamu, dan buat waktu yang kamu luangin.\n\nAku suka dengar cerita kamu. Suka waktu kamu ketawa. Bahkan waktu kita nggak ngapa-ngapain, aku tetap senang kalau ada kamu.\n\nKalau lagi capek, cerita aja. Nggak perlu nunggu semuanya beres dulu. Aku mungkin nggak selalu punya jawaban, tapi aku mau dengerin.\n\nAku masih pengin jalan bareng kamu, nyoba tempat makan yang belum pernah kita datangi, dan punya lebih banyak foto berdua. Pelan-pelan aja. Yang penting sama kamu.",
  "caption1": "Kita simpan yang ini. foto atas paling kiri",
  "caption2": "Mau ngulang hari ini. foto atas paling kanan",
  "captionNote1": "",
  "captionNote2": "",
  "musicVolume": 0.32,
  "photoCaption1": "Kita simpan yang ini. foto bawah paling kiri",
  "photoCaption2": "Mau ngulang hari ini.foto bawah paling kanan"
};

// --- AUDIO & ENTRANCE CONTROLLER ---
document.addEventListener('DOMContentLoaded', () => {
  const mapping = { recipientName: 'recipientName', nickname: 'nickname', eventDate: 'eventDate', letterText: 'loveLetter', senderName: 'senderName', caption1: 'caption1', caption2: 'caption2', captionNote1: 'captionNote1', captionNote2: 'captionNote2' };
  Object.entries(mapping).forEach(([id, key]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = BASIC_CONFIG[key] ?? '';
  });
  document.title = `Buat ${BASIC_CONFIG.recipientName} ♡`;
  const modal = document.getElementById('entranceModal');
  const enterBtn = document.getElementById('enterSiteBtn');
  const content = document.getElementById('siteContent');
  const audio = document.getElementById('bgmAudio');
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundLabel = document.getElementById('soundLabel');
  audio.volume = Math.min(1, Math.max(0, Number(BASIC_CONFIG.musicVolume) || 0.32));
  let entered = false;
  function syncAudio() {
    const playing = !audio.paused;
    soundLabel.textContent = playing ? 'Audio: ON' : 'Audio: OFF';
    soundBtn.setAttribute('aria-pressed', String(playing));
    soundBtn.setAttribute('aria-label', playing ? 'Matikan musik' : 'Nyalakan musik');
    soundBtn.classList.toggle('is-playing', playing);
  }
  async function playMusic() {
    try { await audio.play(); }
    catch { syncAudio(); /* tombol audio tetap bisa digunakan jika browser menolak */ }
  }
  audio.addEventListener('play', syncAudio);
  audio.addEventListener('pause', syncAudio);
  audio.addEventListener('error', syncAudio);
  enterBtn.addEventListener('click', () => {
    if (entered) return;
    entered = true;
    playMusic(); // Dipanggil langsung dalam aksi klik pengguna untuk autoplay browser.
    content.inert = false;
    content.removeAttribute('aria-hidden');
    document.body.classList.remove('is-locked');
    document.body.classList.add('has-entered');
    modal.classList.add('is-opening');
    setTimeout(() => modal.classList.add('hidden'), 300);
    modal.setAttribute('aria-hidden', 'true');
    modal.inert = true;
    burst(window.innerWidth / 2, window.innerHeight / 2, 16);
    setTimeout(() => { modal.style.display = 'none'; soundBtn.focus({ preventScroll: true }); }, 1200);
  });
  soundBtn.addEventListener('click', () => { if (audio.paused) playMusic(); else { audio.pause(); syncAudio(); } });
  enterBtn.focus({ preventScroll: true });
  modal.addEventListener('keydown', event => { if (event.key === 'Tab' && !entered) { event.preventDefault(); enterBtn.focus(); } });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  } else revealElements.forEach(el => el.classList.add('visible'));

  const heartLayer = document.getElementById('softHearts');
  if (!reducedMotion) {
    for (let i = 0; i < 9; i++) {
      const heart = document.createElement('span'); heart.className = 'drifting-heart'; heart.textContent = i % 4 === 0 ? '✧' : '♡';
      heart.style.setProperty('--left', `${(i * 7.1 + 3) % 100}%`);
      heart.style.setProperty('--duration', `${15 + i % 7 * 2}s`);
      heart.style.setProperty('--delay', `${-i * 2.6}s`);
      heart.style.setProperty('--size', `${14 + i % 4 * 5}px`);
      heartLayer.appendChild(heart);
    }
  }
  function burst(x, y, count = 5) {
    if (reducedMotion) return;
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('span'); heart.className = 'tap-heart'; heart.textContent = '♡';
      heart.style.left = `${x}px`; heart.style.top = `${y}px`;
      heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 170}px`);
      heart.style.setProperty('--dy', `${-70 - Math.random() * 125}px`);
      heart.style.setProperty('--rotate', `${(Math.random() - 0.5) * 80}deg`);
      heartLayer.appendChild(heart); setTimeout(() => heart.remove(), 1500);
    }
  }
  let lastTap = 0;
  document.addEventListener('pointerdown', event => {
    if (!entered || event.target.closest('button,a') || performance.now() - lastTap < 250) return;
    lastTap = performance.now(); burst(event.clientX, event.clientY);
  });
});
