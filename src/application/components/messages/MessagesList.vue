<template>
	<div class="flex flex-col">
		<div class="p-4">
			<IonSearchbar v-model.trim="searchTerm" placeholder="Search" type="search" />
		</div>
		<BlockLoading v-if="loading" />
		<router-link v-if="!loading && !error && classes.length === 0" to="/classes">
			<EmptyState class="border-bottom-line py-6" info="Join a class to have discussions" />
		</router-link>
		<ClassesGroupsList v-for="classInst in classes" :key="classInst.hash" :classInst="classInst"
			:searchTerm="searchTerm"
			class="border-bottom-line" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUserClassList } from '@app/composable/users/users/classes'
import ClassesGroupsList from '@app/components/classes/groups/ClassesGroupsList.vue'
import { IonSearchbar } from '@ionic/vue'

export default defineComponent({
	name: 'MessagesList',
	components: { ClassesGroupsList, IonSearchbar },
	setup () {
		const searchTerm = ref('')
		const { classes, error, loading } = useUserClassList()
		return { searchTerm, classes, error, loading }
	}
})
</script>
