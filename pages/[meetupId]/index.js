import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import Head from 'next/head';

const MeetupDetails = (props) => {
    useRouter();
    return <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name='description' content={props.meetupData.description} />
        </Head>

        <MeetupDetail
            title={props.meetupData.title}
            address={props.meetupData.address}
            image={props.meetupData.image}
            description={props.meetupData.description}
        />
    </Fragment>
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://admin:5aBXuL1ff2Kuefah@cluster0.cr4kk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }

}
export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://admin:5aBXuL1ff2Kuefah@cluster0.cr4kk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    console.log(meetupId)
    const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
    client.close();
    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description
            }
        }
    }
}
export default MeetupDetails;