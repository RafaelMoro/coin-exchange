<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder === 1, down: this.sortOrder === -1 }" >
          <span
          class="underline cursor-pointer"
          @click="changeSortOrder"
          >Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="element in filteredAssets"
        :key="element.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            :src="
              `https://static.coincap.io/assets/icons/${element.symbol.toLowerCase()}@2x.png`
            "
            :alt="element.name"
          />
        </td>
        <td>
          <b># {{ element.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { id: element.id } }"
          >
            {{ element.name }}
          </router-link>
          <small class="ml-1 text-gray-500"> {{ element.symbol }} </small>
        </td>
        <td>{{ element.priceUsd | dollar }}</td>
        <td>{{ element.marketCapUsd | dollar }}</td>
        <td
          :class="
            element.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ element.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <px-button @parent-click="goToCoin(element.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from "@/components/PxButton";
export default {
  name: "PxAssetsTable",

  components: { PxButton },

  data() {
    return {
      filter: '',
      sortOrder: 1
    }
  },
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredAssets() {
      // if (!this.filter) { return this.assets }

      const altOrder = this.sortOrder === 1 ? -1 : 1

      return this.assets.filter(asset => 
      asset.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
      asset.name.toLowerCase().includes(this.filter.toLowerCase()) 
      ).sort((elementoAhora, elementoQueSeCompara) => {
        if (parseInt(elementoAhora.rank) > parseInt(elementoQueSeCompara.rank)) {
          return this.sortOrder
        }
        return altOrder
      })
    }
  },
  methods: {
    goToCoin(id) {
      //Es un objeto DIFERENTE a $route y permite acceder al router para navegar de manera dinamica
      this.$router.push({ name: "coin-detail", params: { id } });
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder === 1 ? -1 : 1
    }
  }
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
