const homeController = (request, response) => {
    response.status(200).json({message: "server started"});
};


export default homeController;