import { exec } from 'child_process';

export function execFfmpegCmd(fileName, streamName) {
    exec(streamFileOverRtmpCmd("localhost/live", fileName, streamName), (err, stdout, stderr) => {
    if (err) {
        // some err occurred
        console.error(err);
    } else {
        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        }
    });
}

function streamFileOverRtmpCmd(rtmpUrl, fileName, streamName) {
    return `ffmpeg -re -i ${fileName} -c copy -f flv rtmp://${rtmpUrl}/${streamName}`;
}