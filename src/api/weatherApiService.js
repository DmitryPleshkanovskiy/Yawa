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

  getTimelines(getTimelineParameters) {
    return this.getData(`${this._apiBase}/timelines?${getTimelineParameters}`);
  }
}

export default WeatherApiService;
