<template>
	<div
		class="flex flex-col lg:flex-row items-center justify-between gap-4 rounded-xl font-bold text-sm py-4 px-6">
		<div class="w-full">
			<IonText class="capitalize">{{ testPrep.name }}</IonText>
		</div>
		<div class="w-full font-bold text-right cursor-pointer">
			<a class="text-warning mr-4" @click.prevent="openTestPrepEditModal(testPrep)">Edit</a>
			<a class="text-danger" @click.prevent="deleteTestPrep">Delete</a>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import { TestPrepEntity } from '@modules/study'
import { openTestPrepEditModal, useDeleteTestPrep } from '@app/composable/study/testPreps'

const props = defineProps({
	testPrep: {
		type: TestPrepEntity,
		required: true
	}
})

const { loading, error, deleteTestPrep } = useDeleteTestPrep(props.testPrep.id)
</script>
