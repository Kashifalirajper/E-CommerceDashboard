<template>
  <div class="product-registration">
    <v-form ref="form" v-model="valid" @submit.prevent="submitProduct">
      <v-text-field
        v-model="product.name"
        :rules="nameRules"
        label="Product Name"
        required
      ></v-text-field>
      <v-textarea
        v-model="product.description"
        label="Description"
        required
      ></v-textarea>
      <v-text-field
        v-model="product.price"
        label="Price"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        v-model="product.stock"
        label="Stock Level"
        type="number"
        required
      ></v-text-field>
      <v-file-input
        v-model="product.image"
        label="Upload product image"
        accept="image/*"
      ></v-file-input>

      <v-btn type="submit" color="primary" :disabled="!valid">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    product: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: null,
    },
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
    ],
  }),
  methods: {
    submitProduct() {
      if (this.$refs.form.validate()) {
        // Call API to submit this data
        // this would be something like:
        // axios.post('/api/products', this.product)
        // .then(response => { /* Handle successful submission */ })
        // .catch(error => { /* Handle error */ });

        console.log("Product data:", this.product);
        this.$router.push("/inventory-management");
      }
    },
  },
};
</script>
<style scoped>
.product-registration {
  max-width: 600px;
  margin: 0 auto;
}
</style>
