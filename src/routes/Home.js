import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'fbase';
import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);
	const [photo, setPhoto] = useState('');

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNweet(value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		let photoUrl = '';
		if (photo !== '') {
			const photoRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
			const response = await photoRef.putString(photo, 'data_url');
			photoUrl = await response.ref.getDownloadURL();
		}
		const newNweet = {
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			photoUrl,
		};
		await dbService.collection('nweets').add(newNweet);
		setNweet('');
		onClearPhoto();
	};
	const onChangePhoto = (event) => {
		const {
			target: { files },
		} = event;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent;
			setPhoto(result);
		};
		reader.readAsDataURL(theFile);
	};
	const onClearPhoto = () => {
		setPhoto('');
		const photoInput = document.querySelector('#Photo');
		if (photoInput.value) photoInput.value = null;
	};

	useEffect(() => {
		dbService
			.collection('nweets')
			.orderBy('createdAt', 'desc')
			.onSnapshot((snapshot) => {
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
				<input
					id='Photo'
					type='file'
					name='photo'
					accept='image/*'
					onChange={onChangePhoto}
				/>
				<input type='submit' value='Nweet' />
				{photo && (
					<div>
						<img src={photo} width='50px' height='50px' />
						<button onClick={onClearPhoto}>삭제</button>
					</div>
				)}
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
