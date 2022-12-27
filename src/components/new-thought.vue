<template>

<v-container 
    class="edit-area"
  >
    <v-text-field label="Title" :placeholder="today" v-model="title">
        
    </v-text-field>
    <v-textarea class="thought-text"
        placeholder="Please enter your thoughts"
      no-resize density="compact"
      v-model="text"
    ></v-textarea>
</v-container>
  <v-footer class="footer" color="secondary" >
    <v-btn color="primary" @click="() => saveThought(this)">
        Save
    </v-btn>
</v-footer>
</template>
<script setup lang="ts">
    import useLocalStorage, {StorageKeys} from '@/utils/use-local-storage';
    import { Thought } from '@/utils/model'
    import { ref, toRef } from 'vue'
    import { THOUGHT_LIST } from '@/utils/navigation.types'
    const thoughtList = useLocalStorage(StorageKeys.THOUGHTS, []);
    const emits = defineEmits([THOUGHT_LIST])


    const props = defineProps<{thought: Thought}>();
    const title = ref(props.thought.title);
    const text = ref(props.thought.text)
    
    const today = (new Date(Date.now())).toDateString()
  

    function saveThought(_this: any) {
        if (!title.value) {
            title.value = today
        }   
        let updatedThoughtList = thoughtList.value;
            
        updatedThoughtList = updatedThoughtList.filter((entry: Thought) => entry.id != props.thought.id)
        updatedThoughtList.push({
            id: props.thought.id,
            title: title.value,
            text: text.value
        })
        thoughtList.value = updatedThoughtList
        goBack(_this)
    }

    function goBack (foo: any) {
        return foo.$emit(THOUGHT_LIST)
    }
</script>

<style>
.edit-area {
    height: 85%
}

.thought-text {
    height: 100%;
}

.footer {
    height: 15%;
    display: flex;
    align-content: center;
}
</style>