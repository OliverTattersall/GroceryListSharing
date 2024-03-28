import * as Firebase from './firebase';
import * as noDB from './noDB';

// const state = noDB;
const state = Firebase;


// data

export const getLists = state.getLists; // (param) => param.queryKey

export const pushItemToList = state.pushItemToList; // (listId, item, quantity)

export const pushNewList = state.pushNewList; // (name, ownerId, ownerName)

export const putListInfo = state.putListInfo; // (listId, name)

export const deleteItemsFromList = state.deleteItemsFromList; // (listId, itemObjs)

export const deleteList = state.deleteList; // (listId, people)

export const removeUserFromList = state.removeUserFromList; // (listId, userId)

export const addUserToList = state.addUserToList; // (listId, userId)

// auth

export const getCurrentUser = state.getCurrentUser; // ()

export const login = state.login; // (email, password)

export const logout = state.logout; // ()

export const register = state.register; // (email, name, password)

export const checkIfActiveUser = state.checkIfActiveUser; // ()

export const addFriend = state.addFriend // (userId, friendId, userName)

export const removeFriend = state.removeFriend // (userId, friendId, userName)
