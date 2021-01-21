import { createStore } from 'vuex';

function createAudio(track, commit) {
  const audio = new Audio(track.source);
  audio.onloadedmetadata = function () {
    commit('SET_DURATION', audio.duration);
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
    currentTime: '00:00',
    interval: null,
    songTime: 0,
    percent: 0,
  },
  getters: {
    getTracks: (state) => state.tracks,
    getTrack: (state) => state.track,
    getAudio: (state) => state.audio,
    getPlaying: (state) => state.playing,
    getDuration: (state) => state.duration,
    getCurrentTime: (state) => state.currentTime,
    getPercent: (state) => state.percent,
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
    SET_CURRENT_TIME(state, payload) {
      state.currentTime = payload;
    },
    SET_PERCENT(state, payload) {
      state.percent = payload;
    },
  },
  actions: {
    setTrack({
      commit,
      state,
    }, payload) {
      let audio = null;
      let track = null;
      if (!payload) { // inicio
        const index = 1;
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
    }, track) {
      let index = state.tracks.findIndex((song) => song.source === track.value.source) - 1;
      if (index === -1) {
        index = (state.tracks.length - 1);
      }
      const newTrack = state.tracks[index];
      dispatch('stop');
      const audio = createAudio(newTrack, commit);
      commit('SET_AUDIO', audio);
      commit('SET_TRACK', newTrack);
    },
    next({
      commit,
      state,
      dispatch,
    }, track) {
      let index = state.tracks.findIndex((song) => song.source === track.value.source) + 1;
      if (index === state.tracks.length) {
        index = 0;
      }
      const newTrack = state.tracks[index];
      dispatch('stop');
      const audio = createAudio(newTrack, commit);
      commit('SET_AUDIO', audio);
      commit('SET_TRACK', newTrack);
    },
    play({
      commit,
      state,
    }) {
      commit('SET_PLAYING', true);
      state.audio.play();
      state.interval = setInterval(() => {
        state.songTime += 1;
        const minutes = Math.floor((state.songTime % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(state.songTime % 3600 % 60).toString().padStart(2, '0');
        commit('SET_CURRENT_TIME', `${minutes}:${seconds}`);
        commit('SET_PERCENT', (state.songTime * 100) / state.duration);
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
      state.audio.pause();
      state.audio.currentTime = 0;
      state.songTime = 0;
      commit('SET_CURRENT_TIME', '00:00');
      commit('SET_PERCENT', 0);
      clearInterval(state.interval);
    },
    setVolume({
      state,
    }, payload) {
      state.audio.volume = payload;
    },
  },
});

export default store;
