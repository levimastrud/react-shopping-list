import axios from "axios";
import { useState } from 'react';

function sayHello(name) {
    console.log('hello ', name)
}

function ListItems(props) {

    const [buyItem, setBuyItem] = useState(false);

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
                    <div className="box">
                        <h3>{item.item}</h3>
                        <h3>{item.quantity}</h3>
                        <h3>{item.unit}</h3>
                        {
                            item.ispurchased ?
                                <p>Purchased</p>
                                :
                                <>
                                    <button onClick={() => ToggleBuy(item.id)}> Buy</button>
                                    <button onClick={() => DeleteItem(item.id)}> Remove</button>
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