<template>
    <v-list :items="thoughts" lines="three" item-props  bg-color="background">
        <v-list-item
        v-for="item in thoughts"
        :key="item.id"
        :title="item.title"
        :subtitle="item.text"
        :class="isShowDeleteAnimation === item.id ? 'delete-entry' : undefined"
        v-touch="{
        start: (event: any) => swipeToDelete(event, item),
        end: (event: any) =>  endSwipe(event, item)
        }"
        @click="$emit(EDIT_THOUGHT, item)"
        >
        <template v-slot:prepend v-if="isShowDeleteAnimation === item.id"   >
            <v-icon small 
            >mdi-delete</v-icon>
        </template>
        <template v-slot:append>
            <v-icon small color="accent"
            >mdi-lead-pencil</v-icon>
        </template>
        </v-list-item>
    </v-list>

    <v-dialog v-model="showConfirmationDialog" >
        <v-card  >
            <span class="confirmation-hint">Are you shure you want to delete this thought?</span>
            <v-card-actions class="actions">
                <v-btn color="secondary" @click="cancelDeleteAction" variant="outlined">Close</v-btn>
                <v-btn color="destructive" @click="deleteThought" variant="flat">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup lang='ts'>
    import { EDIT_THOUGHT } from '@/utils/navigation.types'
    import useLocalStorage, {StorageKeys} from '@/utils/use-local-storage';
    import { Thought } from '@/utils/model'
    import { ref, Ref } from 'vue'
    const emit = defineEmits([EDIT_THOUGHT])

    const thoughts: Ref<Thought[]> = useLocalStorage(StorageKeys.THOUGHTS, [], true)

    const swipeDirection = ref('none')
    const isShowDeleteAnimation = ref('0')

    const showConfirmationDialog = ref(false)

    let thoughtToDelete: Thought | undefined;

    function  swipeToDelete (event: any, item: Thought) {
        if (event.touchstartX < event.touchmoveX && event.offsetX > 15 ){
            isShowDeleteAnimation.value = item.id
            swipeDirection.value = 'right'
        }
       }

    function endSwipe(event: any, item: Thought) {
        if (event.touchstartY < event.touchendX &&  event.offsetX > 20){
            showConfirmationDialog.value = true
            thoughtToDelete = item;
        }
        isShowDeleteAnimation.value = '0'
    } 

    function cancelDeleteAction() {
        thoughtToDelete = undefined;
        showConfirmationDialog.value = false
    }

    function deleteThought() {
        if(thoughtToDelete){
            let updatedThoughtList = thoughts.value;
            updatedThoughtList = updatedThoughtList.filter(entry => entry.id !== thoughtToDelete?.id);
            thoughts.value = updatedThoughtList;
        }
        thoughtToDelete = undefined;
        showConfirmationDialog.value = false
    }
</script>
<style scoped>
.confirmation-hint {
  margin: 1rem 
}
.list.v-list-item {
    background-color: #3F3B6C;
}

.actions {
    display: flex;
    justify-content: center;
}

.delete-entry {
    margin-left: 0;
    padding-left: 0 !important;
}


</style>
<!-- warning this is unscoped style-->
<style>
    .delete-entry .v-list-item__prepend{
        background-color:  #EB455F;
        height:4rem;
        width:4rem;
        margin-right: 1rem;
        padding:1rem;
    }
</style>