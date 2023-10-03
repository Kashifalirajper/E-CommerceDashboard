<template>
  <div class="inventory-management">
    <!-- Filter and Search Bar -->
    <v-row>
      <v-col cols="4">
        <v-select
          v-model="filterStatus"
          :items="['All', 'In Stock', 'Low Stock', 'Out of Stock']"
          label="Filter by Status"
          @change="filterByStatus"
        ></v-select>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Products List -->
    <v-data-table
      :headers="headers"
      :items="filteredProducts"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.inventory="{ item }">
        <span
          :class="{
            'low-stock': inventoryStatus(item) === 'Low Stock',
            'out-of-stock': inventoryStatus(item) === 'Out of Stock',
          }"
        >
          {{ item.inventory }} - {{ inventoryStatus(item) }}
        </span>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn icon @click="editItem(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteItem(item)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Inventory Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ editedItem.name }}</span>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="editedItem.name"
            label="Product Name"
          ></v-text-field>
          <v-text-field
            v-model="editedItem.inventory"
            label="Inventory"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      filterStatus: "All",
      headers: [
        { text: "Product Name", value: "name" },
        { text: "Inventory", value: "inventory" },
        { text: "Actions", value: "action", sortable: false },
      ],
      products: [
        { name: "Apple iPhone 13 Pro Max", inventory: 10 },
        { name: "Samsung Galaxy Tab S7", inventory: 0 },
        { name: "Bose QuietComfort 35 II Wireless Headphones", inventory: 3 },
        {
          name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
          inventory: 40,
        },
        { name: "LEGO Super Mario Adventures Starter Course", inventory: 5 },
        { name: "Sony PlayStation 5", inventory: 0 },
        { name: "Logitech MX Master 3 Advanced Wireless Mouse", inventory: 30 },
        { name: "Kindle Paperwhite", inventory: 20 },
        { name: "Fitbit Charge 4 Fitness Tracker", inventory: 0 },
        { name: "Ninja Professional BL610 Blender", inventory: 15 },
        { name: "Canon EOS M50 Mark II Camera", inventory: 6 },
        { name: "Dyson V11 Animal Cordless Vacuum", inventory: 4 },
        { name: "Nest Learning Thermostat", inventory: 10 },
        { name: "Keurig K-Classic Coffee Maker", inventory: 12 },
        { name: "Crock-Pot 7-Quart Oval Slow Cooker", inventory: 8 },
        {
          name: "Samsung 50-inch Class Crystal UHD LED Smart TV",
          inventory: 0,
        },
        { name: "Roku Streaming Stick+", inventory: 35 },
        { name: "BISSELL CleanView Bagless Vacuum Cleaner", inventory: 20 },
        { name: "Braun Series 7 Electric Razor for Men", inventory: 4 },
        { name: "KitchenAid Artisan Series 5-Quart Stand Mixer", inventory: 0 },
        { name: "adidas Men's Ultraboost 21 Running Shoes", inventory: 25 },
        {
          name: "Philips Sonicare ProtectiveClean Electric Toothbrush",
          inventory: 14,
        },
        { name: "T-fal Nonstick Dishwasher Safe Cookware Set", inventory: 12 },
        { name: "GoPro HERO9 Black", inventory: 7 },
        { name: "Calvin Klein Eternity Eau de Parfum", inventory: 0 },
        { name: "JBL FLIP 5 Portable Bluetooth Speaker", inventory: 15 },
        { name: "Gillette Fusion5 ProGlide Men's Razor", inventory: 10 },
        { name: "Panasonic NN-SN966S Microwave Oven", inventory: 6 },
        { name: "Cuisinart 12-Cup Coffee Maker", inventory: 3 },
        { name: "Ring Video Doorbell 3", inventory: 5 },
        { name: "Toshiba 32-inch Smart HD Fire TV", inventory: 0 },
        { name: "Samsung 970 EVO SSD 1TB", inventory: 40 },
        {
          name: "Beats Solo Pro Wireless Noise Cancelling Headphones",
          inventory: 9,
        },
        { name: "Seagate Portable 2TB External Hard Drive", inventory: 18 },
        { name: "OtterBox COMMUTER SERIES iPhone 12 Case", inventory: 0 },
        { name: "Fujifilm Instax Mini 11 Camera", inventory: 25 },
        { name: "VIZIO 24-inch D-Series LED Smart TV", inventory: 12 },
        { name: "Echo Dot (4th Gen) Smart Speaker", inventory: 20 },
        { name: "Razer DeathAdder Elite Gaming Mouse", inventory: 15 },
        {
          name: "LEGO Technic Bugatti Chiron Model Building Kit",
          inventory: 2,
        },
        { name: "Hamilton Beach Dual Breakfast Sandwich Maker", inventory: 0 },
        { name: "ASUS VivoBook 15 Thin and Light Laptop", inventory: 6 },
        { name: "UGG Women's Fluff Yeah Slide Slipper", inventory: 5 },
        { name: "DEWALT 20V MAX Cordless Drill", inventory: 10 },
        { name: "Oculus Quest 2 Virtual Reality Headset", inventory: 8 },
        { name: "Coleman Sundome Dome Tent", inventory: 15 },
        { name: "TOMS Women's Classic Canvas Slip-On Shoes", inventory: 30 },
        { name: "WD 4TB Elements Portable External Hard Drive", inventory: 20 },
        { name: "S'well Stainless Steel Water Bottle", inventory: 0 },
        { name: "Peloton Bike+", inventory: 3 },
      ],
      filteredProducts: [],
      originalName: "",
      editedItem: {},
      dialog: false,
    };
  },

  methods: {
    inventoryStatus(product) {
      if (product.inventory <= 0) return "Out of Stock";
      if (product.inventory <= 5) return "Low Stock";
      return "In Stock";
    },
    filterByStatus() {
      if (this.filterStatus === "All") {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(
          (product) => this.inventoryStatus(product) === this.filterStatus
        );
      }
    },
    editItem(item) {
      this.originalName = item.name; // Set the original name here
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = {};
      }, 300);
    },
    save() {
      const productToUpdate = this.products.find(
        (product) => product.name === this.originalName
      );

      if (productToUpdate) {
        Object.assign(productToUpdate, this.editedItem);
        this.originalName = ""; // Reset the original name
      } else {
        console.error("Product not found!");
      }

      this.close();
    },
    deleteItem(item) {
      const index = this.products.indexOf(item);
      if (index > -1) {
        if (confirm("Are you sure you want to delete this item?")) {
          this.products.splice(index, 1);
        }
      }
    },
  },
  created() {
    this.filteredProducts = this.products; // Initialize filteredProducts with all products
  },
};
</script>

<style scoped>
.inventory-management {
  padding: 12px;
}

.low-stock {
  color: orange;
}

.out-of-stock {
  color: red;
}
</style>
