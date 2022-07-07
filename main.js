// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, BrowserView, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  // Create the browser window.

  const webContentsMap = []
  let count = 0
  let curr = 0

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      devTools: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // 加载 index.html
  mainWindow.loadFile('index.html')

  ipcMain.on('set-new-web-content', (event, title) => {
    // const webContents = event.sender
    const view = new BrowserView({
      webPreferences: {
        devTools: true,
        preload: path.join(__dirname, 'browserViewPreload.js'),
      }
    })
    view.webContents.loadURL('http://localhost:8080/vwa.html')
    mainWindow.setBrowserView(view)
    view.setBounds({ x: view.webContents.id * 30, y: 100, width: 800, height: 800 })
    view.webContents.openDevTools()

    console.log('zsf view.webContents.id', view.webContents.id)
    webContentsMap[count++] = view
    curr = count - 1
    mainWindow.webContents.send('update-count', count, curr)
  })

  ipcMain.on('prev-web-content', (event, title) => {
    if (curr !== 0) {
      curr--
    }
    const view = webContentsMap[curr]
    mainWindow.setBrowserView(view)
    mainWindow.webContents.send('update-count', count, curr)
  })

  ipcMain.on('next-web-content', (event, title) => {
    if (curr < count - 1) {
      curr++
    }
    const view = webContentsMap[curr]
    mainWindow.setBrowserView(view)
    mainWindow.webContents.send('update-count', count, curr)
  })
  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。