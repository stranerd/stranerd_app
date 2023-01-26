<template>
	<Donut
		:auto-adjust-text-size="true"
		:background="background"
		:foreground="bgColor"
		:has-legend="false"
		:sections="sections"
		:size="size"
		:start-angle="0"
		:thickness="thickness"
		:total="totalSections < 100 ? 100 : totalSections"
		unit="px"
		@section-click="onClick"
	>
		<span :style="`color:${fgColor} !important;`" class="score">
			<slot>{{ formatNumber(percentage, 1) }}</slot>
		</span>
	</Donut>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { formatNumber } from '@utils/commons'
import Donut from '@app/components/donutChart/Donut.vue'

const props = defineProps({
	size: {
		required: false,
		type: Number,
		default: 168
	},
	percentage: {
		required: true,
		type: Number,
		default: 0
	},
	onClick: {
		required: false,
		type: Function as PropType<() => void>,
		default: () => {
		}
	},
	fgColor: {
		type: String,
		required: false,
		default: '#546DD3'
	},
	bgColor: {
		type: String,
		required: false,
		default: '#546DD322'
	},
	thickness: {
		type: Number,
		required: false,
		default: 32
	},
	full: {
		type: Boolean,
		required: false,
		default: false
	}
})

const sections = computed(() => [{ value: props.percentage, color: props.fgColor }])
const totalSections = computed(() => sections.value.map((s) => s.value).reduce((acc, v) => acc + v, 0))

const background = computed(() => props.full ? 'transparent' : getComputedStyle(document.body).getPropertyValue('--clr-bodyBg'))
</script>

<style lang="scss" scoped>
.score, .cdc-text {
	font-size: 1.1rem;
	font-weight: 700;
	@media (min-width: $md) {
		font-size: 1.25rem;
	}
	@media (min-width: $lg) {
		font-size: 1.5rem;
	}
}
</style>
