// 预加载脚本
// 在上下文隔离启用的情况下使用预加载
const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
})

// 向渲染器进程暴露window下的对象electronAPI
contextBridge.exposeInMainWorld('electronAPI', {
  setNewWebContent: () => ipcRenderer.send('set-new-web-content'),
  prevWebContent: () => ipcRenderer.send('prev-web-content'),
  nextWebContent: () => ipcRenderer.send('next-web-content'),
  onUpdateCount: (callback) => ipcRenderer.on('update-count', callback),
})
