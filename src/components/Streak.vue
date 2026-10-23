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
  padding: 1.2rem;
  color: #111111;
  background: #fff;
  border: 2px solid #111111;
  border-radius: 0;
  box-shadow: none;
}

.streak h2 {
  margin-top: 0;
}

.streak__count {
  margin: 0 0 0.8rem;
  font-size: 1.1rem;
}

.streak__count strong {
  color: #6a311d;
  font-size: 2.4rem;
  font-family: Hill, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

.streak__quote {
  margin: 0;
  color: #404040;
  font-style: italic;
}
</style>
