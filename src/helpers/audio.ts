// import sound_notification from '../assets/sounds/notification.mp3';

const sounds = {
  // notification: sound_notification,
};

// eslint-disable-next-line import/prefer-default-export
export async function play_sound(sound: keyof typeof sounds) {
  const audio = new Audio(sounds[sound]);
  try {
    await audio.play();
  } catch (error) {
    console.error(`Failed to play audio. Sound: ${sound} - ${error}`);
  }
}
