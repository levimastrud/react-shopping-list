import Header from '../Header/Header.jsx'
import './App.css';
// import Form from '../Form/Form.jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ListItems from '../ShoppingList/ShoppingList.jsx';

function App() {

    const [shoppingList, setShoppingList] = useState([]);
    const [newItem, setNewItem] = useState([]);
    const [newQuantity, setNewQuantity] = useState([]);
    const [newUnit, setNewUnit] = useState([]);

    const FetchItems = () => {
        axios.get('/list')
            .then(response => {
                let items = response.data;
                setShoppingList(items);
                // props.listItems(items); // New function that maps  items -
            }).catch((error) => {
                console.log('error client side GET', error)
            })
    }

    const addItem = () => {
        let newPackage = {
            item: newItem,
            quantity: newQuantity,
            unit: newUnit
        }
        axios.post('/list', newPackage)
        .then(response => {
            console.log('sent', response)
            FetchItems()
        }).catch(error => console.log("the was a client side post error",error))
    }

    const deleteItem = (id) => {
        axios.delete(`/list/${id}`)
        .then(() => {
            FetchItems()
        })
        .catch((error) => {

            console.log('ITEM ID', itemid)
            console.log('client side error with DELETE', error)
        })
    }

    useEffect(() => {
        FetchItems();
    }, [])

    return (
        <>
            <Header />
            <h1>Add an item</h1>
            <h3>Item:</h3><input placeholder = 'item' onChange={(event) => setNewItem(event.target.value)}></input>
            <h3>Quantity:</h3><input placeholder = 'quantity' onChange={(event) => setNewQuantity(event.target.value)}></input>
            <h3>Unit:</h3><input placeholder = 'unit' onChange={(event) => setNewUnit(event.target.value)}></input>
            <button onClick={addItem}>Save</button>
            {/* <div className="App">
            </div> */}
            <h1>Shopping List</h1>
            <hr></hr>
            <button>Reset</button>
            <button>Clear</button>
            <ListItems deleteItem = {deleteItem} shoppingList = {shoppingList}/>
        </>
    );
}

export default App;
