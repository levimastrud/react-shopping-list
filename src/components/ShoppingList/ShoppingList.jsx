import axios from "axios";
import { useState } from 'react';

function ListItems(props) {

    const [buyItem, setBuyItem] = useState(false);
    let purchasedClass = 'box';

    let items = props.shoppingList;
    console.log(items)

    const ToggleBuy = (itemid) => {
        axios.put(`/list/${itemid}`)
            .then(response => {
                setBuyItem(true)
                props.FetchItems();
                console.log(items)
            }).catch(error => {
                console.log('Error in PUT client side', error)
            })
    }

    // DELETE ITEM

    const DeleteItem = (itemid) => {
        axios.delete(`/list/${itemid}`)
            .then(() => {
                props.FetchItems()
            })
            .catch((error) => {
                console.log('client side error with DELETE', error)
            })
    }

    // RESET 

    const ResetBuy = () => {
        axios.put(`/list`)
            .then(response => {
                setBuyItem(false)
                props.FetchItems();
                console.log(items)
            }).catch(error => {
                console.log('Error in PUT client side', error)
            })
    }

    return (
        <>
            <button onClick={ResetBuy}>Reset</button>
            <br></br>
            {items.map((item) => (
                <div key={item.id} className="wrapper">
                    <div className={item.ispurchased ? 'purchased' : 'box'}>
                        <h3>{item.item}</h3>
                        <h3>{item.quantity}</h3>
                        <h3>{item.unit}</h3>
                        {
                            item.ispurchased ?
                                <span id = 'purchasedText'><h2>Purchased</h2></span>
                                :
                                <>
                                    <button id = "buyButton" onClick={() => ToggleBuy(item.id)}> Buy</button>
                                    <button id = 'removeButton' onClick={() => DeleteItem(item.id)}> Remove</button>
                                    <br></br>
                                </>
                        }
                    </div>
                </div>
            ))}
        </>
    )

}

export default ListItems;