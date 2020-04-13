export default function sort (tunes, sortBy) {
  return tunes.sort((a, b) => {
    if (sortBy === 'Year') return a.year - b.year
    else {
      if (a[sortBy.toLowerCase()] < b[sortBy.toLowerCase()]) { return -1 }
      if (a[sortBy.toLowerCase()] > b[sortBy.toLowerCase()]) { return 1 }
      return 0
    }
  })
}
