// Algorithms step generators. Each returns an array of frames.
// A frame: { array: number[], highlights: { a?: number, b?: number, pivot?: number }, action?: string, line: number }
// 'line' corresponds to pseudocode line numbers for highlighting.

export function generateBubbleFrames(arrInput) {
  const arr = [...arrInput]
  const frames = []
  const n = arr.length
  // Pseudocode lines reference:
  // 1: for i in [0..n-1]
  // 2:   for j in [0..n-i-2]
  // 3:     if a[j] > a[j+1]
  // 4:       swap a[j], a[j+1]
  frames.push({ array: [...arr], highlights: {}, action: 'start', line: 1 })
  for (let i = 0; i < n; i++) {
    frames.push({ array: [...arr], highlights: {}, action: 'outer', line: 1 })
    for (let j = 0; j < n - i - 1; j++) {
      frames.push({ array: [...arr], highlights: { a: j, b: j + 1 }, action: 'compare', line: 3 })
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
        frames.push({ array: [...arr], highlights: { a: j, b: j + 1 }, action: 'swap', line: 4 })
      }
    }
  }
  frames.push({ array: [...arr], highlights: {}, action: 'done', line: 0 })
  return frames
}

export function generateInsertionFrames(arrInput) {
  const arr = [...arrInput]
  const frames = []
  const n = arr.length
  // Pseudocode lines reference:
  // 1: for i in 1..n-1
  // 2:   key = a[i]
  // 3:   j = i-1
  // 4:   while j >= 0 and a[j] > key
  // 5:     a[j+1] = a[j]; j = j-1
  // 6:   a[j+1] = key
  frames.push({ array: [...arr], highlights: {}, action: 'start', line: 1 })
  for (let i = 1; i < n; i++) {
    let key = arr[i]
    let j = i - 1
    frames.push({ array: [...arr], highlights: { a: i }, action: 'select-key', line: 2 })
    while (j >= 0 && arr[j] > key) {
      frames.push({ array: [...arr], highlights: { a: j, b: j + 1 }, action: 'shift', line: 4 })
      arr[j + 1] = arr[j]
      frames.push({ array: [...arr], highlights: { a: j, b: j + 1 }, action: 'shifted', line: 5 })
      j = j - 1
    }
    arr[j + 1] = key
    frames.push({ array: [...arr], highlights: { a: j + 1 }, action: 'insert', line: 6 })
  }
  frames.push({ array: [...arr], highlights: {}, action: 'done', line: 0 })
  return frames
}

export function generateSelectionFrames(arrInput) {
  const arr = [...arrInput]
  const frames = []
  const n = arr.length
  // Pseudocode lines reference:
  // 1: for i in 0..n-1
  // 2:   min = i
  // 3:   for j in i+1..n-1
  // 4:     if a[j] < a[min]
  // 5:       min = j
  // 6:   swap a[i], a[min]
  frames.push({ array: [...arr], highlights: {}, action: 'start', line: 1 })
  for (let i = 0; i < n; i++) {
    let min = i
    frames.push({ array: [...arr], highlights: { a: i }, action: 'assume-min', line: 2 })
    for (let j = i + 1; j < n; j++) {
      frames.push({ array: [...arr], highlights: { a: min, b: j }, action: 'compare', line: 4 })
      if (arr[j] < arr[min]) {
        min = j
        frames.push({ array: [...arr], highlights: { a: min, b: j }, action: 'new-min', line: 5 })
      }
    }
    if (min !== i) {
      const t = arr[i]
      arr[i] = arr[min]
      arr[min] = t
      frames.push({ array: [...arr], highlights: { a: i, b: min }, action: 'swap', line: 6 })
    }
  }
  frames.push({ array: [...arr], highlights: {}, action: 'done', line: 0 })
  return frames
}

export const PSEUDOCODE = {
  Bubble: [
    'for i from 0 to n-1',
    '  for j from 0 to n-i-2',
    '    if a[j] > a[j+1]',
    '      swap a[j], a[j+1]'
  ],
  Insertion: [
    'for i from 1 to n-1',
    '  key = a[i]',
    '  j = i - 1',
    '  while j >= 0 and a[j] > key',
    '    a[j+1] = a[j]; j = j-1',
    '  a[j+1] = key'
  ],
  Selection: [
    'for i from 0 to n-1',
    '  min = i',
    '  for j from i+1 to n-1',
    '    if a[j] < a[min]',
    '      min = j',
    '  swap a[i], a[min]'
  ]
}

export function generateFrames(algorithm, arr) {
  switch (algorithm) {
    case 'Bubble':
      return generateBubbleFrames(arr)
    case 'Insertion':
      return generateInsertionFrames(arr)
    case 'Selection':
      return generateSelectionFrames(arr)
    default:
      return generateBubbleFrames(arr)
  }
}
