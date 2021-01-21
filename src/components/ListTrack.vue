<template>
  <div class="track"
    :style="{ background: `
      linear-gradient(to left,  rgba(255,255,255,0) 20%, rgba(255,255,255,1)),
      url(${track.cover})`}">
    <div class="track__actions">
    <div class='track__button' @click='stopSong'>
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
    <div class='track__button' v-if="true" @click='playSong'>
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
    <div class='track__button' v-else @click='pauseSong'>
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
    </div>
  </div>
</template>
<script>
export default {
  props: {
    track: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    function select() {
      emit('Selected');
    }

    function play() {
      emit('Play');
    }

    function stop() {
      emit('stop');
    }

    return {
      select,
      play,
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
}
</style>
