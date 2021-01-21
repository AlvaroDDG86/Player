<template>
  <div class="track"
    @click="play"
    :class="{ 'pulse' : playing, 'selected': current }"
    :style="{ background: `
      linear-gradient(to left,  rgba(255,255,255,0) 20%, rgba(255,255,255,1)),
      url(${track.cover})`}">
    <div class="track__actions">
    <div class='track__button' @click.stop='stop'>
      <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-player-stop"
      width="20"
      height="20"
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
    <div class='track__button' v-if="!playing" @click.stop='play'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        class='icon icon-tabler icon-tabler-player-play'
        width='20'
        height='20'
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
    <div class='track__button' v-else @click.stop='pause'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-player-pause"
        width="20"
        height="20"
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
    </div>
    <div class="track__info">
      <div class="track__artist">
        {{track.artist}}
      </div>
      <div class="track__title">
        {{track.name}}
      </div>
      <div class="track__info-time">
        {{currentTime ? `${currentTime} - ${duration}` : ''}}
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  props: {
    track: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const current = computed(() => store.getters.getTrack.source === props.track.source);
    const playing = computed(() => store.getters.getPlaying
      && store.getters.getTrack.source === props.track.source);
    const duration = computed(() => {
      if (store.getters.getTrack.source === props.track.source) {
        return store.getters.getDuration;
      }
      return '';
    });
    const currentTime = computed(() => {
      if (store.getters.getTrack.source === props.track.source) {
        return store.getters.getCurrentTime;
      }
      return '';
    });
    let fromPause = false;

    function play() {
      if (!fromPause) {
        store.dispatch('setTrack', props.track);
        fromPause = false;
      }
      store.dispatch('play');
    }

    function pause() {
      fromPause = true;
      store.dispatch('pause');
    }

    function stop() {
      store.dispatch('stop');
    }

    return {
      current,
      playing,
      duration,
      currentTime,
      play,
      pause,
      stop,
    };
  },
};
</script>
<style scoped lang='scss'>
.track {
  text-align: left;
  color: white;
  background: $light-gray;
  padding: 10px;
  border-radius: 5px;
  margin: 2px 5px;
  display: grid;
  grid-template-columns: 20% 80%;
  cursor: pointer;

  &__button {
    cursor: pointer;
  }

  &__artist {
    color: $primary;
    font-weight: bold;
  }

  &__title {
    color: $light-gray;
  }

  &__info-time {
    font-size: 1.1em;
  }
}

.selected {
  border: 3px solid gold;
}
</style>
