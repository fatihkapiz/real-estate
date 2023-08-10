import { useNavigate } from 'react-router-dom';

const AdminParameters = () => {
  const navigate = useNavigate();
  const signout = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <h1>HomePage</h1>
      <div className='currencyWrapper'>
        <a href="currency/list" style={{display: 'block'}}>List Currencies</a>
        <a href="currency/add" style={{display: 'block'}}>Add Currencies</a>
        <a href="currency/update" style={{display: 'block'}}>Update Currencies</a>
        <a href="currency/delete" style={{display: 'block'}}>Delete Currencies</a>
      </div>
      <div className='statusWrapper'>
        <a href="status/list" style={{display: 'block'}}>List all status</a>
        <a href="status/add" style={{display: 'block'}}>Add status</a>
        <a href="status/update" style={{display: 'block'}}>Update status</a>
        <a href="status/delete" style={{display: 'block'}}>Delete status</a>
      </div>
      <div className='typeWrapper'>
        <a href="estatetypes/list" style={{display: 'block'}}>List estate types</a>
        <a href="estatetypes/add" style={{display: 'block'}}>Add estate types</a>
        <a href="estatetypes/update" style={{display: 'block'}}>Update estate types</a>
        <a href="estatetypes/delete" style={{display: 'block'}}>Delete estate types</a>
      </div>
      <button onClick={signout}>Logout</button>
    </div>
  )
}

export default AdminParameters;