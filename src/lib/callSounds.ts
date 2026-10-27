// VitaNova Clinic — Web Audio API Call Sounds Engine
// Uses pure procedural Web Audio API synthesis: zero external MP3s, zero CORS issues, zero lag.

let audioCtx: AudioContext | null = null;
let ringbackOsc1: OscillatorNode | null = null;
let ringbackOsc2: OscillatorNode | null = null;
let ringbackGain: GainNode | null = null;
let ringbackTimer: ReturnType<typeof setInterval> | null = null;

let incomingRingtoneTimer: ReturnType<typeof setInterval> | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

/**
 * Caller Ringback Tone: Standard North American / International dual-tone (440Hz + 480Hz)
 * Pulses: 1.5s on, 2.5s off
 */
export const startRingbackTone = () => {
  stopRingbackTone();
  try {
    const ctx = getAudioContext();

    const playBeep = () => {
      try {
        if (!audioCtx || audioCtx.state === 'closed') return;
        const now = ctx.currentTime;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.08);
        gain.gain.setValueAtTime(0.08, now + 1.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
        gain.connect(ctx.destination);

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(440, now);
        osc2.frequency.setValueAtTime(480, now);

        osc1.connect(gain);
        osc2.connect(gain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.5);
        osc2.stop(now + 1.5);
      } catch (_) {}
    };

    playBeep();
    ringbackTimer = setInterval(playBeep, 4000);
  } catch (_) {}
};

export const stopRingbackTone = () => {
  if (ringbackTimer) {
    clearInterval(ringbackTimer);
    ringbackTimer = null;
  }
  try {
    if (ringbackOsc1) { ringbackOsc1.stop(); ringbackOsc1.disconnect(); ringbackOsc1 = null; }
    if (ringbackOsc2) { ringbackOsc2.stop(); ringbackOsc2.disconnect(); ringbackOsc2 = null; }
    if (ringbackGain) { ringbackGain.disconnect(); ringbackGain = null; }
  } catch (_) {}
};

/**
 * Receiver Ringtone: Melodic medical chime (E5 -> G#5 -> B5 -> E6)
 * Repeats every 2.8s
 */
export const startIncomingCallTone = () => {
  stopIncomingCallTone();
  try {
    const ctx = getAudioContext();

    const playChime = () => {
      try {
        if (!audioCtx || audioCtx.state === 'closed') return;
        const now = ctx.currentTime;
        const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const start = now + i * 0.18;

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, start);

          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.12, start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(start);
          osc.stop(start + 0.36);
        });
      } catch (_) {}
    };

    playChime();
    incomingRingtoneTimer = setInterval(playChime, 2800);
  } catch (_) {}
};

export const stopIncomingCallTone = () => {
  if (incomingRingtoneTimer) {
    clearInterval(incomingRingtoneTimer);
    incomingRingtoneTimer = null;
  }
};

/**
 * Call Connected chime: Smooth two-note positive connection chime (A5 -> D6)
 */
export const playConnectedTone = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [880, 1174.66]; // A5 -> D6
    notes.forEach((freq, idx) => {
      const start = now + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.1, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.26);
    });
  } catch (_) {}
};

/**
 * Call Disconnected tone: Gentle descending soft chime (G5 -> Eb5)
 */
export const playHangupTone = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [783.99, 622.25]; // G5 -> Eb5
    notes.forEach((freq, idx) => {
      const start = now + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.09, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.23);
    });
  } catch (_) {}
};
