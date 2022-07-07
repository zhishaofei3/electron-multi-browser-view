const btn = document.getElementById('btn')
const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const countSpan = document.getElementById('count')
const currSpan = document.getElementById('curr')

window.electronAPI.setNewWebContent()

btn.addEventListener('click', () => {
  window.electronAPI.setNewWebContent()
})

prevBtn.addEventListener('click', () => {
  window.electronAPI.prevWebContent()
})

nextBtn.addEventListener('click', () => {
  window.electronAPI.nextWebContent()
})

window.electronAPI.onUpdateCount((_event, count, curr) => {
  countSpan.innerHTML = String(count)
  currSpan.innerHTML = String(curr + 1)
})