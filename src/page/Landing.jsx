import React, { useEffect } from 'react'
import shape from '../assets/animations/shape.svg'
import {ParticleAnimation} from '../utils/particle-animation'
import { Link } from 'react-router-dom';

function Landing() {

    useEffect(()=>{
        const canvasElements = document.querySelectorAll('[data-particle-animation]');
        canvasElements.forEach(canvas => {
            const options = {
                quantity: canvas.dataset.particleQuantity,
                staticity: canvas.dataset.particleStaticity,
                ease: canvas.dataset.particleEase,
            };
            new ParticleAnimation(canvas, options);
        });
    },[])

  return (
    <>
        
        <main className="relative min-h-screen flex flex-col justify-center bg-slate-900 overflow-hidden">
  <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
    <div className="text-center">
      {/* Illustration #1 */}
      <div
        className="absolute top-0 left-0 rotate-180 -translate-x-3/4 -scale-x-100 blur-3xl opacity-70 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={shape}
          className="max-w-none"
          width={852}
          height={582}
          alt="Illustration"
        />
      </div>
      {/* Illustration #2 */}
      <div
        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 blur-3xl opacity-70 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={shape}
          className="max-w-none"
          width={852}
          height={582}
          alt="Illustration"
        />
      </div>
      {/* Particles animation */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <canvas data-particle-animation />
      </div>
      <div className="relative">
        <h1 className="inline-flex font-extrabold text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
          Interactive Particle Animation
        </h1>
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-lg text-slate-400">
            Our landing page template works on all devices, so you only have to
            set it up once, and get beautiful results forever.
          </p>
        </div>
        <div className="inline-flex justify-center space-x-4">
          <div>
            <Link to="register"
              className="inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 group"
      
            >
              Get Started{" "}
              <span className="tracking-normal text-indigo-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                -&gt;
              </span>
            </Link>
          </div>
          <div>
            <button
              className="inline-flex justify-center whitespace-nowrap rounded-lg bg-slate-700 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
              onClick={()=>alert("under development!")}
            >
              Read the docs
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

    </>
  )
}

export default Landing