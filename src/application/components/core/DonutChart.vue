<template>
	<Donut
		:auto-adjust-text-size="true"
		:foreground="bgTint"
		:has-legend="false"
		:sections="sections"
		:size="size"
		:start-angle="0"
		:thickness="thickness"
		:total="totalSections < total ? total : totalSections"
		background="#FFFFFF"
		unit="px"
		@section-click="onClick"
	>
		<span :style="`color:${mainColor} !important;`" class="score">
			<slot>{{ formatNumber(score, 1) }}</slot>
		</span>
	</Donut>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { formatNumber } from '@utils/commons'
import Donut from '@app/components/DonutChart/Donut.vue'

export default defineComponent({
	name: 'DonutChart',
	components: { Donut },
	props: {
		size: {
			required: false,
			type: Number,
			default: 168
		},
		score: {
			required: true,
			type: Number,
			default: 0
		},
		percentage: {
			required: false,
			type: Number,
			default: 0
		},
		total: {
			required: true,
			type: Number,
			default: 0
		},
		onClick: {
			required: false,
			type: Function as PropType<() => {}>,
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
		}
	},
	setup (props) {
		const bgTint = props.percentage < 50 ? '#ff666640' : props.bgColor
		const mainColor = props.percentage < 50 ? '#FF6666' : props.fgColor
		const sections = computed(() => [{ value: props.score, color: mainColor }])
		const totalSections = computed(() => sections.value.map((s) => s.value).reduce((acc, v) => acc + v, 0))
		return { sections, formatNumber, totalSections, bgTint, mainColor }
	}

})
</script>

<style lang="scss" scoped>
	.score, .cdc-text {
		font-size: 1.5rem;
		font-weight: 700;
	}
</style>
