const restaurantImages = {
    1: require('../../assets/Images/Restaurants/1.jpg'),
    2: require('../../assets/Images/Restaurants/2.jpg'),
    3: require('../../assets/Images/Restaurants/3.jpg'),
    4: require('../../assets/Images/Restaurants/4.jpg'),
    5: require('../../assets/Images/Restaurants/5.jpg'),
    6: require('../../assets/Images/Restaurants/6.jpg'),
    7: require('../../assets/Images/Restaurants/7.jpg'),
    8: require('../../assets/Images/Restaurants/8.jpg'),
};

export const getRestaurantImage = (restaurantId) => {
    return restaurantImages[restaurantId] || require('../../assets/Images/RestaurantMenu.jpg');
};
