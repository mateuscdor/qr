const { WAConnection, MessageType } = require('@adiwajshing/baileys').default
const makeWASocket = require("@adiwajshing/baileys").default
const { exec, spawn, execSync } = require("child_process")
const pino = require('pino')
const fs = require('fs')
const fetch = require('node-fetch')
const qrcode = require("qrcode-terminal")
const { delay, useSingleFileAuthState } = require("@adiwajshing/baileys")
exec('rm -rf session.json')
const { state, saveState } = useSingleFileAuthState(`./session.json`)


function ktb() {
  let WhitedevilMD = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ["Whitedevil-MD", "OPERA", "3.0.0"]
  })
  WhitedevilMD.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s
    if (connection == "open") {
      await delay(1000 * 10)
      const session = fs.readFileSync('./session.json')

 
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    WhitedevilMD.sendText = (jid, text, quoted = '', options) => WhitedevilMD.sendMessage(jid, { text: text, ...options }, { quoted })

      await WhitedevilMD.sendMessage(WhitedevilMD.user.id, { document: session, mimetype: 'application/json', fileName: `session.json`})
      await WhitedevilMD.sendMessage(WhitedevilMD.user.id, {text: `*Whitedevil-MD: SESSION*\n\n*NB: DONT SHARE THIS SESSION FILE*\n*Fork this repo* https://github.com/terror-boy/\n\n*Fork and upload this json file to your repo, and change deploy link in README.*\n\n*DONT FORGET TO GIVE IT A STAR BRO ENJOY*` ,contextInfo: { externalAdReply:{
  title:"Whitedevil-MD BOT V2",
  body:"TERROR BOY",
  showAdAttribution: true,
  mediaType:2,
  thumbnail: fs.readFileSync(`./KTB.jpg`) ,
  mediaUrl:`https://www.youtube.com/watch?v=XYGbXI4nm1M`, 
sourceUrl: `https://www.youtube.com/watch?v=XYGbXI4nm1M` }}})

      process.exit(0)
    }
    if (
      connection === "close" &&
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output.statusCode != 401
    ) {
      ktb()
    }
  })
  WhitedevilMD.ev.on('creds.update', saveState)
  WhitedevilMD.ev.on('messages.upsert', () => { })
}
ktb()