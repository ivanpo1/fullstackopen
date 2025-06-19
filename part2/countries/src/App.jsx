import {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'

function App() {
    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

    useEffect(() => {
        if (
            selectedCountry &&
            !countriesToShow.some(
                (c) => c.name.common === selectedCountry.name.common
            )
        ) {
            setSelectedCountry(null)
        }
    }, [countryFilter, countriesToShow, selectedCountry])

    useEffect(() => {
        if (countriesToShow.length === 1 && !selectedCountry) {
            setSelectedCountry(countriesToShow[0])
        }
    }, [countriesToShow, selectedCountry])

    useEffect(() => {
        setWeather(null)

        if(selectedCountry) {
            const lat = selectedCountry.latlng[0]
            const lon = selectedCountry.latlng[1]
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`

            axios.get(url).then((response) => {
                setWeather(response.data)
            }).catch(error => {
                console.log('error', error)
            })
        }
    }, [selectedCountry])

    const handleCountrySelection = (event) => setCountryFilter(event.target.value)
    const clearSelection = () => {
        setSelectedCountry(null)
        setCountryFilter('')
    }

    return (
        <div>
            <div>
                find countries <input value={countryFilter} onChange={handleCountrySelection} />
            </div>
            <br />

            <Countries
                countries={countriesToShow}
                onSelectedCountry={setSelectedCountry}
                selectedCountry={selectedCountry}
                clearSelection={clearSelection}
                weather={weather}
            />
            {/*{selectedCountry && <Country country={selectedCountry} />}*/}
        </div>
    )
}

export default App
