<template>
	<form class="d-flex flex-column gap-1-5" @submit.prevent="updateProfile">
		<div class="mx-auto">
			<div class="position-relative mx-auto">
				<img
					:src="imageLink || DEFAULT_PROFILE_IMAGE"
					alt=""
					style="width: 72px; height: 72px; border-radius: 10rem; border: 1.5px solid transparent;"
				>
				<i
					v-if="imageLink"
					class="fas fa-times position-absolute rounded-pill text-danger"
					style="z-index: 1; right: 0; bottom: 0; font-size: 1.5rem;"
					@click="removeImage"
				></i>

			</div>
			<DynamicText v-if="factory.errors.avatar" class="small text-danger d-block">
				{{ factory.errors.avatar }}
			</DynamicText>
		</div>
		<div class="form-group">
			<label id="uploadbtn" class="px-3 bg-tags text-primary border border-line text-center" for="picture">
				{{ imageLink ? 'Change' : 'Upload' }} Profile Picture
			</label>
			<input
				id="picture"
				accept="image/*"
				class="d-none"
				name="file"
				type="file"
				@change.prevent="catchFiles"
			>
		</div>
		<div class="form-group d-flex flex-column flex-md-row gap-1">
			<div class="flex-grow-1 w-100">
				<input
					id="fName"
					v-model="factory.first"
					:class="{'is-invalid': factory.errors.first}"
					autocomplete="first-name"
					class="form-control"
					placeholder="First Name"
				>
				<DynamicText v-if="factory.errors.first" class="small text-danger d-block">
					{{ factory.errors.first }}
				</DynamicText>
			</div>
		</div>
		<div class="form-group d-flex flex-column">
			<div class="flex-grow-1 w-100">
				<input
					id="lName"
					v-model="factory.last"
					:class="{'is-invalid': factory.errors.last}"
					autocomplete="last-name"
					class="form-control"
					placeholder="Last Name"
				>
				<DynamicText v-if="factory.errors.last" class="small text-danger d-block">
					{{ factory.errors.last }}
				</DynamicText>
			</div>
		</div>
		<div class="form-group w-100 justify-content-between d-flex align-items-center">
			<span class="text-dark fw-bold">
				What subject are you strongest in?
			</span>
			<SelectSubject
				:exclude="factory.weakerSubjects"
				:show-all="false"
				v-model:subject-id="factory.strongestSubject"
				class="p-0 select"
			/>
		</div>
		<span v-if="factory.strongestSubject">
			Strongest subject chosen: <Subject :subject-id="factory.strongestSubject" />
		</span>
		<DynamicText v-if="factory.errors.strongestSubject" class="small text-danger d-block">
			{{ factory.errors.strongestSubject }}
		</DynamicText>

		<div class="form-group w-100 justify-content-between d-flex align-items-center">
			<span class="text-dark fw-bold">
				What subject are you also good in?
			</span>
			<SelectSubject
				:exclude="[factory.strongestSubject]"
				:show-all="false"
				v-model:subject-id="sTag"
				class="p-0 select"
			/>
		</div>
		<DynamicText v-if="factory.errors.weakerSubjects" class="small text-danger d-block">
			{{ factory.errors.weakerSubjects }}
		</DynamicText>
		<div class="d-flex gap-0-5">
			<span
				v-for="subTag in factory.weakerSubjects"
				:key="subTag"
				class="p-0-5 d-flex gap-0-5 cursor-pointer btn-dark rounded-3"
				@click="removeTag(subTag)"
			>
				<DynamicText class="text-white">
					<Subject :subject-id="subTag" />
				</DynamicText>
				<span class="text-danger">&times;</span>
			</span>
		</div>
		<div class="form-group">
			<textarea
				id="description"
				v-model="factory.description"
				:class="{'is-invalid': factory.errors.description}"
				class="form-control"
				placeholder="Write a short description about yourself"
				rows="6"
			/>
			<DynamicText v-if="factory.errors.description" class="small text-danger d-block">
				{{ factory.errors.description }}
			</DynamicText>
		</div>
		<template v-if="hasPassword">
			<hr>
			<p class="small text-center mt-n1">
				Fill this if you want to update your password
			</p>
			<div class="form-group">
				<input
					id="oldPassword"
					v-model="factory.oldPassword"
					:class="{'is-invalid': factory.errors.oldPassword}"
					:type="show ? 'text' : 'password'"
					class="form-control"
					placeholder="Old Password"
				>
				<DynamicText v-if="factory.errors.password" class="small text-danger d-block">
					{{ factory.errors.password }}
				</DynamicText>
			</div>
			<div class="form-group">
				<input
					id="password"
					v-model="factory.password"
					:class="{'is-invalid': factory.errors.password}"
					:type="show ? 'text' : 'password'"
					class="form-control"
					placeholder="New Password"
				>
				<DynamicText v-if="factory.errors.password" class="small text-danger d-block">
					{{ factory.errors.password }}
				</DynamicText>
			</div>
			<div class="form-group">
				<input
					id="cPassword"
					v-model="factory.cPassword"
					:class="{'is-invalid': factory.errors.cPassword}"
					:type="show ? 'text' : 'password'"
					class="form-control"
					placeholder="Confirm New Password"
				>
				<DynamicText v-if="factory.errors.cPassword" class="small text-danger d-block">
					{{ factory.errors.cPassword }}
				</DynamicText>
			</div>
		</template>
		<div class="d-flex justify-content-between align-items-center gap-1">
			<button class="btn btn-dark w-50 mx-0" type="button" @click="cancel">
				Cancel
			</button>
			<button :disabled="loading || !factory.valid" class="btn btn-primary w-50 mx-0" type="submit">
				Save
			</button>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useUpdateProfile } from '@/application/hooks/users/account'
import { useAuth } from '@/application/hooks/auth/auth'
import { useFileInputs, usePassword, useSubjectAsTags } from '@/application/hooks/core/forms'
import { isClient } from '@/utils/environment'
import { DEFAULT_PROFILE_IMAGE } from '@/utils/constants'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'

export default defineComponent({
	name: 'AccountProfileForm',
	components: { SelectSubject, Subject },
	props: {
		cancel: {
			required: true,
			type: Function as PropType<() => {}>
		}
	},
	setup () {
		const { hasPassword } = useAuth()
		const { show, toggle } = usePassword()
		const { factory, error, loading, updateProfile } = useUpdateProfile()
		const imageLink = ref((factory.value.avatar as any)?.link ?? '')
		const { catchFiles } = useFileInputs((file) => {
			if (isClient()) imageLink.value = window.URL.createObjectURL(file)
			factory.value.avatar = file
		})
		const removeImage = () => {
			imageLink.value = ''
			factory.value.avatar = undefined
		}

		const { sTag, removeTag } = useSubjectAsTags(
			(sTag: string) => factory.value.addWeakerSubjects(sTag),
			(sTag: string) => factory.value.removeWeakerSubjects(sTag)
		)
		return {
			hasPassword, show, toggle, catchFiles, imageLink, removeImage, sTag, removeTag,
			factory, error, loading, updateProfile, DEFAULT_PROFILE_IMAGE
		}
	}

})
</script>

<style lang="scss" scoped>
	form {
		max-width: 45rem;
		margin: 0 auto;
	}

	label {
		box-sizing: border-box;
		border-radius: 0.375rem;
		border: 1px solid $color-line;
		font-size: 1.125rem;
		text-align: center;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input, textarea {
		background: $color-white;
		color: $color-sub;
		border-radius: 0.375rem;
		border: 1px solid $color-line;
		font-size: 1.125rem;
		outline: none;
		min-height: 3rem;
		padding: 0.5rem;
		padding-left: 24px !important;
	}

	button {
		display: grid;
		place-items: center;
		outline: none;
		border-radius: 6px;
		border: none;
		font-size: 24px;
		color: white;
		margin: 0 12px;
	}

	.select {
		flex-grow: 1;
		color: $color-sub;
		box-sizing: border-box;
		max-width: 40%;
		margin: 0;
		border-radius: 0.1rem;
		box-shadow: -5px 5px 15px rgba($color-primary, 0.1);
		border: 1px solid $color-line;
		background-color: $color-white;
		padding: 0.5rem;
	}
</style>
