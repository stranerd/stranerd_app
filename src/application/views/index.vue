<template>
	<page-loading/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageLoading from '../components/core/PageLoading.vue'

export default defineComponent({
	components: { PageLoading },
	name: 'Index',
	layout: 'home',
	redirect:'/dashboard/home',
	setup () {
		return { }
	}
})
</script>
<style scoped>


</style>


