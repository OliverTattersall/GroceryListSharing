var testData = [
        {title: "Basic Grocery List", owner:{id:"h34", name:"Oliver"}, people:["Owen", "Emma"], items:[{item:"Test Source", quantity:"small jar"}, 
            {item:"Rice", quantity:"1 kg"}, 
            {item:"Oranges", quantity:"8"}]
        }, 
        {title: "Basic Grocery List", owner:{id:"NayZ0RUYiFdIKIZjgdZEonnWHQL2", name:"Owen"}, people:["Oliver"], items:[{item:"Test Source", quantity:"small jar"}, 
            {item:"Rice", quantity:"1 kg"}, 
            {item:"Oranges", quantity:"8"}]
        }     
]

var testUsers = ["Oliver", "Owen", "Emma"];

var testUserInfo = [
    {
        id:"h34",displayName: "Oliver", email:"test@testNoDB.com", friends:[{id: 'NayZ0RUYiFdIKIZjgdZEonnWHQL2', name: 'Owen'}]
    },{
        username: "Owen", friends:["Oliver"]
    },{
        username: "Emma", friends:["Oliver"]
    }
]




// data

export const getLists = async (param) => {
    // console.log(param.queryKey)
    return await testData;
}

export const pushItemToList= async (listId, item, quantity) => {
    return await testData[listId].items.push({checked:false, item:item, quantity:quantity});
}

export const pushNewList = async (name, ownerId, ownerName) => {
    return await testData.push({title : name, owner:{id: ownerId, name: ownerName}, people:[] , items:[]})
}

export const putListInfo = async (listId, name) =>{
    testData[listId].title = name;
    return await true;
}

export const deleteItemsFromList = async (listId, itemObjs) => {
    // console.log(itemObjs);
    for(let i = 0; i < itemObjs.length; ++i){

        testData[listId].items[itemObjs[i]] = null;
    }
    // console.log(testData)
    testData[listId].items = testData[listId].items.filter((val)=>!!val);
    return await true;
}

export const deleteList = async (listId) => {
    testData[listId] = null;
    testData = testData.filter((val)=>!!val);
    return await true;
}

export const removeUserFromList = async (listId, user) => {
    testData[listId].people = testData[listId].people.filter(val=>(val!=user));
    return await true;
}

export const addUserToList = async (listId, user) => {
    testData[listId].people.push(user);
}


//user related


export const getCurrentUser = async () => {
    return await testUserInfo[0];
}


export const login = async (email, password) => {
    return await getCurrentUser();
}

export const logout = async () => {

};

export const checkIfActiveUser = () => {
    return true;
}

export const addFriend = async (friendId) => {

}
 
export const removeFriend = async (friendId) => {

}
