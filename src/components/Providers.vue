<template>
  <div>
    <template v-if="providers.length>0">
      <div class="row  mb-3 g-6  align-items-center ">
        <label for="provider" class="col-12 col-sm-12  col-lg-2 col-form-label">Providers: </label>
        <template v-if="!editMode">
          <div class="col-12 col-sm-12 col-lg-7">
            <input type="text" id="provider" v-model="provider.name" class="form-control">
          </div>
          <div class="col-12 col-sm-12 mt-2 mt-lg-0 col-lg-3">
            <button class="btn btn-primary" @click.prevent="addProvider">Add Provider</button>
          </div>
        </template>
        <template v-else>
          <div class="col-12 col-sm-12 col-lg-7">
            <input type="text" id="edit-provider" v-model="selectedProvider.name" class="form-control">
          </div>
          <div class="col-12 col-sm-12 mt-2 mt-lg-0 col-lg-3">
            <button class="btn btn-primary" @click.prevent="submitProvider">Save Provider</button>
          </div>
        </template>
      </div>
      <div class="row mb-3  align-items-center ">
        <div class="col-12 col-lg-7 offset-lg-2">
          <div class="card">
            <div class="card-body">
              <template v-for="provider in providers">
                <div :key="provider.id" class="d-flex justify-content-between">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="autoSizingCheck" :value="provider.id"
                           v-model="selectedProviders">
                    <label class="form-check-label" for="autoSizingCheck">
                      {{ provider.name }}
                    </label>
                  </div>
                  <div>
                    <span class="pointer" @click="editProvider(provider)"><i class="bi-pencil-square"></i></span>
                    <span class="ms-2 pointer" @click="deleteProvider(provider)"><i class="bi-trash-fill"></i></span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p>No providers have been created</p>
    </template>
  </div>
</template>
<script>
export default {
  name: "Providers",
  data() {
    return {
      selectedProviders: [],
      selectedProvider: {},
      editMode: false,
      provider: {
        name:""
      }
    }
  },
  props: {
    value: {
      type: Array
    },
    providers: {
      type: Array
    }
  },
  methods: {
    addProvider() {
      this.axios.post('/providers', this.provider).then(res => {
        this.provider.name = '';
        this.providers.push(res.data);
      }).catch(error => {
        console.log(error);
      })
    },
    deleteProvider(provider) {
      this.axios.delete(`/providers/${provider.id}`).then(() => {
        let getIndex = this.providers.findIndex(x => {
          return x.id == provider.id;
        })
        this.providers.splice(getIndex, 1);
      }).catch(error => {
        console.log(error);
      })
    },
    editProvider(provider) {
      this.editMode = true;
      this.selectedProvider = {...provider};
    },
    submitProvider() {
      this.axios.put(`/providers/${this.selectedProvider.id}`, this.selectedProvider).then(() => {
        this.editMode = false;
        let getIndex = this.providers.findIndex(x => {
          return x.id == this.selectedProvider.id
        })
        if (getIndex > -1) {
          this.providers[getIndex] = {...this.selectedProvider};
          this.selectedProvider = null;
        }
      }).catch(error => {
        console.log(error);
      })
    }
  },
  watch: {
    selectedProviders(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.selectedProviders = newVal
    }
  }
}
</script>
