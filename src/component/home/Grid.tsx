import { useState } from "react";
import { Link } from "react-router-dom";

function Grid() {
    const [items] = useState([
        { id: 1, name: "Steam", img: "/home/1.png", link: "/steam" },
        { id: 2, name: "PUBG Mobile", img: "/home/2.png", link: "/" },
        { id: 3, name: "PlayStation", img: "/home/3.png", link: "/" },
        { id: 4, name: "Spotify", img: "/home/4.png", link: "/" },
        { id: 5, name: "Apple ID", img: "/home/5.png", link: "/" },
        { id: 6, name: "Battle.net", img: "/home/6.png", link: "/" },
    ]);

    return (
        <div>
            <b className="text-[24px]">Популярное</b>

            <div className="grid grid-cols-2 gap-5 pt-6">
                {items.map((item) => (
                    <Link to={item.link} key={item.id}>
                        <div className="overflow-hidden rounded-3xl h-[125px] md:h-[200px]">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <center>
                            <b className="mt-2.5 block">{item.name}</b>
                        </center>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Grid;
