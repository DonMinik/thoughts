<template>
  <v-app>
    <v-app-bar elevation="2" color="secondary">
        <v-app-bar-title>Thoughts</v-app-bar-title>
      </v-app-bar>
    <v-main>
      
      <ThoughtList v-if="navigationState === NavigationState.THOUGHT_LIST" @edit_thought="editThought"></ThoughtList>
      <NewThought v-if="navigationState === NavigationState.NEW_THOUGHT" :thought-id="activeThought"></NewThought>
    </v-main>

    <v-bottom-navigation :elevation="2">
      <v-btn @click="navigationState = NavigationState.THOUGHT_LIST">
        <v-icon>mdi-list-box</v-icon>
        Thoughts
      </v-btn>

      <v-btn @click="navigationState = NavigationState.NEW_THOUGHT">
        <v-icon>mdi-plus</v-icon>
        New Thought
      </v-btn>

    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
  import ThoughtList from '@/components/thought-list.vue'
  import NewThought from '@/components/new-thought.vue'
  import {ref} from 'vue'
  import { NavigationState} from '@/utils/navigation.types'
  let navigationState = ref(NavigationState.THOUGHT_LIST);
  let activeThought: number | null = null;
  function editThought(event: number) {
    activeThought = event;
    navigationState.value = NavigationState.NEW_THOUGHT;
  }
</script>
