import React, {  useContext, useEffect, useState } from "react";
import { List } from "../components/List/List";
import { useQuery } from "react-query";
import './pages.css';
import { UserContext } from "../App";
import { NavBurger } from "../components/NavBurger/NavBurger";
import { getLists, pushNewList, getCurrentUser, checkIfActiveUser, addFriend, register } from "../api/api";
import { useNavigate } from "react-router";
import { removeFriend } from "../api/firebase";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const Lists = () => {
    const [addNewListBool, updateAddNewItemBool] = useState(false); 
    const [newListTitle, updateNewListTitle] = useState('');
    const userContextObject = useContext(UserContext);
    const user = useContext(UserContext).currentUser;
    const navigate = useNavigate();
    const {data, refetch, error, isError, failureCount} = useQuery({queryFn: getLists, retry:0, queryKey:[{user:user}]});
    useCheckAuth(user, userContextObject);
    const onChange = (event) => {
        updateNewListTitle(event.target.value);
    }

    const onSubmit = ()=>{
        pushNewList(newListTitle, user.id, user.displayName).then(()=>{
            updateAddNewItemBool(false);
            refetch();
        })
    }
    

    const DELETEME = () => {
        console.log(user);
        register('test3@test.com', 'Emma', '123456');
        // addFriend(user.id, 'NayZ0RUYiFdIKIZj', "Emma");
        // removeFriend(user.id, 'NayZ0RUYiFdIKIZj', "Emma");
        // getCurrentUser().then((res) => {
        //     console.log(res);
        //     userContextObject.updateCurrentUser(res);
            
        // })
    }

    // if(!user) return <></>;

    

    // console.log(data);

    return (
        <>
        {/* <button onClick={DELETEME}>LogInUser</button> */}
        <NavBurger></NavBurger>
        <div className="lists-container">
            <div style={{textAlign:'center'}}>
                <h1 style={{textDecoration:'underline'}}>Your Shopping Lists</h1>
            </div>
            {data?.map((val, idx) => {
                if(!val) return null;
                return <List id={val.id} items = {val.items} title = {val.title} owner={val.owner} people={val.people} refetch={refetch} key={idx}></List>
            })}
            
            {addNewListBool ?  
                <div className="addNewListActive">
                    <label htmlFor="newListTitleInput">Grocery List Title: </label>
                    <input type="text" id="newListTitleInput" onChange={onChange} value={newListTitle}/>
                    <button onClick={onSubmit}>Accept</button>
                    <button onClick={()=>{updateAddNewItemBool(false)}}>Cancel</button>
                </div>
            : <div className="addNewList">
                    <button className="addNewListButton" onClick={()=>{updateAddNewItemBool(true)}}>Add</button>
            </div>}
        </div>
        </>
    );

}
