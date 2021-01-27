# scribe

a hacky typing assistant using chromium's built-in speech recognition cloud service

## install + use

### install prerequisites
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

