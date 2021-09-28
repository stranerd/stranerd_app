<template>
	<form @submit.prevent="submit">
		<div class="form-group">
			<BodyText class="title" variant="large">
				Main Answer
			</BodyText>
			<BodyText class="sub-title">
				Write the correct answer to the question in this box. No explanations
			</BodyText>
			<input
				v-model="factory.title"
				:class="{'is-invalid': factory.errors.title, 'is-valid': factory.isValid('title')}"
				class="form-control"
				placeholder="Example: The answer is 14 seconds."
				type="text"
			>
			<DynamicText v-if="factory.errors.title" class="text-danger small">
				{{ factory.errors.title }}
			</DynamicText>
		</div>

		<div class="form-group">
			<BodyText class="title" variant="large">
				Explanation
			</BodyText>
			<BodyText class="sub-title">
				Write out the step-by-step explanation of the answer you gave above
			</BodyText>
			<AnswerEditor :error="factory.errors.body" :model.sync="factory.body" :valid="factory.isValid('body')" />
		</div>

		<button :disabled="loading || !factory.valid" class="btn btn-primary px-2 py-1" type="submit">
			<slot name="buttonText">
				Submit
			</slot>
		</button>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerFactory } from '@modules/questions'
import AnswerEditor from '@app/components/core/editor/AnswerEditor.vue'

export default defineComponent({
	name: 'AnswerForm',
	components: { AnswerEditor },
	props: {
		factory: {
			type: Object as PropType<AnswerFactory>,
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
	}
})
</script>

<style lang="scss" scoped>
	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 1.5rem;

		.title {
			color: $color-dark;
			font-weight: 600;
			margin-bottom: 8px;
		}

		.sub-title {
			color: $color-dark;
			font-weight: 500;
			margin-bottom: 8px;
		}

		input {
			box-sizing: border-box;
			background: $color-white;
			border: 1px solid $color-line;
			border-radius: 6px;
			padding: 16px 24px;

			&::placeholder {
				color: $color-dark;
			}
		}
	}
</style>
