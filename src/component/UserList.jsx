import React, { useState, useEffect } from 'react';


const UserList = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;


  const fetchUsersData = async(url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
    let API = 'https://jsonplaceholder.typicode.com/users'
    fetchUsersData(API);
  }, []);

  //handle view detail button
  const handleClick = user => {
    setSelectedUser(selectedUser === user ? null : user);
  };

  //handle pagination
  const handlePageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(users.length / perPage);
  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div className='container'>
      {selectedUser ? (
        <div className='grid'>
           <div className="left"> 
          <li>{selectedUser.id}</li>
          <li><span>Contact Person</span>{selectedUser.name}</li>
          <li><span>Emails</span>{selectedUser.email}</li>
          <li><span>Phone</span>{selectedUser.phone}</li>
          <li><span>Websit</span>{selectedUser.website}</li>
         
          </div>
          <div className="right">
            <h2>Address</h2>
            <li><span>Street</span>{selectedUser.address.street}</li>
            <li><span>Suite</span>{selectedUser.address.suite}</li>
            <li><span>City</span>{selectedUser.address.city}</li>
          </div>
          <button onClick={() => setSelectedUser(null)}>Back</button>
        </div>
      ) : (
        <div>
          {currentUsers.map(user => (     
            <div >
             <ul className="list" key={user.id}>
             <li> {user.name}</li>
             <li><span className='list_header'>Contact</span> {user.phone}</li>
             <li><span className='list_header'>City</span> {user.address.city}</li>
             <li onClick={() => handleClick(user)}>View Detail</li>
             </ul>
            </div>
        ))}
          {/* PAGINATION */}
          <div className='pagination'>
            {/* array.from takes object and returns array */}
            {Array.from({ length: totalPages }, (_, i) => (
              <span
                key={i}
                style={{ cursor: 'pointer' }}
                onClick={() => handlePageClick(i)}
              >
                {i === currentPage ? '•' : '.'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
