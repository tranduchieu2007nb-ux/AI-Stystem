const mongoose = require("mongoose");
require("dotenv").config();

const Planet = require("../models/Planet");

async function seedPlanet() {
    try {

        // Kết nối MongoDB
        await mongoose.connect(process.env.DB_HOST);

        console.log(" Connected MongoDB");
        // Xóa dữ liệu cũ
        await Planet.deleteMany({});
        
        // Thêm dữ liệu mới
        await Planet.insertMany([
            {
                slug: "mercury",
                name: "Mercury",
                image: "/images/planets/Mercury.jpg",
                description: "The closest planet to the Sun.",
                diameter: 4879,
                mass: 0.330,
                gravity: 3.7,
                atmosphere: "Very thin atmosphere",
                temperature: 167,
                distanceSun: 57.9,
                distanceEarth: 91.7,
                facts: [
                    "Smallest planet",
                    "No natural satellites"
                ],
                tags: ["rocky", "inner"],
                featured: false,
                displayOrder: 1
            },
            {
                slug: "venus",
                name: "Venus",
                image: "/images/planets/Venus.jpg",
                description: "The hottest planet in the Solar System.",
                diameter: 12104,
                mass: 4.87,
                gravity: 8.87,
                atmosphere: "Carbon dioxide",
                temperature: 464,
                distanceSun: 108.2,
                distanceEarth: 41.4,
                facts: [
                    "Rotates backwards",
                    "Hottest planet"
                ],
                tags: ["rocky", "inner"],
                featured: false,
                displayOrder: 2
            },
            {
                slug: "earth",
                name: "Earth",
                image: "/images/planets/Earth.jpg",
                description: "Our home planet.",
                diameter: 12742,
                mass: 5.97,
                gravity: 9.81,
                atmosphere: "Nitrogen and Oxygen",
                temperature: 15,
                distanceSun: 149.6,
                distanceEarth: 0,
                facts: [
                    "Only known planet with life",
                    "71% covered by water"
                ],
                tags: ["rocky", "life"],
                featured: true,
                displayOrder: 3
            },
            {
                slug: "mars",
                name: "Mars",
                image: "/images/planets/Mars.jpg",
                description: "The Red Planet.",
                diameter: 6779,
                mass: 0.642,
                gravity: 3.71,
                atmosphere: "Carbon dioxide",
                temperature: -63,
                distanceSun: 227.9,
                distanceEarth: 78.3,
                facts: [
                    "Home of Olympus Mons",
                    "Has two moons"
                ],
                tags: ["rocky", "red"],
                featured: true,
                displayOrder: 4
            },
            {
                slug: "jupiter",
                name: "Jupiter",
                image: "/images/planets/Jupiter.jpg",
                description: "The largest planet in the Solar System.",
                diameter: 139820,
                mass: 1898,
                gravity: 24.79,
                atmosphere: "Hydrogen and Helium",
                temperature: -145,
                distanceSun: 778.5,
                distanceEarth: 628.7,
                facts: [
                    "Largest planet",
                    "Great Red Spot"
                ],
                tags: ["gas giant"],
                featured: true,
                displayOrder: 5
            },
            {
                slug: "saturn",
                name: "Saturn",
                image: "/images/planets/Saturn.jpg",
                description: "Famous for its ring system.",
                diameter: 116460,
                mass: 568,
                gravity: 10.44,
                atmosphere: "Hydrogen and Helium",
                temperature: -178,
                distanceSun: 1433.5,
                distanceEarth: 1275,
                facts: [
                    "Beautiful rings",
                    "More than 140 moons"
                ],
                tags: ["gas giant"],
                featured: true,
                displayOrder: 6
            },
            {
                slug: "uranus",
                name: "Uranus",
                image: "/images/planets/Uranus.jpg",
                description: "An ice giant that rotates on its side.",
                diameter: 50724,
                mass: 86.8,
                gravity: 8.69,
                atmosphere: "Hydrogen, Helium, Methane",
                temperature: -224,
                distanceSun: 2872.5,
                distanceEarth: 2721,
                facts: [
                    "Tilted axis",
                    "Blue-green color"
                ],
                tags: ["ice giant"],
                featured: false,
                displayOrder: 7
            },
            {
                slug: "neptune",
                name: "Neptune",
                image: "/images/planets/Neptune.jpg",
                description: "The farthest known planet from the Sun.",
                diameter: 49244,
                mass: 102,
                gravity: 11.15,
                atmosphere: "Hydrogen, Helium, Methane",
                temperature: -214,
                distanceSun: 4495.1,
                distanceEarth: 4351,
                facts: [
                    "Strongest winds",
                    "Deep blue color"
                ],
                tags: ["ice giant"],
                featured: false,
                displayOrder: 8
            }
        ]);
        console.log(" Seed thành công!");
    } catch (error) {
        console.log(error);

    }
}

seedPlanet();