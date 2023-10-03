<template>
  <div class="revenue-analysis">
    <v-row class="mb-3">
      <v-col v-for="data in summaryData" :key="data.title" cols="6">
        <v-card class="pa-3 text-center" :color="data.color">
          <div class="headline">{{ data.value }}</div>
          <div>{{ data.title }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-combobox
      v-model="selectedCategory"
      :items="categories"
      label="Category Filter"
      solo
      clearable
      @change="updateChartData"
    ></v-combobox>

    <v-combobox
      v-model="selectedTimeframe"
      :items="timeframes"
      label="Timeframe"
      solo
      clearable
      @change="updateChartData"
    ></v-combobox>

    <v-card class="mt-3">
      <v-card-title>Daily Trends</v-card-title>
      <apexchart
        type="line"
        :options="chartOptions"
        :series="series"
        height="250"
      ></apexchart>
    </v-card>

    <v-card class="mt-3">
      <v-card-title>Comparisons</v-card-title>
      <div class="chart-container">
        <apexchart
          type="line"
          :options="chartOptions"
          :series="comparisonSeries"
          height="250"
        ></apexchart>
      </div>
    </v-card>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      summaryData: [
        { title: "Orders", value: 2150, color: "lightblue" },
        { title: "Sales", value: "$20,500", color: "lightgreen" },
      ],
      categories: [
        "Electronics",
        "Apparel",
        "Books",
        "Home",
        "Toys",
        "Groceries",
      ],
      timeframes: ["Daily", "Weekly", "Monthly", "Yearly"],
      selectedCategory: "",
      selectedTimeframe: "Daily",
      chartOptions: {
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        grid: {
          padding: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          },
        },
      },
      series: [],
      comparisonSeries: [],
      dataMap: {
        Electronics: {
          Daily: {
            series: [3200, 3300, 3400, 3500, 3550, 3600, 3650],
            comparison: [12000, 12100, 12200, 12300, 12400, 12500, 12600],
            orders: 2250,
            sales: "$22,000",
          },
          Weekly: {
            series: [22000, 23000, 24000, 25000, 25500, 26000, 26500],
            comparison: [90000, 91000, 92000, 93000, 94000, 95000, 96000],
            orders: 1500,
            sales: "$150,000",
          },
          Monthly: {
            series: [90000, 91000, 92000, 93000, 94000, 95000, 96000],
            comparison: [
              350000, 355000, 360000, 365000, 370000, 375000, 380000,
            ],
            orders: 6500,
            sales: "$650,000",
          },
          Yearly: {
            series: [
              1100000, 1110000, 1120000, 1130000, 1140000, 1150000, 1160000,
            ],
            comparison: [
              4400000, 4420000, 4440000, 4460000, 4480000, 4500000, 4520000,
            ],
            orders: 26000,
            sales: "$2,600,000",
          },
        },
        Apparel: {
          Daily: {
            series: [2800, 2900, 3000, 3050, 3100, 3150, 3200],
            comparison: [11000, 11100, 11200, 11300, 11400, 11500, 11600],
            orders: 2000,
            sales: "$20,000",
          },
          Weekly: {
            series: [21000, 21200, 21400, 21600, 21800, 22000, 22200],
            comparison: [84000, 84600, 85200, 85800, 86400, 87000, 87600],
            orders: 1400,
            sales: "$140,000",
          },
          Monthly: {
            series: [85000, 85500, 86000, 86500, 87000, 87500, 88000],
            comparison: [
              340000, 342500, 345000, 347500, 350000, 352500, 355000,
            ],
            orders: 6100,
            sales: "$610,000",
          },
          Yearly: {
            series: [
              1050000, 1060000, 1070000, 1080000, 1090000, 1100000, 1110000,
            ],
            comparison: [
              4200000, 4230000, 4260000, 4290000, 4320000, 4350000, 4380000,
            ],
            orders: 24000,
            sales: "$2,400,000",
          },
        },
        Books: {
          Daily: {
            series: [2200, 2300, 2350, 2400, 2450, 2500, 2550],
            comparison: [10400, 10450, 10500, 10550, 10600, 10650, 10700],
            orders: 1800,
            sales: "$18,000",
          },
          Weekly: {
            series: [15500, 15600, 15700, 15800, 15900, 16000, 16100],
            comparison: [61000, 61400, 61800, 62200, 62600, 63000, 63400],
            orders: 1300,
            sales: "$130,000",
          },
          Monthly: {
            series: [68000, 68500, 69000, 69500, 70000, 70500, 71000],
            comparison: [
              272000, 273500, 275000, 276500, 278000, 279500, 281000,
            ],
            orders: 5900,
            sales: "$590,000",
          },
          Yearly: {
            series: [820000, 825000, 830000, 835000, 840000, 845000, 850000],
            comparison: [
              3280000, 3300000, 3320000, 3340000, 3360000, 3380000, 3400000,
            ],
            orders: 23000,
            sales: "$2,300,000",
          },
        },
        Home: {
          Daily: {
            series: [3100, 3150, 3175, 3200, 3225, 3250, 3300],
            comparison: [13500, 13600, 13700, 13800, 13900, 14000, 14100],
            orders: 2400,
            sales: "$24,000",
          },
          Weekly: {
            series: [17000, 17150, 17300, 17450, 17600, 17750, 17900],
            comparison: [70000, 70400, 70800, 71200, 71600, 72000, 72400],
            orders: 4800,
            sales: "$48,000",
          },
          Monthly: {
            series: [73000, 73500, 74000, 74500, 75000, 75500, 76000],
            comparison: [
              292000, 294000, 296000, 298000, 300000, 302000, 304000,
            ],
            orders: 9800,
            sales: "$98,000",
          },
          Yearly: {
            series: [890000, 895000, 900000, 905000, 910000, 915000, 920000],
            comparison: [
              3560000, 3580000, 3600000, 3620000, 3640000, 3660000, 3680000,
            ],
            orders: 40000,
            sales: "$4,000,000",
          },
        },
        Toys: {
          Daily: {
            series: [2900, 2950, 2975, 3000, 3025, 3050, 3100],
            comparison: [12700, 12800, 12900, 13000, 13100, 13200, 13300],
            orders: 2100,
            sales: "$21,000",
          },
          Weekly: {
            series: [15000, 15100, 15200, 15300, 15400, 15500, 15600],
            comparison: [63000, 63400, 63800, 64200, 64600, 65000, 65400],
            orders: 4400,
            sales: "$44,000",
          },
          Monthly: {
            series: [66000, 66250, 66500, 66750, 67000, 67250, 67500],
            comparison: [
              264000, 266000, 268000, 270000, 272000, 274000, 276000,
            ],
            orders: 8900,
            sales: "$89,000",
          },
          Yearly: {
            series: [810000, 812500, 815000, 817500, 820000, 822500, 825000],
            comparison: [
              3240000, 3255000, 3270000, 3285000, 3300000, 3315000, 3330000,
            ],
            orders: 37000,
            sales: "$3,700,000",
          },
        },
        Groceries: {
          Daily: {
            series: [2700, 2750, 2775, 2800, 2825, 2850, 2900],
            comparison: [11900, 12000, 12100, 12200, 12300, 12400, 12500],
            orders: 2000,
            sales: "$20,000",
          },
          Weekly: {
            series: [14000, 14100, 14200, 14300, 14400, 14500, 14600],
            comparison: [59000, 59300, 59600, 59900, 60200, 60500, 60800],
            orders: 4100,
            sales: "$41,000",
          },
          Monthly: {
            series: [61000, 61200, 61400, 61600, 61800, 62000, 62200],
            comparison: [
              244000, 246000, 248000, 250000, 252000, 254000, 256000,
            ],
            orders: 8500,
            sales: "$85,000",
          },
          Yearly: {
            series: [750000, 752000, 754000, 756000, 758000, 760000, 762000],
            comparison: [
              3000000, 3015000, 3030000, 3045000, 3060000, 3075000, 3090000,
            ],
            orders: 33000,
            sales: "$3,300,000",
          },
        },
      },
    };
  },
  methods: {
    updateChartData() {
      const categoryData = this.dataMap[this.selectedCategory] || {};
      const timeframeData = categoryData[this.selectedTimeframe] || {
        series: [3200, 3700, 3300, 3600, 3500, 3650, 3700],
        comparison: [12500, 12000, 13500, 13000, 13250, 13300, 13400],
        orders: 2250,
        sales: "$22,000",
      };

      this.series = [
        {
          name: `${this.selectedTimeframe} Revenue`,
          data: timeframeData.series,
        },
      ];
      this.comparisonSeries = [
        {
          name: `${this.selectedTimeframe} Comparison`,
          data: timeframeData.comparison,
        },
      ];
      this.summaryData = [
        { title: "Orders", value: timeframeData.orders, color: "lightblue" },
        { title: "Sales", value: timeframeData.sales, color: "lightgreen" },
      ];
    },
  },
};
</script>

<style scoped>
.revenue-analysis {
  padding: 12px;
}

.chart-container {
  height: 250px;
  overflow: hidden;
}

apexchart {
  max-height: 250px;
  width: 100%;
}
</style>
