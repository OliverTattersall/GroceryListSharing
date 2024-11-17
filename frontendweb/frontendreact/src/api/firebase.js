import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updateProfile } from "firebase/auth";
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
            if(res){
                res.id = listKeys[i];
                resLists.push(res);
            }
            
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
    const docRef = doc(collection(db, "Lists"));
    const newDoc = await setDoc(docRef, {
        title: name,
        people: [ownerId],
        owner: {id: ownerId, name: ownerName},
        items:[]
    })
    console.log(newDoc, docRef);
    await updateDoc(doc(db, "Users", ownerId), {
        lists : arrayUnion(docRef.id)
    })
    return true;
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

export const deleteList = async (listId, people) => {
    const batch = writeBatch(db);
    for(let i = 0; i < people.length; ++i){
        batch.update(doc(db, "Users", people[i]), {
            lists:arrayRemove(listId)
        })
    }
    await batch.commit();
    await deleteDoc(doc(db, "Lists", listId));

};

export const removeUserFromList = async (listId, userId) => {
    await updateDoc(doc(db, "Lists", listId), {
        people: arrayRemove(userId)
    })
    await updateDoc(doc(db, "Users", userId), {
        lists: arrayRemove(listId)
    })
};

export const addUserToList = async (listId, userId) => {
    await updateDoc(doc(db, "Lists", listId), {
        people: arrayUnion(userId)
    })
    await updateDoc(doc(db, "Users", userId), {
        lists: arrayUnion(listId)
    })
};


// auth functions


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export const getCurrentUser = async () => {
    if(auth.currentUser){
        const userId = auth.currentUser.uid;
        const userEmail = auth.currentUser.email;
        const userSnap = await getDoc(doc(db, "Users", userId));
        let resUser = userSnap.data();
        resUser.id = userId;
        resUser.email = userEmail;
        resUser.emailVerified = auth.currentUser.emailVerified;
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

export const register = async (email, name, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);
    await setDoc(doc(db, "Users", auth.currentUser.uid), {
        displayName: name,
        friends:[],
        lists:[]
    });
    
    return await getCurrentUser();
}

export const verifyEmail = async () => {
    return await sendEmailVerification(auth.currentUser);
}

export const resetPassword = async (userEmail) => {
    await sendPasswordResetEmail(auth, userEmail);
}

export const checkIfActiveUser = () => {
    console.log(auth.currentUser, !!auth.currentUser);
    return !!auth.currentUser;
}

export const addFriend = async (userId, friendId, userName) => {
    const docSnap = await getDoc(doc(db, "Users", friendId));
    if (!docSnap.exists()) throw new Error("Bad friend Id");
    const friendName = docSnap.data().displayName;
    await updateDoc(doc(db, "Users", userId), {
        friends: arrayUnion({id:friendId, name:friendName})
    });
    await updateDoc(doc(db, "Users", friendId), {
        friends: arrayUnion({id: userId, name:userName})
    });
}

export const removeFriend = async (userId, friendId, userName) => {
    const docSnap = await getDoc(doc(db, "Users", friendId));
    if (!docSnap.exists()) throw new Error("Bad friend Id");
    const friendName = docSnap.data().displayName;
    await updateDoc(doc(db, "Users", userId), {
        friends: arrayRemove({id:friendId, name:friendName})
    });
    await updateDoc(doc(db, "Users", friendId), {
        friends: arrayRemove({id: userId, name:userName})
    });
}

export const changeDisplayName = async (userId, newDisplayName) => {
    if(auth.currentUser.uid !== userId){
        throw new Error('User mismatch');
    }
    await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        displayName: newDisplayName
    });
    // await updateProfile(auth.currentUser, {
    //     displayName: newDisplayName
    //   })
}

export const changeEmail = async (userId, newEmail) => {
    if(auth.currentUser.uid !== userId){
        throw new Error('User mismatch');
    }
    await updateEmail(auth.currentUser, newEmail);
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