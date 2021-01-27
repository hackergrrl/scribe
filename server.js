const fs = require('fs')
var https = require('https')
const WebSocket = require('ws')
const spawn = require('child_process').spawn

const ecstatic = require('ecstatic')({
    root: '.',
    showDir: true,
    autoIndex: true
})

const pem = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem')
}
var server = https.createServer(pem, ecstatic)

let type
let stopTimer

let socket
const wss = new WebSocket.Server({ server });
wss.on('connection', function connection(ws) {
  console.log('got connection')
  socket = ws
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    const msg = JSON.parse(message)
    if (msg.text) msg.text = msg.text.toLowerCase()

    if (msg.type === 'status') {
      if (msg.status === 'listening') {
        spawn('notify-send', ['Listening..', '-c', '1'])
        spawn('aplay', ['listen.wav'])
      }
      return
    }

    if (type === 'dictate') {
      if (msg.type === 'result') {
        const text = msg.text
        spawn('xdotool', ['type', '--', text])
        spawn('aplay', ['done.wav'])
      }
    }
  });
});

server.listen(4300, function () {
  console.log('The server is running on https://localhost:4300')
})

keylisten((err, ev) => {
  let listen = false

  if (ev.key === '<RAlt>') {
    listen = true
    type = 'dictate'
  }

  if (listen) {
    if (ev.type === 'down') {
      console.log('LISTEN')
      socket.send('listen')
    } else {
      console.log('STOP')
      socket.send('stop')
    }
  }
})

function keylisten (cb) {
  const p = spawn('tail', ['-n0', '-f', '/var/log/globalkeypress.log'])
  p.stdout.on('data', buf => {
    const line = buf.toString()
    console.log(line)

    let m = line.match(/pressed (.*)/)
    if (m) {
      cb(null, { type: 'down', key: m[1] })
      return
    }

    m = line.match(/released (.*)/)
    if (m) {
      cb(null, { type: 'up', key: m[1] })
      return
    }
  })
}

