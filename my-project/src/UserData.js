// This File is Basically For mapping the userdata that is the fetched API in the form of table 
const UserData = ({users}) => {
    return (
        <>
            {
                users.map((curUser) => {
                    const {id} = curUser;
                    const {name} = curUser;
                    const {username} = curUser;
                    const {email} = curUser;
                    const {city} = curUser.address;
                    return (
                        <tr>
                            <td>{id}</td>
                            <td>{name}</td>
                             <td>{username}</td>
                            <td>{email}</td> 
                            <td>{city}</td>
                           <td>{curUser.company.name}</td>;
                        </tr>
                    )
                })

            }
        </>
    )
}
export default UserData;
