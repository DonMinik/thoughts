import FileSaver from 'file-saver'
import {Thought} from '@/utils/model'
export function saveFile(thoughts: Thought[], title: string) {
    const text = thoughtsToText(thoughts);

    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, title);
}

function thoughtsToText(thoughts: Thought[]): string {
    let text = '';
    thoughts.forEach(thought => {
        text = text + thought.title + CRLF + thought.text + CRLF + CRLF
    })
    return text;
}

const CRLF = '\r\n'