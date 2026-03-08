const App = require("./src/App");

const PORT = process.env.PORT || 3000;


App.listen(PORT, () => {
    try {
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error("Error starting server:", error);
    }
});