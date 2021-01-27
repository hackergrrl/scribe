let recog

const socket = new WebSocket('wss://localhost:4300');
socket.addEventListener('open', function (event) {
  var bg = document.querySelector('html');
  bg.style['background-color'] = 'lavender'
});
socket.addEventListener('message', function (event) {
  // console.log('recv:', event.data);
  if (event.data === 'listen') {
    listen(() => {
      send({type:'status', status:'listening'})
    }, (err, res) => {
      if (err) send({type:'result', err})
      else send({type:'result', text:res})
    })
  } else if (event.data === 'stop') {
    recog.stop()
  }
});

function send (obj) {
  socket.send(JSON.stringify(obj))
}

function listen (startcb, endcb) {
  var recognition = new webkitSpeechRecognition();
  recog = recognition

  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  var diagnostic = document.querySelector('.output');
  var bg = document.querySelector('html');

  recognition.start();

  recognition.onresult = function(event) {
    const latest = event.results[event.results.length-1][0].transcript
    endcb(null, latest)
  }

  recognition.onstart = function() {
    startcb()
    // console.log('listening!')
  }

  recognition.onend = function() {
    // console.log('ended')
  }

  recognition.onerror = function(err) {
    // console.log('error', err)
    endcb(err)
  }
}
