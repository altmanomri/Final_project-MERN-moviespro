import { useState, useEffect } from 'react'
import utils from './MembersUtilsComp'
import movieUtils from '../../MoviesUtilsComp'
import { Link } from 'react-router-dom'
import CardMemberComp from './CardMemberComp';
import subUtils from '../subscriptions/SubscriptionsUtilsComp';
import {styles} from '../styles/headerStyles'

function AllMembersComp(props) {

    const [members, setMembers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [copies, setCopies] = useState([]);
    const [searchContent, setSearchContent] = useState([]);
    const [subs, setSubs] = useState([]);
   
    useEffect(async () => {
        let resp = await utils.getMembers();
        let moviesResp = await movieUtils.getMovies();
        let respSub = await subUtils.getSubscriptions();
        setMovies(moviesResp.data)
        setSubs(respSub.data);
        setMembers(resp.data);
        setCopies(resp.data);
    }, []);


    useEffect(() => {
        if (copies) {
            let filteredMembers = copies.filter(m => m.full_name.toLowerCase().includes(searchContent));
            filteredMembers && setMembers(filteredMembers)
        }
    }, [searchContent])
   
    const renderCards = (membersList = []) => {
        if (membersList) {
            return membersList.map(member => (
                <CardMemberComp key={member._id} member={member} subs={subs} movies={movies}/>
            ))
        }
    }
    return (
        <div  >
            <div>
                <Link to='/' ><p style={styles.pageHeader}>Go to all Movies</p></Link>
                <div style={styles.topPageHeader}>
                    <h1 style={styles.topPageHeaderText}>List of members:</h1>
                </div>
                <span style={styles.serach.header}>SEARCH 🕵️‍♂️{" "}</span> 
                 <input style={styles.serach.input} type="text" placeholder="Enter member's name" onChange={(e) => setSearchContent(e.target.value)}></input>
                <Link to="/AddMember">
                    <button style={styles.addBtn} type="button">Add member</button>
                </Link>
                
                <div >
                {renderCards(members)}

                </div>
            </div>

        </div>
    );
}


export default AllMembersComp;
