import axios from "axios";
import { useState } from 'react';

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

    return (
        <>
            {items.map((item) => (
                <div key = {item.id} className="wrapper">
                    <div className="box">
                            <h3>{item.item}</h3>
                            <h3>{item.quantity}</h3>
                            <h3>{item.unit}</h3>
                        { 
                        item.ispurchased ? 
                        <p>Purchased</p> :
                        <>
                        <button onClick={ () => ToggleBuy(item.id)}> Buy</button>
                        <button onClick={props.deleteItem}> Remove</button>
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