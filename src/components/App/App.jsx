import Header from '../Header/Header.jsx'
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ListItems from '../ShoppingList/ShoppingList.jsx';

function App() {

    const [shoppingList, setShoppingList] = useState([]);
    const [newItem, setNewItem] = useState([]);
    const [newQuantity, setNewQuantity] = useState([]);
    const [newUnit, setNewUnit] = useState([]);
    
    // CLEAR

    const ClearTable = () => {
        axios.delete('/list')
            .then(response => {
                FetchItems();
            }).catch(error => {
                console.log('error CLIENT side in Clear Table', error);
            })
    }

    // Buy an item 


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
            FetchItems();
            setNewItem('');
            setNewQuantity('');
            setNewUnit('');
        }).catch(error => console.log("the was a client side post error",error))
    }

    useEffect(() => {
        FetchItems();
    }, [])




    return (
        <>
            <Header />
            <section>
            <div className='addItem'>
            <h1>Add an item</h1>
            <h3>Item:</h3><input value = {newItem} placeholder = 'item' onChange={(event) => setNewItem(event.target.value)}></input>
            <h3>Quantity:</h3><input value = {newQuantity} placeholder = 'quantity' onChange={(event) => setNewQuantity(event.target.value)}></input>
            <h3>Unit:</h3><input value = {newUnit} placeholder = 'unit' onChange={(event) => setNewUnit(event.target.value)}></input>
            <button onClick={addItem}>Save</button>
            </div>
            {/* <div className="App">
            </div> */}
            <h1>Shopping List</h1>
            <hr></hr>
            <button onClick={ClearTable}>Clear</button>
            <br></br>
            <ListItems FetchItems = {FetchItems} shoppingList = {shoppingList}/>
            </section>
        </>
    );
}

export default App;
