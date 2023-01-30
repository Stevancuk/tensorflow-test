import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
    const [data, setData] = useState(null);
    const [cars, setCars] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/whoisthere"
                );
                const data = await response.json();
                setData(data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    });
    useEffect(() => {
        const getData = async () => {
            try {
                const carsDataResponse = await fetch(
                    "https://storage.googleapis.com/tfjs-tutorials/carsData.json"
                );
                const carsData = await carsDataResponse.json();
                console.log("carsData", carsData);
                const cleaned = carsData
                    .map((car) => ({
                        mpg: car.Miles_per_Gallon,
                        horsepower: car.Horsepower,
                    }))
                    .filter((car) => car.mpg != null && car.horsepower != null);
                console.log("cleaned", cleaned);
                setCars(cleaned);
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);
    return (
        <div>
            <p>{data?.express_message}</p>
        </div>
    );
}
