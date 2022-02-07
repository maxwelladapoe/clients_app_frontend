<template>
  <div class="modal fade" id="newClientModal" tabindex="-1" aria-labelledby="newClientModal" aria-hidden="true">
    <div class="modal-dialog  modal-lg">
      <form @submit.prevent="createNewClient">
        <div class="modal-content">
          <div class="modal-header px-5">
            <h5 class="modal-title" id="exampleModalLabel">New Client</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body px-5">
            <div class="form ">
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
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-success">Add Client</button>
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
  name: 'NewClientModal',
  components: {Providers},
  data() {
    return {
      modal: '',
      client: {
        name: '',
        phone: '',
        email: '',
        providers: []
      }
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById('newClientModal'));
  },
  props: {
    providers: {
      type: Array
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    createNewClient() {
      this.axios.post('/clients', this.client).then((res) => {
        this.client = {
          name: '',
              phone: '',
              email: '',
              providers: []
        };
        this.$emit('newClient', res.data)
        this.modal.hide();
      }).catch(error => {
        console.log(error);
      })
    }
  }
}
</script>
