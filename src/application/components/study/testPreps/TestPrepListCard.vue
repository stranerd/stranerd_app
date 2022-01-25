<template>
	<div
		:class="[`m-0 w-full h-44 bg-white rounded-xl flex flex-col items-start justify-between gap-2 box-border p-6 text-main_dark`]">
		<div class="w-full justify-between items-center flex">
			<ion-text class="font-bold text-xl">
				<Institution :institutionId="testPrep.data.institutionId" />
			</ion-text>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-2xl cursor-pointer" @click="openMenu" />
		</div>
		<IonText class="text-gray font-bold">
			<Course :courseId="testPrep.data.courseId" />
			({{ testPrep.data.year }})
		</IonText>

		<div class="w-full flex items-center justify-between gap-3 mt-auto">
			<ion-button v-if="testPrep.canTest && !hideTest" class="btn-primary flex-grow font-bold w-full"
				@click="createTest(testPrep, true)">
				Test
			</ion-button>
			<ion-button v-if="testPrep.canStudy && !hideStudy"
				class="btn-outline text-primary flex-grow font-bold w-full"
				@click="createTest(testPrep, false)">
				Solutions
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { calendar, ellipsisVertical, play } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { TestPrepEntity } from '@modules/study'
import { useCreateTest } from '@app/composable/study/tests'
import Institution from '@app/components/study/institutions/Institution.vue'
import Course from '@app/components/study/courses/Course.vue'

export default defineComponent({
	name: 'TestPrepListCard',
	components: { Institution, Course },
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		testPrep: {
			type: TestPrepEntity,
			required: true
		},
		hideStudy: {
			type: Boolean,
			default: false
		},
		hideTest: {
			type: Boolean,
			default: false
		},
		openMenu: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { loading, error, createTest } = useCreateTest()
		return {
			ellipsisVertical, calendar, play,
			loading, error, createTest
		}
	}
})
</script>
