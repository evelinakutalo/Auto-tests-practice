function getGasStationInfo(carFuel, carSize) {

return `заправка для ${carSize} авто, тип палива "${carFuel}"`
}

const carFuelTypes = ["gas", "diesel"]
const carSizes = ["S", "M", "L", "XL"]

for (let i=0; i<carFuelTypes.length; i++) {
    for (let j=0; j<carSizes.length; j++) {
        console.log(getGasStationInfo(carFuelTypes[i], carSizes[j]))
    }
}
