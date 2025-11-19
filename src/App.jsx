import { useEffect, useMemo, useRef, useState } from 'react'
import ThreeBars from './components/ThreeBars'
import Controls from './components/Controls'
import Pseudocode from './components/Pseudocode'
import ArrayInput from './components/ArrayInput'
import { generateFrames, PSEUDOCODE } from './components/algorithms'

const defaultArray = [10,7,3,8,2,5,1,4,9,6]

export default function App() {
  const [algorithm, setAlgorithm] = useState('Bubble')
  const [baseArray, setBaseArray] = useState(defaultArray)
  const [frames, setFrames] = useState(() => generateFrames(algorithm, baseArray))
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const timerRef = useRef(null)

  const current = frames[index] || frames[frames.length-1] || { array: baseArray, highlights: {}, line: 0 }

  useEffect(() => {
    setFrames(generateFrames(algorithm, baseArray))
    setIndex(0)
    setIsPlaying(false)
  }, [algorithm, baseArray])

  useEffect(() => {
    if (!isPlaying) return
    if (index >= frames.length - 1) { setIsPlaying(false); return }
    const interval = Math.max(100, 500 / speed)
    timerRef.current = setTimeout(() => setIndex((i)=>Math.min(i+1, frames.length-1)), interval)
    return () => clearTimeout(timerRef.current)
  }, [isPlaying, index, speed, frames.length])

  const onReset = () => { setIndex(0); setIsPlaying(false) }
  const onRandomize = () => {
    const n = baseArray.length
    const arr = Array.from({length:n}, ()=>Math.floor(Math.random()*99)+1)
    setBaseArray(arr)
  }

  const algorithms = Object.keys(PSEUDOCODE)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
      <header className="relative z-10 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" className="w-8 h-8" />
          <h1 className="text-xl font-semibold">3D Sorting Visualizer</h1>
        </div>
        <a href="/test" className="text-blue-300 hover:text-white underline/30">Backend Test</a>
      </header>
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16 space-y-6">
        <section className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <ArrayInput onSubmit={setBaseArray} />
            <div className="flex items-center gap-3">
              <label className="text-blue-200/80">Algorithm</label>
              <select value={algorithm} onChange={(e)=>setAlgorithm(e.target.value)} className="bg-slate-800/70 border border-blue-500/20 px-3 py-2 rounded-lg">
                {algorithms.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <Controls
              isPlaying={isPlaying}
              onPlayPause={()=> setIsPlaying(v=>!v)}
              onReset={onReset}
              onStepForward={()=> setIndex(i => Math.min(i+1, frames.length-1))}
              onStepBack={()=> setIndex(i => Math.max(i-1, 0))}
              onRandomize={onRandomize}
              speed={speed}
              setSpeed={setSpeed}
            />
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ThreeBars values={current.array} highlights={current.highlights} />
            <div className="mt-3 text-blue-300/80 text-sm">Step {index+1} / {frames.length} • Action: {current.action}</div>
          </div>
          <div className="md:col-span-1">
            <Pseudocode title={algorithm} lines={PSEUDOCODE[algorithm]} activeLine={current.line} />
          </div>
        </section>

        <section className="bg-slate-900/60 border border-blue-500/20 rounded-2xl p-5">
          <div className="text-blue-200 mb-2 font-medium">History</div>
          <div className="grid grid-cols-5 gap-2">
            {frames.slice(0, 25).map((f, i) => (
              <button key={i} onClick={()=>{setIndex(i); setIsPlaying(false)}} className={`text-xs px-2 py-1 rounded bg-slate-800/70 border ${i===index? 'border-blue-500/60 text-white' : 'border-blue-500/20 text-blue-300/80'} hover:border-blue-400/50`}>{i+1}</button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
