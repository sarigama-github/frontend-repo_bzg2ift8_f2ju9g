import { Play, Pause, RotateCcw, StepForward, StepBack, RefreshCw, Shuffle } from 'lucide-react'

export default function Controls({
  isPlaying,
  onPlayPause,
  onReset,
  onStepForward,
  onStepBack,
  onRandomize,
  speed,
  setSpeed
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={onPlayPause} className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 inline-flex items-center gap-2">
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        <span>{isPlaying ? 'Pause' : 'Play'}</span>
      </button>
      <button onClick={onStepBack} className="px-3 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 inline-flex items-center gap-2">
        <StepBack size={18} />
        <span>Back</span>
      </button>
      <button onClick={onStepForward} className="px-3 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 inline-flex items-center gap-2">
        <StepForward size={18} />
        <span>Forward</span>
      </button>
      <button onClick={onReset} className="px-3 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 inline-flex items-center gap-2">
        <RotateCcw size={18} />
        <span>Reset</span>
      </button>
      <button onClick={onRandomize} className="px-3 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 inline-flex items-center gap-2">
        <Shuffle size={18} />
        <span>Randomize</span>
      </button>
      <div className="flex items-center gap-2 ml-4">
        <RefreshCw size={16} className="text-blue-300" />
        <input type="range" min="0.1" max="2" step="0.1" value={speed} onChange={(e)=>setSpeed(parseFloat(e.target.value))} />
        <span className="text-blue-200 text-sm">{speed.toFixed(1)}x</span>
      </div>
    </div>
  )
}
