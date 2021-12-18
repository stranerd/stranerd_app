<template>
	<div
		:class="[`m-0 lg:min-w-[18rem] min-w-[16.5rem] h-48 bg-white rounded-xl flex flex-col items-start justify-between md:gap-2 gap-[1rem] box-border p-6 md:!px-4`]">
		<div class="w-full justify-between items-center flex">
			<ion-text class="font-bold text-xl text-main_dark">{{ testPrep.name }}</ion-text>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-2xl cursor-pointer" @click="openMenu" />
		</div>
		<Tag :tag="testPrep.data.year.toString()">
			<template v-slot="slotProps">
				<ion-text class="text-sm font-bold">
					{{ slotProps.tag }}
				</ion-text>
			</template>
		</Tag>

		<div class="w-full flex items-center justify-between gap-3">
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
import Tag from '@app/components/core/Tag.vue'

export default defineComponent({
	name: 'TestPrepListCard',
	components: { Tag },
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
