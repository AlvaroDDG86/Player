import { createStore } from 'vuex';

function createAudio(track, commit) {
  const audio = new Audio(track.source);
  audio.onloadedmetadata = function () {
    const minutes = Math.floor((audio.duration % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(audio.duration % 3600 % 60).toString().padStart(2, '0');
    commit('SET_DURATION', `${minutes}:${seconds}`);
    commit('SET_SECONDS_DURATION', audio.duration);
  };
  return audio;
}

const store = createStore({
  state: {
    tracks: [
      {
        name: 'Mekanın Sahibi',
        artist: 'Norm Ender',
        cover:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg',
        source:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3',
        url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
        favorited: false,
      },
      {
        name: 'Everybody Knows',
        artist: 'Leonard Cohen',
        cover:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg',
        source:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3',
        url: 'https://www.youtube.com/watch?v=Lin-a2lTelg',
        favorited: true,
      },
      {
        name: 'Extreme Ways',
        artist: 'Moby',
        cover:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg',
        source:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3',
        url: 'https://www.youtube.com/watch?v=ICjyAe9S54c',
        favorited: false,
      },
      {
        name: 'Butterflies',
        artist: 'Sia',
        cover:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg',
        source:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3',
        url: 'https://www.youtube.com/watch?v=kYgGwWYOd9Y',
        favorited: false,
      },
      {
        name: 'The Final Victory',
        artist: 'Haggard',
        cover:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg',
        source:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3',
        url: 'https://www.youtube.com/watch?v=0WlpALnQdN8',
        favorited: true,
      },
      {
        name: 'Genius ft. Sia, Diplo, Labrinth',
        artist: 'LSD',
        cover:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg',
        source:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3',
        url: 'https://www.youtube.com/watch?v=HhoATZ1Imtw',
        favorited: false,
      },
      {
        name: 'The Comeback Kid',
        artist: 'Lindi Ortega',
        cover:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg',
        source:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3',
        url: 'https://www.youtube.com/watch?v=me6aoX0wCV8',
        favorited: true,
      },
      {
        name: 'Overdose',
        artist: 'Grandson',
        cover:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg',
        source:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3',
        url: 'https://www.youtube.com/watch?v=00-Rl3Jlx-o',
        favorited: false,
      },
      {
        name: 'Rag\'Bone Man',
        artist: 'Human',
        cover:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg',
        source:
          'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3',
        url: 'https://www.youtube.com/watch?v=L3wKzyIN1yk',
        favorited: false,
      },
    ],
    track: {
      name: 'Mekanın Sahibi',
      artist: 'Norm Ender',
      cover:
        'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg',
      source:
        'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3',
      url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
      favorited: false,
    },
    audio: null,
    playing: false,
    duration: 0,
    secondsDuration: 0,
    currentTime: '00:00',
    interval: null,
    songTime: 0,
    percent: 0,
    repeat: 3,
    volume: 50,
  },
  getters: {
    getTracks: (state) => state.tracks,
    getTrack: (state) => state.track,
    getAudio: (state) => state.audio,
    getPlaying: (state) => state.playing,
    getDuration: (state) => state.duration,
    getSecondsDuration: (state) => state.secondsDuration,
    getCurrentTime: (state) => state.currentTime,
    getPercent: (state) => state.percent,
    getRepeat: (state) => state.repeat,
  },
  mutations: {
    SET_TRACK(state, payload) {
      state.track = payload;
    },
    SET_AUDIO(state, payload) {
      state.audio = payload;
    },
    SET_PLAYING(state, payload) {
      state.playing = payload;
    },
    SET_DURATION(state, payload) {
      state.duration = payload;
    },
    SET_SECONDS_DURATION(state, payload) {
      state.secondsDuration = payload;
    },
    SET_CURRENT_TIME(state, payload) {
      state.currentTime = payload;
    },
    SET_PERCENT(state, payload) {
      state.percent = payload;
    },
    SET_TIME_SONG(state, payload) {
      state.audio.currentTime = payload;
    },
    SET_REPEAT(state, payload) {
      state.repeat = payload;
    },
    SET_VOLUME(state, payload) {
      state.volume = payload;
    },
  },
  actions: {
    setTrack({
      commit,
      state,
      dispatch,
    }, payload) {
      let audio = null;
      let track = null;
      dispatch('stop');
      if (!payload) { // inicio
        const index = Math.floor(Math.random() * state.tracks.length);
        audio = createAudio(state.tracks[index], commit);
        track = state.tracks[index];
      } else {
        audio = createAudio(payload, commit);
        track = payload;
      }
      commit('SET_AUDIO', audio);
      commit('SET_TRACK', track);
    },
    prev({
      commit,
      state,
      dispatch,
    }) {
      let index = state.tracks.findIndex((song) => song.source === state.track.source) - 1;
      if (index === -1) {
        index = (state.tracks.length - 1);
      }
      const newTrack = state.tracks[index];
      dispatch('stop');
      const audio = createAudio(newTrack, commit);
      commit('SET_AUDIO', audio);
      commit('SET_TRACK', newTrack);
      dispatch('play');
    },
    next({
      commit,
      state,
      dispatch,
    }) {
      let index = state.tracks.findIndex((song) => song.source === state.track.source) + 1;
      if (index === state.tracks.length) {
        index = 0;
      }
      const newTrack = state.tracks[index];
      dispatch('stop');
      const audio = createAudio(newTrack, commit);
      audio.volume = state.volume;
      commit('SET_AUDIO', audio);
      commit('SET_TRACK', newTrack);
      dispatch('play');
    },
    play({
      commit,
      state,
      dispatch,
    }) {
      commit('SET_PLAYING', true);
      state.audio.play();
      state.interval = setInterval(() => {
        state.songTime += 1;
        const minutes = Math.floor((state.songTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(state.songTime % 3600 % 60).toString().padStart(2, '0');
        commit('SET_CURRENT_TIME', `${minutes}:${seconds}`);
        commit('SET_PERCENT', (state.songTime * 100) / state.audio.duration);
        if (Math.floor((state.songTime * 100) / state.audio.duration) === 100) {
          switch (state.repeat) {
            case 1: // nothing
              dispatch('stop');
              break;
            case 2: // repeat
              dispatch('stop');
              dispatch('play');
              break;
            case 3: // next
              dispatch('next');
              break;
            default:
              dispatch('stop');
              break;
          }
        }
      }, 1000);
    },
    pause({
      commit,
      state,
    }) {
      commit('SET_PLAYING', false);
      state.audio.pause();
      clearInterval(state.interval);
    },
    stop({
      commit,
      state,
    }) {
      commit('SET_PLAYING', false);
      commit('SET_CURRENT_TIME', '00:00');
      commit('SET_PERCENT', 0);
      if (state.audio) {
        state.songTime = 0;
        state.audio.pause();
        state.audio.currentTime = 0;
        clearInterval(state.interval);
      }
    },
    setVolume({
      state,
    }, payload) {
      this.commit('SET_VOLUME', payload);
      state.audio.volume = payload;
    },
    setTimeSong({
      commit,
      state,
    }, payload) {
      state.songTime = parseInt(payload.currentTime, 10);
      commit('SET_TIME_SONG', payload.currentTime);
      commit('SET_PERCENT', payload.percent);
    },
    setRepeat({
      commit,
    }, payload) {
      commit('SET_REPEAT', payload);
    },
  },
});

export default store;
