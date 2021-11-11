<template>
	<form @submit.prevent="submit" class="mt-5">
		<div class="flex flex-col gap-4 mb-4">
			<span
				v-for="message in QuestionMessages"
				:key="message.id"
				class="flex gap-0.5 items-center font-semibold"
			>
				<input v-model="factory.message" :value="message.body" name="message" type="radio">
				<DynamicText>It {{ message.body }}</DynamicText>
			</span>
		</div>

		<IonButton :disabled="loading || !factory.valid" class="btn-primary font-bold px-2" type="submit">
			<span>Report</span>
		</IonButton>

		<DisplayError :error="error" />
	</form>
	<PageLoading v-if="loading" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ReportFactory } from '@modules/reports'
import { QuestionMessages } from '@app/composable/reports/form'
import PageLoading from '../../core/PageLoading.vue'
import { IonIcon, IonRippleEffect, IonButton } from '@ionic/vue'

export default defineComponent({
	name: 'QuestionReportForm',
	components:{PageLoading, IonButton},
	props: {
		factory: {
			type: Object as PropType<ReportFactory>,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup () {
		return { QuestionMessages }
	}
})
</script>

<style lang="scss" scoped>
	input[type="radio"] {
		width: 18px;
		height: 18px;
	}
</style>
