<script lang="ts">
import { defineComponent } from 'vue'

const profileRoot = '/images/Profile pictures'

export default defineComponent({
  name: 'App',
  data() {
   return {
     userProfile: {
       Username: 'Anna',
       Age: '12',
       Skill: 'Beginner',
       School: 'Tjørnely',
       Score: 0,
       ProfilePicture: `${profileRoot}/profile-anna.jpg`
     },
     friendProfile: [
       {
         Username: 'Emil',
         Age: '10',
         Skill: 'Beginner',
         School: 'Tjørnely',
         Score: 15,
         ProfilePicture: `${profileRoot}/profile-emil.jpg`
       },
       {
         Username: 'Freja',
         Age: '14',
         Skill: 'Advanced',
         School: 'Søndermarkskolen',
         Score: 82,
         ProfilePicture: `${profileRoot}/profile-freja.jpg`
       },
       {
         Username: 'Noah',
         Age: '11',
         Skill: 'Intermediate',
         School: 'Tjørnely',
         Score: 36,
         ProfilePicture: `${profileRoot}/profile-noah.jpg`
       },
       {
         Username: 'Asta',
         Age: '13',
         Skill: 'Beginner',
         School: 'Byskolen',
         Score: 24,
         ProfilePicture: `${profileRoot}/profile-asta.jpg`
       }
     ],
     tournamentScores: [
       { School: 'Tjørnely', Score: 51 },
       { School: 'Søndermarkskolen', Score: 82 },
       { School: 'Byskolen', Score: 24 },
       { School: 'Højmarkskolen', Score: 67 },
       { School: 'Englystskolen', Score: 53 },
       { School: 'Østerbyskolen', Score: 91 },
       { School: 'Vestervangskolen', Score: 44 }
     ],
     streak: {
       count: 0
     },
     museumTaskProgress: {
       completed: {} as Record<string, boolean>,
       rewarded: {} as Record<string, boolean>
     },
     streakQuotes: [
       'Hvert lille skridt bringer dig tættere på målet.',
       'Du bliver stærkere, hver gang du prøver.',
       'Giv ikke op – du er godt på vej!',
       'Din indsats i dag skaber dine muligheder i morgen.',
       'Øvelse gør dig bedre, lidt efter lidt.',
       'Du kan mere, end du tror.',
       'Fejl er en del af vejen til at lære.',
       'Bliv ved – dine fremskridt tæller.',
       'En ny opgave er en ny chance for at vokse.',
       'Du gør det fantastisk. Fortsæt sådan!'
     ],
     museumTasks: [
       'Find et maleri med en person, og beskriv personens humør.',
       'Find et kunstværk med en farve, du synes godt om.',
       'Vælg et værk, og find på en ny titel til det.',
       'Find et kunstværk, der viser naturen.',
       'Se efter penselstrøg eller andre spor af kunstnerens arbejde.',
       'Find et værk, hvor lys og skygge spiller en vigtig rolle.',
       'Vælg et kunstværk, og fortæl, hvad du tror sker i det.',
       'Find to kunstværker, der bruger farver på forskellige måder.',
       'Find et værk, der gør dig nysgerrig, og forklar hvorfor.',
       'Se efter former eller mønstre, der gentager sig i et kunstværk.',
       'Find et værk, du gerne ville have hængende derhjemme.',
       'Vælg et kunstværk, og forestil dig, hvilken lyd der passer til det.',
       'Find et værk med mange detaljer, og vælg din yndlingsdetalje.',
       'Find et værk, der ser ud til at fortælle en historie.',
       'Sammenlign et ældre og et nyere kunstværk. Hvad er forskelligt?',
       'Find et kunstværk, der bruger former på en overraskende måde.',
       'Vælg et værk, og beskriv det med tre ord.',
       'Find et værk, der får dig til at føle noget bestemt.',
       'Se efter, hvordan kunstneren har brugt pladsen i værket.',
       'Find et kunstværk, du ikke forstår endnu, og stil et spørgsmål til det.'
     ]
   }
  },
  methods: {
   completeTask(points = 0) {
     this.streak.count += 1
     this.userProfile.Score += points
   }
  },
  provide() {
   return {
     userProfile: this.userProfile,
     friendProfile: this.friendProfile,
     tournamentScores: this.tournamentScores,
     streak: this.streak,
     museumTaskProgress: this.museumTaskProgress,
     streakQuotes: this.streakQuotes,
     museumTasks: this.museumTasks,
     completeTask: (points = 0) => this.completeTask(points)
   }
  }
})
</script>

<template>
  <div class="app-shell">
    <main class="page-content">
      <RouterView />
    </main>
  </div>
</template>
