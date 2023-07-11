module.exports = { 
    port: 4000,
    mongoKey: 'mongodb+srv://admin:admin@cluster0.hhy4ah8.mongodb.net/?retryWrites=true&w=majority',
    corsOptions: { 
        origin:'*', 
        credentials:true,            
        optionSuccessStatus:200
    }
}