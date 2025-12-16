/**
* Features related to audio and video.
* @module Media
*/


export interface AudioSourceId {
 file: string;
 element: HTMLAudioElement;
}

/**
* The list of all the audio sources created in the page.
*/
const audioSources = new Map<string, HTMLAudioElement[]>();

/**
*
* @param file The audio field to play.
* @param multiple By default, this function will reuse the existing audio element if the given file has already been played, stopping it
* if it's still playing. If enabled and the audio element is still playing, a new one will be created.
* @param loop If enabled, make the given sound play repeatedly.
* @example
* playSound('click.mp3', true, false);
*/
export function playSound(file: string, multiple = false, loop = false): HTMLAudioElement {
  let audioElements = audioSources.get(file);
  if (!audioElements) {
    audioElements = new Array<HTMLAudioElement>();
    audioSources.set(file, audioElements);
  }

  if (!multiple) {
    // If an audio element already exists for the given sound, restart the playing audio
    if (audioElements.length > 0) {
      audioElements[0].currentTime = 0;
    }
    else {
      const audio = new Audio(file);
      audioElements.push(audio);
    }

    audioElements[0].loop = loop;
    audioElements[0].play();
    return audioElements[0];
  }
  else {
    let audio: HTMLAudioElement | null = null;

    // For each audio element created for the given sound file
    for (const tmpAudio of audioElements) {
      // If one of them is not playing, reuse it to play the file from start
      if (tmpAudio.paused) {
        audio = tmpAudio
        tmpAudio.currentTime = 0;
        break;
      }
    }

    if (!audio) {
      audio = new Audio(file);
      audioElements.push(audio);
    }

    audio.loop = loop;
    audio.play();
    return audio;
  }
}