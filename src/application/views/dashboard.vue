<template>
	<DefaultLayout>
		<div>
			<div class="px-4 py-6 flex items-center border-bottom-line">
				<IonIcon :icon="linkOutline" class="text-2xl" />
				<IonText class="ml-3 text-xl">Stranerd Connect</IonText>
			</div>
			<div class="px-4 py-6 flex items-center justify-between border-bottom-line">
				<IonText class=" text-xl font-bold">Recent</IonText>
				<IonIcon :icon="chevronDownOutline" class="text-xl" />
			</div>
			<div class="px-4 py-6 flex items-center justify-between border-bottom-line">
				<IonText class=" text-xl font-bold">Direct messages</IonText>
				<IonIcon :icon="chevronDownOutline" class="text-xl" />
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
