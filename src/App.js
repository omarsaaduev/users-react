import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [invites, setInvites] = useState([])
  const [success, setSuccess] = useState(true)
 
  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      }).catch(err => {
        console.warn(err)
        alert('Ошибка при получении пользователя')
      }).finally(() => setLoading(false));
  }, []);

  function onChangeSearchValue(event) {
    setSearchValue(event.target.value)
  }

  function onClickInvite (id) {
    if(invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev,id])
    }
  }

  function onClickSendInvites() {
    setSuccess(false)
  }
  return (
    <div className="App">
      {success? 
      <Users 
      onClickInvite = {onClickInvite}
      invites = {invites}
      onClickSendInvites = {onClickSendInvites}
      searchValue={searchValue}
      onChangeSearchValue={onChangeSearchValue}
      items = {users} 
      isLoading={isLoading} />
    : <Success count={invites.length} /> 
    }
      
      
    </div>
  );
}

export default App;
