import { useState } from 'react'

export default function ArrayInput({ onSubmit, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '10,7,3,8,2,5,1,4,9,6')
  return (
    <form onSubmit={(e)=>{e.preventDefault(); const arr=value.split(/[,\s]+/).filter(Boolean).map(Number).filter(n=>!Number.isNaN(n)); onSubmit(arr)}} className="flex items-center gap-2">
      <input value={value} onChange={(e)=>setValue(e.target.value)} className="flex-1 bg-slate-800/70 text-blue-100 placeholder-blue-300/40 px-3 py-2 rounded-lg border border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40" placeholder="Enter numbers separated by commas" />
      <button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">Set</button>
    </form>
  )
}
