// Synthesizes a delicate, gentle music-box style romantic chime melody using standard Web Audio API

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private noteIndex = 0;

  // Romantic pentatonic / gentle lullaby scale frequencies (Hz)
  private melody: number[] = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    523.25, // C5
    493.88, // B4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    392.00, // G4
    329.63, // E4
    349.23, // F4
    440.00, // A4
    392.00, // G4
    329.63, // E4
    293.66, // D4
    261.63, // C4
  ];

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private playTone(freq: number) {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft music box timbre: Sine with subtle harmonics
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Delicate envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.8);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNextNote();
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying) return;
    const freq = this.melody[this.noteIndex];
    this.playTone(freq);
    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    
    // Play with natural rhythm variation
    const delay = [0, 4, 8, 12].includes(this.noteIndex) ? 800 : 420;
    this.timer = window.setTimeout(this.scheduleNextNote, delay);
  };

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
