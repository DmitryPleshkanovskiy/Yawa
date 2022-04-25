import moment from "moment";
import queryString from "query-string";

class WeatherApiService {
  _apiBase = "https://api.tomorrow.io/v4";

  // eslint-disable-next-line class-methods-use-this
  async getData(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    // eslint-disable-next-line no-return-await
    return await res.json();
  }

  getTimelines(userLocation) {
    const apikey = process.env.REACT_APP_WEATHER_API_KEY;
    const location = [userLocation.lat, userLocation.lon];
    const fields = [
      "precipitationIntensity",
      "precipitationType",
      "humidity",
      "windSpeed",
      "windGust",
      "windDirection",
      "temperature",
      "temperatureApparent",
      "cloudCover",
      "pressureSurfaceLevel",
      "weatherCode",
      "precipitationProbability",
      "precipitationType",
      "sunriseTime",
      "sunsetTime",
      "weatherCodeFullDay",
    ];

    const units = "metric";
    const timesteps = ["current", "1h", "1d"];
    const now = moment.utc();
    const startTime = moment.utc(now).add(0, "minutes").toISOString();
    const endTime = moment.utc(now).add(7, "days").toISOString();

    const timezone = "UTC";

    const getTimelineParameters = queryString.stringify(
      {
        apikey,
        location,
        fields,
        units,
        timesteps,
        startTime,
        endTime,
        timezone,
      },
      { arrayFormat: "comma" }
    );

    return this.getData(`${this._apiBase}/timelines?${getTimelineParameters}`);
  }
}

export default WeatherApiService;
