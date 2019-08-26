// Components/Search.js
import React from 'react'
import {View, StyleSheet, TextInput, Button, FlatList, Text, ActivityIndicator} from 'react-native'
//import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

// import { } from ... car c'est un export nommé dans TMDBApi.js
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
// Components/Search.js

//console.log(data) pour afficher les logs dans la console

/*Pour contrôler un component, il y a deux types de données. Les props et le state.

Les props (que l'on a déjà vues) sont fixées par le component parent et ne peuvent pas être modifiées par le component
qui les reçoit.
Par exemple, pour nos items FilmItem, on a défini, depuis le component parent Search, une prop film

Les props sont, en langage plus technique, accessibles en lecture uniquement.

Dès lors que vous souhaitez modifier votre component et ses données affichées, vous allez utiliser son state
Dans le state, on ne gère que des données qui, une fois modifiées, peuvent affecter le rendu de notre component.
*/


/*React préconise fortement de n'utiliser que les données provenant des props et du state dans le  render de vos component.
Ainsi, vous vous assurez que vos components sont toujours mis à jour dès que leurs informations changent.*/

class Search extends React.Component {

  // Ici on va créer les propriétés de notre component custom Search
  constructor(props) {
    super(props)
    this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
    this.page = 0
    this.totalPage = 0
    this.state = {
       films: [],
       isloading: false
     }
  }

  _loadFilms() {
        this.setState({isloading:true})
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
          getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
              this.page=data.page
              this.totalPage = data.total_pages
              this.setState({
                films: [...this.state.films, ...data.results],
                 // OU films: this.state.films.concat(data.results)
                isloading:false
              })
          })
        }
    }

  _searchTextInputChanged(text) {
    this.searchedText=text // Modification du texte recherché à chaque saisie de texte,
                          //sans passer par le setState comme avant

   }

_displayLoading(){
    if(this.state.isloading)
    {
      return(
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
          </View>
      )

    }
 }
 _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
              films: []
              }, () => {
                // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
                console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
                
                this._loadFilms()
              })
  }
  render(){
    return(
      // Ici on rend à l'écran les éléments graphiques de notre component custom Search
      <View  style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />

        <Button title='Rechercher' onPress={() => this._loadFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold = {0.5}
           onEndReached={() =>{
              if(this.page < this.totalPage)
              {
                this._loadFilms()
              }
            }}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles =StyleSheet.create({
  main_container:{
    marginTop:50,
    flex:1
  },
   textinput:{
     marginLeft: 5,
     marginRight: 5,
     height: 50,
     borderColor: '#000000',
     borderWidth: 1,
     paddingLeft: 5
   },

   loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Search
