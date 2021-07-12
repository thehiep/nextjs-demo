import { MongoClient } from 'mongodb';
import { Fragment, useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';

const HomePage = (props) => {
    const [loadedMeetups, setLoadedMeetups] = useState([])
    // useEffect(()=>{
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // },[]);

    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name='description' content='Browse a huge list of higly active React meetups!' />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>

}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://admin:5aBXuL1ff2Kuefah@cluster0.cr4kk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            })),
            revalidate: 1
        }
    }
}

// export async function getServerSideProps(context) {
//     const { req, res } = context;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export default HomePage;