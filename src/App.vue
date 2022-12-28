<template>
  <v-app>
    <v-app-bar elevation="2" color="secondary">
      <template v-slot:prepend>
        <v-icon size="x-large" color="primary"  >
          mdi-thought-bubble
        </v-icon>
      </template>
      <v-app-bar-title>Thoughts</v-app-bar-title>
      <template v-slot:append>
        <v-btn icon @click="showConfirmationDialog = true">
          <v-icon>mdi-file-download</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-dialog v-model="showConfirmationDialog" >
      <v-card>
        <v-text-field v-model="fileName" label="File Name" placeholder="Please enter a file name.">
          
        </v-text-field>
        <v-card-actions class="actions">
          <v-btn color="secondary" @click="showConfirmationDialog = false" variant="outlined">Close</v-btn>
          <v-btn color="primary" @click="download" variant="flat">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main>
      <ThoughtList v-if="navigationState === NavigationState.THOUGHT_LIST" @edit_thought="editThought"></ThoughtList>
      <NewThought v-if="navigationState === NavigationState.NEW_THOUGHT" :thought="activeThought" @thought_list="toThoughtList"></NewThought>
    </v-main>

    <v-bottom-navigation :elevation="2">
      <v-btn @click="toThoughtList">
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
  import {ref, Ref} from 'vue'
  import { Thought } from '@/utils/model'
  import { NavigationState} from '@/utils/navigation.types'
  import { saveFile } from './utils/file-saver'
  import useLocalStorage, { StorageKeys } from './utils/use-local-storage'

  const thoughts: Ref<Thought[]> = useLocalStorage(StorageKeys.THOUGHTS, [], true)

  const navigationState = ref(NavigationState.THOUGHT_LIST);
  const activeThought: Ref<Thought> = ref({id: crypto.randomUUID()});
  const showConfirmationDialog = ref(false)
  const fileName = ref(undefined)
  function editThought(event: Thought) {
    activeThought.value = event;
    navigationState.value = NavigationState.NEW_THOUGHT;
  }

  function toThoughtList() {
    activeThought.value = {id: crypto.randomUUID()},
    navigationState.value = NavigationState.THOUGHT_LIST
  }

  function download() {
      saveFile(navigationState.value ===  NavigationState.NEW_THOUGHT ? [activeThought.value] : thoughts.value, fileName.value ?? 'thoughts')
      fileName.value = undefined
      showConfirmationDialog.value = false
  }
</script>
