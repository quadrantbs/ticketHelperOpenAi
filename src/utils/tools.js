export const toolsFunc = [
  {
    type: "function",
    function: {
      name: "promptExtractTicketDetails",
      description:
        "Extract key information from the following transport ticket image and return the data in JSON format.",
      strict: true,
      parameters: {
        type: "object",
        required: ["ticket"],
        properties: {
          ticket: {
            type: "object",
            properties: {
              transport_type: {
                type: "string",
                description: "Type of transport (e.g., train, plane, bus)",
              },
              transport_line: {
                type: "string",
                description: "Name or number of the transport line",
              },
              booking_code: {
                type: "string",
                description: "Booking reference code",
              },
              departure: {
                type: "object",
                properties: {
                  location_code: {
                    type: "string",
                    description: "Code for the departure location (e.g., ",
                  },
                },
                location_name: {
                  type: "string",
                  description:
                    "Name of the departure location (e.g., station/airport)",
                },
                city_name: {
                  type: "string",
                  description:
                    "Formatted city name (e.g., 'Cimahi, West Java, Indonesia')",
                },
                time: {
                  type: "string",
                  description: "Departure time in HH:mm format",
                },
                date: {
                  type: "string",
                  description: "Departure date in YYYY-MM-DD format",
                },
                additionalProperties: false,
                required: ["location_code"],
              },
            },
            arrival: {
              type: "object",
              properties: {
                location_code: {
                  type: "string",
                  description: "Code for the arrival location (e.g., 'BDO')",
                },
                location_name: {
                  type: "string",
                  description:
                    "Name of the arrival location (e.g., airport/station)",
                },
                city_name: {
                  type: "string",
                  description: "Formatted city name for the arrival location",
                },
                time: {
                  type: "string",
                  description: "Arrival time in HH:mm format",
                },
                date: {
                  type: "string",
                  description: "Arrival date in YYYY-MM-DD format",
                },
              },
            },
            passengers: {
              type: "array",
              description: "Array of passengers details",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Passenger's full name",
                  },
                  id_number: {
                    type: "string",
                    description: "ID number of the passenger",
                  },
                  type: {
                    type: "string",
                    description: "Type of passenger (e.g., 'adult', 'child')",
                  },
                  seat_number: {
                    type: "string",
                    description: "Assigned seat number",
                  },
                  class_type: {
                    type: "string",
                    description:
                      "Class of travel (e.g., 'economy', 'first class')",
                  },
                },
              },
            },
            qr_code: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  description: "Content of the QR code",
                },
                coordinates: {
                  type: "object",
                  properties: {
                    x: {
                      type: "integer",
                      description: "X position of the QR code in the image",
                    },
                    y: {
                      type: "integer",
                      description: "Y position of the QR code in the image",
                    },
                    width: {
                      type: "integer",
                      description: "Width of the QR code in pixels",
                    },
                    height: {
                      type: "integer",
                      description: "Height of the QR code in pixels",
                    },
                  },
                },
              },
            },
            printed_time: {
              type: "string",
              description:
                "Printed time on the ticket in YYYY-MM-DD HH:mm:ss format",
            },
            special_instructions: {
              type: "string",
              description: "Any special instructions on the ticket",
            },
            additional_field: {
              type: "object",
              description: "Any additional fields not explicitly stated",
            },
            additionalProperties: false,
            required: [
              "transport_type",
              "transport_line",
              "booking_code",
              "departure",
            ],
          },
        },
        additionalProperties: false,
      },
    },
  },
];
