<template>
	<VueTelInput v-model="phone" mode="international" @validate="update" />
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
// @ts-ignore
import { VueTelInput } from 'vue-tel-input'
import { Phone } from '@modules/auth'

const props = defineProps({
	value: {
		type: Object as PropType<Phone | null>,
		default: null,
		validator: (p: any) => p === null || (typeof p.code === 'string' && typeof p.number === 'string')
	}
})

const emit = defineEmits(['update:value'])

const phone = ref((props.value?.code ?? '') + (props.value?.number ?? ''))
const update = (event: any) => {
	emit('update:value', event.valid ? {
		code: '+' + event.countryCallingCode,
		number: event.nationalNumber
	} : null)
}
</script>

<style lang="scss">
@import "vue-tel-input/dist/vue-tel-input.css";

.vti__dropdown.open, .vti__dropdown.disabled, .vti__dropdown:hover, .vti__dropdown-list, .vti__dropdown-item.highlighted {
	background-color: $color-bodyBg !important;
}

.vti__selection .vti__country-code, .vti__dropdown-arrow {
	color: $color-bodyText !important;
}
</style>
