<template>
  <div id="app" class="container">


    <div class="header mt-5 bg-light-blue">
      <div class="d-flex justify-content-between d-flex align-items-center p-3 ">
        <h2 class="text-primary">Clients</h2>
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#newClientModal">New Client</button>

        <NewClientModal :providers='providers' @newClient="clientCreated"/>
        <EditClientModal :providers='providers' :client="selectedClient"
                         @deleleClient="deleteClient"
                         @editClient="editClient"
                         @editCanceled="cancelEditClient"/>
        <DeleteClientModal :client="selectedClient" @deleteClient="deleteClient"/>


      </div>
    </div>
    <div id="clients-table">


      <div v-if=" isLoading">
        <Loading class="mx-auto mt-5"/>
      </div>

      <div v-else>
        <template v-if="clients.length >0">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Providers</th>
              <th scope="col"></th>
            </tr>
            </thead>


            <tbody>


            <template v-for="client in clients">
              <tr :key="client.id">
                <td>{{ client.name }}</td>
                <td>{{ client.email }}</td>
                <td>{{ client.phone }}</td>
                <td>{{ getProviderNames(client.providers) }}</td>

                <td>
                  <button class="btn btn-link" data-bs-toggle="modal" data-bs-target="#editClientModal"
                          @click="setSelectedClient(client)">Edit
                  </button>
                  <button class="btn btn-link" data-bs-toggle="modal" data-bs-target="#deleteClientModal"
                          @click="setSelectedClient(client)">Delete
                  </button>
                </td>
              </tr>
            </template>


            </tbody>

          </table>
        </template>

        <template v-else>
          <p class="mt-2 text-center" v-html="message"></p>
        </template>

      </div>

    </div>


  </div>
</template>

<script>

import NewClientModal from "@/components/NewClientModal";
import EditClientModal from "@/components/EditClientModal";
import DeleteClientModal from "@/components/DeleteClientModal";
import Loading from "@/components/Loading";

export default {
  name: 'App',
  components: {Loading, DeleteClientModal, EditClientModal, NewClientModal},
  data() {
    return {
      selectedClient: {},
      clients: [],
      providers: [],
      isLoading: true,
      message: 'No clients available click "New Client" to create one'
    }
  },

  methods: {
    setSelectedClient(client) {
      this.selectedClient = client;
    },
    deleteClient(client) {
      let getIndex = this.clients.findIndex(x => {
        return x.id == client.id;
      })
      this.clients.splice(getIndex, 1);
    },
    editClient(client) {
      let getIndex = this.clients.findIndex(x => {
        return x.id == client.id;
      })
      this.clients.splice(getIndex, 1, client);
    },

    cancelEditClient(originalClient) {
      let getIndex = this.clients.findIndex(x => {
        return x.id == originalClient.id;
      })
      this.clients.splice(getIndex, 1, originalClient);
    },
    clientCreated(client) {
      this.clients.push(client);
    },
    getProviderNames(providers) {

      let providerNameArray = [];
      providers.forEach((provider) => {

        let getIndex = this.providers.findIndex(x => {
          return x.id == provider
        });

        if (getIndex > -1) {
          providerNameArray.push(this.providers[getIndex].name);
        }

      })
      return providerNameArray.join(', ');
    }
  },

  mounted() {
    this.axios.all([this.axios.get('/clients'), this.axios.get('/providers')])
        .then(this.axios.spread((res1, res2) => {
          this.clients = res1.data;
          this.providers = res2.data;
          this.isLoading = false;
        })).catch(e => {
      console.log(e.message);
      if (e.message === 'Network Error') {
        this.isLoading = false;
        // display to the user to ensure that the backend of the application is running fine
        this.message = 'It seems the backend service is not running. <br> Kindly ensure that it is running and refresh this page';
      }
    })
  }
}
</script>

<style>
.bg-light-grey {
  background-color: #E7E7E7;
}

.btn-light-grey {
  background-color: #E7E7E7 !important;
}

.bg-light-blue {
  background-color: #F0F5F9;
}

.pointer {
  cursor: pointer;
}
</style>

