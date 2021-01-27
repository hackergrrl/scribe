# scribe

a hacky voice-based typing assistant using chromium's built-in speech recognition cloud service.

the idea is to be able to hold down a key on my keyboard, say things, and have what i said be transcribed as if my keyboard has just typed it!

## install + use

### install prerequisites
- linux (probably)
- chromium or chrome web browser
- `xdotool`
- `alsa-utils`
- `libnotify-bin`

### install global-keypress fork
this is a local keylogger, to track when you're holding down the dictation
trigger key

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

