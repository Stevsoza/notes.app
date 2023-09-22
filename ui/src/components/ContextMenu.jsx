import "./ContextMenu.scss"

const ContextMenu =({ logOut })=>{
    
    const layout = 
        //make it absolute and parent relative
        <div className="main">
            <div>Option 1</div>
            <div>Option 2</div>
            <div>Option 3</div>
            <div onClick={logOut}>LogOut</div>
        </div>

    return (layout)
}


export default ContextMenu