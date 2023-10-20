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
const handleButtonNumber = (e) => {
  if (display.value == "" && e.target.innerText == "0") {
    return;
  }
  display.value += e.target.innerText;
};
const clearAndResetCalculator = () => {
  display.value = "";
};

const lastArithmeticSymbol = ref(null);
const lastButtonClicked = ref(null)
const handleArithmeticButton = (e) => {
  let value = e.target.innerText;
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
    display.value = eval(display.value.slice(0, -1));
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
      display.value = result;
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
</script>
<template>
  <div class="">
    <div
      class="relative z-10 w-full h-screen bg-gradient-to-b from-number to-gradStops dark:from-gradInitDark dark:to-gradEndDark font-Aldrich">
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
        <button class="number--ac button button--arithmetic" @click="clearAndResetCalculator">AC</button>
        <button class="button button--arithmetic number--modulo" @click="handleArithmeticButton">%</button>
        <button class="button button--arithmetic number--division" @click="handleArithmeticButton">/</button>
        <button class="button button--arithmetic number--mul" @click="handleArithmeticButton">X</button>
        <button class="button button--arithmetic number--minus" @click="handleArithmeticButton">-</button>
        <button class="button button--arithmetic number--plus" @click="handleArithmeticButton">+</button>


        <button class="button button-number" @click="handleButtonNumber" :class="'number--' + number" v-for="number in 9"
          :key="number">{{ number
          }}</button>
        <button class="button button-number number--0" @click="handleButtonNumber">0</button>
        <button class="button button-number number--dot" @click="handleDecimalButton">.</button>
        <button class="button button-result number--equal" @click="performCalculations">=</button>

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

.number--8 {
  grid-column: 3 / 5;
  grid-row: 4 / 6;
}

.number--5 {
  grid-column: 3 / 5;
  grid-row: 6 / 8;
}

.number--2 {
  grid-column: 3 / 5;
  grid-row: 8 / 10;
}

.number--9 {
  grid-column: 5 / 7;
  grid-row: 3 / 5;
}

.number--6 {
  grid-column: 5 / 7;
  grid-row: 5 / 7;
}

.number--3 {
  grid-column: 5 / 7;
  grid-row: 7 / 9;
}

.number--equal {
  grid-column: 7 / 9;
  grid-row: 8 / 10;
}

.number--dot {
  grid-column: 5 / 7;
  grid-row: 9 / 11;
}

.number--modulo {
  grid-column: 3 / 5;
  grid-row: 2 / 4;
}

.number--division {
  grid-column: 5 / 7;
  grid-row: 1 / 3;
}

.number--mul {
  grid-column: 7 / 9;
  grid-row: 2 / 4;
}

.number--minus {
  grid-column: 7 / 9;
  grid-row: 4 / 6;
}

.number--plus {
  grid-column: 7 / 9;
  grid-row: 6 / 8;
}
</style>