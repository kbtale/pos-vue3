<template>
	<div :title="$t('Change lanuage')">
		<button @click.prevent="loadAll" class="border p-2 rounded-md btn btn-app">
			<!--<loading :active="loading" />-->
			<svg-vue class="h-5 w-5" :icon="['fas', 'globe']"></svg-vue>
		</button>
		<select-model :show="show" @close="show = false">
			<div class="p-5">
				<strong>{{ $t('Select Language') }}</strong>
				<div class="p-2 grid grid-cols-2 gap-2">
					<div
						class="cursor-pointer col-span-1 border border-gray-400 rounded-md p-4 w-full hover:bg-gray-100"
						v-for="(langu, index) in locals"
						@click.prevent="setLanguage(langu)"
					>
						<label class="cursor-pointer flex justify-between items-center">
							<span>
								{{ langu.name }}
							</span>
						</label>
					</div>
				</div>
			</div>
		</select-model>
	</div>
</template>

<script>
import Modeler from '@/Components/model';
export default {
	data() {
		return {
			loading: false,
			show: false,
			locals: [],
		};
	},
	components: { 'select-model': Modeler },
	mounted() {},
	methods: {
		setLanguage(currentLocale) {
			this.loading = true;
			this.show = false;
			this.$axios
				.post('http://localhost:8000/api/v1/lang/set-language', currentLocale,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				})
				.then((response) => {
					window.location.reload();
				})
				.catch(() => {
					this.loading = false;
				});
		},
		loadAll() {
			this.loading = true;
			this.$axios.get('http://localhost:8000/api/v1/admin/settings/languages',
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}).then((response) => {
				this.locals = response.data;
				this.loading = false;
				this.show = true;
			});
		},
	},
};
</script>
