const Countries = ({countries, onSelectedCountry, selectedCountry, clearSelection, weather}) => {
    if (selectedCountry) {
        return (
            <div>
                <button onClick={clearSelection}>Back to home</button>
                <Country country={selectedCountry} weather={weather}/>
            </div>
        )
    }
    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    return (
        <ul>
            {countries.map((country, index) => (
                <li key={country.ccn3}>
                    {index + 1} {country.name.common}
                    <button onClick={() => onSelectedCountry(country)}>Show</button>
                </li>
            ))}
        </ul>
    )
}

const Country = ({country, weather}) => {
    const countryStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column'
    }

    return (
        <div style={countryStyle}>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
            <Weather weather={weather}/>
        </div>
    )
}

const Weather = ({weather}) => {
    if (!weather) return <p>Loading weather...</p>

    return (
        <div>
            <p>Temperature {weather.main.temp}° Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='i dont know'></img>
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Countries