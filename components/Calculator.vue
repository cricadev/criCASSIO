<script setup lang="ts">

/* 1. Display area must show the current calculation and result
  2. each number button must add the number to the display
  3. each arithmetic button must add the symbol to the display
  4. the clear button must clear the display and reset the calculator
  5. the equal button must calculate the result
  6. the decimal button must add a decimal point to the display

*/

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      handleButtonNumber({ target: { innerText: e.key } });
    }
    else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
      handleArithmeticButton({ target: { innerText: e.key } });
    }
    else if (e.key === ".") {
      handleDecimalButton();
    }
    else if (e.key === "Enter") {
      performCalculations();
    }
    else if (e.key === "Backspace") {
      display.value = display.value.slice(0, -1);
    }
    else if (e.key === "Escape") {
      clearAndResetCalculator();
    }
  });
})
const display = ref("");
const arithmeticSymbols = ["+", "-", "*", "/", "."];
const handleButtonNumber = (num) => {

  if (display.value == "" && num == "0") {
    return;
  }
  display.value += num;
};
const clearAndResetCalculator = () => {
  display.value = "";
};

const lastArithmeticSymbol = ref(null);
const lastButtonClicked = ref(null)
const handleArithmeticButton = (arith) => {
  let value = arith;
  if (display.value === "") {
    return;
  }
  else if (arithmeticSymbols.includes(display.value.slice(-1))) {
    lastArithmeticSymbol.value = value;
    display.value = display.value.slice(0, -1);
    display.value += value;
  }
  else if (!isNaN(Number(display.value.slice(-1)))) {
    lastArithmeticSymbol.value = null;
    display.value += value;
  }
  else {
    display.value += value
  }
};
const performCalculations = () => {
  if (display.value === "") {
    return;
  }
  else if (lastArithmeticSymbol.value) {
    const result = eval(display.value.slice(0, -1));
    display.value = result + '';
  }
  else if (arithmeticSymbols.includes(display.value.slice(-1))) {
    display.value = display.value.slice(0, -1);
    display.value = eval(display.value);
  }
  else {
    const result = eval(display.value);
    if (result === Infinity || result === -Infinity) {
      display.value = "Error: Division by zero";
    }
    else {
      display.value = result + '';
    }
  }
}

const handleDecimalButton = () => {
  if (display.value === "") {
    display.value = "0.";
  }
  else if (arithmeticSymbols.includes(display.value.slice(-1))) {
    return;
  }
  else {
    let lastNumber = "";
    for (let i = display.value.length - 1; i >= 0; i--) {
      const char = display.value.charAt(i);
      if (arithmeticSymbols.includes(char)) {
        lastNumber = display.value.slice(i + 1);
        break;
      }
    }
    if (lastNumber.includes(".")) {
      return;
    }
    else if (display.value.slice(-1) === ".") {
      return;
    }
    else if (display.value.match(/\d+\.\d*$/)) {
      return;
    }
    else {
      display.value += ".";
    }
  }
};
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const alpha = ref(1);

const colorMatrix = computed(() => {
  let baseValues = isDark.value
    ? [0, 0, 0, 0, 0.5, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5]
    : [0, 0, 0, 0, 0.2125, 0, 0, 0, 0.192252, 0, 0, 0, 0, 0.138125];
  return [...baseValues, 0, 0, 0, alpha.value, 0].join(" ");
});
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
</script>
<template>
  <div class="">
    <div class="overflow-x-hidden overflow-y-hidden wrapper-calculator">
      <div class="flex justify-center w-full gap-4">
        <NuxtLink class="link" active-class="link--active" to="/calculator">Calculator</NuxtLink>
        <NuxtLink active-class="link--active" class="link" to="/convertor">Convertor</NuxtLink>
      </div>
      <div class="display-area ">
        <div class="display">
          <div class="display-text">
            <span>{{ display }}</span>
          </div>
        </div>
      </div>
      <div class="grid-calculator">
        <svg @click="clearAndResetCalculator" class="number--ac" xmlns="http://www.w3.org/2000/svg" width="109"
          height="99" viewBox="0 0 109 99" fill="none">

          <g filter="url(#filter0_d_134_505)">
            <path class="svg-path-numArith"
              d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
          </g>
          <defs>
            <filter id="filter0_d_134_505" x="0.606405" y="0.949829" width="108.037" height="97.8501"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="sourceAlpha" type="matrix" :values="colorMatrix" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" :values="colorMatrix" />

              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_134_505" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_134_505" result="shape" />
            </filter>
          </defs>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">AC</text>

        </svg>
        <svg @click="handleArithmeticButton('%')" class="number--modulo" xmlns="http://www.w3.org/2000/svg" width="109"
          height="99" viewBox="0 0 109 99" fill="none">
          <g filter="url(#filter0_d_134_505)">
            <path class="svg-path-numArith"
              d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
          </g>
          <defs>
            <filter id="filter0_d_134_505" x="0.606405" y="0.949829" width="108.037" height="97.8501"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="sourceAlpha" type="matrix" :values="colorMatrix" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" :values="colorMatrix" />

              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_134_505" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_134_505" result="shape" />
            </filter>
          </defs>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">%</text>
        </svg>

        <svg @click="handleArithmeticButton('/')" class="number--division" xmlns="http://www.w3.org/2000/svg" width="109"
          height="99" viewBox="0 0 109 99" fill="none">
          <g filter="url(#filter0_d_134_505)">
            <path class="svg-path-numArith"
              d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
          </g>
          <defs>
            <filter id="filter0_d_134_505" x="0.606405" y="0.949829" width="108.037" height="97.8501"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="sourceAlpha" type="matrix" :values="colorMatrix" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" :values="colorMatrix" />

              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_134_505" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_134_505" result="shape" />
            </filter>
          </defs>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">/</text>
        </svg>

        <svg @click="handleArithmeticButton('*')" class="number--mul" xmlns="http://www.w3.org/2000/svg" width="109"
          height="99" viewBox="0 0 109 99" fill="none">
          <g filter="url(#filter0_d_134_505)">
            <path class="svg-path-numArith"
              d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
          </g>
          <defs>
            <filter id="filter0_d_134_505" x="0.606405" y="0.949829" width="108.037" height="97.8501"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="sourceAlpha" type="matrix" :values="colorMatrix" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" :values="colorMatrix" />

              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_134_505" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_134_505" result="shape" />
            </filter>
          </defs>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">X</text>
        </svg>

        <svg @click="handleArithmeticButton('-')" class="number--minus" xmlns="http://www.w3.org/2000/svg" width="109"
          height="99" viewBox="0 0 109 99" fill="none">
          <g filter="url(#filter0_d_134_505)">
            <path class="svg-path-numArith"
              d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
          </g>
          <defs>
            <filter id="filter0_d_134_505" x="0.606405" y="0.949829" width="108.037" height="97.8501"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="sourceAlpha" type="matrix" :values="colorMatrix" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" :values="colorMatrix" />

              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_134_505" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_134_505" result="shape" />
            </filter>
          </defs>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">-</text>
        </svg>

        <svg @click="handleArithmeticButton('+')" class="number--plus" xmlns="http://www.w3.org/2000/svg" width="109"
          height="99" viewBox="0 0 109 99" fill="none">
          <g filter="url(#filter0_d_134_505)">
            <path class="svg-path-numArith"
              d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
          </g>
          <defs>
            <filter id="filter0_d_134_505" x="0.606405" y="0.949829" width="108.037" height="97.8501"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="sourceAlpha" type="matrix" :values="colorMatrix" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" :values="colorMatrix" />

              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_134_505" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_134_505" result="shape" />
            </filter>
          </defs>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">+</text>
        </svg>

        <svg @click="handleButtonNumber(number)" :class="'number--' + number" v-for="number in numbers" :key="number"
          class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 99" fill="none">

          <g filter="url(#filter0_d_134_505)">
            <path class="svg-path-number"
              d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
          </g>
          <defs>
            <filter id="filter0_d_134_505" x="0.606405" y="0.949829" width="108.037" height="97.8501"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" :values="colorMatrix" result="hardAlpha" />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" :values="colorMatrix" />

              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_134_505" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_134_505" result="shape" />
            </filter>
          </defs>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-number">{{ number
          }}</text>

        </svg>
        <svg @click="handleDecimalButton" class="number--dot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 99"
          fill="none">

          <g filter="url(#filter0_d_134_505)">
            <path class="svg-path-number"
              d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
          </g>
          <defs>
            <filter id="filter0_d_134_505" x="0.606405" y="0.949829" width="108.037" height="97.8501"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="sourceAlpha" type="matrix" :values="colorMatrix" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" :values="colorMatrix" />

              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_134_505" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_134_505" result="shape" />
            </filter>
          </defs>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-number">.</text>

        </svg>
        <svg @click="performCalculations" class="number--equal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 99"
          fill="none">

          <g filter="url(#filter0_d_134_505)">
            <path class="svg-path-result"
              d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
          </g>
          <defs>
            <filter id="filter0_d_134_505" x="0.606405" y="0.949829" width="108.037" height="97.8501"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="sourceAlpha" type="matrix" :values="colorMatrix" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" :values="colorMatrix" />

              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_134_505" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_134_505" result="shape" />
            </filter>
          </defs>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-result">=</text>

        </svg>


      </div>
    </div>
    <div class="absolute top-0 left-0 z-20 w-full h-full pointer-events-none bg-image"></div>

  </div>
</template>
<style scoped>
.bg-image {
  background-image: url("/bg.png");
  background-size: cover;
  background-position: center;
}

.number--ac {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.number--7 {
  grid-column: 1 / 3;
  grid-row: 3 / 5;
}

.number--4 {
  grid-column: 1 / 3;
  grid-row: 5 / 7;
}

.number--1 {
  grid-column: 1 / 3;
  grid-row: 7 / 9;
}

.number--0 {
  grid-column: 1 / 3;
  grid-row: 9 / 11;
}

.number--modulo {
  grid-column: 2 / 5;
  grid-row: 2 / 4;
}

.number--8 {
  grid-column: 2 / 5;
  grid-row: 4 / 6;
}

.number--5 {
  grid-column: 2 / 5;
  grid-row: 6 / 8;
}

.number--2 {
  grid-column: 2 / 5;
  grid-row: 8 / 10;
}

.number--division {
  grid-column: 4/6;
  grid-row: 1 / 3;
}

.number--9 {
  grid-column: 4/6;
  grid-row: 3 / 5;
}

.number--6 {
  grid-column: 4/6;
  grid-row: 5 / 7;
}

.number--3 {
  grid-column: 4/6;
  grid-row: 7 / 9;
}

.number--dot {
  grid-column: 4/6;
  grid-row: 9 / 11;
}

.number--mul {
  grid-column: 5 / 8;
  grid-row: 2 / 4;
}

.number--minus {
  grid-column: 5 / 8;
  grid-row: 4 / 6;
}

.number--plus {
  grid-column: 5 / 8;
  grid-row: 6 / 8;
}

.number--equal {
  grid-column: 5 / 8;
  grid-row: 8 / 10;
}
</style>