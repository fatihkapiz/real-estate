export default function RealEstate(format) {
    /*
    const photos = format.photos.map((post) =>
        <div key={post.id}>
        <img src={post}></img>
        </div>
    );
    */
    return(
        <div className="estateContainer">
            <h2>{format.title}</h2>
            <h3>Price: {format.price}{format.currency} </h3>
            <h3>Size: {format.size}m<sup>2</sup></h3>
            <h3>Status: {format.status}</h3>
            <h3>Type: {format.type}</h3>
            <ul>
            </ul>
        </div>
    )
}