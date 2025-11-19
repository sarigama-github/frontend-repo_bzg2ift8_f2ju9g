export default function Pseudocode({ title, lines, activeLine }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <div className="text-blue-200 font-semibold mb-2">{title} sort</div>
      <pre className="text-blue-100 text-sm leading-6">
        {lines.map((l, idx) => (
          <div key={idx} className={`px-2 rounded ${activeLine-1 === idx ? 'bg-blue-500/20 text-white' : 'text-blue-300/80'}`}>
            {idx+1}. {l}
          </div>
        ))}
      </pre>
    </div>
  )
}
