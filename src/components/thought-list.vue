<template>
 <v-list :items="thoughts" lines="three" item-props  bg-color="background">
    <v-list-item
    v-for="item in thoughts"
    :key="item.id"
    :title="item.title"
    :subtitle="item.subtitle"
    @click="$emit(EDIT_THOUGHT, item?.id)"
    >
    <template v-slot:append>
          <v-icon small color="accent"
          >mdi-lead-pencil</v-icon>
        </template>
    </v-list-item>

 </v-list>
</template>
<script setup lang='ts'>
    import { EDIT_THOUGHT } from '@/utils/navigation.types'
    
    const emit = defineEmits([EDIT_THOUGHT])

    const thoughts = [
        {
            title: 'Sometimes I think of...',
            subtitle: 'but then not',
            id: 1
        },
        { type: 'divider'},
        {
            title: 'Sometimes I think of...',
            subtitle: 'but then not',
            id: 2
        },
    ]
</script>
<style>
span {
  margin: 1rem 
}
</style>

<style>
.list.v-list-item {
    background-color: '#3F3B6C';
}
</style>