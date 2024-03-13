import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { delay } from './util';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxXK6xibK2K4eLRDaZR9vzW9kvoAanVy0",
    authDomain: "grocerylistapp-2891c.firebaseapp.com",
    projectId: "grocerylistapp-2891c",
    storageBucket: "grocerylistapp-2891c.appspot.com",
    messagingSenderId: "130382090232",
    appId: "1:130382090232:web:7819256b6f7809d8a4100d",
    measurementId: "G-517FVWD8YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const app = firebase.app(); 
const analytics = getAnalytics(app); 











// db functions

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export const getLists = async ( {queryKey}) => {

    const user = queryKey[0].user; 
    // console.log(user);
    if(!user) return;
    let listKeys = user.lists;
    let resLists = [];
    let resolveCount = 0;
    for(let i = 0; i < listKeys.length; ++i){
        ++resolveCount;
        // eslint-disable-next-line no-loop-func
        const docSnap = getDoc(doc(db, "Lists", listKeys[i]))
        // eslint-disable-next-line no-loop-func
        docSnap.then((doc)=>{
            // console.log(doc, doc.data());
            const res = doc.data();
            res.id = listKeys[i];
            resLists.push(res);
            --resolveCount;
        })
    }
   
    while(resolveCount !== 0){
        await delay(100);
    }

    return resLists;

} 

export const pushItemToList = async (listId, item, quantity) => {
    const docRef = doc(db, "Lists", listId);
    await updateDoc(docRef, {
        items: arrayUnion({item: item, quantity: quantity})
    })

};



export const pushNewList = async (name, ownerId, ownerName) => {
    await addDoc(db, "Lists", {
        title: name,
        people: [ownerId],
        owner: {id: ownerId, name: ownerName},
        items:[]
    })
};

export const putListInfo = async (listId, name) => {
    await updateDoc(doc(db, "Lists", listId), {
        title: name
    })
};

export const deleteItemsFromList = async (listId, itemObjs) => {
    for(let i = 0; i < itemObjs.length; ++i){
        await updateDoc(doc(db, "Lists", listId), {
            items: arrayRemove(itemObjs[i])
        })
    }

    return true;
    
};

export const deleteList = async (listId) => {
    await deleteDoc(doc(db, "Lists", listId));
};

export const removeUserFromList = async (listId, userId) => {
    await updateDoc(doc(db, "Lists", listId), {
        people: arrayRemove(userId)
    })
};

export const addUserToList = async (listId, userId) => {
    await updateDoc(doc(db, "Lists", listId), {
        people: arrayUnion(userId)
    })
};


// auth functions


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
console.log(auth);


export const getCurrentUser = async () => {
    if(auth.currentUser){
        const userId = auth.currentUser.uid;
        const userEmail = auth.currentUser.email;
        const userSnap = await getDoc(doc(db, "Users", userId));
        let resUser = userSnap.data();
        resUser.id = userId;
        resUser.email = userEmail;
        resUser.friendMap = {};
        resUser.friends.forEach((friend) =>{
            let name = friend.name;
            let id = friend.id;
            resUser.friendMap[id] = name;
        } )
        console.log(resUser);
        return resUser;
    }else{
        console.log(auth);
    }
}

export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return await getCurrentUser();
}

export const logout = async () => {
    await signOut(auth);
    return true;
}
export const checkIfActiveUser = () => {
    console.log(auth.currentUser, !!auth.currentUser);
    return !!auth.currentUser;
}



// test functions
export const testFB = async () => {
    // let user = "Owen";
    if(auth.currentUser){
        let user = auth.currentUser.uid;
        const q = query(collection(db, "Lists"), where("owner.name", "==", "Owen"));
        // const q = query(collection(db, "Lists"), where("people", "array-contains", user));
        
        // const querySnapshot = await getDocs(collection(db, "Lists"));
        const querySnapshot = await getDocs(q);
        var lists = [];
        querySnapshot.forEach((doc) => {
            let x = Object(doc.data());
            lists.push(x);
            console.log(x);
        }); 
        return lists;
    }
  
}

// signInWithEmailAndPassword(auth, "test@test.com", "123456")
// .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user.displayName, user.uid);
//     // ...
//     getCurrentUser();
// })
// .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
// });