import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);
	// const

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNweet(value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.collection('nweets').add({
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
		});
		setNweet('');
	};

	useEffect(() => {
		dbService.collection('nweets').onSnapshot((snapshot) => {
			const nweetArr = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setNweets(nweetArr);
		});
	}, []);

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					name='nwitter'
					value={nweet}
					onChange={onChange}
					placeholder='오늘 어땠어요?'
					type='text'
					maxLength={120}
				/>
				<input type='submit' value='Nweet' />
			</form>
			<div>
				{nweets.map((nweet) => {
					return (
						<Nweet
							key={nweet.id}
							nweetObj={nweet}
							isOwner={userObj.uid === nweet.creatorId}
						/>
					);
				})}
			</div>
		</>
	);
};
export default Home;
