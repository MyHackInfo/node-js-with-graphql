import {getAllUsers} from "./user.model.js";

export default {
    Query:{
        users: () => {
            return getAllUsers();
        }
    }
}