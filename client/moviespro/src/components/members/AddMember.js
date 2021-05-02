import { useState } from 'react'
import utils from './MembersUtilsComp'
import { Link } from 'react-router-dom'



function AddMemberComp(props) {

    const [newMember, setNewMember] = useState({
        full_name: '', email: '', city: ''
    });

    const handleSubmit = async (newMember) => {
        let data = await utils.addMember(newMember)
        props.history.push('/AllMembers')
    }

    return (
        <div>
            <h3>Edit members details</h3>
            <div className="linksDiv">
                <Link to='/'>Back to All movies</Link><br />
                <Link to='/AllMembers'>Back to All members</Link><br />
            </div>
            <div>
                <div >
                    Name: <input type="text" value={newMember.full_name} onChange={(e) => setNewMember({ ...newMember, full_name: e.target.value })} required /><br />
                    Email: <input type="text" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} required /><br />
                    City: <input type="text" value={newMember.city} onChange={(e) => setNewMember({ ...newMember, city: e.target.value })} required /><br />
                    <button onClick={() => handleSubmit(newMember)}>Add</button><Link to='/AllMembers' ><button>Cancel</button></Link>
                </div>
            </div>
        </div>
    );
}


export default AddMemberComp;
