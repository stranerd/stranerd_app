<template>
	<div>
		<div v-for="{ key, values } in media" :key="key" class="showcase-flex">
			<IonText class="font-bold lg:!p-0 card-padding border-bottom-line">{{ key }}</IonText>
			<template v-for="links in values" :key="links.hash">
				<a v-for="link in links.links" :key="link.normalized" :href="link.normalized"
					class="card card-padding flex items-center border-bottom-line" target="_blank">
					<span class="text-2xl leading-none">
						<IonIcon :icon="linkOutline" />
					</span>
					<IonText class="w-fit truncate leading-none">{{ link.original }}</IonText>
				</a>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { linkOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'LinksList',
	props: {
		media: {
			type: Array as PropType<{
				key: string,
				values: {
					hash: string,
					createdAt: number
					links: { original: string, normalized: string }[]
				}[]
			}[]>,
			required: true
		}
	},
	setup () {
		return { linkOutline }
	}
})
</script>
