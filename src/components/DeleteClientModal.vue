<template>
  <div class="modal fade" id="deleteClientModal" tabindex="-1" aria-labelledby="editClientModal" aria-hidden="true">

    <div class="modal-dialog ">
      <form @submit.prevent="deleteClient">
        <div class="modal-content">
          <div class="modal-header px-3">
            <h5 class="modal-title" id="exampleModalLabel">Delete Client</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body px-3">

<div >
  <p>  Are you sure you want to delete "<span class="fw-bold">{{client.name}}</span>" ? <br>
    <span class="text-danger">This activity cannot be rolled back</span></p>
</div>

          </div>
          <div class="modal-footer px-3">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-danger">Delete Client</button>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import {Modal} from "bootstrap";

export default {
  name: 'DeleteClientModal',
  data() {
    return {

      provider: {
        name: ''
      }
    }
  },
  props: {
    client: {
      type: Object,
    }
  },

  mounted(){
    this.modal = new Modal(document.getElementById('deleteClientModal'));
  },
  methods: {

    deleteClient() {
      this.axios.delete(`/clients/${this.client.id}`).then((res) => {
        this.modal.hide();
        this.$emit('deleteClient', this.client)
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
    }

  }
}
</script>
