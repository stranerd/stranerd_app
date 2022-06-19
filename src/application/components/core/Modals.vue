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

<script lang="ts">
import { defineComponent } from 'vue'
import { isPlatform } from '@ionic/vue'
import { modal, popover } from '@app/composable/core/modal'

export default defineComponent({
	name: 'Modals',
	setup () {
		const modalProps = {
			cssClass: 'modal-class',
			breakpoints: isPlatform('desktop') ? undefined : [0.1, 0.5, 1],
			initialBreakpoint: 1,
			isOpen: true
		}
		const popoverProps = {
			cssClass: 'popover-class',
			isOpen: true
		}
		const { modals, stack: modalStack, close: modalClose } = modal
		const { popovers, stack: popoverStack, close: popoverClose } = popover
		return {
			modals, modalStack, modalClose, modalProps,
			popovers, popoverStack, popoverClose, popoverProps
		}
	}
})
</script>
