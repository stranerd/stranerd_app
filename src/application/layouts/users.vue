<template>
	<IonContent :fullscreen="true">
		<div class="flex h-full">
			<div class="layout">
				<InnerTopBar />
				<div class="layout-page">
					<div class="!w-full layout-body">
						<slot />
					</div>
				</div>
			</div>
		</div>
	</IonContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent } from '@ionic/vue'
import InnerTopBar from '@app/components/layout/topNavigations/InnerTopBar.vue'

export default defineComponent({
	name: 'users',
	components: { InnerTopBar, IonContent }
})
</script>
