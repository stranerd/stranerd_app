<template>
	<form class="flex flex-col" @submit.prevent="submit">
		<div class="flex align-items-center">
			<div class="form-group w-100">
				<input
					v-model="factory.name"
					:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}"
					class="form-control p-1"
					placeholder="Add a new subject"
				>
				<DynamicText v-if="factory.errors.name" class="small text-danger d-block">
					{{ factory.errors.name }}
				</DynamicText>
			</div>
			<button :disabled="loading || !factory.valid" class="btn btn-lg btn-custom" type="submit">
				<span><slot name="buttonText">Submit</slot></span>
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { SubjectFactory } from '@/modules/questions'

export default defineComponent({
	name: 'SubjectForm',
	props: {
		factory: {
			type: Object as PropType<SubjectFactory>,
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
	input {
		border: 1px solid $color-line;
		border-radius: 6px;
		font-size: 16px;
		background-color: $color-tags;
		width: 100%;
	}

	.btn-custom {
		background-color: $color-primaryDark;
		color: $color-white;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
		padding: 1rem 3rem;
	}
</style>
