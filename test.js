const res = {
  results: [
    {
      address_components: [
        {
          long_name: "134",
          short_name: "134",
          types: ["street_number"],
        },
        {
          long_name: "Kaiser-Friedrich-Straße",
          short_name: "Kaiser-Friedrich-Straße",
          types: ["route"],
        },
        {
          long_name: "Potsdam Nord",
          short_name: "Potsdam Nord",
          types: ["political", "sublocality", "sublocality_level_1"],
        },
        {
          long_name: "Potsdam",
          short_name: "P",
          types: ["locality", "political"],
        },
        {
          long_name: "Potsdam",
          short_name: "Potsdam",
          types: ["administrative_area_level_3", "political"],
        },
        {
          long_name: "Brandenburg",
          short_name: "BB",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Germany",
          short_name: "DE",
          types: ["country", "political"],
        },
        {
          long_name: "14469",
          short_name: "14469",
          types: ["postal_code"],
        },
      ],
      formatted_address: "Kaiser-Friedrich-Straße 134, 14469 Potsdam, Germany",
      geometry: {
        bounds: {
          northeast: {
            lat: 52.4048776,
            lng: 13.0102568,
          },
          southwest: {
            lat: 52.40434200000001,
            lng: 13.0099871,
          },
        },
        location: {
          lat: 52.40460299999999,
          lng: 13.0101057,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 52.40595878029151,
            lng: 13.0114068802915,
          },
          southwest: {
            lat: 52.40326081970851,
            lng: 13.0087089197085,
          },
        },
      },
      place_id: "ChIJgfwaExj0qEcRWUQ6n6-WctI",
      types: ["premise"],
    },
  ],
  status: "OK",
};
console.log(res.results[0].geometry.location);
