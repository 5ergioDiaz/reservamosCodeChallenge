import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import services from '../services/services';
import UnixTimeToText from '../utils/UnixTimeToText';
import LoaderBackdrop from '../components/LoaderBackdrop';

const height = Math.round(Dimensions.get('screen').height);
const width = Math.round(Dimensions.get('screen').width);

const HomeScreen = () => {

    const { searchPlaces, searchForecastByCoords } = services()

    const [isLoading, setIsLoading] = useState(false)
    const [places, setPlaces] = useState([])
    const [selectedCity, setSelectedCity] = useState()
    const [activateResults, setActivateResults] = useState(false)
    const [forecast, setForecast] = useState()

    const searchWord = async (searchField) => {
        setIsLoading(true)
        await searchPlaces(searchField)
            .then(data => {
                setIsLoading(false)
                setActivateResults(true)
                setPlaces(data)
            })
            .catch(err => {
                setIsLoading(false)
            })
    }

    const handleSelectCity = async (e) => {
        setSelectedCity(e)
        setActivateResults(false)
        setIsLoading(true)

        await searchForecastByCoords(e.lat, e.long)
            .then(data => {
                setIsLoading(false)
                setForecast(data)
            })
            .catch(err => {
                setIsLoading(false)
            })
    }

    return (
        <View style={styles.view}>
            <LoaderBackdrop loading={isLoading} />

            <TextInput
                style={styles.textInput}
                placeholder="Buscar..."
                onEndEditing={(e) => { searchWord(e.nativeEvent.text) }}
                onFocus={() => { setActivateResults(true) }}
                onBlur={() => { setActivateResults(false) }}
            />
            
            {activateResults && places && places.length > 0 &&
                <View style={styles.viewResults}>
                    <FlatList
                        data={places}
                        renderItem={({ item }) => {
                            if (item.result_type == 'city') {
                                return (
                                    <TouchableOpacity
                                        style={styles.buttonResult}
                                        onPress={() => { handleSelectCity(item) }}
                                    >
                                        <Text style={styles.textButton}>{`${item.city_name}, ${item.state}, ${item.country}`}</Text>
                                    </TouchableOpacity>
                                )
                            } else {
                                return (null)
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            }
            {selectedCity && forecast &&
                <ScrollView style={styles.fullWidth}>
                    <View style={styles.viewForecast}>
                        <Text style={styles.selectedCityText}>{`${selectedCity.display}, ${selectedCity.state}, ${selectedCity.country}`}</Text>

                        <View style={styles.selectedCityTodayView}>
                            <Image
                                style={styles.selectedCityTodayImage}
                                source={{
                                    uri: `https://openweathermap.org/img/w/${forecast.current.weather[0].icon}.png`,
                                }}
                            />
                            <Text style={styles.selectedCityTodayText}>
                                {forecast && `${forecast.current.temp.toFixed(1)} °C`}
                            </Text>
                        </View>

                        <View style={styles.allForecastView}>
                            {forecast && forecast.daily.length > 0 && forecast.daily.map((singleDay) => {
                                return (
                                    <View
                                        key={singleDay.dt}
                                        style={styles.individualDayView}
                                    >
                                        <Text style={styles.individualDayDate}>{UnixTimeToText(singleDay.dt)}</Text>
                                        <Image
                                            style={styles.individualDayImage}
                                            source={{
                                                uri: `https://openweathermap.org/img/w/${singleDay.weather[0].icon}.png`,
                                            }}
                                        />
                                        <View style={styles.individualDayTemp}>
                                            <Text>{`${singleDay.temp.min.toFixed(1)} °C`}</Text>
                                            <Text>Min</Text>
                                        </View>
                                        <View style={styles.individualDayTemp}>
                                            <Text>{`${singleDay.temp.max.toFixed(1)} °C`}</Text>
                                            <Text>Max</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    },
    view: {
        backgroundColor: '#FFFFFF',
        height: height,
        width: '90%',
        alignSelf: 'center',
        marginTop: 10
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    viewResults: {
        backgroundColor: '#e8e8e8',
        height: height / 4,
        overflow: 'hidden',
        marginTop: 10,
        borderRadius: 5
    },
    buttonResult: {
        backgroundColor: '#bababa',
        marginHorizontal: 20,
        marginVertical: 6,
        height: 30,
        justifyContent: 'center',
        borderRadius: 5
    },
    textButton: {
        marginLeft: 10
    },
    viewForecast: {
        height: height,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    },
    selectedCityText: {
        fontSize: 23
    },
    selectedCityTodayView: {
        alignItems: 'center',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    selectedCityTodayImage: {
        width: 60,
        height: 60
    },
    selectedCityTodayText: {
        fontSize: 40
    },
    allForecastView: {
        width: '100%', marginTop: 20
    },
    individualDayView: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#bfbfbf',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-evenly',
        marginTop: 10,
        borderRadius: 10
    },
    individualDayDate: {
        width: '40%'
    },
    individualDayImage: {
        width: '15%',
        height: 60
    },
    individualDayTemp: {
        alignItems: 'center',
        width: '15%'
    }
});

export default HomeScreen;