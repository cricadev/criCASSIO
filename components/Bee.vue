<template>
  <img src="/bee.gif" class="absolute z-50" ref="bee" alt="Your GIF">
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
const { width: screenWidth, height: screenHeight } = useWindowSize();


const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const bee = ref(null);
const speed = ref(100)
const x = ref(0);
const y = ref(0);

onMounted(() => {
  if (bee.value) {
    spawnBee();
  }
})

const spawnBee = () => {
  const rect = bee.value.getBoundingClientRect();
  x.value = getRandomArbitrary(0, screenWidth.value - rect.width);
  y.value = getRandomArbitrary(0, screenHeight.value - rect.height);
  bee.value.style.left = `${x.value}px`;
  bee.value.style.top = `${y.value}px`;
}



// lastTime so we can check the time it was when we first call the func,
let lastTime = null;
//  direction so we can control it later on the func,
let directionX = 1;
let directionY = 1;
//  timeSinceDirectionChange so we can change the direction randomly after some seconds have passed 
let timeSinceDirectionChange = 0;

const moveBee = (time) => {


  // we assing the first time when we call the function since we are calling it as a callback function of requestAnimationFrame a webAPI
  if (lastTime === null) {
    lastTime = time;
  }
  // The elapsed variable represents the time elapsed between the current frame and the previous frame, in milliseconds. 
  const elapsed = time - lastTime;

  // we calculate the distance the fish has moved multiplying the speed by the elapsed time and we divided by 1000 so we convert the elapsed time from miliseconds to seconds. the elapsed variable is in milliseconds, while the speed variable is in pixels per second, so we need to convert the elapsed time to seconds to get the correct distance that the fish should move
  const distance = speed.value * elapsed / 1000;

  //.

  // we sum the distance and multiply by the direction we want to go, right now it only goes left and right but we want to make it go diagonals too
  x.value += distance * directionX;
  y.value += distance * directionY;

  // we can only apply styles if fishEl exists right?
  if (bee.value) {
    // with this statement we prevent the fish X coordinate going farther than the left side of the screen 
    if (x.value < 0) {
      x.value = 0;
      directionX = 1;
    }
    else if (y.value < 0) {
      y.value = 0;
      directionY = 1;
    }
    else if (y.value > screenHeight.value - bee.value.height) {
      y.value = screenHeight.value - bee.value.height;
      directionY = -1;
    }
    // here is the same thing but for the right side 
    else if (x.value > screenWidth.value - bee.value.width) {
      x.value = screenWidth.value - bee.value.width;
      directionX = -1;
    }
    // we apply the style left that will works for both left and right since x can be negative value also when direction is negative, maths son!
    bee.value.style.left = `${x.value}px`;
    bee.value.style.top = `${y.value}px`;

    // if direction is equals -1 then we scaleX -1 so it flips, this is a common trick in game Dev
    if (directionX === -1) {
      bee.value.style.transform = 'scaleX(1)';
    } else {
      bee.value.style.transform = 'scaleX(-1)';

    }




    // some time have elapsed between the things that happened above so we update the lastTime
    lastTime = time;
    // we calculate the time that has passed so we can change the direction randomly
    timeSinceDirectionChange += elapsed;
    if (timeSinceDirectionChange > 10000) {
      directionX = Math.random() < 0.5 ? -1 : 1;
      directionY = Math.random() < 0.5 ? -1 : 1;

      timeSinceDirectionChange = 0;
    }
  }
  requestAnimationFrame(moveBee);
};
watch(bee, () => {
  requestAnimationFrame(moveBee);
})
</script>

<style></style>

