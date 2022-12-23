<template>

<v-responsive 
    class="overflow-y-auto edit-area"
  >
    <v-text-field :model-value="props.thought.title">
        
    </v-text-field>
    <v-textarea
        placeholder="Please enter your thoughts"
      no-resize auto-grow
      :model-value="props.thought.text"
    ></v-textarea>
</v-responsive>
  <v-footer class="footer" color="secondary" >
    <v-btn color="primary" @click="saveThought">
        Save
    </v-btn>
</v-footer>
</template>
<script setup lang="ts">
    import useLocalStorage from '@/utils/use-local-storage';
    import { Thought } from '@/utils/model'
    import { ref } from 'vue'

    let thoughtList = useLocalStorage('thoughts', []);

    const props = defineProps<{thought: Thought}>();

  

    function saveThought() {
        if (!props.thought.title) {
            props.thought.title = (new Date(Date.now())).toDateString()
        }   
        const updatedThoughtList = thoughtList.value;
            
        if(props.thought.id) {
            let existingThought = updatedThoughtList.find((entry: Thought) => entry.id = props.thought.id)
            existingThought = props.thought;
             } else {
                props.thought.id = crypto.randomUUID()
                updatedThoughtList.push(props.thought)
             } 
             thoughtList.value = updatedThoughtList
       

    }
</script>

<style>
.edit-area {
    height: 80%
}

.footer {
    height: 20%;
    align-content: center;
}
</style>