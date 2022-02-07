<template>
  <div class="modal fade" id="editClientModal" tabindex="-1" aria-labelledby="editClientModal" aria-hidden="true">
    <div class="modal-dialog  modal-lg">
      <form @submit.prevent="editClient">
        <div class="modal-content">
          <div class="modal-header px-5">
            <h5 class="modal-title" id="exampleModalLabel">Edit Client</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body px-5">
            <div class="form">
              <div class="row g-6 mb-3 align-items-center ">
                <label for="name" class="col-12 col-lg-2  col-form-label">Name: </label>
                <div class="col-12 col-lg-10">
                  <input type="text" id="name" class="form-control" required v-model="client.name">
                </div>
              </div>
              <div class="row g-6 mb-3 align-items-center ">
                <label for="email" class="col-12 col-lg-2  col-form-label">Email: </label>
                <div class="col-12 col-lg-10">
                  <input type="email" id="email" class="form-control" required v-model="client.email">
                </div>
              </div>
              <div class="row g-6 mb-3 align-items-center ">
                <label for="phone" class="col-12 col-lg-2  col-form-label">Phone: </label>
                <div class="col-12 col-lg-10">
                  <input type="tel" id="phone" class="form-control" required v-model="client.phone">
                </div>
              </div>
                  <Providers :providers="providers" v-model="client.providers"/>
            </div>
          </div>
          <div class="modal-footer px-5">
            <div class="me-auto">
              <button type="button" class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#deleteClientModal" @click="deleteClient" >Delete Client</button>
            </div>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelEditClient">Cancel
            </button>
            <button type="submit" class="btn btn-success">Save Client</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {Modal} from 'bootstrap';
import Providers from "@/components/Providers";
export default {
  name: 'EditClientModal',
  components: {Providers},
  data() {
    return {
      originalClient: {},
    }
  },
  props: {
    providers: {
      type: Array
    },
    client: {
      type: Object,
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById('editClientModal'));
    this.originalClient = {...this.client};
  },
  methods: {
    cancelEditClient() {
      this.$emit('editCanceled', this.originalClient);
    },
    deleteClient(){
      this.modal.hide();
      this.$emit('deleteClient', this.client)
    },
    editClient() {
      this.axios.put(`/clients/${this.client.id}`, this.client).then(() => {
        this.modal.hide();
        this.$emit('editClient', this.client)
      }).catch(error => {
        console.log(error);
      })
    },
  },

  watch: {
    client(newVal){
      this.originalClient = {...newVal};
    }
  },
}
</script>
