import { useState, useEffect } from 'react'
import utils from './MembersUtilsComp'
import { Link, useParams } from 'react-router-dom'



function EditMemberComp(props) {
    const { memberId } = useParams();
    const [member, setMember] = useState({
        full_name: '', email: '', city: ''
    });

    const editMember = async () => {
        let data = await utils.editMember(memberId, member)
        props.history.push('/AllMembers');
    }
    useEffect(async () => {
        let resp = await utils.getMember(memberId);
        let data = (resp.data);
        let full_name = data.full_name;
        let email = data.email;
        let city = data.city;
        setMember({ full_name, email, city });
    }, []);


    return (
        <div>
            <h3>Add members details</h3>
            <div className="linksDiv">
                <Link to='/'>Back to All movies</Link><br />
                <Link to='/AllMembers'>Back to All members</Link><br />
            </div>
            <div>
                Name: <input type="text" value={member.full_name} onChange={(e) => setMember({ ...member, full_name: e.target.value })} /><br />
                Email: <input type="text" value={member.email} onChange={(e) => setMember({ ...member, email: e.target.value })} /><br />
                City: <input type="text" value={member.city} onChange={(e) => setMember({ ...member, city: e.target.value })} />
            </div>
            <button onClick={() => editMember()} >OK</button>
        </div>
    );
}


export default EditMemberComp;
