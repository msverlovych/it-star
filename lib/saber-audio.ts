import type { ThemeName } from "@/lib/theme";

let audioContext: AudioContext | null = null;
let master: GainNode | null = null;

function context() {
  const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioContext) {
    audioContext = new Ctx();
    master = audioContext.createGain();
    master.gain.value = 0.42;
    const compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.value = -16;
    compressor.knee.value = 18;
    compressor.ratio.value = 3.2;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.18;
    master.connect(compressor);
    compressor.connect(audioContext.destination);
  }
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  return audioContext;
}

function envelope(gain: GainNode, now: number, peak: number, attack: number, hold: number, release: number) {
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + attack);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak * 0.45), now + attack + hold);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + hold + release);
}

/**
 * Original ignition synthesized in the browser.
 * Ember (dark) sits lower and grittier. Dawn (light) sweeps brighter.
 * `brief` shortens the gesture for reduced-motion sessions.
 */
export function playSaberIgnition(to: ThemeName, brief: boolean) {
  const ctx = context();
  if (!ctx || !master) return;

  const now = ctx.currentTime + 0.01;
  const toDark = to === "dark";
  const duration = brief ? 0.42 : 1.15;
  const chirpAt = brief ? now : now + 0.34;

  const noiseLength = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, noiseLength, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < noiseLength; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 0.85;
  band.frequency.setValueAtTime(160, now);
  band.frequency.exponentialRampToValueAtTime(toDark ? 520 : 880, now + 0.16);
  band.frequency.exponentialRampToValueAtTime(toDark ? 140 : 240, now + Math.min(0.55, duration));

  const noiseGain = ctx.createGain();
  envelope(noiseGain, now, brief ? 0.22 : 0.4, 0.03, brief ? 0.08 : 0.22, duration * 0.62);
  noise.connect(band);
  band.connect(noiseGain);
  noiseGain.connect(master);
  noise.start(now);
  noise.stop(now + duration + 0.02);

  const hum = ctx.createOscillator();
  hum.type = toDark ? "sawtooth" : "triangle";
  hum.frequency.setValueAtTime(toDark ? 48 : 64, now);
  hum.frequency.linearRampToValueAtTime(toDark ? 62 : 86, now + 0.2);

  const overtone = ctx.createOscillator();
  overtone.type = "sine";
  overtone.frequency.setValueAtTime(toDark ? 96 : 128, now);
  overtone.frequency.linearRampToValueAtTime(toDark ? 118 : 172, now + 0.24);

  const lfo = ctx.createOscillator();
  lfo.frequency.value = toDark ? 7 : 9;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = toDark ? 7 : 5;
  lfo.connect(lfoGain);
  lfoGain.connect(hum.frequency);

  const humFilter = ctx.createBiquadFilter();
  humFilter.type = "lowpass";
  humFilter.frequency.value = toDark ? 420 : 760;

  const humGain = ctx.createGain();
  envelope(humGain, now, brief ? 0.08 : 0.16, 0.08, brief ? 0.06 : 0.34, duration * 0.55);
  hum.connect(humFilter);
  overtone.connect(humFilter);
  humFilter.connect(humGain);
  humGain.connect(master);
  hum.start(now);
  overtone.start(now);
  lfo.start(now);
  hum.stop(now + duration);
  overtone.stop(now + duration);
  lfo.stop(now + duration);

  const chirp = ctx.createOscillator();
  chirp.type = "sine";
  chirp.frequency.setValueAtTime(toDark ? 140 : 180, chirpAt);
  chirp.frequency.exponentialRampToValueAtTime(toDark ? 740 : 1480, chirpAt + 0.12);
  chirp.frequency.exponentialRampToValueAtTime(toDark ? 180 : 240, chirpAt + 0.32);
  const chirpGain = ctx.createGain();
  envelope(chirpGain, chirpAt, brief ? 0.1 : 0.16, 0.02, 0.05, 0.28);
  chirp.connect(chirpGain);
  chirpGain.connect(master);
  chirp.start(chirpAt);
  chirp.stop(chirpAt + 0.36);
}
