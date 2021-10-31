/* 
   Modules to control application life and create native browser window
   In this file you can include the rest of your app's specific main
   process code. You can also put them in separate files and
   require them here.
*/
const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const path = require('path')
const Store = require('electron-store')
const store = new Store();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      //enableRemoteModule: true
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setMenuBarVisibility(false)
  win.loadFile('main.html')

  

  win.webContents.on('did-finish-load', ()=>{
    win.webContents.send('store-data', store.store);
  })
  //console.log(store.store);
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


ipcMain.handle('show-notification', (event, ...args) => {
  const notification = {
    title: 'New Task',
    body: `Added: ${args[0]}`
  };

  new Notification(notification).show();

// Saving the items
  store.set(args[0], args[0]);
  
});

ipcMain.handle('item-delete', (event, ...args) => {
  // Saving the items
  store.delete(args[0]);
});