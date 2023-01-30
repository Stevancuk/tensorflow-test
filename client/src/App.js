import "./App.css";
import { useEffect, useState } from "react";
import tfvis from "@tensorflow/tfjs-vis";
import * as tf from "@tensorflow/tfjs";

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

    useEffect(() => {
        const run = async () => {
            // Load and plot the original input data that we are going to train on.
            // const data = await getData();
            const values = cars.map((d) => ({
                x: d.horsepower,
                y: d.mpg,
            }));

            tfvis.render.scatterplot(
                { name: "Horsepower v MPG" },
                { values },
                {
                    xLabel: "Horsepower",
                    yLabel: "MPG",
                    height: 300,
                }
            );

            // More code will be added below
        };
        if (cars) {
            console.log("cars", cars);
            run();
            const model = createModel();
            tfvis.show.modelSummary({ name: "Model Summary" }, model);
        }
    }, [cars]);

    function createModel() {
        // Create a sequential model
        const model = tf.sequential();

        // Add a single input layer
        model.add(
            tf.layers.dense({ inputShape: [1], units: 1, useBias: true })
        );

        // Add an output layer
        model.add(tf.layers.dense({ units: 1, useBias: true }));

        return model;
    }

    return (
        <div>
            <p>{data?.express_message}</p>
        </div>
    );
}
