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
      handleButtonNumber(e.key);
    }
    else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
      handleArithmeticButton(e.key);
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
const result = ref("");
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
  result.value = "";


};

const lastArithmeticSymbol = ref(null);
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
    result.value = eval(display.value.slice(0, -1));
  }
  else if (arithmeticSymbols.includes(display.value.slice(-1))) {
    display.value = display.value.slice(0, -1);
    display.value = eval(display.value);
  }
  else {
    const initResult = eval(display.value);

    if (initResult === Infinity || initResult === -Infinity) {
      result.value = "Error: Division by zero";
    }
    else {
      result.value = initResult
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
12

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
</script>
<template>
  <div class="overflow-x-hidden overflow-y-hidden wrapper-calculator">
    <Bee />
    <div class="bg-image"></div>

    <div class="display-area">

      <Transition><span class="3xl:text-3xl text-[#A67224] text-base lg:text-xl dark:text-[#AA8143]" v-if="display">{{
        display
      }}</span>
      </Transition>
      <Transition>
        <span class="text-4xl lg:text-5xl 3xl:text-6xl text-result dark:text-number" v-if="result">{{ result }}</span>
      </Transition>
    </div>
    <div class="grid-calculator">
      <svg id="svg" @click="clearAndResetCalculator" class="number--ac" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 109 99" fill="none">
        <path class="svg-path-numArith"
          d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">AC</text>
      </svg>
      <svg id="svg" @click="handleArithmeticButton('%')" class="number--modulo" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 109 99" fill="none">
        <path class="svg-path-numArith"
          d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />

        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">%</text>
      </svg>

      <svg id="svg" @click="handleArithmeticButton('/')" class="number--division" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 109 99" fill="none">

        <path class="svg-path-numArith"
          d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />



        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">/</text>
      </svg>

      <svg id="svg" @click="handleArithmeticButton('*')" class="number--mul" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 109 99" fill="none">

        <path class="svg-path-numArith"
          d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />



        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">X</text>
      </svg>

      <svg id="svg" @click="handleArithmeticButton('-')" class="number--minus" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 109 99" fill="none">

        <path class="svg-path-numArith"
          d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />



        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">-</text>
      </svg>

      <svg id="svg" @click="handleArithmeticButton('+')" class="number--plus" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 109 99" fill="none">

        <path class="svg-path-numArith"
          d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />



        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-numArith">+</text>
      </svg>

      <svg id="svg" @click="handleButtonNumber(number)" :class="'number--' + number" v-for="number in numbers"
        :key="number" class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 99" fill="none">


        <path class="svg-path-number"
          d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />



        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-number">{{ number
        }}</text>

      </svg>
      <svg id="svg" @click="handleDecimalButton" class="number--dot" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 109 99" fill="none">


        <path class="svg-path-number"
          d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />



        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-number">.</text>

      </svg>
      <svg id="svg" @click="performCalculations" class="number--equal" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 109 99" fill="none">


        <path class="svg-path-result"
          d="M6.2141 51.8749C4.07051 48.1621 4.07051 43.5877 6.2141 39.8749L25.2234 6.94981C27.367 3.237 31.3285 0.949814 35.6157 0.949814H73.6343C77.9215 0.949814 81.883 3.237 84.0266 6.94981L103.036 39.8749C105.179 43.5877 105.179 48.1621 103.036 51.8749L84.0266 84.7999C81.883 88.5128 77.9215 90.7999 73.6343 90.7999H35.6157C31.3285 90.7999 27.367 88.5128 25.2234 84.7999L6.2141 51.8749Z" />



        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text-result">=</text>

      </svg>


    </div>
  </div>
</template>
<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
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