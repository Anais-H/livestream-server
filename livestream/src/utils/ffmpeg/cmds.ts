import { exec } from 'child_process';

export function execFfmpegCmd(fileName: string, streamName: string) {
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

function streamFileOverRtmpCmd(rtmpUrl: string, fileName: string, streamName: string) {
    return `ffmpeg -re -i ${fileName} -c:v libx264 -c:a aac -f flv rtmp://${rtmpUrl}/${streamName}`;
}