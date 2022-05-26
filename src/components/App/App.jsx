import React from 'react';

import Header from '../Header/Header.jsx'
import './App.css';
import Form from '../Form/Form.jsx';
import FetchItems from '../ShoppingList/ShoppingList.jsx';


function App() {
    return (
        <>
            <Header />
            <h1>Add an item</h1>
            <h3>Item:</h3><input></input>
            <h3>Quantity:</h3><input></input>
            <h3>Unit:</h3><input></input>
            <button>Save</button>
            {/* <div className="App">
            </div> */}
            <h1>Shopping List</h1>
            <hr></hr>
            <button>Reset</button>
            <button>Clear</button>
            {/* GET REQUEST COMPONENT HERE */}
        </>
    );
}

export default App;
