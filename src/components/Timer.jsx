import React, { useEffect, useRef, useState } from 'react';

const formatTime = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${m}:${s}`;
};

const PresetButton = ({ label, seconds, onClick, active }) => (
  <button
    onClick={() => onClick(seconds)}
    className={`px-3 py-2 rounded-lg border text-sm transition-all ${
      active
        ? 'bg-blue-500/90 border-blue-400 text-white shadow'
        : 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-700/60'
    }`}
  >
    {label}
  </button>
);

const Timer = () => {
  const [duration, setDuration] = useState(60); // seconds
  const [remaining, setRemaining] = useState(duration * 1000);
  const [running, setRunning] = useState(false);
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const intervalRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    setRemaining(duration * 1000);
  }, [duration]);

  useEffect(() => {
    if (!running) return;

    const tick = () => {
      const now = Date.now();
      const left = Math.max(0, (endTimeRef.current ?? now) - now);
      setRemaining(left);
      if (left <= 0) {
        setRunning(false);
        clearInterval(intervalRef.current);
      }
    };

    endTimeRef.current = Date.now() + remaining;
    intervalRef.current = setInterval(tick, 100);
    tick();

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start = () => {
    if (remaining <= 0) setRemaining(duration * 1000);
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRemaining(duration * 1000);
  };

  const setPreset = (sec) => {
    setDuration(sec);
    setRunning(false);
    setRemaining(sec * 1000);
  };

  const addImage = (url) => {
    if (!url) return;
    setImages((prev) => [url, ...prev]);
    setCurrentIdx(0);
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <section className="relative py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Timer controls */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-xl font-semibold">Таймер</h2>
              <div className="flex gap-2">
                <PresetButton label="15с" seconds={15} onClick={setPreset} active={duration===15} />
                <PresetButton label="1м" seconds={60} onClick={setPreset} active={duration===60} />
                <PresetButton label="5м" seconds={300} onClick={setPreset} active={duration===300} />
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="text-6xl md:text-7xl font-black tracking-tight text-white tabular-nums">
                {formatTime(remaining)}
              </div>
              <p className="mt-2 text-slate-300 text-sm">Осталось времени</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {!running ? (
                <button onClick={start} className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium shadow">
                  Старт
                </button>
              ) : (
                <button onClick={pause} className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium shadow">
                  Пауза
                </button>
              )}
              <button onClick={reset} className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium">
                Сброс
              </button>
            </div>

            <div className="mt-6">
              <label className="block text-sm text-slate-300 mb-2">Пользовательское время (секунды)</label>
              <input
                type="range"
                min="5"
                max="1200"
                value={duration}
                onChange={(e) => setPreset(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-slate-400 mt-1">{duration} сек.</div>
            </div>
          </div>

          {/* Right: Image panel */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col">
            <h3 className="text-white text-xl font-semibold">Галерея настроения</h3>

            <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border border-slate-700">
              {images.length > 0 ? (
                <img
                  src={images[currentIdx % images.length]}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  Добавьте изображение
                </div>
              )}

              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-2">
                  <button
                    onClick={() => setCurrentIdx((i) => (i - 1 + images.length) % images.length)}
                    className="bg-slate-900/60 hover:bg-slate-900/80 text-white px-3 py-2 rounded-lg"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCurrentIdx((i) => (i + 1) % images.length)}
                    className="bg-slate-900/60 hover:bg-slate-900/80 text-white px-3 py-2 rounded-lg"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <div key={i} className={`relative w-20 h-14 flex-shrink-0 rounded-md overflow-hidden border ${i===currentIdx ? 'border-blue-400' : 'border-slate-700'}`}>
                  <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" onClick={() => setCurrentIdx(i)} />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-slate-900/70 hover:bg-slate-900 text-white text-xs px-1.5 py-0.5 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const url = e.currentTarget.imageUrl.value.trim();
                addImage(url);
                e.currentTarget.reset();
              }}
            >
              <input
                name="imageUrl"
                type="url"
                placeholder="Вставьте ссылку на изображение..."
                className="flex-1 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-slate-100 placeholder-slate-500"
                required
              />
              <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                Добавить
              </button>
            </form>

            <p className="text-xs text-slate-400 mt-3">Поддерживаются прямые ссылки на изображения (jpg, png, gif, webp).</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timer;
