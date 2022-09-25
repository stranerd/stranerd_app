<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="comments p-4 h-full flex flex-col justify-between relative">
			<div class="h-full overflow-auto">
				<postCard :preview="false" tag="Discussion"/>
				<CommentBox/>
			</div>
			

			<form class="commentInput bg-bodyBg w-full p-4 flex items-center gap-2 text-sm">
				<IonInput :size="24" inputmode="text" placeholder="Add a comment" position="floating" class="rounded-full"/>
				<IonButton class=" bg-primaryBg !px-0 p-2  !rounded-full overflow-hidden" type="submit">
					<IonIcon class=" !p-0 " :icon="paperPlaneOutline" />
				</IonButton>
			</form>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import postCard from '@root/application/components/teacher/post/postcard.vue'
import { paperPlaneOutline } from 'ionicons/icons'
import CommentBox from '@root/application/components/comment/commentBox.vue'


export default defineComponent({
	name: 'viewComments',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components: { postCard, CommentBox },
	setup () {
		useRouteMeta('Comments', { back: true })

		return { paperPlaneOutline }
	}
})
</script>
