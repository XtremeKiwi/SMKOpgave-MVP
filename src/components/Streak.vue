<script setup lang="ts">
import { inject, ref } from 'vue'

interface StreakState {
  count: number
}

const streak = inject<StreakState>('streak')
const quotes = inject<string[]>('streakQuotes')
const completeTask = inject<() => void>('completeTask')

if (!streak) {
  throw new Error('Streak requires streak state to be provided by an ancestor.')
}

if (!quotes || quotes.length === 0) {
  throw new Error('Streak requires at least one quote to be provided by an ancestor.')
}

if (!completeTask) {
  throw new Error('Streak requires a task completion handler from an ancestor.')
}

const quoteList = quotes
const onCompleteTask = completeTask

function randomQuote(except?: string): string {
  const availableQuotes = quoteList.filter((quote) => quote !== except)
  const index = Math.floor(Math.random() * availableQuotes.length)
  return availableQuotes[index]
}

const quote = ref(randomQuote())

function markTaskComplete(): void {
  onCompleteTask()
  quote.value = randomQuote(quote.value)
}
</script>

<template>
  <section class="streak" aria-labelledby="streak-title">
    <h2 id="streak-title">Din opgavestime</h2>
    <p class="streak__count">
      <strong>{{ streak.count }}</strong>
      {{ streak.count === 1 ? 'opgave gennemført' : 'opgaver gennemført' }}
    </p>
    <p class="streak__quote">{{ quote }}</p>
  </section>
</template>

<style scoped>
.streak {
  width: min(100%, 34rem);
  margin: 1.25rem 0;
  padding: 1.25rem;
  color: #253044;
  background: #fff;
  border: 1px solid #dce2eb;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.9rem rgb(25 40 65 / 8%);
}

.streak h2 {
  margin-top: 0;
}

.streak__count {
  margin: 0;
  font-size: 1.25rem;
}

.streak__count strong {
  color: #526d99;
  font-size: 2rem;
}

.streak__quote {
  color: #68758a;
  font-style: italic;
}

.streak__button {
  padding: 0.65rem 1rem;
  color: #fff;
  background: #526d99;
  border: 0;
  border-radius: 0.5rem;
  cursor: pointer;
}

.streak__button:hover {
  background: #405a84;
}

.streak__button:focus-visible {
  outline: 3px solid #253044;
  outline-offset: 3px;
}
</style>
