<template>
	<DefaultLayout>
		<div>
			<div class="px-4 py-6 flex items-center border-bottom-line">
				<IonIcon :icon="linkOutline" class="text-heading2" />
				<IonText class="ml-3 text-heading">Stranerd Connect</IonText>
			</div>
			<div class="px-4 py-6 flex items-center justify-between border-bottom-line">
				<IonText class=" text-heading font-bold">Recent</IonText>
				<IonIcon :icon="chevronDownOutline" class="text-heading" />
			</div>
			<div class="px-4 py-6 flex items-center justify-between border-bottom-line">
				<IonText class=" text-heading font-bold">Direct messages</IonText>
				<IonIcon :icon="chevronDownOutline" class="text-heading" />
			</div>
			<ClassesList :hideSearch="true" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import ClassesList from '@app/components/classes/classes/ClassesList.vue'
import { chevronDownOutline, linkOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Dashboard',
	components: { ClassesList },
	setup () {
		useRouteMeta('Dashboard', {})
		return { linkOutline, chevronDownOutline }
	}
})
</script>
