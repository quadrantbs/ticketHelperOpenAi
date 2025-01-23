export const promptExtractTicketDetails = `
Extract key information from the following transport ticket image and return the data in JSON format. The JSON structure should include the following fields:

Transport type (e.g., train, plane, bus)
Transport line
Booking code
Departure details, including:
  - Location name (e.g., station/airport/terminal name)
  - City name (formatted as full city name, province/state, country)
  - Departure time
  - Departure date
Arrival details, including:
  - Location name (e.g., station/airport/terminal name)
  - City name (formatted as full city name, province/state, country)
  - Arrival time
  - Arrival date
Passengers (as an array of objects, each with the following fields: name, ID number, type, class, seat number)
QR code content and its coordinates in the image
Printed time
Additionally, if any additional details or fields are present on the ticket that are not explicitly listed above, please include them in the JSON structure under appropriate keys. For example, if the ticket includes class type (e.g., "economy", "first class"), ticket price, or any special instructions (e.g., "no smoking"), include those in the following format:

If these fields do not exist on the ticket, they can be left empty or omitted entirely.

The updated JSON format should look like this:
{
  "ticket": {
    "transport_type": "string", // e.g., "train", "plane", "bus"
    "transport_line": "string", // e.g., "Commuter Line Bandung Raya", "Airline XYZ Flight 123" or vehicle number or name
    "booking_code": "string",
    "departure": {
      "location_code": "string", // e.g., "CMI" for Cimahi Station
      "location_name": "string", // e.g., "Cimahi Station"
      "city_name": "string", // e.g., "Cimahi, West Java, Indonesia"
      "time": "HH:mm", // Departure time (24-hour format)
      "date": "YYYY-MM-DD" // Departure date
    },
    "arrival": {
      "location_code": "string", // e.g., "BDO" for Husein Sastranegara Airport
      "location_name": "string", // e.g., "Husein Sastranegara Airport"
      "city_name": "string", // e.g., "Bandung, West Java, Indonesia"
      "time": "HH:mm", // Arrival time
      "date": "YYYY-MM-DD" // Arrival date
    },
    "passengers": [
      {
        "name": "string", // Passenger name
        "id_number": "string", // Passenger ID number
        "type": "string", // e.g., "adult", "child"
        "seat_number": "string", // Seat number
        "class_type": "string" // e.g., "economy", "first class" (if available)
      }
    ],
    "qr_code": {
      "content": "string", // QR code content
      "coordinates": { // Coordinates for the QR code in the image
        "x": "integer", // X position of the top-left corner
        "y": "integer", // Y position of the top-left corner
        "width": "integer", // Width of the QR code
        "height": "integer" // Height of the QR code
      }
    },
    "printed_time": "YYYY-MM-DD HH:mm:ss", // Printed time on ticket
    "special_instructions": "string", // Any special instructions or notes (if available)
    "additional_field": "object" // Any additional field not listed above
  }
}
Instructions:
1. Ensure that location details include both the location name (station/airport/terminal) and the full city name formatted as "City, State/Province, Country".
2. If certain fields like additional_field are not present in the ticket, they can be left empty or omitted from the response.
3. Ensure that all required fields (transport type, transport line, etc.) are extracted accurately.
4. For the QR code, return its content and the exact coordinates (x, y, width, height) relative to the image, so it can be cropped or highlighted by the frontend.
5. If there are additional fields not mentioned above, include them in the JSON structure using appropriate key names.
`;
