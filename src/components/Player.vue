<template>
  <div class='player' id='player' v-if="track">
    <List
      :listClosed="listClosed"
      @hide="listClosed = true"
      playTrack="playTrack"
      stopTrack="stopTrack"/>
    <div class='player__header'><strong>Vue</strong>Player</div>
    <div
      class='player__img'
      :style="{ backgroundImage: `url(${track.cover})` }"
      :class="{ 'pulse' : playing,
        'inRight animate' : animateLeft,
        'inLeft animate' : animateRight }" />
    <div class='player__info'>
      <div class='player__author'>{{track.artist}}</div>
      <div class='player__song'>{{track.name}}</div>
    </div>
    <div class="player__control">
      <div class='player__track'>
        <div class='player__actions'>
          <div class='player__button' @click="prev">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='icon icon-tabler icon-tabler-player-track-prev'
              width='36'
              height='36'
              viewBox='0 0 24 24'
              stroke-width='2'
              stroke='#005CC8'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M21 5v14l-8 -7z' />
              <path d='M10 5v14l-8 -7z' />
            </svg>
          </div>
          <div class='player__button' @click='stopSong'>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-player-stop"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#005CC8"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="5" y="5" width="14" height="14" rx="2" />
            </svg>
          </div>
          <div class='player__button' v-if="!playing" @click='playSong'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='icon icon-tabler icon-tabler-player-play'
              width='46'
              height='46'
              viewBox='0 0 24 24'
              stroke-width='2'
              stroke='#005CC8'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M7 4v16l13 -8z' />
            </svg>
          </div>
          <div class='player__button' v-else @click='pauseSong'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-player-pause"
              width="46"
              height="46"
              viewBox="0 0 24 24"
              stroke-width="2" stroke="#005CC8"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          </div>
          <div class='player__button' @click="next">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='icon icon-tabler icon-tabler-player-track-next'
              width='36'
              height='36'
              viewBox='0 0 24 24'
              stroke-width='2'
              stroke='#005CC8'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M3 5v14l8 -7z' />
              <path d='M14 5v14l8 -7z' />
            </svg>
          </div>
        </div>
        <div class='player__total'>{{duration}}</div>
        <div class='player__progress'>
          <span :style="{ width: `${percent}%` }"></span>
        </div>
        <div class='player__current'>{{timer}}</div>
        <div class='player__actions--down'>
          <div class='player__button' @click='openList'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-player-list"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#005CC8"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="9" y1="6" x2="20" y2="6" />
              <line x1="9" y1="12" x2="20" y2="12" />
              <line x1="9" y1="18" x2="20" y2="18" />
              <line x1="5" y1="6" x2="5" y2="6.01" />
              <line x1="5" y1="12" x2="5" y2="12.01" />
              <line x1="5" y1="18" x2="5" y2="18.01" />
            </svg>
          </div>
          <div class='player__button' @click='openLink'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-player-open"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#005CC8"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
              <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
            </svg>
          </div>
        </div>
      </div>
      <div class="player__volume">
        <input
          class="player__range"
          type="range"
          min="1"
          max="100"
          :value="volume"
          @change="volumeChange($event)"
        >
        <div class='player__button' @click="mute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-player-volume-3"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#005CC8"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path
              d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1
                -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8
                .8 0 0 1 -1.5 .5l-3.5 -4.5" />
            <path d="M16 10l4 4m0 -4l-4 4" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref, onMounted, computed,
} from 'vue';
import { useStore } from 'vuex';
import List from './List.vue';

export default {
  name: 'Player',
  components: {
    List,
  },
  setup() {
    // VUEX
    const store = useStore();
    const track = computed(() => store.getters.getTrack);
    const playing = computed(() => store.getters.getPlaying);
    const duration = computed(() => store.getters.getDuration);
    const timer = computed(() => store.getters.getCurrentTime);
    const percent = computed(() => store.getters.getPercent);
    const animateLeft = ref(false);
    const animateRight = ref(false);

    // List show control
    const listClosed = ref(true);

    // Volume
    const volume = ref(50);
    let oldVolume = 0;

    onMounted(() => {
      store.dispatch('setTrack');
    });

    function pauseSong() {
      store.dispatch('pause');
    }

    function playSong() {
      store.dispatch('play');
    }

    function stopSong() {
      store.dispatch('stop');
    }

    function next() {
      store.dispatch('next', track);
      animateLeft.value = true;
      setTimeout(() => {
        animateLeft.value = false;
      }, 1000);
    }

    function prev() {
      store.dispatch('prev', track);
      animateRight.value = true;
      setTimeout(() => {
        animateRight.value = false;
      }, 1000);
    }

    function volumeChange(event) {
      store.dispatch('setVolume', event.target.value / 100);
      volume.value = event.target.value;
    }

    function mute() {
      if (oldVolume !== 0) {
        store.dispatch('setVolume', oldVolume / 100);
        volume.value = oldVolume;
        oldVolume = 0;
      } else {
        store.dispatch('setVolume', 0);
        oldVolume = volume.value;
        volume.value = 0;
      }
    }

    function openLink() {
      window.open(track.value.url);
    }

    function openList() {
      listClosed.value = false;
    }

    return {
      track,
      playing,
      duration,
      timer,
      volume,
      listClosed,
      animateLeft,
      animateRight,
      percent,
      onMounted,
      next,
      prev,
      playSong,
      pauseSong,
      stopSong,
      volumeChange,
      mute,
      openLink,
      openList,
    };
  },
};
</script>

<style scoped lang='scss'>
.player {
  position: absolute;
  font-family: 'Montserrat', sans-serif;
  width: $width;
  height: $height;
  text-align: center;
  border-radius: 10px;
  padding: 1em;
  background-color: $light-gray;
  box-shadow: 10px 10px 13px gray;
  overflow: hidden;

  &__header {
    text-transform: uppercase;
    color: gray;
    font-size: 2em;
  }

  &__header > strong {
    color: $primary;
  }

  &__img {
    box-shadow: 0px 26px 24px -5px #6e777d;
    width: 100%;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 15px;
    left: 0;
    top: 0;
  }

  &__info {
    margin-top: 10px;
    text-align: left;
    width: 100%;
  }

  &__author {
    color: #005CC8;
    font-weight: bold;
    font-size: 1.5em;
  }

  &__song {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.5em;
    color: #363636;
    background: #363636;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }

  &__range {
    writing-mode: bt-lr; /* IE */
    -webkit-appearance: slider-vertical; /* WebKit */
    width: 8px;
    height: 140px;
    padding: 0 5px;
  }

  &__button {
    background: transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s;
    padding: 0.3em;
    margin: 0.2em;
    border-radius: 50%;
  }

  &__button:hover {
    background-color: rgba(204, 204, 204, 0.753);
    padding: 0.5em;
    margin: 0;
  }

  &__control {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 85% 15%;
  }

  &__track {
    height: 175px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 16px 14px -5px #6e777d;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__actions--down {
    display: flex;
    justify-content: flex-start;
  }

  &__total {
    text-align: right;
    padding: 3px 10px;
    font-weight: bold;
    font-size: 1.1em;
    color: $primary;
  }

  &__progress {
    height: 10px;
    position: relative;
    background: $light-gray;
    margin: 0 5px;
    border-radius: 5px;
  }

  &__progress > span {
    display: block;
    height: 100%;
    background-color: $primary;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
  }

  &__current {
    text-align: left;
    padding: 3px 10px;
    font-weight: bold;
    font-size: 0.8em;
    color: gray;
  }
}
</style>
