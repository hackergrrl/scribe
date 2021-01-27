# scribe

a hacky voice-based typing assistant using chromium's built-in speech recognition cloud service.

the idea is to be able to hold down a key on my keyboard, say things, and have what i said be transcribed as if my keyboard has just typed it!

## how it works
there are 3 pieces running at the same time:
- chromium web browser: this connects to the server, and uses g**gle apis to listen + transcribe what you say
- globalkeypress: a system-wide keylogger that listens for presses/releases of the trigger key to make chromium start transcribing what you say
- server: this hosts the website the chromium browser visits, listens for the trigger key to be pressed/released, and tells the chromium browser when to listen for audio input

it also uses
- xdotool: a cool linux cli program that lets you simulate mouse and keyboard actions
- notify-send: another nice linux program for sending "desktop notifications" to yourself

## install + use

### install prerequisites
- linux (probably)
- chromium or chrome web browser
- `xdotool`
- `alsa-utils`
- `libnotify-bin`

### install global-keypress fork
this is a local keylogger, to track when you're holding down the dictation
trigger key. i had to fork the project because i wanted it to track releasing
the key as well as when it's pressed.

```
git clone https://github.com/noffle/global-keypress
cd global-keypress/src/linux
make
sudo ./globalkeypress  # starts the keylogger; run this in its own terminal
```

### start up components
- run `node server.js` (same directory as this README)
- open chromium to https://localhost:4300 + skip the ssl warning

### use
now you can hold the Right Alt key, say something, and when you release the key, it will simulate your keyboard typing whatever you said!

