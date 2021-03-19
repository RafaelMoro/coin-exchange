<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <px-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
//import api from "../api"
import api from "@/api";
import PxAssetsTable from "@/components/PxAssetsTable";

export default {
  name: "Home",
  components: { PxAssetsTable },

  data() {
    return {
      isLoading: false,
      assets: []
    };
  },
  created() {
    this.isLoading = true;
    //Promesa
    //api().then(result => (this.assets = result))

    //Funcion IFEE asincrona
    // (async () => {
    //   const resultado = await api();
    //   console.log(resultado); // {"metadata": "for: test.png"}
    // })();

    const datos = async () => {
      const resultado = await api.getAssets();
      this.assets = resultado;
      this.isLoading = false;
    };
    datos();

    //api.getAssets().then(assets => (this.assets = assets))
  }
};
</script>
