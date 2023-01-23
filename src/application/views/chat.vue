<template>
	<DefaultLayout :hideBottom="true" :hideFab="true" :ignorePagePadding="true">
		<div class="flex flex-col h-full max-h-full py-2 px-4">
			<div v-chat-scroll class="flex flex-col gap-6 overflow-y-auto hide-scrollbar">
				<template v-for="(chat, idx) in conversations" :key="idx">
					<div class="chat p-4 rounded-xl bg-itemBg human">
						{{ chat.question }}
					</div>
					<div v-if="loading && idx === (conversations.length - 1)" class="chat p-4 rounded-xl bg-itemBg bot">
						...
					</div>
					<div v-else-if="chat.answer" class="chat p-4 rounded-xl bg-itemBg bot">
						{{ chat.answer }}
					</div>
				</template>
			</div>
		</div>
		<template v-slot:content-bottom>
			<form class="flex items-center gap-2 p-4" @submit.prevent="submit">
				<IonInput v-model="question" class="w-full" placeholder="Type in question...." required />
				<IonButton :disabled="loading || !question" class="btn-primary" type="submit">
					<SpinLoading v-if="loading" slot="icon-only" />
					<IonIcon v-else slot="icon-only" :icon="paperPlaneOutline" />
				</IonButton>
			</form>
		</template>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { useConverse } from '@app/composable/questions/conversations'
import { paperPlaneOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Chat',
	setup () {
		useRouteMeta('Chat', { back: true })
		const { loading, error, conversations, question, submit } = useConverse()
		return {
			loading, error, conversations, question, submit,
			paperPlaneOutline
		}
	}
})
</script>

<style lang="scss" scoped>
.chat {
	width: clamp(120px, 100%, 250px);
}

.human {
	align-self: end;
}

.bot {
	align-self: start;
}
</style>
