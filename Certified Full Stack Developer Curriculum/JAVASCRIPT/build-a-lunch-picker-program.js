
let lunches = [];

function addLunchToEnd(array, item) {
    console.log(`${item} added to the end of the lunch menu.`);
    array.push(item);
    return array;
}

function addLunchToStart(array, item) {
    console.log(`${item} added to the start of the lunch menu.`);
    array.unshift(item);
    return array;
}

function removeLastLunch(array) {
    if (array.length === 0) {
        console.log("No lunches to remove.");
    } else {
        const removed = array.pop();
        console.log(`${removed} removed from the end of the lunch menu.`);
    }
    return array;
}

function removeFirstLunch(array) {
    if (array.length === 0) {
        console.log("No lunches to remove.");
    } else {
        const removed = array.shift();
        console.log(`${removed} removed from the start of the lunch menu.`);
    }
    return array;
}

function getRandomLunch(array) {
    if (array.length === 0) {
        console.log("No lunches available.");
    } else {
        const randomIndex = Math.floor(Math.random() * array.length);
        console.log(`Randomly selected lunch: ${array[randomIndex]}`);
    }
}

function showLunchMenu(array) {
    if (array.length === 0) {
        console.log("The menu is empty.");
    } else {
        console.log(`Menu items: ${array.join(", ")}`);
    }
}
