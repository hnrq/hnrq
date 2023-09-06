export default interface Post {
	canonical_url: string;
	collection_id?: string;
	comments_count: number;
	cover_image?: string;
	created_at: string;
	crossposted_at?: string;
	description: string;
	edited_at: string;
	id: string;
	last_comment_at: string;
	positive_reactions_count: number;
	public_reactions_count: number;
	published_at: string;
	published_timestamp: string;
	reading_time_minutes: number;
	tag_list: string[];
	tags: string;
	title: string;
	type_of: string;
	url: string;
}
