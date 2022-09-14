# livestream-server

## Prerequisites

You need to have Node.js and ffmepg installed.

This project uses Node.js and [node-media-server](https://github.com/illuspas/Node-Media-Server).

## How to start the server

1. Add videos to ressources/videos folder

2. Start server with one of the following commands :
- With npm : ` npm run dev `
- With pnpm : ` pnpm dev `

3. Execute the following command to start a stream :

`ffmpeg -re -i VIDEO_NAME.mp4 -c copy -f flv rtmp://localhost/live/STREAM_NAME`
