// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi} from "../API/TMDBApi"

class FilmItem extends React.Component {
  render() {
     const film=this.props.film
    return (

      <View style={styles.main_container}>

        <Image
           style={styles.image}
           source={{uri: getImageFromApi(film.poster_path)}}
        />

        <View style={styles.view_container}>

          <View style={styles.header_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>

          <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
          </View>

          <View style={{ backgroundColor:'violet'}}>
              <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
    flexDirection:'row',
    height: 190
  },

  view_container:{flex:2, flexDirection:'column'},

  header_container:{flex:1, flexDirection:'row'},

  description_container:{flex:2},

  image:{
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'},

  vote_text:{fontWeight:'bold',fontSize:22, color:'gray'},

  description_text:{fontStyle:'italic', color:'gray'},

  date_text:{textAlign:'right'},

  title_text: {
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flex:2
  }
})

export default FilmItem
