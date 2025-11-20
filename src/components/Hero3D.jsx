import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero3D = () => {
  return (
    <section className="relative h-[52vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4TrRyLcIHhcItjnk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlay for readability (doesn't block Spline interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900"></div>

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
            Интерактивный таймер
          </h1>
          <p className="mt-4 text-slate-200/90 text-base md:text-lg max-w-2xl mx-auto">
            Футуристические вибы: нажмите «E» в 3D‑сцене и управляйте временем ниже. Меняйте картинки для вдохновения.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
