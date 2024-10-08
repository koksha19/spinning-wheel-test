"use strict";

const canvas = document.querySelector('#wheel').getContext("2d");
const btn = document.querySelector(".btn");
const header = document.querySelector("h1");

let wheel;
let colorCounter = 0;
let color;

const initializeWheel = (drumItems) => {
    wheel = new Chart(canvas, {
        type: "pie",
        data: {
            labels: drumItems.map(item => item.value),
            datasets: [
                {
                    data: drumItems.map(() => 1),
                    borderWidth: 1,
                    borderColor: "black",
                    backgroundColor: drumItems.map(() => {
                        if (colorCounter % 2 === 0) {
                            color = "#ffffff";
                        } else {
                            color = "#ff0000";
                        }
                        colorCounter++;
                        return color;
                    }),
                },
            ],
        },
        options: {
            responsive: true,
            animation: {
                duration: 0,
            },
            plugins: {
                legend:{
                    display: false,
                },
                tooltip: false,
                datalabels: {
                    color: drumItems.map(() => {
                        if (colorCounter % 2 === 0) {
                            color = "#ff0000";
                        } else {
                            color = "#ffffff";
                        }
                        colorCounter++;
                        return color;
                    }),
                    formatter: (value, ctx) => {
                        return ctx.chart.data.labels[ctx.dataIndex];
                    },
                    font: {
                        size: 28,
                        family: 'Arial',
                        weight: 900,
                    },
                    rotation: (ctx) => {
                        let labelCount = ctx.chart.data.labels.length;
                        let anglePerLabel = 360 / labelCount;
                        return (ctx.chart.options.rotation + ctx.dataIndex * anglePerLabel) % 360 - (90 - anglePerLabel/2);
                    },
                    textAlign: 'center',
                },
            },
        },
        plugins: [ChartDataLabels],
    });
};

const getValue = (angle, drumItems) => {
    let minAngle = 0;
    let maxAngle = 30;
    drumItems.forEach(item => {
        item.minAngle = minAngle;
        item.maxAngle = maxAngle;
        minAngle += 30;
        maxAngle += 30;
    })
    for (let i of drumItems) {
        if (angle >= i.minAngle && angle < i.maxAngle) {
            console.log(i.minAngle, i.maxAngle);
            header.innerHTML = `You won an iPhone with id ${i.id}!`;
            btn.disabled = false;
            return i;
        }
    }
}

const spinWheel = (drumItems) => {
    let rotations = 101;
    let rotationCount = 0;
    btn.disabled = true;
    let randomAngle = Math.floor(Math.random() * 360);
    let rotationInterval = window.setInterval(() => {
        wheel.options.rotation += rotations;
        wheel.update();
        if (wheel.options.rotation >= 360) {
            rotationCount += 1;
            rotations -= 5;
            wheel.options.rotation = 0;
        } else if (rotationCount > 15 && wheel.options.rotation === randomAngle) {
            getValue(randomAngle, drumItems);
            clearInterval(rotationInterval);
            rotationCount = 0;
            rotations = 101;
        }
    }, 15);
}

fetch('/api/drumItems')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        initializeWheel(data);
    })
    .catch(error => console.error('Error fetching drum items:', error));

btn.addEventListener('click', () => {
    btn.disabled = true;
    fetch('/spin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    })
        .then((response) => response.json())
        .then((data) => {
           spinWheel(data);
        });
})



