<template>
	<IonModal v-for="key in modalStack"
		:key="key"
		v-bind="modalProps"
		@didDismiss="modalClose(key)"
	>
		<component :is="modals[key].component" :close="() => modalClose(key)" />
	</IonModal>
	<IonPopover v-for="key in popoverStack"
		:key="key"
		:event="popovers[key].args[0]"
		v-bind="popoverProps"
		@didDismiss="popoverClose(key)"
	>
		<component :is="popovers[key].component" :close="() => popoverClose(key)" />
	</IonPopover>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { modal, modalProps, popover, popoverProps } from '@app/composable/core/modal'

const { modals, stack: modalStack, close: modalClose } = modal
const { popovers, stack: popoverStack, close: popoverClose } = popover
</script>
