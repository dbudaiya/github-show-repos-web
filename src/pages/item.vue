<script setup lang="ts">
const props = defineProps({
  data: Object,
});
const { data } = toRefs(props);
onMounted(()=>{
  
})
</script>

<template>
  <div m5 >
    <a href="">{{ data.name }}</a>
  </div>
</template>
