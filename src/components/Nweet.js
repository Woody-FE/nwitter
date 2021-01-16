import { dbService } from 'fbase';
import { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);
	const onDeleteClick = async () => {
		const ok = window.confirm('삭제하시겠습니까 ?');
		if (ok) {
			await dbService.doc(`nweets/${nweetObj.id}`).delete();
		}
	};
	const onToggleEdit = () => setEditing((prev) => !prev);
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewNweet(value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.doc(`nweets/${nweetObj.id}`).update({
			text: newNweet,
		});
		setEditing((prev) => !prev);
	};
	return (
		<div>
			{editing ? (
				<>
					{isOwner && (
						<>
							<form onSubmit={onSubmit}>
								<input
									name='newNweet'
									onChange={onChange}
									value={newNweet}
									type='text'
									required
								/>
								<input type='submit' value='수정' />
							</form>
						</>
					)}
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>delete</button>
							<button onClick={onToggleEdit}>edit</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
