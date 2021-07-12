import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enterMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enterMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {

        }
        const data = await response.json();
        console.log(data);

        router.replace('/');
    }
    return <Fragment>
        <Head>
            <title>Add new Meetup</title>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
}

export default NewMeetupPage;