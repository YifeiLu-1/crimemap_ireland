<template>
  <section
    id="title"
    class="colored-section"
  >
    <div class="container-fluid">
      <!-- Title -->
      <div class="row">
        <div class="col-lg-6">
          <h1
            id="heading"
            class="big-heading"
          >
            Explore the safety of the neighbourhood.
          </h1>

          <form class="county-selct-form">
            <div class="row">
              <div class="col">
                <select
                  id="county"
                  v-model="state.county"
                  class="custom-select custom-select-lg mb-3 county-selct"
                  @change="changeCounty"
                >
                  <option
                    v-for="county in counties"
                    :key="county"
                  >
                    {{ county }}
                  </option>
                </select>
              </div>
              <div class="col">
                <select
                  id="year"
                  v-model="state.year"
                  class="custom-select custom-select-lg mb-3 county-selct"
                  @change="changeYear"
                >
                  <option
                    v-for="year in years"
                    :key="year"
                  >
                    {{ year }}
                  </option>
                </select>
              </div>
              <div class="col-lg-1">
                <a href="/#map-section"><button
                  type="button"
                  class="btn btn-primary btn-lg county-select-btn"
                >Go</button></a>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-6">
          <img
            class="title-image"
            loading="lazy"
            src="../assets/images/garda.webp"
            alt="garda-image"
          >
        </div>
      </div>
    </div>
  </section>

  <!-- Map -->

  <section
    id="map-section"
    class="white-section"
  >
    <div class="container-fluid">
      <h1 class="map-title">
        {{ state.county }} Crimes in {{ state.year }}
      </h1>
      <div id="map" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive } from 'vue'

// default location and year
const state = reactive({
  county: 'Dublin',
  year: 2019
})

const counties = [
  'Dublin', 'Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Galway', 'Kerry',
  'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth',
  'Mayo', 'Meath', 'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary',
  'Waterford', 'Westmeath', 'Wexford', 'Wicklow']

const years = [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003]

let map = null
let stationLayer = null

const markersConfig = {
  spiderfyOnMaxZoom: false,
  chunkedLoading: true,
  showCoverageOnHover: false,
  iconCreateFunction: function (cluster) {
    // get the number of items in the cluster
    const count = cluster.getChildCount()

    // figure out how many digits long the number is
    const digits = (count + '').length

    // Return a new L.DivIcon with our classes so we can
    // style them with CSS. Take a look at the CSS in
    // the <head> to see these styles. You have to set
    // iconSize to null if you want to use CSS to set the
    // width and height.
    return L.divIcon({
      html: count,
      className: 'cluster digits-' + digits,
      iconSize: null
    })
  }
}

function changeCounty () {
  const county = state.county
  const countyLocations = {
    Carlow: [52.8365, -6.9341],
    Cavan: [53.9897, -7.3633],
    Clare: [52.9045, -8.9811],
    Cork: [51.8985, -8.4756],
    Donegal: [54.6538, -8.1096],
    Dublin: [53.3498, -6.2603],
    Galway: [53.2707, -9.0568],
    Kerry: [52.1545, 9.5669],
    Kildare: [53.1589, -6.9096],
    Kilkenny: [52.6541, -7.2448],
    Laois: [52.9943, -7.3323],
    Leitrim: [54.1247, -8.002],
    Limerick: [52.6638, -8.6267],
    Longford: [53.7276, -7.7933],
    Louth: [53.9508, -6.5406],
    Mayo: [54.0153, -9.4289],
    Meath: [53.6055, -6.6564],
    Monaghan: [54.2492, -6.9683],
    Offaly: [53.2357, -7.7122],
    Roscommon: [53.634, -8.1819],
    Sligo: [54.2766, -8.4761],
    Tipperary: [52.4747, -8.1544],
    Waterford: [52.2593, -7.1101],
    Westmeath: [53.5345, -7.4653],
    Wexford: [52.3369, -6.4633],
    Wicklow: [52.9808, -6.0446]
  }
  const latLonArray = countyLocations[county]
  const newLatLon = new L.latLng(latLonArray[0], latLonArray[1])
  map.setView(newLatLon, 13)
}

async function changeYear () {
  const year = state.year

  stationLayer.clearLayers()
  const markers = L.markerClusterGroup(markersConfig)

  const response = await fetch(`/data/data_${year}.json`)
  const data = await response.json()
  addMarkers(data, year, markers, map)
  stationLayer.addLayer(markers, map)
}

function constructPopupHTML (data, stationId, year) {
  let html = '<table>'
  const crimeLabel = data.crimeLabel
  const crimeDataInYear = data.stations[stationId].crimeData[year]
  for (const offenceId in crimeDataInYear) {
    const offenceName = crimeLabel[offenceId]
    const offenceCount = crimeDataInYear[offenceId]
    html +=
      '<tr><th>' +
      offenceName +
      ': </th><th><strong>' +
      offenceCount +
      '</th></strong></tr>'
  }
  return html + '</table>'
}

function addMarkers (data, year, markers, map) {
  for (const stationId in data.stations) {
    const stationData = data.stations[stationId]
    const latLonArray = stationData.locations
    const lat = latLonArray[0]
    const lon = latLonArray[1]
    const stationName = stationData.stationName
    const crimeData = stationData.crimeData
    const totalCrimeCount = crimeData[year]['0']

    for (let i = 0; i < totalCrimeCount; i++) {
      const marker = L.marker(new L.LatLng(lat, lon), { stationId })
      marker.bindPopup(stationId)
      markers.addLayer(marker)
    }
  }
  markers.on('clusterclick', function (a) {
    if (a.layer._zoom === 16) {
      const markers = a.layer.getAllChildMarkers()
      const stationId = markers[0].options.stationId
      const html = constructPopupHTML(data, stationId, year)
      const popup = L.popup({ minWidth: 520 })
        .setLatLng(a.layer.getLatLng())
        .setContent(html)
        .openOn(map)
    }
  })
}

onMounted(() => {
  initBaseLeafletMap()
  changeYear() // default to 2019
})

function initBaseLeafletMap () {
  const latlng = L.latLng(53.3498, -6.2603) // Dublin Position
  const tiles = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 16,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    }
  )

  map = L.map('map', { center: latlng, zoom: 13, layers: [tiles] })

  stationLayer = L.layerGroup()
  map.addLayer(stationLayer)
}

</script>
