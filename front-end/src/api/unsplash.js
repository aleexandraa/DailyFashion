import axios from "axios";

export default axios.create({
    baseUrl: "https://api.unsplash.com/",
    headers: {
        Authorization: "Client-ID yPkUnTBAENAULsWcQnWNo-05dLaK6pvMZmdcDuZP1NI"
    }
})