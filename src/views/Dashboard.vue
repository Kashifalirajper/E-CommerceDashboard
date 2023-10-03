<template>
  <div class="dashboard">
    <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
      <h3>Dashboard</h3>
      <v-btn color="success"> View Orders </v-btn>
    </v-subheader>
    <br />
    <v-row>
      <v-col lg="7" cols="12">
        <v-snackbar v-model="showSnackbar" color="green" :timeout="3000" top>
          Logged in successfully! Welcome to Kashif Ali.
          <v-btn text @click="showSnackbar = false">Close</v-btn>
        </v-snackbar>
        <v-row>
          <v-col
            lg="6"
            cols="12"
            v-for="(item, index) in activityLog"
            :key="index"
          >
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <strong>{{ item.title }}</strong> <br />
                  <span>Last 3 weeks</span>
                </div>
                <v-avatar
                  size="60"
                  :color="item.color"
                  style="border: 3px solid #444"
                >
                  <span style="color: white">{{ item.amount }} +</span>
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card>
          <v-card-title>Activities</v-card-title>
          <v-card-text class="py-0">
            <v-timeline align-top dense>
              <v-timeline-item color="indigo" small>
                <strong>5 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
              <v-timeline-item color="green" small>
                <strong>35 Minuts ago</strong>
                <div class="text-caption mb-2">A Product has delivered!</div>
              </v-timeline-item>

              <v-timeline-item color="indigo" small>
                <strong>44 Minuts ago</strong>
                <div class="text-caption">
                  You have new order please check this out
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-data-table
            caption="Recent Order list"
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.action="">
              <v-btn color="success" outlined small shaped>View</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      showSnackbar: true, // Controls the snackbar visibility
      activityLog: [
        {
          title: "Total Products",
          amount: 50,
          icon: "mdi-account",
          color: "cyan lighten-3",
        },
        {
          title: "Total Customer",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "green darken-2",
        },
        {
          title: "Total Sale",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "blue-grey darken-1",
        },
        {
          title: "Pending Orders",
          amount: 3433,
          icon: "mdi-account-group-outline",
          color: "deep-orange darken-1",
        },
      ],
      headers: [
        {
          text: "Product Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Category", value: "category" },
        { text: "Price", value: "price" },
        { text: "Status", value: "status" },
        { text: "Date", value: "date" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "action" },
      ],

      desserts: [
        {
          name: "Samsung Galaxy S21",
          category: "Electronics",
          price: "$799",
          status: "Delivered",
          date: "2 days ago",
          description: "5G Connectivity, 128GB Storage",
        },
        {
          name: "Apple AirPods Pro",
          category: "Electronics",
          price: "$249",
          status: "Shipped",
          date: "5 days ago",
          description: "Wireless, Noise Cancellation, 24h Battery",
        },
        {
          name: "Dell XPS 15",
          category: "Computers",
          price: "$1999",
          status: "Processing",
          date: "Today",
          description: "i7 Processor, 512GB SSD, 32GB RAM",
        },
        {
          name: "Levi's Jeans for Men",
          category: "Fashion",
          price: "$49",
          status: "Delivered",
          date: "1 week ago",
          description: "Slim Fit, Blue, Size 32x32",
        },
        {
          name: "Instant Pot DUO60",
          category: "Home Appliances",
          price: "$89",
          status: "Returned",
          date: "3 weeks ago",
          description: "6 Qt, 7-in-1 Multi-Use, Programmable Pressure Cooker",
        },
      ],
    };
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.no);
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}

.v-avatar {
    background: white;
    color: white;
    font-weight: bold;
    font-size: 1.3em;
    border-radius: 50%; /* Ensure it's rounded */
}

.v-snackbar {
  border-radius: 12px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
