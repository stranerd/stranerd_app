<template>
	<div>
		<component :is="modals[id]" v-for="id in stack" :key="id" :modal="id" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { modal } from '@app/hooks/core/modals'

export default defineComponent({
	name: 'ModalBase',
	setup () {
		const { stack, modals } = modal
		return { stack, modals }
	}
})
</script>
