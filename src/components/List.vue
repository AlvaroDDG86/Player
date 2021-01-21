<template>
  <div class="list" :class="{ 'hide': listClosed }">
    <div class="list__title">
      List track

    </div>
    <span @click="closeList" class="list__close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-arrow-loop-left"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M13 21v-13a4 4 0 1 1 4 4h-13" />
        <path d="M7 15l-3 -3l3 -3" />
      </svg>
    </span>
    <Track
      v-for="(track, index) in tracks"
      class="list__track"
      :key="`track_${index}`"
      :track="track"
      @play="playTrack($index)"
      @stop="stopTrack($index)"/>
  </div>
</template>

<script>
import Track from './ListTrack.vue';

export default {
  components: {
    Track,
  },
  props: {
    listClosed: {
      type: Boolean,
      required: true,
    },
    tracks: {
      type: [],
      required: true,
    },
  },
  setup(_, { emit }) {
    function closeList() {
      emit('hide');
    }

    function playTrack(index) {
      emit('playTrack', index);
    }

    function stopTrack(index) {
      emit('stopTrack', index);
    }

    return {
      closeList,
      playTrack,
      stopTrack,
    };
  },
};
</script>

<style scoped lang='scss'>
.list {
  border-radius: 10px;
  padding: 1em;
  width: $width;
  height: $height;
  position: absolute;
  right: 0;
  top: 0;
  background: $primary-alpha;
  overflow-y: auto;
  transition: .5s ease-in-out;
  z-index: 10;

  &__title {
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.3em;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
}
.hide {
  transform: translate(calc(#{-$width} - #{2 * $em}));
}
</style>
