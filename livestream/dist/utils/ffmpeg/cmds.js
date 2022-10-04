"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execFfmpegCmd = void 0;
const child_process_1 = require("child_process");
function execFfmpegCmd(fileName, streamName) {
    (0, child_process_1.exec)(streamFileOverRtmpCmd("localhost/live", fileName, streamName), (err, stdout, stderr) => {
        if (err) {
            // some err occurred
            console.error(err);
        }
        else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    });
}
exports.execFfmpegCmd = execFfmpegCmd;
function streamFileOverRtmpCmd(rtmpUrl, fileName, streamName) {
    return `ffmpeg -re -i ${fileName} -c copy -f flv rtmp://${rtmpUrl}/${streamName}`;
}
