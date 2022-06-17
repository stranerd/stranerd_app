<template>
	<div
		class="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white rounded-xl font-bold text-sm text-secondaryText py-4 px-6">
		<div class="w-full">
			<IonText class="capitalize">{{ testPrep.name }}</IonText>
		</div>
		<div class="w-full font-bold text-right cursor-pointer">
			<a class="text-orange mr-4" @click.prevent="openTestPrepEditModal(testPrep)">Edit</a>
			<a class="text-red" @click.prevent="deleteTestPrep">Delete</a>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TestPrepEntity } from '@modules/study'
import { openTestPrepEditModal, useDeleteTestPrep } from '@app/composable/study/testPreps'

export default defineComponent({
	name: 'AdminTestPrepListCard',
	props: {
		testPrep: {
			type: TestPrepEntity,
			required: true
		}
	},
	setup (props) {
		const { loading, error, deleteTestPrep } = useDeleteTestPrep(props.testPrep.id)
		return { loading, error, deleteTestPrep, openTestPrepEditModal }
	}
})
</script>
