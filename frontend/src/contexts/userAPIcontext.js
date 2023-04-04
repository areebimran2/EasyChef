import { createContext, useState } from "react";

export const useUserAPIContext = () => {
    const [username, setUsername] = useState('')

    return {
     username, setUsername
    }
}
  

const UserAPIContext = createContext({
  username: null,
  setUsername: () => {},
  }
)

export default UserAPIContext