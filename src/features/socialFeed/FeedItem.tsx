import { useState, Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import tw from 'twin.macro';
import styled from 'styled-components';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Image, Tooltip } from 'antd';
import { LikeFilled, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import congratsIcon from 'features/socialFeed/assets/images/congrats.svg';
import laughIcon from 'features/socialFeed/assets/images/laughing.svg';
import likeIcon from 'features/socialFeed/assets/images/like.svg';
import sadIcon from 'features/socialFeed/assets/images/sad.svg';
import DeleteOverlay from 'features/socialFeed/DeleteOverlay';
import { DATE_TIME_FORMAT } from 'lib/constants';
import placeholderImg from 'assets/images/placeholder.svg';
import useLongPress from 'features/socialFeed/hooks/useLongPress';
import { ReactionType } from 'features/socialFeed/SocialFeedTypes';
import { destroy } from 'features/socialFeed/firebase/posts';
import { useSocialFeed } from 'config/hooks';
import UserInfoPop from 'features/shared/components/UserInfoPop';

type PropsType = {
	postId: string;
	setCommentingOn: Dispatch<SetStateAction<string | undefined>>;
};

export default function FeedItem({ postId, setCommentingOn }: PropsType) {
	const [reactionContainerVisible, setReactionContainerVisible] =
		useState<boolean>(false);
	const [reaction, setReaction] = useState<ReactionType | null>(null);
	const { posts, setPosts, users } = useSocialFeed();

	dayjs.extend(relativeTime);

	const post = posts[postId];
	const { userId, text, picture: postPic, createdAt } = post;

	const user = users[userId] || {};
	const {
		firstName = '',
		lastName = '',
		phone,
		picture: userPic,
		flat,
	} = user;

	type ClickOrTapEvent<T> =
		| React.MouseEvent<T>
		| React.TouchEvent<T>
		| React.KeyboardEvent<T>;

	const onLongPress = (e: ClickOrTapEvent<HTMLButtonElement>) => {
		setReactionContainerVisible(true);
	};

	const onClick = (e: ClickOrTapEvent<HTMLButtonElement>) => {
		if (reactionContainerVisible) {
			setReactionContainerVisible(false);
		} else if (reaction) {
			setReaction(null);
		} else {
			setReaction('like');
		}

		// const updatedPosts = posts;
		// if (updatedPosts[key].reactions) {
		// 	// updatedPosts[key].reactions.self = 'like';
		// } else {
		// 	updatedPosts[key].reactions = { self: 'like' };
		// }
		// setPosts(updatedPosts);
	};

	const deletePost = async (key: string) => {
		const updatedPosts = { ...posts };

		if (await destroy(key)) {
			if (updatedPosts[key]) {
				delete updatedPosts[key];
				setPosts(updatedPosts);
			}
		}
	};

	const longPressEvent = useLongPress<HTMLButtonElement>(
		onLongPress,
		onClick
	);

	const reactionClickHandler = (r: ReactionType) => {
		setReactionContainerVisible(false);
		if (r === reaction) {
			setReaction(null);
		} else {
			setReaction(r);
		}
	};

	const singleReaction = () => {
		switch (reaction) {
			case 'like':
				return (
					<>
						<LikeFilled className="text-2xl pr-2 text-blue-500" />
						<span className="text-blue-500 self-end">Liked</span>
					</>
				);

			case 'laugh':
				return (
					<>
						<Reaction src={laughIcon} alt="Laugh Icon" />
						<span className="text-blue-500">Laughed</span>
					</>
				);

			case 'sad':
				return (
					<>
						<Reaction src={sadIcon} alt="Sad Icon" />
						<span className="text-blue-500">Sad</span>
					</>
				);

			case 'congrats':
				return (
					<>
						<Reaction src={congratsIcon} alt="Congrats Icon" />
						<span className="text-blue-500">Congratulated</span>
					</>
				);
			default:
				return (
					<>
						<LikeOutlined className="text-2xl pr-2" />
						<span className="self-end">Like</span>
					</>
				);
		}
	};

	return (
		<div className="shadow-lg rounded-3xl border border-gray-200 mb-4">
			<div className="p-4">
				<div className="flex justify-between items-center">
					<div className="flex items-center mb-4">
						<Image
							className="rounded-full"
							height={50}
							width={50}
							preview={false}
							src={userPic || placeholderImg}
							fallback={placeholderImg}
						/>
						<div className="ml-4">
							<UserInfoPop flat={flat} phone={phone}>
								<h3 className="font-semibold text-lg">{`${firstName} ${lastName}`}</h3>
							</UserInfoPop>

							<Tooltip
								title={dayjs(createdAt).format(
									DATE_TIME_FORMAT
								)}
							>
								<div className="text-gray-500">
									{dayjs(createdAt).fromNow()}
								</div>
							</Tooltip>
						</div>
					</div>

					<DeleteOverlay itemKey={postId} handleClick={deletePost} />
				</div>
				<div className="text-center">
					{postPic && (
						<Image
							width="100%"
							src={postPic || placeholderImg}
							fallback={placeholderImg}
						/>
					)}
				</div>

				<p>{text}</p>
			</div>

			<div className="flex border-t border-gray-200 px-5">
				<div className="flex-1 relative">
					{reactionContainerVisible && (
						<div className="absolute flex -top-10 left-2/4 transform -translate-x-2/4 bg-white shadow-lg rounded-lg px-3 py-2 border border-gray-200 w-max">
							<Reaction
								className="transform hover:scale-125"
								src={congratsIcon}
								alt="Congrats Icon"
								onClick={() => reactionClickHandler('congrats')}
							/>
							<Reaction
								className="transform hover:scale-125"
								src={laughIcon}
								alt="Laughing Icon"
								onClick={() => reactionClickHandler('laugh')}
							/>
							<Reaction
								className="transform hover:scale-125"
								src={likeIcon}
								alt="Like Icon"
								onClick={() => reactionClickHandler('like')}
							/>
							<Reaction
								className="transform hover:scale-125"
								src={sadIcon}
								alt="Sad Icon"
								onClick={() => reactionClickHandler('sad')}
							/>
						</div>
					)}
					<FButton
						type="button"
						className="border-r"
						data-key={postId}
						{...longPressEvent}
					>
						{singleReaction()}
					</FButton>
				</div>

				<div className="flex-1">
					<FButton
						type="button"
						onClick={() => setCommentingOn(postId)}
					>
						<MessageOutlined className="text-2xl pr-2" />
						Comment
					</FButton>
				</div>
			</div>
		</div>
	);
}

const FButton = styled.button`
	${tw`
		w-full
		items-center
		py-3
		border-gray-200
		flex
		justify-center
	`}
`;

const Reaction = styled.img`
	${tw`
		pr-2
		w-10
		transition
		duration-300
		cursor-pointer
	`}
`;
