<template>
	<div class="flex flex-col gap-4">
		<IonText class="font-bold text-2xl card-padding !py-0">Preps</IonText>
		<PrepsView />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrepsView from '@app/components/study/testPreps/PrepsView.vue'

export default defineComponent({
	name: 'PrepsPanel',
	components: { PrepsView }
})
</script>
