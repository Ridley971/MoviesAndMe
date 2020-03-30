import { createStore } from 'redux'
import  toggleFavorite from './Reducers/favoriteReducer'
import setAvatar from './Reducers/avatarReducer'
//permet de définir plusieur Reducers
import { persistCombineReducers } from 'redux-persist'
//permet un stockage en local
import AsyncStorage from '@react-native-community/async-storage'

//Les params obligatoires pour la config de la persistance dans le state global
const rootPersistConfig = {
  key: 'root',//id pour le store persisté
  storage: AsyncStorage //type de stockage plus d'infos sur https://github.com/rt2zz/redux-persist#storage-engines
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}))
