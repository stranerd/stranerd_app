<template>
	<div class="w-full flex flex-col items-center justify-center card-padding">
		<p class="w-full" v-html="info" />
		<slot>
			<router-link v-if="btnText && route" :class="btnTextClass" :to="route"
				class="py-3 px-7 border border-bodyText font-bold rounded-xl">
				{{ btnText }}
			</router-link>
			<IonButton v-else-if="btnText && onClick"
				class="py-3 px-7 border border-bodyText font-bold rounded-xl">
				{{ btnText }}
			</IonButton>
		</slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EmptyState',
	props: {
		onClick: {
			type: Function
		},
		info: {
			type: String
		},
		route: {
			type: String
		},
		btnText: {
			type: String
		},
		btnTextClass: {
			type: String
		}
	}
})
</script>
