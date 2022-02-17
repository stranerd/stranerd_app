<template>
	<div class="relative flex">
		<IonInput
			v-model="term"
			:placeholder="placeholder"
			autocomplete="off"
			class="w-full"
			type="search"
			@keydown.enter.prevent="onEnter"
			@keydown.down.prevent="onDown"
			@keydown.up.prevent="onUp"
		/>
		<div v-if="value && open" class="suggestions">
			<a
				v-for="(suggestion, i) in matches"
				:key="suggestion.value"
				:class="{'isActive': current === i}"
				@click="select(suggestion.search)"
			>
				<span>{{ suggestion.title }}</span>
			</a>
			<a v-if="matches.length === 0" class="text-lowercase">
				<span class="text-capitalize">No</span> option matches '{{ value }}'
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { IonInput } from '@ionic/vue'

export default defineComponent({
	name: 'AutoComplete',
	components: { IonInput },
	props: {
		suggestions: {
			type: Array as PropType<{ search: string, value: string, title: string }[]>,
			required: true
		},
		value: {
			type: String,
			required: true
		},
		default: {
			type: Object as PropType<{ search: string, value: string, title: string }>,
			required: true
		},
		placeholder: {
			type: String,
			required: false,
			default: ''
		}
	},
	setup (props, { emit }) {
		const open = ref(false)
		const current = ref(0)

		const matches = computed({
			get: () => props.suggestions.filter(
				(s) => s.search.toLowerCase().includes(props.value.toLowerCase())
			),
			set: () => {
			}
		})

		const update = (value: string, openModal = false) => {
			if (openModal && !open.value) {
				open.value = true
				current.value = 0
			}
			if (!value) return emit('update:value', { term: value, ...props.default })
			const match = props.suggestions.find(
				(s) => s.search.toLowerCase() === value.toLowerCase()
			)
			return emit('update:value', { term: value, ...(match ?? props.default) })
		}
		const select = (value: string) => {
			update(value)
			open.value = false
		}

		const term = computed({
			get: () => props.value,
			set: (value: string) => {
				update(value, value !== term.value)
			}
		})

		const onEnter = () => {
			select(matches.value[current.value].search)
			open.value = false
		}
		const onUp = () => current.value > 0 ? current.value-- : 0
		const onDown = () => {
			const index = matches.value.length - 1
			return current.value < index ? current.value++ : index
		}

		return { open, current, matches, term, update, select, onEnter, onUp, onDown }
	}
})
</script>

<style lang="scss" scoped>
	ion-input {
		--background: #F2F3F5 !important;
		--padding-start: 1.8rem !important;
		--padding-end: 1.5rem !important;
		--padding-top: .69rem !important;
		--padding-bottom: .69rem !important;
		--color: $color-mainDark !important;
		--placeholder-color: $color-mainDark !important;
		border-radius: 10px;
	}

	.filter {
		padding: 1rem;
		border-radius: 12px 0 0 12px;
		width: 5rem;
		display: grid;
		place-items: center;
	}

	.suggestions {
		z-index: 3;
		display: flex;
		flex-direction: column;
		position: absolute;
		width: 100%;
		top: 100%;
		background: $color-white;
		border: 1px solid $color-lightGray;
		border-radius: 0.25rem;

		& > * {
			padding: 0.5rem 1rem;
			border-bottom: 1px solid $color-lightGray;
			text-transform: capitalize;
		}

		.isActive {
			background-color: $color-primary;
			color: $color-white;
		}
	}
</style>
