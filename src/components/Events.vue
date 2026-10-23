<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'

const museumTasks = inject<string[]>('museumTasks')
const completeTask = inject<(points: number) => void>('completeTask')
const taskProgress = inject<{
  completed: Record<string, boolean>
  rewarded: Record<string, boolean>
}>('museumTaskProgress')

if (!museumTasks || museumTasks.length < 10) {
  throw new Error('Events requires at least 10 museum tasks to be provided by an ancestor.')
}

if (!completeTask) {
  throw new Error('Events requires a task completion handler from an ancestor.')
}

if (!taskProgress) {
  throw new Error('Events requires task progress to be provided by an ancestor.')
}

const awardPoints = completeTask
const progress = taskProgress
const today = ref(getDateKey(new Date()))
let midnightTimeout: ReturnType<typeof setTimeout> | undefined

function getDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function createDailyRandom(seed: string): () => number {
  let state = 0
  for (const character of seed) {
    state = (state * 31 + character.charCodeAt(0)) >>> 0
  }

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0x100000000
  }
}

function pointsForTask(task: string): number {
  let hash = 0
  for (const character of `${today.value}:${task}`) {
    hash = (Math.imul(hash, 31) + character.charCodeAt(0)) | 0
  }
  return 5 + (Math.abs(hash) % 16)
}

const dailyTasks = computed(() => {
  const random = createDailyRandom(today.value)
  const shuffledTasks = [...museumTasks]

  for (let index = shuffledTasks.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[shuffledTasks[index], shuffledTasks[swapIndex]] = [
      shuffledTasks[swapIndex],
      shuffledTasks[index]
    ]
  }

  return shuffledTasks.slice(0, 10).map((description) => ({
    description,
    points: pointsForTask(description)
  }))
})

function taskKey(task: string): string {
  return `${today.value}:${task}`
}

function updateTaskCompletion(task: string, event: Event): void {
  const isCompleted = (event.target as HTMLInputElement).checked
  const key = taskKey(task)

  if (!isCompleted) {
    progress.completed[key] = false
    return
  }

  progress.completed[key] = true
  if (!progress.rewarded[key]) {
    progress.rewarded[key] = true
    awardPoints(pointsForTask(task))
  }
}

function scheduleMidnightUpdate(): void {
  const now = new Date()
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  midnightTimeout = setTimeout(() => {
    today.value = getDateKey(new Date())
    scheduleMidnightUpdate()
  }, nextMidnight.getTime() - now.getTime())
}

onMounted(scheduleMidnightUpdate)

onUnmounted(() => {
  if (midnightTimeout !== undefined) {
    clearTimeout(midnightTimeout)
  }
})
</script>

<template>
  <section class="events" aria-labelledby="events-title">
    <h2 id="events-title">Dagens kunstjagt på SMK</h2>
    <p>Her er dagens 10 opgaver. Nye opgaver kommer ved midnat.</p>
    <ol class="events__list">
      <li v-for="(task, index) in dailyTasks" :key="task.description">
        <span class="events__number">{{ index + 1 }}</span>
        <label class="events__task" :class="{ 'events__task--completed': progress.completed[taskKey(task.description)] }">
          <input
            class="events__checkbox"
            type="checkbox"
            :checked="progress.completed[taskKey(task.description)]"
            :aria-label="`Markér opgaven som gennemført: ${task.description}`"
            @change="updateTaskCompletion(task.description, $event)"
          />
          <span>{{ task.description }}</span>
        </label>
        <strong class="events__points">+{{ task.points }} point</strong>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.events {
  max-width: 48rem;
  margin-top: 2rem;
  padding: 1.2rem;
  color: #111111;
  background: #fff;
  border: 2px solid #111111;
  border-radius: 0;
  box-shadow: none;
}

.events h2 {
  margin-top: 0;
}

.events__list {
  display: grid;
  gap: 0.8rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.events__list li {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.85rem 0.9rem;
  background: #f9f6f2;
  border: 2px solid #111111;
  border-radius: 0;
}

.events__task {
  display: flex;
  flex: 1;
  align-items: flex-start;
  gap: 0.7rem;
  cursor: pointer;
  color: #111111;
}

.events__checkbox {
  flex: 0 0 auto;
  width: 1.1rem;
  height: 1.1rem;
  margin: 0.2rem 0 0;
  accent-color: #a95b3c;
}

.events__task--completed span {
  color: #404040;
  text-decoration: line-through;
}

.events__points {
  flex: 0 0 auto;
  color: #6a311d;
  font-size: 0.85rem;
}

.events__number {
  display: inline-grid;
  place-items: center;
  width: 1.8rem;
  height: 1.8rem;
  background: #a95b3c;
  color: #fff;
  border-radius: 0;
  font-size: 0.8rem;
  font-weight: 700;
}
</style>
