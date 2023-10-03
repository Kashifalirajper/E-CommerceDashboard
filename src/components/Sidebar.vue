<template>
  <v-navigation-drawer v-model="drawer" app>
    <div height="auto" class="pt-4">
      <div class="text-center">
        <v-avatar color="white" size="64">
          <v-img src="../assets/e-com-logo.png" contain />
        </v-avatar>
        <h2 class="black--text text-center">E-Commerce</h2>
      </div>
    </div>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="[icon, text, path] in links"
        :key="icon"
        :to="path"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-home", "Dashboard", "/"],
        ["mdi-chart-line", "Revenue Analysis Page", "/revenue-analysis"],
        ["mdi-warehouse", "Inventory Management Page", "/inventory-management"],
        [
          "mdi-clipboard-check-outline",
          "Product Registration",
          "/product-registration",
        ],
      ],
    };
  },
};
</script>

<style scoped>
/* Gradient background for sidebar */
v-navigation-drawer {
  background: linear-gradient(45deg, #ff6e7f, #bfe9ff);
}

/* Add some drop shadow for the logo */
v-avatar {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* White color for icons to make them more visible against the gradient background */
v-icon {
  color: white;
}

/* White color for text to make them more visible against the gradient background */
v-list-item-title {
  color: white !important;
}

/* To ensure our logo text stands out and remains readable */
.black--text {
  color: #333 !important;
  font-weight: bold;
}
</style>
