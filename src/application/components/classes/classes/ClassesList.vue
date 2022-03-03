<template>
	<div class="flex flex-col md:gap-4">
		<div class="bg-white hidden md:flex rounded-xl items-center justify-between gap-2 p-4">
			<ion-text class="text-main_dark leading-tight text-xl font-bold">
				My Classes
			</ion-text>
			<div class="flex items-center gap-4 w-full md:w-auto border-bottom-line">
				<router-link to="/classes/create">
					<ion-button class="btn-primary font-bold">
						Create a class
					</ion-button>
				</router-link>
			</div>
		</div>
		<EmptyState v-if="!loading && !error && classes.length === 0" info="You are not a member of any class!" />
		<ClassListCard v-for="classInst in classes" :key="classInst" :classInst="classInst"
			class="border-bottom-line" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassListCard from '@app/components/classes/classes/ClassListCard.vue'
import { useClassList } from '@app/composable/classes/classes'

export default defineComponent({
	name: 'ClassesList',
	components: { ClassListCard },
	setup () {
		const { myClasses: classes, error, loading } = useClassList()
		return { classes, error, loading }
	}
})
</script>
