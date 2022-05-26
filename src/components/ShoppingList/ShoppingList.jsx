
function ListItems(props) {
    console.log(props.shoppingList)
    let items = props.shoppingList;
    return (
        <>
            <div>
                {items.map(item => (
                    <div id = {item.id} className="wrapper">
                        <div className="box">
                            <h3 key={item.item}>{item.item}</h3>
                            <h3 key={item.quantity}>{item.quantity}</h3>
                            <h3 key={item.unit}>{item.unit}</h3>
                            <button> Buy</button>
                            <button onClick={props.deleteItem}> Remove</button>
                            <br></br>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

export default ListItems;